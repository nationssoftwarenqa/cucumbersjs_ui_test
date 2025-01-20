const {setTimeout} = require('timers/promises');
const {Given, When, Then, Before, After} = require('@cucumber/cucumber');
//const {expect} = require('chai');
const webdriver = require('selenium-webdriver');
const {By} = require('selenium-webdriver');
//const expect = require('expect');
const assert = require('assert')

const {setDefaultTimeout} = require('@cucumber/cucumber');
const exp = require('constants');
setDefaultTimeout(60*1000);

let driver;
Before(function () {
    driver = new webdriver.Builder()
        .forBrowser('chrome')
        .build();
})

Given('I visit amazon app online', async function () {
   await driver.get('https://www.amazon.com');
   await driver.manage().window().maximize();
   await driver.sleep(10000);    
});

Then('click on Your account', async function () {
    let click_elem = await driver.findElement(By.xpath('//*[contains(text(), "Your Account")]'));
    await click_elem.click();
})

Then('click on the signin', async function () {
    let click_elem = await driver.findElement(By.xpath('//*[@id="nav-link-accountList"]'));
    await click_elem.click();
})


When('I type my email {string} and hit enter', async function (email) {
    let click_elem = await driver.findElement(By.xpath('//*[@id="ap_email"]'));
    await click_elem.sendKeys(email + "\n");
})


When('I type incorrect password {string} and hit enter', async function (email) {
    let click_elem = await driver.findElement(By.xpath('//*[@id="ap_password"]'));
    await click_elem.sendKeys(email + "\n");
})


Then('the text {string} is displayed', async function (errormessage) {
    await driver.sleep(1000);
    let click_elem  = await driver.findElement(By.xpath('//*[@id="auth-error-message-box"]'));
    let click_elem1 = await driver.findElement(By.xpath('//*[contains(text(), "Your password is incorrect")]'));
    assert.equal('Your password is incorrect', errormessage)
})


Then('the {string} page is opened', async function (url) {
await driver.wait(1000);
await driver.url((currentUrl) => {
expect(currentUrl).to.equal(url);
    })
})


//Then('the api page is opened', async function () {
//resp => {
//    method: 'GET',
//    url: '/session/:sessionId/chromium/network_conditions'
//  }})