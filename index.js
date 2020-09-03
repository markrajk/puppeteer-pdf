const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

app.use(express.static('public'));

// (async function () {
//   try {
//     const filePath = path.join(process.cwd(), 'templates', 'test.html');
//     const html = await fs.readFileSync(filePath, 'utf-8');
//     const browser = await puppeteer.launch({
//       args: ['--no-sandbox', '--disable-setuid-sandbox'],
//     });
//     const page = await browser.newPage();

//     await page.setContent(html);
//     await page.emulateMediaType('screen');
//     await page.pdf({
//       path: 'test.pdf',
//       format: 'A4',
//       printBackground: true,
//     });

//     console.log('done');
//     await browser.close();
//     process.exit();
//   } catch (e) {
//     console.log(e);
//   }
// })();

app.get('/', async function (req, res) {
  //const filePath = path.join(process.cwd(), 'templates', 'test.html');
  const filePath = path.join(process.cwd(), 'templates', 'test-charts.html');
  const html = await fs.readFileSync(filePath, 'utf-8');
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();

  //await page.setContent(html);
  await page.goto(`data:text/html,${html}`, { waitUntil: 'networkidle0' });
  await page.emulateMediaType('screen');

  await page.pdf({
    path: 'test-charts.pdf',
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: '<span style="display:none!important">Header 1</span>',
    footerTemplate: `
    <footer 
    style="margin:10px 60px 0!important;
    margin-top: 50pt!important;
    position: relative;
    width: 100%!important; 
    font-size: 7pt; 
    display: flex; 
    align-items: center; 
    justify-content: 
    space-between; 
    color: rgb(78, 78, 78);
    border-top: 1pt solid rgb(234, 234, 234)!important;
    ">
    <p><span style="font-weight: 700;">Peter Smith -</span> Javascript Developer</p>
    <p><span 
    style="font-weight: 700;
    position: absolute!important:
    top: 50%!important;
    left: 50%!important;
    transform: translate(-50%, -50%)!important;  
    ">Example Company</span></p>
    <p>15.8.2020</p>
   </footer>
    `,
    margin: {
      top: '60px',
      bottom: '60px',
      right: '60px',
      left: '60px',
    },
  });

  console.log('done');
  await browser.close();
  // process.exit();

  //res.send('HELLO');
  //res.sendFile(path.join(__dirname + '/templates/test.html'));
  res.sendFile(path.join(__dirname + '/templates/test-charts.html'));
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
