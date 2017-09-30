
QUnit.test("test_travel_info", function (assert) {
	let travelInfo = [{ "timestamp": 1506732963000, "startSite": "Taipei", "endSite": "Taoyuan", "price": "100" }]

	var MockText = function () { };
	
	var startSite = new MockText();
	var endSite = new MockText();
	var date = new MockText();
	var price = new MockText();
	var bar = new MockText();
	
	startSite.text = function (data) { this.text = data };
	endSite.text = function (data) { this.text = data };
	date.text = function (data) { this.text = data };
	price.text = function (data) { this.text = data };
	bar.slideUp = function (a, b) { };

	processTravelInfo(travelInfo, startSite, endSite, date, price, bar)

	assert.ok(startSite.text == "Taipei", "Passed!");
	assert.ok(endSite.text == "Taoyuan", "Passed!");
	assert.ok(date.text == "9/30/2017", "Passed!");	
	assert.ok(price.text == "100", "Passed!");
	
});
