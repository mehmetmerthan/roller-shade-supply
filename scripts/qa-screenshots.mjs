#!/usr/bin/env node
/**
 * Visual QA helper (CLAUDE.md "Visual QA loop"). Uses the installed Chrome (or Edge).
 *
 *   node scripts/qa-screenshots.mjs --base http://localhost:4321 --pages /styleguide/ --out .screenshots/phase3/pass1
 *
 * Options:
 *   --widths 375,768,1280,1440   viewport widths (full-page screenshots)
 *   --keyboard                   tab through the page at 1280 px and report focus visibility
 *   --reduced-motion             emulate prefers-reduced-motion: reduce
 *   --channel chrome|msedge      browser channel (default chrome)
 * Prints console errors/warnings, page errors, and failed requests (≥ 400).
 */
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const args = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : fallback;
};
const flag = (name) => args.includes(`--${name}`);

const base = opt('base', 'http://localhost:4321');
const pages = opt('pages', '/').split(',');
const widths = opt('widths', '375,768,1280,1440').split(',').map(Number);
const out = opt('out', '.screenshots');
const channel = opt('channel', 'chrome');
const reducedMotion = flag('reduced-motion') ? 'reduce' : 'no-preference';

const slug = (p) => (p.replace(/^\/|\/$/g, '').replace(/\//g, '-') || 'home');

const withTimeout = (promise, ms) => Promise.race([promise, new Promise((r) => setTimeout(r, ms))]);

async function settle(page) {
  // Trigger lazy images: scroll to the bottom in steps, then back to the top.
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 80));
    }
  });
  await withTimeout(page.waitForLoadState('networkidle').catch(() => {}), 8000);
  await withTimeout(
    page.evaluate(() =>
      Promise.all(
        [...document.images].map((img) =>
          img.complete ? null : new Promise((r) => img.addEventListener('load', r, { once: true }) || img.addEventListener('error', r, { once: true })),
        ),
      ),
    ),
    8000,
  );
  await page.evaluate(() => window.scrollTo(0, 0));
  await withTimeout(page.evaluate(() => document.fonts.ready), 3000);
}

const browser = await chromium.launch({ channel });
await mkdir(out, { recursive: true });
let problems = 0;

for (const p of pages) {
  for (const width of widths) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion, colorScheme: 'light' });
    const page = await context.newPage();
    const issues = [];
    page.on('console', (m) => ['error', 'warning'].includes(m.type()) && issues.push(`console.${m.type()}: ${m.text()}`));
    page.on('pageerror', (e) => issues.push(`pageerror: ${e.message}`));
    page.on('response', (r) => r.status() >= 400 && issues.push(`HTTP ${r.status()}: ${r.url()}`));
    await page.goto(new URL(p, base).href, { waitUntil: 'load', timeout: 30000 });
    await settle(page);
    // Chrome can't capture beyond ~16k px in one image (it wraps), so tall pages are split.
    const MAX = 12000;
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    let file = path.join(out, `${slug(p)}-${width}.png`);
    if (height <= MAX) {
      await page.screenshot({ path: file, fullPage: true });
    } else {
      for (let y = 0, part = 1; y < height; y += MAX, part += 1) {
        file = path.join(out, `${slug(p)}-${width}-part${part}.png`);
        await page.screenshot({ path: file, fullPage: true, clip: { x: 0, y, width, height: Math.min(MAX, height - y) } });
      }
      file = path.join(out, `${slug(p)}-${width}-part*.png (${height}px)`);
    }
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    if (overflow > 0) issues.push(`horizontal overflow: ${overflow}px`);
    console.log(`${file}${issues.length ? '' : '  ✓ no console errors'}`);
    for (const i of issues) console.log(`   ⚠ ${i}`);
    problems += issues.length;

    if (flag('keyboard') && width === 1280) {
      const seen = [];
      for (let i = 0; i < 80; i += 1) {
        await page.keyboard.press('Tab');
        const info = await page.evaluate(() => {
          const el = document.activeElement;
          if (!el || el === document.body) return null;
          const cs = getComputedStyle(el);
          // Cards and video frames draw the ring on a wrapper (stretched links, native controls).
          const wrapper = el.closest('.card, .video-frame');
          const cardOutline = wrapper ? getComputedStyle(wrapper).outlineStyle : 'none';
          const r = el.getBoundingClientRect();
          return {
            tag: el.tagName.toLowerCase(),
            text: (el.getAttribute('aria-label') || el.textContent || el.getAttribute('name') || '').trim().replace(/\s+/g, ' ').slice(0, 40),
            visible: cs.outlineStyle !== 'none' || cardOutline !== 'none' || cs.boxShadow !== 'none',
            size: `${Math.round(r.width)}×${Math.round(r.height)}`,
          };
        });
        if (!info) break;
        seen.push(info);
      }
      const invisible = seen.filter((s) => !s.visible);
      console.log(`   keyboard: ${seen.length} stops, ${invisible.length} without a visible focus indicator`);
      for (const s of invisible) console.log(`     ✖ ${s.tag} "${s.text}" ${s.size}`);
      const small = seen.filter((s) => {
        const [w, h] = s.size.split('×').map(Number);
        return w < 24 || h < 24;
      });
      for (const s of small) console.log(`     ⚠ target under 24 px: ${s.tag} "${s.text}" ${s.size}`);
    }
    await context.close();
  }
}

await browser.close();
process.exitCode = problems > 0 ? 1 : 0;
