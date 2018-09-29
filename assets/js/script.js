/*global $, addPublisher, getHeadlineInfo*/

function searchHeadline() {
    $("#headlineMenu").show();
    $("#searchMenu").hide();
}

function advancedSearch() {
    $("#headlineMenu").hide();
    $("#searchMenu").show();
}

$(document).ready(function() {

    /*Populate Sources Dropdown*/
    function populateSources() {

        var sources = document.getElementById("menuSources");
        var sourcesAd = document.getElementById("menuSourcesAdvanced");

        var source = [];
        source.push("<option id='menuSourceItem' selected value='all'>All Sources</option>");

        var args = [];
        addPublisher(args, function(response) {
            response.forEach(function(entry) {
                source.push(`<option id="menuSourceItem" value="${entry.id}">${entry.name}</option>`);
                sourcesAd.innerHTML = `${source}`;
                sources.innerHTML = `${source}`;
            });
        });
    }
    populateSources();
  
    $("#searchMenu").hide();
});
