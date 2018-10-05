/* global $*/
const apiKey = "32ad11f7baf84533819d0089abe5c95c";
const apiSource = "https://newsapi.org/v2/";
/*-----------------------------------------------*/

function getMenuItems(callback) {

    var array = new Array();

    $.getJSON("assets/data/menu.json", function(data) {
        $.each(data, function(index, value) {
            array.push(value);
        });
        callback(array);
    });
};

$(window).scroll(function() {
    if ($(this).scrollTop() > 300) {
        $('.scrollTop').show();
    }
    else {
        $('.scrollTop').hide();
    }
});


$(document).ready(function() {

    //$("#headlineSearch").hide();
    $("#loading").hide();
    $('.scrollTop').hide();

    var scrollTop = $(".scrollTop");

    $(scrollTop).click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
        return false;

    });

    $("button.nextButton").hide();
    $("button.prevButton").hide();

});
