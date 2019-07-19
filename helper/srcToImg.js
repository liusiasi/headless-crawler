const fs = require('fs');
const { promisify } = require('util');
const http = require('http');
const https = require('https');
const path = require('path');
const writeFile = promisify(fs.writeFile);
module.exports = async ( src , dir) => {
  if(/\.(jpg|png|git)$/.test(src)){
    await urlToImg(src, dir);
  }
  else{
    await base64ToImg(src, dir);
  }
}
// url -> img
const urlToImg = promisify((url, dir, callback) => {
  const mod = /^https:/.test(url) ? https : http;
  const ext = path.extname(url);
  const file = path.join(dir,`${Date.now()}${ext}`);

  mod.get(url, res => {
    res.pipe(fs.createWriteStream(file))
      .on('finish', ()=>{
        callback();
        console.log(file);
      })
  })
})

//base64 -> img
const base64ToImg =async function (base64Str, dir) {
  //data:image/jpeg:base64,/sssss
  const matches = base64Str.match(/^data:(.+?);base64,(.+)/);
  try {
    const ext = matches[1].split('/')[1]
      .replace('jpeg', 'jpg');
    const file = path.join(dir, `${Date.now()}.${ext}`);
    await writeFile(file, matches[2], 'base64');
    console.log(file);
      
  } catch (error) {
    console.log(error);
    console.log('非法 base64字符串')
  }
}