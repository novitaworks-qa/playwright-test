import { test, expect, Page, Response } from '@playwright/test';

test ('check homepage has title higo', async ({ page }: { page: Page }) => {
    await page.goto('https://higo.id/');
    await expect(page).toHaveTitle(/HIGO/);
});

test('check broken links on homepage', async ({ page }: { page: Page }) => {
    await page.goto('https://higo.id/');
    const links = await page.$$eval('a', (links) => links.map((link) => link.href));
    const maxLinksToTest = 20; 
    for (let i = 0; i < Math.min(maxLinksToTest, links.length); i++) {
        const link = links[i];
        const response: Response | null = await page.goto(link);
        if (response?.status() !== 200) {
        console.log(`Broken link found: ${link} with status ${response?.status()}`);
        }
    }
});

test('check if about-us page redirects to LinkedIn', async ({ page }: { page: Page }) => {
    await page.goto('https://higo.id/about-us');
    const linkedInLink = await page.locator('a:has-text("Jadi bagian dari HIGO")');
    await expect(linkedInLink).toBeVisible();
    page.on('popup', async (popupPage) => {
        await popupPage.waitForLoadState();
        const newUrl = popupPage.url();
        console.log(`Redirected to: ${newUrl}`);
        expect(newUrl).toBe('https://www.linkedin.com/company/pt-higo-fitur-indonesia/');
    });
    await linkedInLink.click();
});

test('check if contact-us link is broken on wifi-advertising page', async ({ page }: { page: Page }) => {
    await page.goto('https://higo.id/wifi-advertising/');
    const contactUsLink = await page.locator('a[href="/contact-us?q=wifi-advertising"]');
    await expect(contactUsLink).toBeVisible();
    const href = await contactUsLink.getAttribute('href');
    console.log(`Link found: ${href}`);
    const response: Response | null = await page.goto(`https://higo.id${href}`);
    if (response?.status() === 200) {
        console.log('The link is working fine.');
    } else {
        console.log(`Broken link found: ${href} with status ${response?.status()}`);
    }
});

test('check if contact-us link is broken on higospot page', async ({ page }: { page: Page }) => {
    await page.goto('https://higo.id/higospot/');
    const contactUsLink = await page.locator('a[href="/contact-us?q=higospot"]');
    await expect(contactUsLink).toBeVisible();
    const href = await contactUsLink.getAttribute('href');
    console.log(`Link found: ${href}`);
    const response: Response | null = await page.goto(`https://higo.id${href}`);
    if (response?.status() === 200) {
        console.log('The link is working fine.');
    } else {
        console.log(`Broken link found: ${href} with status ${response?.status()}`);
    }
});

test('check if contact-us link is broken on integrated digital agency page', async ({ page }: { page: Page }) => {
    await page.goto('https://higo.id/integrated-digital-agency/');
    const contactUsLink = await page.locator('a[href="/contact-us?q=integrated-digital-agency"]');
    await expect(contactUsLink).toBeVisible();
    const href = await contactUsLink.getAttribute('href');
    console.log(`Link found: ${href}`);
    const response: Response | null = await page.goto(`https://higo.id${href}`);
    if (response?.status() === 200) {
        console.log('The link is working fine.');
    } else {
        console.log(`Broken link found: ${href} with status ${response?.status()}`);
    }
});

test('check broken links on case study page', async ({ page }: { page: Page }) => {
    await page.goto('https://higo.id/case-study/');
    const links = await page.$$eval('a', (links) => links.map((link) => link.href));
    const maxLinksToTest = 10; 
    for (let i = 0; i < Math.min(maxLinksToTest, links.length); i++) {
        const link = links[i];
        const response: Response | null = await page.goto(link);
        if (response?.status() !== 200) {
        console.log(`Broken link found: ${link} with status ${response?.status()}`);
        }
    }
});

test('check broken links on blog.higo.id', async ({ page }: { page: Page }) => {
    await page.goto('https://blog.higo.id/');

    // check the header
    const headerLinks = await page.$$eval('header a', (links) => links.map((link) => link.href));
    console.log('Header links:', headerLinks);
    for (const link of headerLinks) {
        const response: Response | null = await page.goto(link);
        if (response?.status() !== 200) {
            console.log(`Broken link in header: ${link} with status ${response?.status()}`);
        }
    }

    // check the main contents
    const contentLinks = await page.$$eval('main a', (links) => links.map((link) => link.href));
    console.log('Content links:', contentLinks);
    for (const link of contentLinks) {
        const response: Response | null = await page.goto(link);
        if (response?.status() !== 200) {
            console.log(`Broken link in content: ${link} with status ${response?.status()}`);
        }
    }

    // check the footer
    const footerLinks = await page.$$eval('footer a', (links) => links.map((link) => link.href));
    console.log('Footer links:', footerLinks);
    for (const link of footerLinks) {
    if (link.startsWith('mailto:') || link.startsWith('tel:')) {
        console.log(`Skipping non-HTTP link: ${link}`);
        continue;
    }
    try {
        const response: Response | null = await page.goto(link);
        if (response?.status() !== 200) {
            console.log(`Broken link found: ${link} with status ${response?.status()}`);
        }

        // check link karir
        if (link.includes('higo.id/career')) {
            const finalUrl = page.url();
            if (finalUrl.includes('linkedin.com')) {
                console.log('Error: The Career link redirected to LinkedIn:', finalUrl);
            } else {
                console.log('The Career link is valid and points to:', finalUrl);
            }
        }
    } catch (error) {
        console.log(`Error visiting link ${link}: ${error.message}`);
    }
}

});

test('check broken links on digital reports page', async ({ page }: { page: Page }) => {
    await page.goto('https://higo.id/annualreport2024/');
    const links = await page.$$eval('a', (links) => links.map((link) => link.href));
    const maxLinksToTest = 10; 
    for (let i = 0; i < Math.min(maxLinksToTest, links.length); i++) {
        const link = links[i];
        const response: Response | null = await page.goto(link);
        if (response?.status() !== 200) {
        console.log(`Broken link found: ${link} with status ${response?.status()}`);
        }
    }
});

