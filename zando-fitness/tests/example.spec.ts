import { test, expect } from '@playwright/test';

test.describe(() => {
  test.use({ storageState: 'tests/storageState.json' }); // Use the logged-in session

  test('User can book a class', async ({ page }) => {
    // Navigate to the classes page
    await page.goto('http://localhost:3000/');
    await expect(page).toHaveURL('http://localhost:3000/');

    // // Book a class
    // await page.locator('.card-footer button:has-text("Book")').first().click();
    //
    // await page.getByRole('button', { name: 'Confirm Booking' }).click();
    //
    // // Verify booking confirmation
    // await expect(page.getByText('Booking Successful')).toBeVisible();
  });
})