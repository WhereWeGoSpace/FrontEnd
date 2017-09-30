var site_code = {"from":"", "to":""};
var order_info = {"bookingID":"", "orderID":""};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        processTravelInfo: processTravelInfo,
        generatePaymentInfo: generatePaymentInfo,
        generateBookingInfo: generateBookingInfo,
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
            clickHandler();
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

function generatePaymentInfo(cardNumber, expirationYear, expirationMonth, cvv, order_info) {
    var paymentInfo = {
        "BookingId": order_info.bookingID,
        "CreditCard": {
          "number": cardNumber,
          "exp_month": expirationMonth,
          "exp_year": expirationYear,
          "cvv": cvv
        }
      };
    return paymentInfo;
}

function generateBookingInfo(firstName, surname, email, birthDay, passcode, site_code) {
    var bookingInfo = {
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
    };
    return bookingInfo;
}

function downloadTicket() {
    
    $.ajax({
        url: REMOTE_SERVER + '/api/Ticket/IssueTicket',
        type: 'POST',
        data: { "orderId": order_info.orderID },
        error: function (xhr) {
            alert('Ajax request 發生錯誤');
        },
        success: function (data) {
            console.log(data);
            for (var i in data)
            {
                window.open(data[i], "_blank");
            }
        },
        dataType: "json"
    });
}

function payment() {
    $.ajax({
        url: REMOTE_SERVER + '/api/Ticket/Payment',
        type: 'POST',
        data: generatePaymentInfo(
            $("#cardNumber").val(),
            $("#expirationYear").val(),
            $("#expirationMonth").val(),
            $("#cvv").val(),
            order_info),
        error: function (xhr) {
            alert('Ajax request 發生錯誤');
        },
        success: function (data) {
            console.log(data)
            order_info.orderID = data.order.id;
            downloadTicket();
        },
        dataType: "json"
    });
}

function booking() {
    $.ajax({
        url: REMOTE_SERVER + '/api/Ticket/Booking',
        type: 'POST',
        data: generateBookingInfo(
            $("#firstName").val(),
            $("#surname").val(),
            $("#email").val(),
            $("#birthDay").val(),
            $("#passcode").val(),
            site_code),
        error: function (xhr) {
            alert('Ajax request 發生錯誤');
        },
        success: function (data) {
            console.log(data);
            order_info.bookingID = data.id;
            payment();
        },
        dataType: "json"
    });
}

function registerHandler() {
    $("#click").click(function() {
        $(this).hide();
        $("#searchLoader").show();
        clickHandler();
    });

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
