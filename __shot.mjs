import { chromium } from 'playwright';
const b = await chromium.launch();
const dir = 'C:/Users/athul/AppData/Local/Temp/claude/c--Athul-WorkSpace-React-Radius-Core/12623712-ef91-49cb-93ae-2eb3983b1a62/scratchpad';
async function shot(route, w, name) {
  const p = await b.newPage({ viewport: { width: w, height: 900 } });
  await p.goto('http://localhost:5194'+route, { waitUntil:'networkidle' });
  await p.waitForTimeout(400);
  await p.screenshot({ path: `${dir}/${name}.png`, fullPage: false });
  // Also check: is desktop nav visible or hidden at this width?
  const navVisible = await p.locator('header nav.hidden').first().isVisible().catch(()=>null);
  const hamburgerVisible = await p.locator('header button[aria-label="Open menu"]').first().isVisible().catch(()=>null);
  console.log(`${name}: hamburgerVisible=${hamburgerVisible}`);
  await p.close();
}
await shot('/careers', 375, 'careers-375');
await shot('/careers', 768, 'careers-768');
await shot('/', 375, 'home-375');
await b.close();
