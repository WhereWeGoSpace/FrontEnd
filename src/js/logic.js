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

function registerHandler() {
    $("#click").click(clickHandler);

    $("#checkout").click(function () {
        $("#result").slideUp("slow", function () {
            $("#creditCardVerifyInfo").fadeIn();
        });
    });

    $("#pay").click(function () {
        $.ajax({
            url: REMOTE_SERVER + '/ticketDownloadLink',
            type: 'GET',
            data: {
                cardNumber: $("#cardNumber").val(),
                expirationDate: $("#expirationYear").val(),
                expirationDate: $("#expirationMonth").val(),
                cvv: $("#cvv").val(),
                salutation: $("#salutation").val(),
                firstName: $("#firstName").val(),
                surname: $("#surname").val(),
                email: $("#email").val(),
                streetnumber: $("#streetnumber").val(),
                townCity: $("#townCity").val(),
                country: $("#country").val(),
                postcode: $("#postcode").val(),
                birthDay: $("#birthDay").val(),
                passcode: $("#passcode").val(),
                phone: $("#phone").val(),
            },
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
    });

    $("#backToCreditCardInfoInput").click(function () {
        $("#creditCardVerifyError").slideUp("slow", function () {
            $("#creditCardVerifyInfo").fadeIn();
        });
    });
}
