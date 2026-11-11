// Convierte tools/out/*.svg en assets/img/*.webp (tamaño grande + "-sm" de 800px).
// Uso: node tools/render.mjs   (requiere playwright y python3 con Pillow)
import { chromium } from 'playwright';
import { readdirSync, readFileSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const outDir = path.join(root, 'tools', 'out');
const pngDir = path.join(outDir, 'png');
mkdirSync(pngDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage();
const only = process.argv[2];
for (const f of readdirSync(outDir).filter((f) => f.endsWith('.svg') && (!only || f.startsWith(only)))) {
  const svg = readFileSync(path.join(outDir, f), 'utf8');
  const [, w, h] = svg.match(/width="(\d+)" height="(\d+)"/);
  await page.setViewportSize({ width: +w, height: +h });
  await page.setContent(`<html><body style="margin:0">${svg}</body></html>`);
  await page.screenshot({ path: path.join(pngDir, f.replace('.svg', '.png')) });
}
await browser.close();
execFileSync('python3', [path.join(root, 'tools', 'towebp.py'), pngDir, path.join(root, 'assets', 'img')], { stdio: 'inherit' });
