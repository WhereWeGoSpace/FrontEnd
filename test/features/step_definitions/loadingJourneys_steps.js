var seleniumWebdriver = require('selenium-webdriver');
var {defineSupportCode} = require('cucumber');

defineSupportCode(function({Given, When, Then}) {
  Given('I am on the home page', function() {
    return this.driver.get('http://localhost:8080');
  });

  When('I click on {string}', function (text) {
    return this.driver.findElement({linkText: text}).then(function(element) {
        element.click();
    });
  });

  Then('I should see {string}', function (text) {
    var xpath = "//*[contains(text(),'" + text + "')]";
    var condition = seleniumWebdriver.until.elementLocated({xpath: xpath});
    return this.driver.wait(condition, 10000);
  });

  function click(driver, selector) {
    driver.findElement(selector).then(function(element) {
      element.click();
    });
  }

/*
  When('I click on {string} with patient', function (text) {
    return this.driver.findElement({id: text}).then(function(element) {
      setTimeout(function(){
        element.click();
      }, 2000);
    });
  });
  Given('I am on the advice route page', function () {
    // Write code here that turns the phrase above into concrete actions
    return this.driver.get('http://localhost:8080');
  });

  When('I click on {string}', function (text) {
    return this.driver.findElement({linkText: text}).then(function(element) {
        element.click();
    });
  });

  Then('I should see {string}', function (text) {
    var xpath = "//*[contains(text(),'" + text + "')]";
    var condition = seleniumWebdriver.until.elementLocated({xpath: xpath});
    return this.driver.wait(condition, 10000);
  });

  Then('I should see checkout page', function (callback) {
    // Write code here that turns the phrase above into concrete actions
    callback(null, 'success');
  });

  Given('I am on the credit card information page and fill all information', function () {
    // Write code here that turns the phrase above into concrete actions
    return this.driver.get('http://localhost:8080');
    //return this.driver.get('http://localhost:8080');
  });*/
});
