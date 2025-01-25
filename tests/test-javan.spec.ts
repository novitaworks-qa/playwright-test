import { test, expect, Page, Response } from '@playwright/test';

test('has title', async ({ page }: { page: Page }) => {
  await page.goto('https://javan.co.id//');
  await expect(page).toHaveTitle(/Javan/);
});

test('check broken links', async ({ page }: { page: Page }) => {
  await page.goto('https://javan.co.id'); 
  
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

test('invalid email does not trigger specific error', async ({ page }: { page: Page }) => {
    await page.goto('https://javan.co.id/contact');

    await page.fill('input[name="name"]', 'Test User'); 
    await page.fill('input[name="email"]', 'invalid-email'); 
    await page.fill('textarea[name="message"]', 'Test message'); 
    await page.click('button[type="submit"]'); 
    await page.waitForTimeout(2000);
    await page.waitForSelector('.swal2-container', { timeout: 60000 }); 
    const errorText = await page.textContent('.swal2-html-container'); 
    if (errorText && !errorText.includes('email')) {
      console.log('Error popup does not mention invalid email!');
    } else {
      console.log('Error popup mentioned invalid email.');
    }

    expect(errorText).not.toContain('email');
});
