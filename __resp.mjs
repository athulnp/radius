import { chromium } from 'playwright';
const b = await chromium.launch();
const widths = [320, 375, 414, 640, 768, 1024, 1280, 1440, 1920];
const routes = ['/', '/careers'];
for (const route of routes) {
  for (const w of widths) {
    const p = await b.newPage({ viewport: { width: w, height: 800 } });
    await p.goto('http://localhost:5194' + route, { waitUntil: 'networkidle' });
    await p.waitForTimeout(300);
    // horizontal overflow?
    const info = await p.evaluate(() => {
      const de = document.documentElement;
      const overflow = de.scrollWidth - de.clientWidth;
      // find elements wider than viewport
      const bad = [];
      const vw = window.innerWidth;
      document.querySelectorAll('*').forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.width > vw + 1 && r.right > vw + 1) {
          bad.push({ tag: el.tagName, cls: (el.className||'').toString().slice(0,60), right: Math.round(r.right), w: Math.round(r.width) });
        }
      });
      return { overflow, badCount: bad.length, bad: bad.slice(0,4) };
    });
    const flag = info.overflow > 1 ? 'OVERFLOW' : 'ok';
    console.log(`${route.padEnd(9)} ${String(w).padStart(4)}px  scrollX=${info.overflow}  ${flag}` + (info.bad.length ? '  '+JSON.stringify(info.bad) : ''));
    await p.close();
  }
}
await b.close();
