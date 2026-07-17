import { chromium } from 'playwright';
const b = await chromium.launch();
const dir='C:/Users/athul/AppData/Local/Temp/claude/c--Athul-WorkSpace-React-Radius-Core/12623712-ef91-49cb-93ae-2eb3983b1a62/scratchpad';
const p = await b.newPage({ viewport:{width:375,height:900} });
await p.goto('http://localhost:5194/careers',{waitUntil:'networkidle'});
await p.evaluate(()=>window.scrollTo(0, document.body.scrollHeight));
await p.waitForTimeout(500);
await p.screenshot({path:`${dir}/careers-footer-375.png`});
// open mobile menu
await p.evaluate(()=>window.scrollTo(0,0));
await p.locator('header button[aria-label="Open menu"]').click();
await p.waitForTimeout(400);
await p.screenshot({path:`${dir}/careers-menu-375.png`});
await b.close();
