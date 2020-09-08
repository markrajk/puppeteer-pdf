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
async function generatePdfPage(fileName) {
  const filePath = path.join(process.cwd(), 'templates', `${fileName}.html`);
  const html = await fs.readFileSync(filePath, 'utf-8');
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();

  //await page.setContent(html);
  await page.goto(`data:text/html,${html}`, { waitUntil: 'networkidle0' });
  await page.emulateMediaType('screen');

  await page.pdf({
    path: `pdfs/${fileName}.pdf`,
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
}

app.get('/', async function (req, res) {
  res.sendFile(path.join(__dirname + '/templates/index.html'));
});

app.get('/cover-page', async function (req, res) {
  generatePdfPage('cover-page');
  res.sendFile(path.join(__dirname + '/templates/cover-page.html'));
});

app.get('/at-the-moment', async function (req, res) {
  generatePdfPage('at-the-moment');
  res.sendFile(path.join(__dirname + '/templates/at-the-moment.html'));
});

app.get('/development', async function (req, res) {
  generatePdfPage('development');
  res.sendFile(path.join(__dirname + '/templates/development.html'));
});

app.get('/team-members-performance-01', async function (req, res) {
  generatePdfPage('team-members-performance-01');
  res.sendFile(
    path.join(__dirname + '/templates/team-members-performance-01.html')
  );
});

app.get('/team-members-performance-02', async function (req, res) {
  generatePdfPage('team-members-performance-02');
  res.sendFile(
    path.join(__dirname + '/templates/team-members-performance-02.html')
  );
});

app.get('/self-evaluation', async function (req, res) {
  generatePdfPage('self-evaluation');
  res.sendFile(path.join(__dirname + '/templates/self-evaluation.html'));
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
