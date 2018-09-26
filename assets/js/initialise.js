/*global apiSource,apiKey,$*/
const apiKey = "32ad11f7baf84533819d0089abe5c95c";
const apiSource = "https://newsapi.org/v2/";

/*------------------------------------------------------------------------------------*/
function SetSources(cb) {
    var apiCategory = "sources";

    var xhr = new XMLHttpRequest();

    xhr.open("GET", `${apiSource}${apiCategory}?&apiKey=${apiKey}`);
    xhr.send();

    xhr.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {

            cb(JSON.parse(this.responseText));
        }
    };
}
/*------------------------------------------------------------------------------------*/


function loadJSON(file, callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', file, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}


function getSources() {

    //Getting News Publisher Information
    SetSources(function(resources) {
        var sList = document.getElementById("sourceList");

        //List of News Sources
        var sourceList = [];
        var sources = resources.sources;
        sourceList.push(`<option default value="allSources">All News Sources</option>`);

        sources.forEach(function(entry) {
            sourceList.push(`<option value="${entry.id}">${entry.name}</option>`);
        });

        sList.innerHTML = `${sourceList}`;
    });
}

/*Initialise*/
getSources();
