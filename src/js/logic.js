if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        processTravelInfo: processTravelInfo,
        generatePaymentInfo: generatePaymentInfo
    };
}

var REMOTE_SERVER = "http://localhost:3000"

function clickHandler() {
    $.ajax({
        url: REMOTE_SERVER + '/travelInfo',
        type: 'GET',
        data: {
        },
        error: function (xhr) {
            alert('Ajax request 發生錯誤');
        },
        success: function (data) { processTravelInfo(data, $("#startSite"), $("#endSite"), $("#date"), $("#price"), $("#bar")) }
    });
}

function processTravelInfo(data, startSite, endSite, date, price, bar) {
    let startDate = new Date(data[0].timestamp);

    startSite.text(data[0].startSite);
    endSite.text(data[0].endSite);
    date.text(startDate.toLocaleDateString("en-US"));
    price.text(data[0].price);

    bar.slideUp("slow", function () {
        $("#result").fadeIn();
    });
}

function generatePaymentInfo(cardNumber, expirationYear, expirationMonth, cvv, salutation, firstName, surname, email, streetNumber, townCity, country, postcode, birthDay, passcode, phone) {
    var paymentInfo = {
        cardNumber: cardNumber,
        expirationYear: expirationYear,
        expirationMonth: expirationMonth,
        cvv: cvv,
        salutation: salutation,
        firstName: firstName,
        surname: surname,
        email: email,
        streetNumber: streetNumber,
        townCity: townCity,
        country: country,
        postcode: postcode,
        birthDay: birthDay,
        passcode: passcode,
        phone: phone
    }
    return paymentInfo;
}

function paymentInfoHandler() {
    $.ajax({
        url: REMOTE_SERVER + '/ticketDownloadLink',
        type: 'GET',
        data: generatePaymentInfo($("#cardNumber").val(),
            $("#expirationYear").val(),
            $("#expirationMonth").val(),
            $("#cvv").val(),
            $("#salutation").val(),
            $("#firstName").val(),
            $("#surname").val(),
            $("#email").val(),
            $("#streetNumber").val(),
            $("#townCity").val(),
            $("#country").val(),
            $("#postcode").val(),
            $("#birthDay").val(),
            $("#passcode").val(),
            $("#phone").val()),
        error: function (xhr) {
            alert('Ajax request 發生錯誤');
        },
        success: function (data) {
            if (!data.success) {
                $("#creditCardVerifyInfo").slideUp("slow", function () {
                    $("#creditCardVerifyError").fadeIn();
                });
            }
            else {
                for (let i in data.url) {
                    window.open(data.url[i], "_blank");
                }
            }
        }
    });
}
function registerHandler() {
    $("#click").click(clickHandler);

    $("#checkout").click(function () {
        $("#result").slideUp("slow", function () {
            $("#creditCardVerifyInfo").fadeIn();
        });
    });

    $("#pay").click(paymentInfoHandler);

    $("#backToCreditCardInfoInput").click(function () {
        $("#creditCardVerifyError").slideUp("slow", function () {
            $("#creditCardVerifyInfo").fadeIn();
        });
    });
}
