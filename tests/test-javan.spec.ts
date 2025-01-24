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

