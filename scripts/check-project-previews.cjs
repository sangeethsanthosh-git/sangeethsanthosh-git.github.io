/* Meaningful integration checks against a production static export.
 * Usage: node scripts/check-project-previews.cjs PLAYWRIGHT_MODULE [BASE_URL]
 */
const { chromium } = require(process.argv[2]);
const fs = require('fs');
const path = require('path');
const base = process.argv[3] || 'http://localhost:3001';
const assert = (condition, message) => { if (!condition) throw new Error(message); };
let browser;

(async () => {
  browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const errors = [], failedAssets = [], requests = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('request', r => requests.push(r.url()));
  page.on('response', r => { if (r.status() >= 400 && r.url().includes('/demos/')) failedAssets.push(r.url()); });
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await page.goto(base + '/#project');
  await page.locator('.phone-realistic-chassis').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  assert(!requests.some(url => url.includes('/demos/')), 'A project preview downloaded before an app was opened');
  const initialDemoRequests = 0;
  const apps = [
    ['Rewind', 'rewind', false], ['Chronicle', 'chronicle', false], ['AURA AI', 'aura', false], ['Dayform', 'dayform', false],
    ['Vault', 'vault', false], ['Kerala', 'kerala', false], ['Traffic', 'traffic', false], ['EduSense', 'edusense', false],
    ['Budget', 'budget', true], ['PCOD ML', 'pcod', true], ['Cartoon', 'cartoon', true], ['Gistify', 'gistify', true],
  ];
  for (const [label, folder, second] of apps) {
    if (second) await page.getByRole('button', { name: 'Next app page' }).click();
    const start = requests.length;
    await page.getByRole('button', { name: 'Open ' + label, exact: true }).first().click();
    const frame = page.frameLocator('iframe');
    await frame.locator('body').waitFor();
    await page.frames().find(f => f.url().includes('/demos/' + folder + '/')).waitForLoadState('load');
    assert(await page.locator('iframe').count() === 1, 'More than one app is mounted');
    const otherApp = requests.slice(start).find(url => /\/demos\/(rewind|chronicle|aura|dayform|vault|traffic|budget|edusense|pcod|cartoon|gistify|kerala)\//.test(url) && !url.includes('/demos/' + folder + '/'));
    assert(!otherApp, 'An unopened app was downloaded: ' + otherApp);
    if (folder === 'rewind') {
      await frame.locator('.native-hotspot[href="./walkman.html"]').first().click();
      await frame.locator('.native-hotspot[aria-label="PLAY"]').first().click();
      await frame.locator('img[src="./playing.webp"]').waitFor();
    } else if (folder === 'chronicle') {
      await frame.locator('.native-hotspot[href="./compose.html"]').first().click();
      await frame.getByRole('textbox', { name: 'Entry Title...' }).waitFor();
      await page.frames().find(f => f.url().endsWith('/chronicle/compose.html')).waitForLoadState('load');
      await frame.getByRole('textbox', { name: 'Entry Title...' }).fill('A demo memory');
      await frame.locator('.native-hotspot[aria-label="Save"]').click();
      await frame.getByRole('status').waitFor();
    } else if (folder === 'dayform') {
      await frame.locator('.native-hotspot[href="./calendar.html"]').first().click();
      await frame.locator('img[src="./calendar.webp"]').waitFor();
    } else if (folder === 'aura') {
      await frame.getByRole('navigation', { name: 'Suite Modules' }).getByRole('button', { name: 'Dashboard', exact: false }).click();
      await frame.getByRole('heading', { name: 'AURA Dashboard' }).waitFor();
    } else if (folder === 'gistify') {
      await frame.getByRole('button', { name: 'Run', exact: true }).click();
      await frame.locator('#result-area').waitFor();
    } else if (folder === 'cartoon') {
      await frame.locator('#uploadfile').click();
      await frame.getByRole('heading', { name: 'Cartoonized Image' }).waitFor();
    } else if (folder === 'edusense') {
      await frame.locator('#createSessionBtn').click();
      await frame.getByText('Sample lecture', { exact: true }).first().waitFor();
    } else if (folder === 'pcod') {
      await frame.getByRole('link', { name: /Start Prediction/ }).first().click();
      await frame.locator('#predictionForm').waitFor();
      await page.frames().find(f => f.url().endsWith('/pcod/predict.html')).waitForLoadState('load');
      await frame.locator('#nextStepBtn').click();
      await frame.locator('#nextStepBtn').click();
      await frame.locator('#submitPredictionBtn').click();
      await frame.getByRole('status').waitFor();
    }
    await page.locator('.ios-back').click();
    assert(await page.locator('iframe').count() === 0, 'Closed app iframe was retained');
    console.log(folder + ': opens, demo navigation works, unmounts');
  }
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 1 });
  let pageChecks = 0;
  for (const width of [320, 390, 1280]) {
    await page.setViewportSize({ width, height: 700 });
    for (const [, folder] of apps) {
      for (const file of fs.readdirSync(path.join('public/demos', folder)).filter(x => x.endsWith('.html'))) {
        await page.goto(`${base}/demos/${folder}/${file}`);
        assert(!await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), `Overflow: ${folder}/${file} at ${width}px`);
        pageChecks++;
      }
    }
  }
  assert(!errors.length, 'Browser errors: ' + [...new Set(errors)].join('; '));
  assert(!failedAssets.length, 'Missing assets: ' + [...new Set(failedAssets)].join('; '));
  console.log(JSON.stringify({ initialDemoRequests, apps: apps.length, pageChecks, browserErrors: 0, failedPreviewAssets: 0, cpuThrottleDuringAppChecks: 4 }));
  await browser.close();
})().catch(async error => { console.error(error); await browser?.close(); process.exitCode = 1; });
