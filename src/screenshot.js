const puppeteer = require('puppeteer');
const { screenshot } =require('../config/defualt');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Users\\lenovo\\AppData\\Local\\Chromium\\Application\\chrome.exe',   //指定chromium浏览器位置;
  });
  const page = await browser.newPage();
  await page.goto('https://www.baidu.com');
  console.log(`${screenshot}/${Date.now()}.png`);
  await page.screenshot({
    path: `${screenshot}/${Date.now()}.png`
  });

  await browser.close();
})();