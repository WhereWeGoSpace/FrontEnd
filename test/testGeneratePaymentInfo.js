if (typeof QUnit == 'undefined') // if your tests also run in the browser...
{
    QUnit = require('qunit-cli');
}

if (typeof module !== 'undefined' && module.exports) {
    var logic = require('../src/js/logic.js')
    generateBookingInfo = logic.generateBookingInfo;
    generatePaymentInfo = logic.generatePaymentInfo;
}

QUnit.test("test_generate_BookingInfo", function (assert) {
    var bookingInfo = generateBookingInfo("1", "2", "3", "4", "5", { "from": "qwe", "to": "rit" });

    assert.ok("qwe" == bookingInfo.From_Code, "Passed!");
    assert.ok("rit" == bookingInfo.To_Code, "Passed!");
    assert.ok("12" == bookingInfo.Contactor.name, "Passed!");
    assert.ok("3" == bookingInfo.Contactor.email, "Passed!");
    assert.ok("1" == bookingInfo.Passengers[0].first_name, "Passed!");
    assert.ok("2" == bookingInfo.Passengers[0].last_name, "Passed!");
    assert.ok("4" == bookingInfo.Passengers[0].birthdate, "Passed!");
    assert.ok("3" == bookingInfo.Passengers[0].email, "Passed!");
    assert.ok("5" == bookingInfo.Passengers[0].passport, "Passed!");

});

QUnit.test("test_credit_card_payment_info", function (assert) {
    var paymentInfo = generatePaymentInfo(1, 2, 3, 4, { "bookingID": "123456" });

    assert.ok("123456" == paymentInfo.BookingId, "Passed!");
    assert.ok("1" == paymentInfo.CreditCard.number, "Passed!");
    assert.ok("2" == paymentInfo.CreditCard.exp_year, "Passed!");
    assert.ok("3" == paymentInfo.CreditCard.exp_month, "Passed!");
    assert.ok("4" == paymentInfo.CreditCard.cvv, "Passed!");

});

