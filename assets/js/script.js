/*global $, addPublisher, getHeadlineInfo, populateSources*/

//Sets default location
var website = window.location.href;
var path = window.location.pathname;

console.log("http address: " + website);
console.log("pathname: " + path);
console.log("combined: "+ website+path);


//Navigates to homepage
function searchHeadline() {
    window.location.href = 'index.html';
}

//Navigates to advanced search page
function advancedSearch() {
    window.location.href = 'advanced.html';
}

$(document).ready(function() {

    /*Populate Sources Dropdown*/
    function populateSources() {


        //Checks which page has been selected
        if (window.location.pathname == website || window.location.pathname == website + '/index.html') {
            var sources = document.getElementById("menuSources");
        }

        else if (window.location.pathname == website + '/advanced.html') {
            var sources = document.getElementById("menuSourcesAdvanced");
        }

        var source = [];
        var args = [];

        //Setting up some default select options for sources select field
        source.push("<option selected value='all'>All Sources</option>");
        source.push("<option value='many'>Multiple Sources</option>");

        //Populates the sources select field
        addPublisher(args, function(response) {
            response.forEach(function(entry) {
                source.push(`<option value="${entry.id}">${entry.name}</option>`);
                sources.innerHTML = source.join('');
            });
        });
    }

    //Populates the sources select field upon start up
    populateSources();
});
