/*global $, addPublisher, getHeadlineInfo, populateSources, gitPage*/

//Navigates to homepage
function searchHeadline() {
    window.location.href = 'index.html';
}

//Navigates to advanced search page
function advancedSearch() {
    window.location.href = 'advanced.html';
}

$(document).ready(function() {
    var sources;

    /*Populate Sources Dropdown*/
    function populateSources() {


        //Checks which page has been selected

        //For Github Pages Only
        if (window.location.pathname == gitPage + '/' || window.location.pathname == gitPage + 'index.html' || window.location.pathname == '/' || window.location.pathname == '/index.html') {
            sources = document.getElementById("menuSources");
        }

        else if (window.location.pathname == gitPage + '/advanced.html' || window.location.pathname == '/advanced.html') {
            sources = document.getElementById("menuSourcesAdvanced");
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
