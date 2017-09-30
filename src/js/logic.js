var site_code = {"from":"", "to":""};
var order_info = {"orderNumber":""};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        processTravelInfo: processTravelInfo,
        generatePaymentInfo: generatePaymentInfo,
    };
}

var REMOTE_SERVER = "http://ec2-13-115-146-214.ap-northeast-1.compute.amazonaws.com"


function clickHandler() {
    $.ajax({
        url: REMOTE_SERVER + '/API/Ticket/LoadingJourneys',
        type: 'GET',
        data: {
        },
        error: function (xhr) {
            alert('Ajax request 發生錯誤');
        },
        success: function (data) { processTravelInfo(data, $("#startSite"), $("#endSite"), $("#date"), $("#price"), $("#bar"), site_code)},
        dataType: "json"
    });
}

function processTravelInfo(data, startSite, endSite, date, price, bar, site_code) {
    startSite.text(data.From);
    endSite.text(data.To);
    date.text(moment(data.Date).tz(moment.tz.guess()).format('MMMM Do YYYY, h:mm:ss a'));
    price.text(data.Price / 100);

    site_code.from = data.From_Code;
    site_code.to = data.To_Code;

    bar.slideUp("slow", function () {
        $("#result").fadeIn();
    });
}

function generatePaymentInfo(cardNumber, expirationYear, expirationMonth, cvv, firstName, surname, email, birthDay, passcode) {
    var paymentInfo = {
        "From_Code": site_code.from,
        "To_Code": site_code.to,
        "Contactor": {
            "name": firstName + surname,
            "email": email,
            "phone": "",
            "address": "",
            "postcode": ""
        },
        "Passengers": [
            {
            "last_name": surname,
            "first_name": firstName,
            "birthdate": birthDay,
            "passport": passcode,
            "email": email,
            "phone": "",
            "gender": ""
            }
        ]
    }
    return paymentInfo;
}

function confirm() {
    
}

function payment() {

}

function booking() {
    $.ajax({
        url: REMOTE_SERVER + '/ticketDownloadLink',
        type: 'POST',
        data: generatePaymentInfo($("#cardNo").val(),
            $("#expirationYear").val(),
            $("#expirationMonth").val(),
            $("#cvv").val(),
            $("#firstName").val(),
            $("#surname").val(),
            $("#email").val(),
            $("#birthDay").val(),
            $("#passcode").val()),
        error: function (xhr) {
            alert('Ajax request 發生錯誤');
        },
        success: function (data) {
            order_info.orderNumber = data.id;
        },
        dataType: "json"
    });
}

function registerHandler() {
    $("#click").click(clickHandler);

    $("#retry").click(clickHandler);
    
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

    $("#pay").click(function() {
        $(this).hide();
        $("#loader").show();
        booking();
    });

    $("#backToCreditCardInfoInput").click(function () {
        $("#creditCardVerifyError").slideUp("slow", function () {
            $("#creditCardVerifyInfo").fadeIn();
        });
    });
}
