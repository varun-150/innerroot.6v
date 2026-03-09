import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    page.on('console', msg => {
        console.log(`[BROWSER CONSOLE] ${msg.type().toUpperCase()}:`, msg.text());
    });

    page.on('pageerror', error => {
        console.error(`[BROWSER ERROR]`, error.message);
    });

    page.on('requestfailed', request => {
        console.error(`[NETWORK FAILED] ${request.url()} - ${request.failure()?.errorText || 'Unknown error'}`);
    });

    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 2000));
    await browser.close();
})();
