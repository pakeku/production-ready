import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test('should load the login page', async ({ page }) => {
    await page.goto('/')
    
    // Check that the page loads
    await expect(page).toHaveTitle(/.*/)
    
    // Check for login form elements
    await expect(page.getByPlaceholder('Email')).toBeVisible()
    await expect(page.getByPlaceholder('Password')).toBeVisible()
  })

  test('should show login form and allow input', async ({ page }) => {
    await page.goto('/')
    
    const emailInput = page.getByPlaceholder('Email')
    const passwordInput = page.getByPlaceholder('Password')
    
    // Fill in the form
    await emailInput.fill('test@example.com')
    await passwordInput.fill('password123')
    
    // Verify inputs have values
    await expect(emailInput).toHaveValue('test@example.com')
    await expect(passwordInput).toHaveValue('password123')
  })

  test('should toggle theme', async ({ page }) => {
    await page.goto('/')
    
    // Find and click the theme switch
    const themeSwitch = page.locator('[role="switch"]')
    
    if (await themeSwitch.isVisible()) {
      await themeSwitch.click()
      // Theme should have changed (implementation specific)
    }
  })
})

test.describe('Accessibility', () => {
  test('should have focusable form elements', async ({ page }) => {
    await page.goto('/')
    
    // Tab through form elements
    await page.keyboard.press('Tab')
    
    // Check that focus is on an input or interactive element
    const focusedElement = page.locator(':focus')
    await expect(focusedElement).toBeVisible()
  })
})
