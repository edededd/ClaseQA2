const should = require('chai').should();

const {Builder, By, until} = require('selenium-webdriver');
const {NoSuchElementError} = require('selenium-webdriver/lib/error');

describe('WonderProxy website', function () {
  // Browser based tests tend to exceed the default timeout
  // Set a longer timeout here which will be applied to all the tests:
  this.timeout(10000);

  describe('Home Page', function () {
    describe('Title', function () {
      it('should be "Localization testing with confidence - WonderProxy"', async function () {
        await runWithDriver(async function (driver) {
          await driver.get('http://localhost:3000/');
          const title = await driver.getTitle();
          console.log(title)
          title.should.equal("UTEC login");
        });
      });
    });
  });
});

async function runWithDriver(test) {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    await test(driver);
  } finally {
    await driver.quit();
  }
}