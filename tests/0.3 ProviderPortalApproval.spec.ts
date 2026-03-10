import {test, expect} from '@playwright/test'; 
import ProfileApprovalPage from '../Resources/Pages/Approval Flow/ProfileApprovalPage.js';
import { clickLastProviderInGrid  } from '../Resources/Pages/Approval Flow/ApprovalGridSearch.js'; 
import loginData from '../Resources/Test Data/LoginDetails.json' assert { type: 'json' };


for (const data of loginData)
{
test (`Approval for Submitted Application ${data.providerName}`, async ({page}) => {

    await page.goto('https://al-arise-qa-main.citigovcloud.com/Account/supportLogin?ReturnUrl=%2F');
    await page.fill('#UserName', 'SystemAdmin');
    await page.fill('#Password', 'Pass@123');
    await page.click('#btn-login');

const profilePage = new ProfileApprovalPage(page);

  await profilePage.navigateToProfileApprovals();
  await profilePage.goToLastPage();

  // 🔹 click on the last provider (reusing helper)
  await clickLastProviderInGrid(page);

  await profilePage.addConsultant();

  // 🔹 verify provider name against JSON
  //const user = loginData[0];
  console.log('Expected from JSON:', data.providerName);
  if (data.providerName) {
    await profilePage.verifyProviderName(data.providerName);
  }

  // 🔹 select first consultant from dropdown
  await profilePage.selectFirstUserFromDropdown();

  // 🔹 update, send, approve
  await profilePage.updateAndSend();
  await profilePage.approveApplication();

     

});



}
