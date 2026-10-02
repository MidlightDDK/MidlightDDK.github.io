// Renders the generated files in site/ from the HTML sources in tools/, using a locally
// installed Chrome or Edge in headless mode. No npm packages needed.
//
//   node tools/render.mjs
//
// Outputs:
//   site/og.png               <- tools/og.html   (link-preview image, 1200x630)
//   site/apple-touch-icon.png <- tools/icon.html (180x180)

import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const site = join(root, 'site');
const src = (name) => pathToFileURL(join(root, 'tools', name)).href;

const candidates = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].filter(Boolean);
const chrome = candidates.find((p) => existsSync(p));
if (!chrome) {
  console.error('Chrome or Edge not found. Set CHROME_PATH to a Chromium-based browser.');
  process.exit(1);
}

function run(args) {
  execFileSync(chrome, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run', ...args], { stdio: 'inherit' });
}

run(['--window-size=1200,630', `--screenshot=${join(site, 'og.png')}`, src('og.html')]);
run(['--window-size=180,180', `--screenshot=${join(site, 'apple-touch-icon.png')}`, src('icon.html')]);

console.log('Rendered og.png and apple-touch-icon.png into site/.');
