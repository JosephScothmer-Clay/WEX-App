$("#datePicker").change(function() {
    getPictureOfDay();
});

function getPictureOfDay() {
    console.log("getPictureOfDay has been called")
    $("#imagess").empty();
    var date = $("#datePicker").val();
    $.ajax({
        url: apod_api + '?api_key=' + api_key + '&date=' + date,
        dataType: 'json',
        success: function (data) {
            console.log(data);
            $("<img style='height: 100%; width: 100%' />").attr("src", data.url).appendTo('#imagess');
        }
    });
}

var apod_api = "https://api.nasa.gov/planetary/apod";
var api_key = "PuZ2XV1YCeh84BIuz1taXfat7JDJmXGeeQjKtOG0";