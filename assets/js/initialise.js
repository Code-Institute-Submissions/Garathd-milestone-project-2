/* global $*/
const apiKey = "32ad11f7baf84533819d0089abe5c95c";
const apiSource = "https://newsapi.org/v2/";
const gitPage = "https://garathd.github.io/milestone-project-2/";
/*-----------------------------------------------*/

var homepage;
var host;


//For Github Pages Only
if (window.location.pathname == gitPage || window.location.pathname == gitPage + 'index.html') {
    host = "server";
    console.log("Home Page Server");
}

else if (window.location.pathname == gitPage + 'advanced.html') {
    host = "server";
    console.log("Advanced Page Server");

}

//For Local Server (Cloud 9)
else if (window.location.pathname == '/' || window.location.pathname == '/index.html') {
    host = "local";
    homepage = true;
    console.log("Home Page Local");
}

else if (window.location.pathname == '/advanced.html') {
    host = "local";
    homepage = false;
    console.log("Advanced Page Local");
}


//Getting JSON Data for the Select Fields
function getMenuItems(callback) {

    var array = new Array();

    console.log("Running...");

    $.getJSON("assets/data/menu.json", function(data) {
        $.each(data, function(index, value) {
            array.push(value);
        });
        callback(array);
    });
};

//Regex for alphanumeric data only used on search fields
function alphanumericsonly(ob) {
    var invalidChars = /([^A-Za-z0-9])/
    if (invalidChars.test(ob.value)) {
        ob.value = ob.value.replace(invalidChars, "");
    }
};

//Shows and Hides the scroll to top button
$(window).scroll(function() {
    if ($(this).scrollTop() > 300) {
        $('.scrollTop').show();
    }
    else {
        $('.scrollTop').hide();
    }
});


$(document).ready(function() {

    //Initially hide the loading screen and the scroll to top button
    $("#loading").hide();
    $('.scrollTop').hide();

    //Scroll to top button
    var scrollTop = $(".scrollTop");

    $(scrollTop).click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
        return false;

    });

    //By Default hide the previous and next buttons
    $("button.nextButton").hide();
    $("button.prevButton").hide();
});
