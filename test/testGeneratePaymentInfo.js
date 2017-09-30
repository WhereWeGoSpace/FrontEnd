if (typeof QUnit == 'undefined') // if your tests also run in the browser...
{
	QUnit = require('qunit-cli');
}

if (typeof module !== 'undefined' && module.exports) {
	var logic = require('../src/js/logic.js')
	generatePaymentInfo = logic.generatePaymentInfo;	
}

QUnit.test("test_credit_card_payment_info", function (assert) {
    var paymentInfo = generatePaymentInfo(1, 2, 3, 4, 6, 7, 8, 13, 14);

    assert.ok(1 == paymentInfo.cardNumber, "Passed!");
    assert.ok(2 == paymentInfo.expirationYear, "Passed!");
    assert.ok(3 == paymentInfo.expirationMonth, "Passed!");
    assert.ok(4 == paymentInfo.cvv, "Passed!");
    assert.ok(6 == paymentInfo.firstName, "Passed!");
    assert.ok(7 == paymentInfo.surname, "Passed!");
    assert.ok(8 == paymentInfo.email, "Passed!");
    assert.ok(13 == paymentInfo.birthDay, "Passed!");
    assert.ok(14 == paymentInfo.passcode, "Passed!");

});
