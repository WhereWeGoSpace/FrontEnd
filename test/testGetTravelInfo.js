if (typeof QUnit == 'undefined') // if your tests also run in the browser...
{
	QUnit = require('qunit-cli');
}

if (typeof module !== 'undefined' && module.exports) {
	moment = require('moment-timezone')
	var logic = require('../src/js/logic.js')
	processTravelInfo = logic.processTravelInfo;	
}

QUnit.test("test_travel_info", function (assert) {
	let travelInfo = { "Date": "2017-10-04T05:27:39.748765+00:00", "From": "Taipei", "To": "Taoyuan", "From_Code": "SIFJD38", "To_Code": "JIFU234", "Price": "100" }

	var MockHTMLElement = function () { };

	var startSite = new MockHTMLElement();
	var endSite = new MockHTMLElement();
	var date = new MockHTMLElement();
	var price = new MockHTMLElement();
	var bar = new MockHTMLElement();
	var site_code = [];
	startSite.text = function (data) { this.text = data };
	endSite.text = function (data) { this.text = data };
	date.text = function (data) { this.text = data };
	price.text = function (data) { this.text = data };
	bar.slideUp = function (a, b) { bar.slideUpIsCalled = true };

	processTravelInfo(travelInfo, startSite, endSite, date, price, bar, site_code)

	assert.ok(startSite.text == "Taipei", "Passed!");
	assert.ok(endSite.text == "Taoyuan", "Passed!");
	console.log(date.text);
	//assert.ok(date.text == "October 4th 2017, 12:27:39 am", "Passed!");
	assert.ok(price.text == "100", "Passed!");	
	assert.ok(site_code.from == "SIFJD38", "Passed!");
	assert.ok(site_code.to == "JIFU234", "Passed!");
	assert.ok(bar.slideUpIsCalled == true, "Passed!");
	
});
