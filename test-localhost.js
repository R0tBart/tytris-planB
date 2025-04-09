const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true, // Setze auf false für sichtbaren Browser
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  try {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

    // Screenshot machen
    await page.screenshot({ path: 'localhost-test.png' });

    // Titel auslesen und ausgeben
    const title = await page.title();
    console.log('Seitentitel:', title);

    // Beispiel: Textinhalt eines Elements
    const headline = await page.$eval('h1', el => el.textContent);
    console.log('Headline:', headline);
  } catch (err) {
    console.error('Fehler beim Test:', err);
  } finally {
    await browser.close();
  }
})();
