var seleniumWebdriver = require('selenium-webdriver');
var {defineSupportCode} = require('cucumber');

defineSupportCode(function({Given, When, Then}) {
  Given('I am on the credit card information page and fill all information', function () {
    var that = this;
    return this.driver.get('http://localhost:8080').then(function() {
      click(that.driver, {linkText: "Help me!!"});

      var xpath = "//*[contains(text(),'" + "Checkout" + "')]";
      var condition = seleniumWebdriver.until.elementLocated({xpath: xpath});

      return that.driver.wait(condition, 3000);
    });
  });

  function click(driver, selector) {
    driver.findElement(selector).then(function(element) {
      element.click();
    });
  }

  When('I click Pay button', function () {
    var xpath = "//*[contains(text(),'" + "Pay" + "')]";
    var condition = seleniumWebdriver.until.elementLocated({xpath: xpath});

    return this.driver.wait(condition, 3000);
  });
});
