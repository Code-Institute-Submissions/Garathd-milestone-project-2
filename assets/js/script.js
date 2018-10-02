/*global $, addPublisher, getHeadlineInfo*/

function searchHeadline() {
    window.location.href = 'index.html';
}

function advancedSearch() {
    window.location.href = 'advanced.html';
}

$(document).ready(function() {

    /*Populate Sources Dropdown*/
    function populateSources() {


        //Checks which page has been selected
        if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
            var sources = document.getElementById("menuSources");
        }

        else if (window.location.pathname === '/advanced.html') {
            var sources = document.getElementById("menuSourcesAdvanced");
        }


        var source = [];
        source.push("<option id='menuSourceItem' selected value='all'>All Sources</option>");
        source.push("<option id='menuSourceItem' value='many'>Multiple Sources</option>");

        var args = [];
        addPublisher(args, function(response) {
            response.forEach(function(entry) {
                source.push(`<option id="menuSourceItem" value="${entry.id}">${entry.name}</option>`);
                sources.innerHTML = `${source}`;
            });
        });
    }
    populateSources();

});
