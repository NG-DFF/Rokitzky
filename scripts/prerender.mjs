/* Erzeugt für jede Seite eine fertige HTML-Datei mit Inhalt, Titel, Beschreibung, canonical und JSON-LD (Befund B01),
   dazu 404.html, sitemap.xml und robots.txt. Vorlage für Kopf, Navigation und Footer ist scripts/shell.html.

   Nach jeder Änderung an Texten, Vorlagen oder shell.html im Ordner scripts ausführen:
     npm install            (einmalig)
     npx playwright install chromium   (einmalig)
     node prerender.mjs
   Danach die geänderten HTML-Dateien committen. Vercel braucht keinen Build. */
import http from 'node:http';
import { createRequire } from 'node:module';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, extname, join, normalize, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const ROOT = normalize(join(dirname(fileURLToPath(import.meta.url)), '..'));
const SHELL = join(ROOT, 'scripts', 'shell.html');
const TYPES = {
  '.css': 'text/css', '.js': 'text/javascript', '.mjs': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml',
  '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.woff2': 'font/woff2', '.pdf': 'application/pdf',
  '.xml': 'application/xml', '.txt': 'text/plain', '.mp4': 'video/mp4', '.webm': 'video/webm'
};

const server = http.createServer(async (req, res) => {
  const path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  const file = normalize(join(ROOT, path));
  if (!file.startsWith(ROOT + sep) && file !== ROOT) { res.writeHead(403); res.end(); return; }
  try {
    if (extname(path) && extname(path) !== '.html') {
      const body = await readFile(file);
      res.writeHead(200, { 'content-type': TYPES[extname(path)] || 'application/octet-stream' });
      res.end(body);
      return;
    }
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.end(await readFile(SHELL));
  } catch {
    res.writeHead(404); res.end();
  }
});
await new Promise((ok) => server.listen(0, '127.0.0.1', ok));
const origin = `http://127.0.0.1:${server.address().port}`;

const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
const context = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1440, height: 900 } });
await context.addInitScript(() => { window.__PRERENDER__ = true; });
// Nur eigene Dateien laden: Schrift und Animationen braucht das fertige HTML nicht.
await context.route('**/*', (route) => (route.request().url().startsWith(origin) ? route.continue() : route.abort()));
const page = await context.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));

async function ready(path) {
  try {
    await page.waitForFunction(() => window.__RK_READY__, null, { timeout: 20000 });
  } catch {
    console.error(`Seite ${path} wurde nicht fertig.` + (errors.length ? ' JavaScript-Fehler:\n' + errors.join('\n') : ''));
    process.exit(1);
  }
}

async function snapshot(path) {
  await page.goto(origin + path, { waitUntil: 'load' });
  await ready(path);
  const html = await page.evaluate(() => document.documentElement.outerHTML);
  if (!/<h1[\s>]/.test(html)) throw new Error(`Keine H1 auf ${path}`);
  return `<!DOCTYPE html>\n${html}\n`;
}

await page.goto(origin + '/', { waitUntil: 'load' });
await ready('/');
const { siteUrl, routes } = await page.evaluate(() => ({ siteUrl: window.__RK__.siteUrl, routes: window.__RK__.routes() }));

for (const r of routes) {
  const out = r.path === '/' ? join(ROOT, 'index.html') : join(ROOT, ...r.path.split('/').filter(Boolean), 'index.html');
  await mkdir(dirname(out), { recursive: true });
  await writeFile(out, await snapshot(r.path));
  console.log('ok ', r.path);
}
await writeFile(join(ROOT, '404.html'), await snapshot('/seite-nicht-gefunden/'));
console.log('ok  /404.html');

const urls = routes.map((r) => `  <url><loc>${siteUrl}${r.path}</loc></url>`).join('\n');
await writeFile(join(ROOT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
await writeFile(join(ROOT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`);
console.log(`ok  sitemap.xml (${routes.length} Seiten), robots.txt`);

await browser.close();
server.close();
if (errors.length) { console.error('JavaScript-Fehler:\n' + [...new Set(errors)].join('\n')); process.exit(1); }
