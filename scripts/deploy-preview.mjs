#!/usr/bin/env node
/**
 * Build and deploy the shareable preview to Netlify in one step:
 *
 *   npm run deploy:preview
 *
 * 1. Finds the preview site: NETLIFY_SITE_ID, else the folder link in
 *    .netlify/state.json (written by `netlify sites:create` / `netlify link`).
 * 2. Asks Netlify for the site's URL (or uses SITE_URL if set), so canonical and
 *    Open Graph URLs point at the preview, not the placeholder domain.
 * 3. Runs `npm run build` with SITE_URL set, then
 *    `netlify deploy --no-build --dir=dist --prod --site=<id>` (dist/ is already built
 *    with the preview URL; without --no-build the CLI would rebuild without SITE_URL).
 *
 * The preview stays noindex with robots.txt "Disallow: /" because
 * `features.launched` is false (src/config/site.ts). Needs `npx netlify login` once.
 */
import { execFileSync, spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const netlifyBin = path.join(root, 'node_modules', 'netlify-cli', 'bin', 'run.js');
const fail = (message) => {
  console.error(`deploy:preview: ${message}`);
  process.exit(1);
};

if (!existsSync(netlifyBin)) fail('netlify-cli is missing. Run `npm install`.');

// 1. Site ID
const statePath = path.join(root, '.netlify', 'state.json');
const siteId =
  process.env.NETLIFY_SITE_ID ||
  (existsSync(statePath) ? JSON.parse(readFileSync(statePath, 'utf8')).siteId : undefined);
if (!siteId) fail('No Netlify site. Set NETLIFY_SITE_ID, or run `npx netlify link` in this folder.');

// 2. Site URL
let siteUrl = process.env.SITE_URL;
if (!siteUrl) {
  try {
    const json = execFileSync(process.execPath, [netlifyBin, 'api', 'getSite', '--data', JSON.stringify({ site_id: siteId })], {
      cwd: root,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'inherit'],
    });
    siteUrl = JSON.parse(json).ssl_url;
  } catch {
    fail('Could not read the site from Netlify. Run `npx netlify login`, or set SITE_URL.');
  }
}
console.log(`deploy:preview: site ${siteId} → ${siteUrl}`);

const run = (label, command, args, options = {}) => {
  const result = spawnSync(command, args, { cwd: root, stdio: 'inherit', ...options });
  if (result.status !== 0) fail(`${label} failed.`);
};

// 3. Build with the preview URL, then deploy dist/. Under `npm run`, npm_execpath
// points at npm itself; otherwise go through the shell (Windows needs it for npm.cmd).
const buildEnv = { ...process.env, SITE_URL: siteUrl };
const npmCli = process.env.npm_execpath;
if (npmCli) run('npm run build', process.execPath, [npmCli, 'run', 'build'], { env: buildEnv });
else run('npm run build', 'npm run build', [], { env: buildEnv, shell: true });

let message = 'Preview';
try {
  message += ` ${execFileSync('git', ['rev-parse', '--short', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim()}`;
} catch {
  // Not a git checkout: keep the plain message.
}
run('netlify deploy', process.execPath, [netlifyBin, 'deploy', '--no-build', '--dir=dist', '--prod', `--site=${siteId}`, `--message=${message}`]);

console.log(`\ndeploy:preview: live at ${siteUrl}`);
