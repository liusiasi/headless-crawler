const puppeteer = require('puppeteer');
const { mn } = require('../config/defualt');
const srcToImg = require('../helper/srcToImg');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: 'C:\\Users\\lenovo\\AppData\\Local\\Chromium\\Application\\chrome.exe',   //指定chromium浏览器位置;
  });
  const page = await browser.newPage();

  await page.setViewport({
    width: 1920,
    height: 2000,
    deviceScaleFactor: 1,
  });
  console.log('reset viewPort');

  await page.goto('http://image.baidu.com/');
  console.log("go to https://image.baidu.com/");


  await page.focus('#kw');

  await page.keyboard.sendCharacter("狗");
  await page.evaluate(()=> {
    document.querySelector('.s_btn').click()
  });

  console.log('go to search list');
  page.on('load', async ()=>{
    console.log('page loading done, start fetch...');
    const srcs = await page.evaluate(()=>{
      const image = document.querySelectorAll('img.main_img');
      return Array.prototype.map.call(image, img => img.src)
    });
    console.log(mn);
    srcs.forEach( async (src) => {
      await page.waitFor(1000);
      await srcToImg(src, mn);
    });
    // await browser.close();
  })
})()