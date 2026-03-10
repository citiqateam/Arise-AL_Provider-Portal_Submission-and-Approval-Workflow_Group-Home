import {test, expect, BrowserContext} from '@playwright/test';
import path from 'path';
import fs from 'fs';
let webContext: BrowserContext;
const dataset = JSON.parse(JSON.stringify(require ("../Resources/Test Data/LoginDetails.json")));

for (const data of dataset)
{
test (`Register the New Provider Profile Account ${data.providerName}`, async ({page}) => {
    await page.goto(data.URL);
    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: 'Register', exact: true }).click(); 
    await page.waitForLoadState('networkidle');
    await page.fill('#Email', data.username);
    await page.fill('#Password', data.password);
    await page.fill('#ConfirmPassword', data.password);
    await page.getByRole('button', { name: 'Next' }).click();
    await page.waitForLoadState('networkidle');

    await page.locator('#providerTypeId_2').check();
    await page.getByRole('button', { name: 'Next' }).click();
    await page.waitForLoadState('networkidle'); 

    await page.fill('#FirstName', data.FirstName);
    await page.fill('#LastName', data.LastName);
    await page.waitForTimeout(1000); 
    await page.getByLabel('Date of Birth').type(data.DateOfBirth, {delay:100} );
    const genderDropdown = page.getByRole('combobox', { name: 'Gender' });
     await genderDropdown.click();
     await page.keyboard.type(data.Gender);
     await page.keyboard.press('Enter');
    
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.waitForLoadState('networkidle');
});


test (`Accept the New Provider Profile Account from third party app ${data.providerName}`, async ({page}) => {
        await page.goto('https://www.sharklasers.com/inbox');
await page.waitForLoadState('networkidle');
// 1. Enter edit mode
  await page.getByTitle('Click to Edit').click();

  // 2. Wait for the input rendered inside the span
  const inboxInput = page.locator('#inbox-id input');
  await expect(inboxInput).toBeVisible();

  // 3. Fill value
  //await inboxInput.fill(InputDetails.EmailID.split('@')[0]); // Extract username from email
  await inboxInput.fill(data.EmailIDforThirdParty);

  // 4. Click on Set button
  await page.getByRole('button', {name: 'Set'}).click();

await page.waitForTimeout(10000); // Wait for 10 seconds to ensure inbox is ready

const verificationMail = page.locator(
  'tr.mail_row:has(td:text("My Child Care Provider Access Account is"))'
);
//await expect(verificationMail).toBeVisible({ timeout: 30000 });

    // 3️⃣ Open the email
    await verificationMail.click();

    // Click activation link directly from email body
const activationLink = page.getByRole('link', {
  name: 'Click here',
  exact: true,
});

await expect(activationLink).toBeVisible({ timeout: 20000 });

const [loginPage] = await Promise.all([
  page.context().waitForEvent('page'),
  activationLink.click()
]);

await loginPage.waitForLoadState('domcontentloaded');

await expect(loginPage.getByText('Provider Portal Login')).toBeVisible();

console.log('✅ Activation link clicked successfully');


});

}