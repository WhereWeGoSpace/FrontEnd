
$(function () {
    $("#click").click(function () {
        $.ajax({
            url: 'http://localhost:3000/travelInfo',
            type: 'GET',
            data: {
            },
            error: function(xhr) {
              alert('Ajax request 發生錯誤');
            },
            success: function(data) {
                let date = new Date(data[0].timestamp);

                $("#startSite").text(data[0].startSite);
                $("#endSite").text(data[0].endSite);
                $("#date").text(date.toLocaleDateString("en-US"));
                $("#price").text(data[0].price);
    
                $("#bar").slideUp("slow", function () {
                    $("#result").fadeIn();
                });
            }
        });
    });

    $("#checkout").click(function () {
        $("#result").slideUp("slow", function () {
            $("#creditCardVerifyInfo").fadeIn();
        });
    });

    $("#pay").click(function () {
        $.ajax({
            url: 'http://localhost:3000/ticketDownloadLink',
            type: 'GET',
            data: {
                cardNumber: $("#cardNumber").val(),
                expirationDate: $("#expirationDate").val(),
                verifyNumber: $("#verifyNumber").val()
            },
            error: function(xhr) {
              alert('Ajax request 發生錯誤');
            },
            success: function(data) {
                if (!data.success)
                {
                    $("#creditCardVerifyInfo").slideUp("slow", function () {
                        $("#creditCardVerifyError").fadeIn();
                    });
                }
                else
                {
                    window.open(data.url, "_blank");
                }
            }
        });
    });
    
    $("#backToCreditCardInfoInput").click(function () {
        $("#creditCardVerifyError").slideUp("slow", function () {
            $("#creditCardVerifyInfo").fadeIn();
        });
    });
});
