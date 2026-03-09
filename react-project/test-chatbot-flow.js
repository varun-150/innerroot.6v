import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    page.on('console', msg => {
        console.log(`[BROWSER] ${msg.type().toUpperCase()}:`, msg.text());
    });

    try {
        await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
        console.log('[TEST] Page loaded.');

        // Wait and find the chat toggle button
        const chatbotsBtn = await page.$('button.w-14.h-14'); // the toggle button
        if (chatbotsBtn) {
            await chatbotsBtn.click();
            console.log('[TEST] Clicked chatbot toggle.');

            // Wait for input field
            await page.waitForSelector('input[placeholder="Ask anything about heritage or wellness..."]', { timeout: 10000 });
            console.log('[TEST] Chat window opened.');

            // Type message
            await page.type('input[placeholder="Ask anything about heritage or wellness..."]', 'Hello heritage companion!');
            await page.keyboard.press('Enter');
            console.log('[TEST] Sent message to websocket.');

            // Wait a few seconds for response
            await new Promise(r => setTimeout(r, 15000));

            // Get all messages
            const messages = await page.$$eval('.bg-secondary, .bg-accent', els => els.map(e => e.textContent));
            console.log('[TEST] Chat messages in UI:', messages);
        } else {
            console.log('[TEST] Could not find chatbot toggle button.');
        }

    } catch (err) {
        console.error('[TEST ERROR]', err);
    } finally {
        await browser.close();
    }
})();
