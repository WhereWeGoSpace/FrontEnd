
$(function () {
    $("#click").click(function () {
        $.get("http://localhost:3000/travelInfo", function (data) {
            $("#startSite").text(data[0].startSite);
            $("#endSite").text(data[0].endSite);
            $("#date").text(data[0].date);
            $("#price").text(data[0].price);

            $("#bar").slideUp("slow", function () {
                $("#result").fadeIn();
            });
        });
    });

    $("#checkout").click(function () {
        $("#result").slideUp("slow", function () {
            $("#checkout  ").fadeIn();
        });
    });

    $("#pay").click(function () {
        var that = this;
        $.get("http://localhost:3000/ticketDownloadLink", function (data) {
            window.open(data.url, "_blank");
        });
    });
});
