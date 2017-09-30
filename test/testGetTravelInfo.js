if (typeof QUnit == 'undefined') // if your tests also run in the browser...
{
	QUnit = require('qunit-cli');
}

if (typeof module !== 'undefined' && module.exports) {
	var logic = require('../src/js/logic.js')
	processTravelInfo = logic.processTravelInfo;
}

QUnit.test("test_travel_info", function (assert) {
	let travelInfo = [{ "timestamp": 1506732963000, "startSite": "Taipei", "endSite": "Taoyuan", "price": "100" }]

	var MockHTMLElement = function () { };

	var startSite = new MockHTMLElement();
	var endSite = new MockHTMLElement();
	var date = new MockHTMLElement();
	var price = new MockHTMLElement();
	var bar = new MockHTMLElement();

	startSite.text = function (data) { this.text = data };
	endSite.text = function (data) { this.text = data };
	date.text = function (data) { this.text = data };
	price.text = function (data) { this.text = data };
	bar.slideUp = function (a, b) { bar.slideUpIsCalled = true };

	processTravelInfo(travelInfo, startSite, endSite, date, price, bar)

	assert.ok(startSite.text == "Taipei", "Passed!");
	assert.ok(endSite.text == "Taoyuan", "Passed!");
	assert.ok(date.text == "9/30/2017", "Passed!");
	assert.ok(price.text == "100", "Passed!");
	assert.ok(bar.slideUpIsCalled == true, "Passed!");

});
