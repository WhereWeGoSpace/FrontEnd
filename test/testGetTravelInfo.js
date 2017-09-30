if (typeof QUnit == 'undefined') // if your tests also run in the browser...
{
	QUnit = require('qunit-cli');
}

if (typeof module !== 'undefined' && module.exports) {
	var moment = require('moment')
	var logic = require('../src/js/logic.js')
	processTravelInfo = logic.processTravelInfo;
	from_code = logic.from_code;
	to_code = logic.to_code;
}

QUnit.test("test_travel_info", function (assert) {
	let travelInfo = { "Date": "2017-10-04T05:27:39.748765+00:00", "From": "Taipei", "To": "Taoyuan", "From_Code": "SIFJD38", "To_Code": "JIFU234", "Price": "100" }

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

	console.log(startSite, endSite, date, price);

	assert.ok(startSite.text == "Taipei", "Passed!");
	assert.ok(endSite.text == "Taoyuan", "Passed!");
	assert.ok(date.text == "October 4th 2017, 1:27:39 pm", "Passed!");
	assert.ok(price.text == "100", "Passed!");
	assert.ok(bar.slideUpIsCalled == true, "Passed!");
	assert.ok(from_code == "SIFJD38", "Passed!");
	assert.ok(to_code == "JIFU234", "Passed!");

});
