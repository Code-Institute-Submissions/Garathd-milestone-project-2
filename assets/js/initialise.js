/* global $*/
const apiKey = "32ad11f7baf84533819d0089abe5c95c";
const apiSource = "https://newsapi.org/v2/";
/*-----------------------------------------------*/

function getMenuItems(params, callback) {

    var array = new Array();

    $.getJSON("assets/data/menu.json", function(data) {
        $.each(data, function(index, value) {
            array.push(value)
        });

        if (params == "categories") {
            callback(array[0]);
        }
        else if (params == "countries") {
            callback(array[1]);
        }
        else if (params == "languages") {
            callback(array[2]);
        }
        else {
            console.log("error....");
        }

    });


};
