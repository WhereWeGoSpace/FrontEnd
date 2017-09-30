if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        processTravelInfo: processTravelInfo,
        generatePaymentInfo: generatePaymentInfo,
        from_code: from_code,
        to_code: to_code
    };
}

var REMOTE_SERVER = "http://ec2-13-115-146-214.ap-northeast-1.compute.amazonaws.com"

var from_code = ""
var to_code = ""

function clickHandler() {
    $.ajax({
        url: REMOTE_SERVER + '/API/Ticket/LoadingJourneys',
        type: 'GET',
        data: {
        },
        error: function (xhr) {
            alert('Ajax request 發生錯誤');
        },
        success: function (data) { processTravelInfo(data, $("#startSite"), $("#endSite"), $("#date"), $("#price"), $("#bar")) },
        dataType: "json"
    });
}

function processTravelInfo(data, startSite, endSite, date, price, bar) {
    startSite.text(data.From);
    endSite.text(data.To);
    date.text(moment(data.Date).tz(moment.tz.guess()).format('MMMM Do YYYY, h:mm:ss a'));
    price.text(data.Price);

    from_code = data.From_Code;
    to_code = data.To_Code;

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
        },
        dataType: "json"
    });
}
function registerHandler() {
    $("#click").click(clickHandler);

    $("#checkout").click(function () {
        $("#result").slideUp("slow", function () {
            $("#contactInfo").fadeIn();
        });
    });

    $("#payment").click(function () {
        $("#contactInfo").slideUp("slow", function () {
            $("#creditCardInfo").fadeIn();
        });
    });

    $("#pay").click(paymentInfoHandler);

    $("#backToCreditCardInfoInput").click(function () {
        $("#creditCardVerifyError").slideUp("slow", function () {
            $("#creditCardVerifyInfo").fadeIn();
        });
    });
}
