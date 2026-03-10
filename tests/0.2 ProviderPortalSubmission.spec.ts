import {test, expect, BrowserContext} from '@playwright/test';
import path from 'path';
import fs from 'fs';
let webContext: BrowserContext;
const dataset = JSON.parse(JSON.stringify(require ("../Resources/Test Data/LoginDetails.json")));

for (const data of dataset) {

  test.describe(`Provider Portal Submission - ${data.username}`, () => {

    test.beforeEach(async ({ page }) => {
      console.log(`Logging in with username: ${data.username}`);

      await page.goto('https://al-arise-qa-publicaccess.citigovcloud.com/Account/Login?ReturnUrl=%2F');

      await page.fill('#username', data.username);
      await page.fill('#password', data.password);
      await page.getByRole('button', { name: 'Login' }).click();

      await page.waitForLoadState('networkidle');
    });

    test(`Update Provider Details page - ${data.username}`, async ({ page }) => {
      await page.getByRole('button', { name: 'Provider', exact: true }).click();
      await page.getByRole('link', { name: 'Profile' }).click();
      await page.waitForLoadState('networkidle');
      await page.locator('label:has-text("Legal Entity Type")').locator('..').locator('.k-dropdownlist').click();
      await page.waitForTimeout(2000);
      await page.locator('#LegalEntityTypeID-list').locator('text=Corporation').click(); 
      await page.locator('#TaxID').type('123-12-8569', { delay: 100 });

    await page.getByRole('textbox', { name: 'Street 1' }).fill('Park Avenue, St Poll Road');
    await page.getByRole('textbox', { name: 'Street 2' }).fill('Near Cross Road');
        await page.waitForTimeout(1000);
    await page.getByRole('textbox', { name: 'City' }).fill('Adona');
    await page.waitForTimeout(1000);
    await page.getByRole('textbox', { name: 'Zip Code' }).isVisible();
    await page.getByRole('textbox', { name: 'Zip Code' }).type('72001-1234', { delay: 100 });
    await page.waitForTimeout(2000);

    const stateDropdown = page.locator('#MainAddress_State_label')
    .locator('..')
    .locator('.k-dropdownlist');
     await stateDropdown.click();
     await page.waitForTimeout(2000);
     await page.locator('#MainAddress_State-list').isVisible();
     await page.locator('#MainAddress_State-list').locator('.k-list-item', { hasText: 'AL' }).isVisible();
     await page.waitForTimeout(1000);
     await page.locator('#MainAddress_State-list').locator('.k-list-item', { hasText: 'AL' }).click();


    await page.locator('#MainAddress_fgCityStateZip').getByText('-- County --').click();
    await page.waitForTimeout(2000);
    await page.locator('#MainAddress_CountyNameID-list').isVisible();
    await page.waitForTimeout(1000);    
    await page.getByRole('searchbox').type('Perry', { delay: 100 });
    await page.waitForTimeout(2000);
    await page.locator('#MainAddress_CountyNameID-list').locator('text=Perry').click();

    await page.locator('#ProviderPhoneNumber_PhoneNumberTypeId_label').click();
    await page.waitForTimeout(2000);
    await page.getByRole('option', { name: 'Cell Phone' }).isVisible();
    await page.getByRole('option', { name: 'Cell Phone' }).click();
    await page.getByRole('textbox', { name: 'Primary Phone Number' }).isVisible();
    await page.getByRole('textbox', { name: 'Primary Phone Number' }).type('(141) 125-6369', { delay: 100 });
    
await page.getByRole('button', { name: 'Save' }).isVisible();
await page.getByRole('button', { name: 'Save' }).click();
    });

    test(`Update Point of Contact Details - ${data.username}`, async ({ page }) => {
      await page.getByRole('button', { name: 'Provider', exact: true }).click();
      await page.getByRole('link', { name: 'Profile' }).click();
      await page.waitForLoadState('networkidle');
      await page.getByRole('link', { name: 'Point of Contact Details' }).click(); 
      
      await page.getByRole('link', { name: 'Add POC Detail' }).click();
      await page.waitForLoadState('networkidle');

      await page.getByRole('combobox', { name: 'Contact Type' }).click();
      await page.waitForTimeout(2000);
      await page.locator('#ContactTypeID_listbox').click();
      await page.waitForTimeout(1000);
      //await page.getByRole('option', { name: 'Licensee' }).click(); 

      await page.locator('#IsFacilityStaff').check(); 
      await page.waitForTimeout(1000);

      await page.getByLabel('First Name').fill('Samuel');
      await page.getByLabel('Last Name').fill('Jackson');
      await page.getByLabel('Email').fill('sjackson@abc.com');
      await page.getByLabel('Date of Birth').type('01/01/1980', { delay: 100 });

      await page.getByRole('button', { name: 'Save' }).click();
      
  });


test(`Update Background check - ${data.username}`, async ({ page }) => {
      await page.getByRole('button', { name: 'Provider', exact: true }).click();
      await page.getByRole('link', { name: 'Profile' }).click();
      await page.waitForLoadState('networkidle');
      await page.getByRole('link', { name: 'Background Check' }).click(); 
      await page.locator('tbody tr').nth(0).locator('td:first-child a').click();
      await page.waitForLoadState('networkidle');
      
      await page.getByRole('link', { name: 'Add Criminal Background Check' }).click();
        await page.waitForTimeout(2000);

await page.locator('#Documents').setInputFiles('CBC_Doc.docx');
await page.waitForTimeout(2000);

const issuedDate = page.locator('#IssuedDate');
await expect(issuedDate).toBeVisible();
await issuedDate.click();
await issuedDate.fill('');
await issuedDate.fill('01/01/2026');
await expect(issuedDate).toHaveValue('01/01/2026');

const receivedDate = page.locator('#ReceivedDate');
await expect(receivedDate).toBeVisible();
await receivedDate.click();
await receivedDate.fill('');
await receivedDate.fill('01/02/2026');
await expect(receivedDate).toHaveValue('01/02/2026');

    

await page.getByRole('button', { name: 'Save' }).waitFor({ state: 'visible' });
await page.getByRole('button', { name: 'Save' }).click();
await page.getByRole('link', { name: 'Back to Background Check Details' }).waitFor({ state: 'visible' });
await page.getByRole('link', { name: 'Back to Background Check Details' }).click();

await page.getByRole('link', { name: 'Upload CA/N Authorization Document' }).waitFor({ state: 'visible' });
await page.getByRole('link', { name: 'Upload CA/N Authorization Document' }).click();

await page.locator('#Documents').setInputFiles('CBN_Doc.docx');
await page.waitForTimeout(2000);     

await page.getByRole('button', { name: 'Save' }).waitFor({ state: 'visible' });
await page.getByRole('button', { name: 'Save' }).click();
await page.waitForLoadState('networkidle');
await page.getByRole('link', { name: 'Back to Background Check Details' }).waitFor({ state: 'visible' });
await page.getByRole('link', { name: 'Back to Background Check Details' }).click();
await page.waitForTimeout(3000);
await page.getByRole('button', { name: 'Submit' }).waitFor({ state: 'visible' });
await page.getByRole('button', { name: 'Submit' }).click();
await page.waitForTimeout(2000);

await page.getByRole('link', { name: 'Back to Background Check' }).waitFor({ state: 'visible' });
await page.getByRole('link', { name: 'Back to Background Check' }).click();
await page.waitForTimeout(2000) //Submitted Background check applicaton for first user

//Upload Background check renewal document

await page.locator('tbody tr').nth(1).locator('td:first-child a').click();
      await page.waitForLoadState('networkidle');
      
      await page.getByRole('link', { name: 'Add Criminal Background Check' }).click();
    await page.waitForTimeout(2000);

      
    

await page.locator('#Documents').setInputFiles('CBC_Doc.docx');
await page.waitForTimeout(2000);

const issuedDate1 = page.locator('#IssuedDate');
await expect(issuedDate1).toBeVisible();
await issuedDate1.click();
await issuedDate1.fill('');
await issuedDate1.fill('01/01/2026');
await expect(issuedDate1).toHaveValue('01/01/2026');

const receivedDate1 = page.locator('#ReceivedDate');
await expect(receivedDate1).toBeVisible();
await receivedDate1.click();
await receivedDate1.fill('');
await receivedDate1.fill('01/02/2026');
await expect(receivedDate1).toHaveValue('01/02/2026');

await page.getByRole('button', { name: 'Save' }).waitFor({ state: 'visible' });
await page.getByRole('button', { name: 'Save' }).click();
await page.getByRole('link', { name: 'Back to Background Check Details' }).waitFor({ state: 'visible' });
await page.getByRole('link', { name: 'Back to Background Check Details' }).click();

await page.getByRole('link', { name: 'Upload CA/N Authorization Document' }).waitFor({ state: 'visible' });
await page.getByRole('link', { name: 'Upload CA/N Authorization Document' }).click();

await page.locator('#Documents').setInputFiles('CBN_Doc.docx');
await page.waitForTimeout(2000);     

await page.getByRole('button', { name: 'Save' }).waitFor({ state: 'visible' });
await page.getByRole('button', { name: 'Save' }).click();
await page.waitForLoadState('networkidle');
await page.getByRole('link', { name: 'Back to Background Check Details' }).waitFor({ state: 'visible' });
await page.getByRole('link', { name: 'Back to Background Check Details' }).click();
await page.waitForTimeout(2000);
await page.getByRole('button', { name: 'Submit' }).waitFor({ state: 'visible' });
await page.getByRole('button', { name: 'Submit' }).click();
await page.waitForTimeout(2000);

await page.getByRole('link', { name: 'Back to Background Check' }).waitFor({ state: 'visible' });
await page.getByRole('link', { name: 'Back to Background Check' }).click();
await page.waitForTimeout(1000) //Submitted Background check applicaton for first user
     
      });




// test (`Update Account Details (Generate Subsidy Code) - ${data.username}`, async ({ page }) => {
//       await page.getByRole('button', { name: 'Provider', exact: true }).click();
//       await page.getByRole('link', { name: 'Profile' }).click();
//       await page.waitForLoadState('networkidle');
//       await page.getByRole('link', { name: 'Account Details' }).click();
//       await page.waitForLoadState('networkidle');
//       await page.locator('#requestingsubsidy_yes').check();
//       await page.waitForTimeout(2000);
//       await page.getByRole('link', { name: 'Create New Account Detail' }).click(); 
//       await page.waitForLoadState('networkidle');
//       await page.getByRole('button', { name: 'Send code' }).click();
//       await page.waitForTimeout(1000);
//      // Wait for confirmation text
//      await expect(page.locator('#SendVerificationCodeStatus'))
//   .toHaveText('Verification Code sent to the email associated with your Provider account.');

//   });
 

//   test (`Navigate to third Party App to generate code - ${data.username}`, async ({ page, context }) => { 
// const thirdPartyPage = await context.newPage();   
// await thirdPartyPage.goto('https://www.sharklasers.com/inbox');
// await thirdPartyPage.waitForTimeout(5000);
// await thirdPartyPage.waitForLoadState('networkidle');
// // 1. Enter edit mode
//   await thirdPartyPage.getByTitle('Click to Edit').click();

//   // 2. Wait for the input rendered inside the span
//   const inboxInput = thirdPartyPage.locator('#inbox-id input');
//   await expect(inboxInput).toBeVisible();

//   // 3. Fill value
//   //await inboxInput.fill(InputDetails.EmailID.split('@')[0]); // Extract username from email
//   await inboxInput.fill(data.EmailIDforThirdParty);

//   // 4. Click on Set button
//   await thirdPartyPage.getByRole('button', {name: 'Set'}).click();

// await thirdPartyPage.waitForTimeout(10000); // Wait for 10 seconds to ensure inbox is ready

// const verificationMail = thirdPartyPage.locator(
//   'tr.mail_row:has(td:text("Account Access Verification Code"))'
// );

// await expect(verificationMail).toHaveCount(1, { timeout: 30000 });
// await verificationMail.click();

// // Wait until the email body is visible
// const emailBody = thirdPartyPage.locator('.email_body');
// await expect(emailBody).toBeVisible();

// // Get full email text
// const emailText = await emailBody.textContent();

// // Extract 4-digit verification code
// const otpMatch = emailText?.match(/\b\d{4}\b/);

// if (!otpMatch) {
//   throw new Error('Verification code not found in email');
// }

// const verificationCode = otpMatch[0];

// // Print in console
// console.log('Verification Code:', verificationCode);

// const otpData = { otp: verificationCode };
//   const otpPath = path.resolve(__dirname, 'otp.json');

//   fs.writeFileSync(otpPath, JSON.stringify(otpData, null, 2));

//   });


// test (`Update Account Details - ${data.username}`, async ({ page }) => {
//   // Read OTP from file
//   const otpPath = path.resolve(__dirname, 'otp.json');
//   const otpContent = fs.readFileSync(otpPath, 'utf-8');
//   const otpData = JSON.parse(otpContent);
//   const verificationCode = otpData.otp;
//   await page.getByRole('button', { name: 'Provider', exact: true }).click();
//       await page.getByRole('link', { name: 'Profile' }).click();
//       await page.waitForLoadState('networkidle');
//       await page.getByRole('link', { name: 'Account Details' }).click();
//       await page.waitForLoadState('networkidle');
//       await page.getByRole('link', { name: 'Create New Account Detail' }).click(); 
//       await page.waitForLoadState('networkidle');

//       await page.locator('#VerificationCode').click();
// await page.locator('#VerificationCode').fill(verificationCode);


// await page.locator('#BankAccountPaymentTypeId_label').click();
// await page.waitForTimeout(4000);
// await page.getByRole('option', { name: 'Savings' }).click();

// await page.locator('#RoutingNumber').click();
// await page.locator('#RoutingNumber').type('021000322', { delay: 100 });

// await page.locator('#AccountNumber').click();
// await page.locator('#AccountNumber').type('1234567890', { delay: 100 });

// await page.locator('#ConfirmRoutingNumber').click();
// await page.locator('#ConfirmRoutingNumber').type('021000322', { delay: 100 });

// await page.locator('#ConfirmAccountNumber').click();
// await page.locator('#ConfirmAccountNumber').type('1234567890', { delay: 100 });

// await page.locator('#AccountHolder').click();
// await page.locator('#AccountHolder').fill('Martin Sam');



// //await page.waitForTimeout(2000);

// await page.locator('#BillingAddress_Address1').fill('123 Main St');
// await page.locator('#BillingAddress_Address2').fill('St Thomas Church'); 
// await page.locator('#BillingAddress_City').fill('Springfield'); 

// //await page.waitForTimeout(2000);

// await page.locator('#BillingAddress_State_label') // Open the Main Address State dropdown
//   .locator('..')
//   .locator('.k-dropdownlist')
//   .click();

// //await page.waitForTimeout(2000);

// await page.locator('#BillingAddress_State-list').waitFor({ state: 'visible' }); // Wait for the dropdown list container to be visible
// await page.waitForTimeout(2000);

// const arOption = page.locator('#BillingAddress_State-list .k-list-item', { hasText: 'AL' }); // Update State and Locate the "AR" option
// await expect(arOption).toBeVisible({ timeout: 10000 }); // Wait for the option to be visible and enabled
// await expect(arOption).toBeEnabled();
// await arOption.scrollIntoViewIfNeeded(); // Scroll into view and click
// await arOption.click();

// //await page.waitForTimeout(2000);

// await page.locator('#BillingAddress_Zip').first().click();
// await page.locator('#BillingAddress_Zip').type('72001-1234', { delay: 100 });

// //await page.waitForTimeout(2000);


// await page.locator('#BillingAddress_fgCityStateZip').getByText('-- County --').click(); // Open the County dropdown
// await page.waitForTimeout(1000);
// await page.locator('#BillingAddress_CountyNameID-list').waitFor({ state: 'visible' }); // Wait for the dropdown list to appear

// const searchBox = page.getByRole('searchbox'); // Wait for the searchbox to be visible and stable
// await expect(searchBox).toBeVisible({ timeout: 10000 });
// await expect(searchBox).toBeEnabled();

// await searchBox.fill('Perry'); // Fill the search term and allow filtering
// await page.waitForTimeout(1000); // Let filtering complete

// const listItems = page.locator('#BillingAddress_CountyNameID-list .k-list-item'); // Wait for at least one visible item in the list
// await expect(listItems.first()).toBeVisible({ timeout: 50000 });

// const countyOption = listItems.filter({ hasText: 'Perry' }); // Find and click the "Perry" option
// await expect(countyOption).toBeVisible({ timeout: 10000 });
// await countyOption.click();


// //await page.waitForTimeout(2000);

// await page.locator('#IsBillingAndMailingAddressSame').isVisible();
// await page.locator('#IsBillingAndMailingAddressSame').check();

// //await page.waitForTimeout(2000);
// await page.getByRole('button', { name: 'Save' }).click();
// await page.waitForLoadState('networkidle');


// });

test (`Update Account Details As an Option NO - ${data.username}`, async ({ page }) => {
  await page.getByRole('button', { name: 'Provider', exact: true }).click();
      await page.getByRole('link', { name: 'Profile' }).click();
      await page.waitForLoadState('networkidle');
      await page.getByRole('link', { name: 'Account Details' }).click();
      await page.waitForLoadState('networkidle');
      await page.locator('#requestingsubsidy_no').check();
      await page.waitForTimeout(2000);
      
});

test (`Update Providers Documents - ${data.username}`, async ({ page }) => { 
 await page.getByRole('button', { name: 'Provider', exact: true }).click();
      await page.getByRole('link', { name: 'Profile' }).click();
      await page.waitForLoadState('networkidle');
      await page.getByRole('link', { name: 'Provider Documents' }).waitFor({ state: 'visible' });
      await page.getByRole('link', { name: 'Provider Documents' }).click(); 
      await page.waitForLoadState('networkidle');     
    const pendingDoc = page.locator(
  'button:has-text("[Pending]")'
).first();

await expect(pendingDoc).toBeVisible();
await pendingDoc.click();

const fileInput = page.locator(
  'button:has-text("[Pending]") + * input[type="file"], input[type="file"]:visible'
).first();

await expect(fileInput).toBeVisible();

await fileInput.setInputFiles('CBC_Doc.docx');

// Click Upload (required on this screen)
const uploadBtn = page.getByRole('button', { name: 'Upload' });
await expect(uploadBtn).toBeVisible();
await uploadBtn.click();

// Assert document appears in history
const rows = page.locator('table >> text=Delete');
await expect(rows).toHaveCount(1, { timeout: 30000 });

while (await page.locator('button:has-text("[Pending]")').count() > 0) {
  const pending = page.locator('button:has-text("[Pending]")').first();
  await pending.click();

  const fileInput = page.locator('input[type="file"]:visible').first();
  await fileInput.setInputFiles('CBN_Doc.docx');

  const uploadBtn = page.getByRole('button', { name: 'Upload' });
  await expect(uploadBtn).toBeVisible();
  await uploadBtn.click();

  // Wait for history row to appear
  const rows = page.locator('table >> text=Delete');
  await expect(rows.first()).toBeVisible({ timeout: 30000 });
}


  });

test (`Update Acknowledgement - ${data.username}`, async ({ page }) => {
  await page.getByRole('button', { name: 'Provider', exact: true }).click();
      await page.getByRole('link', { name: 'Profile' }).click();
      await page.waitForLoadState('networkidle');
      await page.getByRole('link', { name: 'Acknowledgement' }).click();
      await page.waitForLoadState('networkidle');

await page.locator('#Questions_0__IsSelected_2').check();
await page.locator('#Questions_1__IsSelected_2').check();
await page.locator('#Questions_2__IsSelected_2').check();
await page.locator('#Questions_3__IsSelected_2').check();
await page.locator('#Questions_4__IsSelected_2').check();
await page.locator('#Questions_5__IsSelected_2').check();

await page.getByRole('button', { name: 'Continue' }).waitFor({ state: 'visible' });
await page.getByRole('button', { name: 'Continue' }).click();
      


  });


test (`Update Summary - ${data.username}`, async ({ page }) => {
  await page.getByRole('button', { name: 'Provider', exact: true }).click();
      await page.getByRole('link', { name: 'Profile' }).click();
      await page.waitForLoadState('networkidle');
      await page.getByRole('link', { name: 'Summary' }).click();
      await page.waitForLoadState('networkidle');

      await page.locator('#Signature_Certify').check();

await page.getByLabel("Provider's Signature").fill('PP');

await page.getByRole('button', { name: 'Submit' }).waitFor({ state: 'visible' });
await page.getByRole('button', { name: 'Submit' }).click();




  });

  });
}