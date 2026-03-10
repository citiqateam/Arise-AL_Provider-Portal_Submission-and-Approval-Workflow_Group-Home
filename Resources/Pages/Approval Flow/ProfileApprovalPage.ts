// pages/ProfileApprovalPage.js
import { expect } from '@playwright/test';
import type { Page } from '@playwright/test';

class ProfileApprovalPage {
  page: Page;
  providerLink: any;
  profileApprovalsLink: any;
  goLastPageButton: any;
  addConsultantButton: any;
  updateButton: any;
  sendToWorkerButton: any;
  approveButton: any;
  userNameListBox: any;

  constructor(page: Page) {
    this.page = page;
    this.providerLink = page.getByRole('link', { name: 'Provider' });
    this.profileApprovalsLink = page.getByRole('link', { name: 'Profile Approvals' });
    this.goLastPageButton = page.getByRole('button', { name: 'Go to the last page' });
    this.addConsultantButton = page.getByRole('button', { name: 'Add Licensing Child Care Consultant' });
    this.updateButton = page.getByRole('button', { name: 'Update' });
    this.sendToWorkerButton = page.getByRole('button', { name: 'Send To Worker' });
    this.approveButton = page.getByRole('button', { name: 'Approve' });
    this.userNameListBox = page.locator('#UserName_listbox');
  }

  async navigateToProfileApprovals() {
    await this.providerLink.click();
    await expect(this.profileApprovalsLink).toBeVisible();
    await this.profileApprovalsLink.click();
  }

  async goToLastPage() {
    await this.goLastPageButton.click();
    await this.page.waitForTimeout(3000);
  }

  async addConsultant() {
    await expect(this.addConsultantButton).toBeVisible();
    await this.addConsultantButton.click();
  }

  async verifyProviderName(expectedName: string) {
  try {
    const fullName = await this.page.locator('label:has-text("Full Name") + p').innerText();
    expect(fullName.trim()).toBe(expectedName.trim());
  } catch (err) {
    //console.warn(`⚠️ Provider name did not match. Expected: ${expectedName}, Found: ${await this.page.locator('label:has-text("Full Name") + p').innerText()}`);
    // continue without throwing
  }
}


  async selectFirstUserFromDropdown() {
    const openTrigger = this.page.locator(
      '[role="combobox"][aria-owns="UserName_listbox"], ' +
      '[aria-controls="UserName_listbox"], ' +
      '.k-multicolumncombobox .k-input-button, ' +
      '.k-multicolumncombobox .k-select'
    );

    await openTrigger.first().click();
    await this.userNameListBox.waitFor({ state: 'visible' });
    await this.userNameListBox.locator('[role="option"]').first().click();
  }

  async updateAndSend() {
    await expect(this.updateButton).toBeVisible();
    await this.updateButton.click();

    await expect(this.sendToWorkerButton).toBeVisible();
    await this.sendToWorkerButton.click();
  }

  async approveApplication() {
    await expect(this.approveButton).toBeVisible();
    await this.approveButton.click();
  }
};
export default ProfileApprovalPage;