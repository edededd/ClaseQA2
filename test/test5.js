
const should = require('chai').should();
const { WebElement } = require('selenium-webdriver');
const {Builder, By, until} = require('selenium-webdriver');
const {NoSuchElementError} = require('selenium-webdriver/lib/error');

 describe('WonderProxy website', function () {
  this.timeout(10000);
  
   // test de user incorrecto y password incorrecto
  describe('Home Page', function () {
    describe('Title', function () {
      it('should be "Localization testing with confidence - WonderProxy"', async function() {
        await runWithDriver(async function main(driver) {
          await driver.get('http://localhost:3000/');
          const username = await driver.findElement(By.id("user"));
          await username.sendKeys("utec3");
          const password =  await driver.findElement(By.id("pass"));
          console.log(password.getText())
          const loginButton = driver.findElement(By.id("sub"));
          await password.sendKeys("utec6");
          await loginButton.submit();
          console.log(username.getText())
          const driver1 = await driver.getWindowHandle();
          await driver.manage().setTimeouts( { implicit: 30000 } );
          /*await driver.navigate().to("http://localhost:3000/home")*/
          const message= await driver.findElement(By.tagName("body")).getText();
          message.should.equal("Incorrecto");
          

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