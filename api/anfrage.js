/* Formularversand der Website (Befunde B02 und B06): Kontaktanfrage, Kurzbewerbung, Lehre und Schnuppertag.
   Vercel Function, Versand über die REST-API von Resend. Keine Abhängigkeiten.

   Environment Variables in Vercel (Settings, Environment Variables), nie im Code:
     RESEND_API_KEY   Pflicht. Ohne Schlüssel antwortet der Endpunkt mit 503, die Website zeigt dann die Fehlermeldung.
     MAIL_FROM        Absender, z. B. "Website Rokitzky <noreply@rokitzky.ch>". Die Domain muss in Resend bestätigt sein.
     MAIL_TO_INFO     Empfänger allgemein, Standard info@rokitzky.ch
     MAIL_TO_SERVICE  Empfänger für Service und Pikett, Standard service@rokitzky.ch
     MAIL_TO_JOBS     Empfänger für Bewerbungen, Lehre und Schnuppertage, Standard wie MAIL_TO_INFO */
'use strict';

const MAIL = /^[^@\s<>"]+@[^@\s<>"]+\.[^@\s<>"]+$/;
const MIN_MS = 2500;
const MAX_FILE = 3 * 1024 * 1024;
const FILE_TYPES = { 'application/pdf': 'pdf', 'image/jpeg': 'jpg', 'image/png': 'png' };

const clean = (v, max = 200) => String(v == null ? '' : v).replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, '').trim().slice(0, max);
const oneLine = (v, max) => clean(v, max).replace(/\s+/g, ' ');

function stamp() {
  return new Intl.DateTimeFormat('de-CH', { timeZone: 'Europe/Zurich', dateStyle: 'medium', timeStyle: 'short' }).format(new Date());
}

function build(kind, b) {
  const name = oneLine(b.name, 120), mail = oneLine(b.mail, 160), tel = oneLine(b.tel, 40), msg = clean(b.msg, 5000);
  const errors = [];
  if (!name) errors.push('name');
  if (mail && !MAIL.test(mail)) errors.push('mail');
  const lines = [['Name', name], ['Telefon', tel], ['Mail', mail]];
  let subject, to;

  if (kind === 'anfrage') {
    const thema = oneLine(b.thema, 80);
    if (!mail) errors.push('mail');
    lines.push(['Thema', thema]);
    subject = 'Anfrage über die Website' + (thema ? ': ' + thema : '');
    to = /Service|Pikett/i.test(thema) ? 'service' : 'info';
  } else if (kind === 'bewerbung') {
    const beruf = oneLine(b.beruf, 120);
    if (!tel) errors.push('tel');
    if (!beruf) errors.push('beruf');
    lines.push(['Beruf', beruf], ['Erfahrung', oneLine(b.erfahrung, 80)], ['Rückruf', oneLine(b.rueckruf, 80)], ['Stelle', oneLine(b.stelle, 120)]);
    subject = 'Kurzbewerbung über die Website: ' + (beruf || 'ohne Angabe');
    to = 'jobs';
  } else if (kind === 'lehre') {
    const beruf = oneLine(b.lehrberuf, 120), anliegen = oneLine(b.anliegen, 40) || 'Schnuppertag';
    if (!tel && !mail) errors.push('tel');
    if (!beruf) errors.push('lehrberuf');
    lines.push(['Anliegen', anliegen], ['Lehrberuf', beruf]);
    subject = `${anliegen} über die Website: ${beruf || 'ohne Angabe'}`;
    to = 'jobs';
  } else {
    errors.push('kind');
  }
  const page = oneLine(b.page, 200);
  const text = [
    subject, '',
    ...lines.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`),
    ...(msg ? ['', 'Nachricht:', msg] : []),
    '', `Seite: ${page || 'unbekannt'}`, `Gesendet: ${stamp()}`
  ].join('\n');
  return { errors, subject: oneLine(subject, 180), text, to, mail };
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); res.status(405).json({ ok: false, error: 'methode' }); return; }

  let b = req.body;
  if (typeof b === 'string') { try { b = JSON.parse(b); } catch { b = null; } }
  if (!b || typeof b !== 'object') { res.status(400).json({ ok: false, error: 'daten' }); return; }

  // Spamschutz: verstecktes Feld und Mindestzeit zwischen Anzeigen und Absenden.
  if (clean(b.website)) { res.status(200).json({ ok: true }); return; }
  if (!(Number(b.t) >= MIN_MS)) { res.status(429).json({ ok: false, error: 'zu_schnell' }); return; }

  const kind = clean(b.kind, 20) || 'anfrage';
  const m = build(kind, b);
  if (m.errors.length) { res.status(400).json({ ok: false, error: 'felder', fields: m.errors }); return; }

  const attachments = [];
  if (b.attachment && b.attachment.data && kind !== 'anfrage') {
    const ext = FILE_TYPES[clean(b.attachment.type, 60)];
    const data = String(b.attachment.data).replace(/^data:[^,]*,/, '');
    const size = Math.floor(data.length * 3 / 4);
    if (!ext || size > MAX_FILE) { res.status(400).json({ ok: false, error: 'datei' }); return; }
    const base = oneLine(b.attachment.name, 80).replace(/\.[a-z0-9]+$/i, '').replace(/[^\p{L}\p{N} _]/gu, '').trim() || 'Lebenslauf';
    attachments.push({ filename: `${base}.${ext}`, content: data });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) { res.status(503).json({ ok: false, error: 'nicht_eingerichtet' }); return; }

  const info = process.env.MAIL_TO_INFO || 'info@rokitzky.ch';
  const to = { info, service: process.env.MAIL_TO_SERVICE || 'service@rokitzky.ch', jobs: process.env.MAIL_TO_JOBS || info }[m.to];
  const payload = { from: process.env.MAIL_FROM || 'Website Rokitzky <noreply@rokitzky.ch>', to: [to], subject: m.subject, text: m.text };
  if (m.mail) payload.reply_to = m.mail;
  if (attachments.length) payload.attachments = attachments;

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!r.ok) { res.status(502).json({ ok: false, error: 'versand' }); return; }
    res.status(200).json({ ok: true });
  } catch {
    res.status(502).json({ ok: false, error: 'versand' });
  }
};

module.exports.build = build;
