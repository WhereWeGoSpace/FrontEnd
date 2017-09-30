if (typeof QUnit == 'undefined') // if your tests also run in the browser...
{
	QUnit = require('qunit-cli');
}

if (typeof module !== 'undefined' && module.exports) {
	var logic = require('../src/js/logic.js')
	generateBookingInfo = logic.generateBookingInfo;	
}

QUnit.test("test_credit_card_payment_info", function (assert) {
    var paymentInfo = generateBookingInfo("1", "2", "3", "4", "5", {"from": "qwe", "to": "rit"});

    assert.ok("qwe" == paymentInfo.From_Code, "Passed!");
    assert.ok("rit" == paymentInfo.To_Code, "Passed!");
    assert.ok("12" == paymentInfo.Contactor.name, "Passed!");
    assert.ok("3" == paymentInfo.Contactor.email, "Passed!");
    assert.ok("1" == paymentInfo.Passengers[0].first_name, "Passed!");
    assert.ok("2" == paymentInfo.Passengers[0].last_name, "Passed!");
    assert.ok("4" == paymentInfo.Passengers[0].birthdate, "Passed!");
    assert.ok("3" == paymentInfo.Passengers[0].email, "Passed!");
    assert.ok("5" == paymentInfo.Passengers[0].passport, "Passed!");

});
