/*global $, addPublisher, getHeadlineInfo, populateSources*/

//Variable for Git Pages
var gitPath = "/milestone-project-2";

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

        //For Github Pages Only
        if (window.location.pathname == gitPath + '/' || window.location.pathname == gitPath + '/index.html') {
            var sources = document.getElementById("menuSources");
        }

        else if (window.location.pathname == gitPath + '/advanced.html') {
            var sources = document.getElementById("menuSourcesAdvanced");
        }

        //For Local Server (Cloud 9)
        else if (window.location.pathname == '/' || window.location.pathname == '/index.html') {
            var sources = document.getElementById("menuSources");
        }

        else if (window.location.pathname == '/advanced.html') {
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
