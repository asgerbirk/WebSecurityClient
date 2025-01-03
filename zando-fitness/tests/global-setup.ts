import { chromium } from '@playwright/test';
import next from 'next';
import { createServer } from 'http';
import { parse } from 'url';

let server;

const globalSetup = async () => {
    try {
        const app = next({ dev: true });
        await app.prepare();

        server = createServer((req, res) => {
            const parsedUrl = parse(req.url || '', true);
            app.getRequestHandler()(req, res, parsedUrl);
        });

        await new Promise<void>((resolve, reject) => {
            server.listen(3000, () => {
                console.log('Server is running on http://localhost:3000');
                resolve();
            }).on('error', (err) => {
                console.error('Failed to start server:', err);
                reject(err);
            });
        });

        const browser = await chromium.launch();
        const page = await browser.newPage();

        // Add timeout and wait for network idle
        await page.goto('http://localhost:3000/login', {
            waitUntil: 'networkidle',
            timeout: 30000
        });

        // Wait for elements to be visible before interacting
        await page.waitForSelector('#email');
        await page.waitForSelector('#password');

        await page.fill('#email', 'user06@test.com');
        await page.fill('#password', '12345678');
        await page.click('button[type="submit"]');

        await page.context().storageState({ path: 'tests/storageState.json' });
        await browser.close();
    } catch (error) {
        console.error('Setup failed:', error);
        throw error;
    }
};

export default globalSetup;