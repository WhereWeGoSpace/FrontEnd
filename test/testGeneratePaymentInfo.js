QUnit.test("test_credit_card_payment_info", function (assert) {
    var paymentInfo = generatePaymentInfo(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15);

    assert.ok(1 == paymentInfo.cardNumber, "Passed!");
    assert.ok(2 == paymentInfo.expirationYear, "Passed!");
    assert.ok(3 == paymentInfo.expirationMonth, "Passed!");
    assert.ok(4 == paymentInfo.cvv, "Passed!");
    assert.ok(5 == paymentInfo.salutation, "Passed!");
    assert.ok(6 == paymentInfo.firstName, "Passed!");
    assert.ok(7 == paymentInfo.surname, "Passed!");
    assert.ok(8 == paymentInfo.email, "Passed!");
    assert.ok(9 == paymentInfo.streetNumber, "Passed!");
    assert.ok(10 == paymentInfo.townCity, "Passed!");
    assert.ok(11 == paymentInfo.country, "Passed!");
    assert.ok(12 == paymentInfo.postcode, "Passed!");
    assert.ok(13 == paymentInfo.birthDay, "Passed!");
    assert.ok(14 == paymentInfo.passcode, "Passed!");
    assert.ok(15 == paymentInfo.phone, "Passed!");

});
