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
  const filePath = path.join(process.cwd(), 'templates', 'development.html');
  const html = await fs.readFileSync(filePath, 'utf-8');
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();

  //await page.setContent(html);
  await page.goto(`data:text/html,${html}`, { waitUntil: 'networkidle0' });
  await page.emulateMediaType('screen');

  await page.pdf({
    path: 'development.pdf',
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: '<span style="display:none!important"></span>',
    footerTemplate: `
    <footer 
    style="margin:0 60px 0!important;
    margin-bottom: 30px!important;
    width: 100%!important; 
    font-size: 8px;
    font-weight: 600;
    letter-spacing: -0.12px;
    display: flex;
    align-items: center;
    justify-content:
    space-between;
    color: #000;
    ">
    <p>Team Report - Team React Native</p>
    <p>Page 1/5</p>
   </footer>
    `,
    margin: {
      top: '0',
      bottom: '83px',
      right: '0',
      left: '0',
    },
  });

  console.log('done');
  await browser.close();
  // process.exit();

  //res.send('HELLO');
  //res.sendFile(path.join(__dirname + '/templates/test.html'));
  res.sendFile(path.join(__dirname + '/templates/development.html'));
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
