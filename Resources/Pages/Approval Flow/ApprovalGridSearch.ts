  export async function clickLastProviderInGrid(page: any) {
    const lastPageBtn = page.locator('.k-pager-nav.k-pager-last');

    // ✅ Check if there is pagination and the last-page button is enabled
    if (await lastPageBtn.count() > 0 && !(await lastPageBtn.isDisabled())) {
      await Promise.all([
        page.waitForResponse((resp: any) =>
          resp.url().includes('/Provider/Profile') && resp.status() === 200
        ),
        lastPageBtn.click(),
      ]);
    }

    // ✅ Now safely select the last provider in the current grid
    const lastProviderLink = page.locator('table tbody tr td a').last();

    await lastProviderLink.scrollIntoViewIfNeeded();
    await lastProviderLink.waitFor({ state: 'visible' });
    await lastProviderLink.click();
  }
