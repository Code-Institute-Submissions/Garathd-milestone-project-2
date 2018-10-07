/*global apiSource,apiKey,$, getHeadlineInfo*/
function sendHeadlines(args, callback) {

    //Default url with page size of 100
    var url = `${apiSource}top-headlines?pageSize=100&`;

    //This function processes the api call
    var searchHeadline = function(args) {
        var xhr = new XMLHttpRequest();

        xhr.open("GET", url);
        xhr.send();

        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                callback(JSON.parse(this.responseText));
            }
        };
    }

    //This to check if no check have been selected
    if (!args.country && !args.category && !args.source && !args.q) {

        url += `country=gb&apiKey=${apiKey}`;
        searchHeadline(url);
    }

    else {

        //To check if a country has been selected
        if (args.country != "all" && args.country) {
            url += `country=${args.country}&`;
        }

        //To check if a category has been selected
        if (args.category != "all" && args.category) {
            url += `category=${args.category}&`;
        }

        //To check if a source has been selected
        if (args.sources != "all" && args.sources) {
            url += `sources=${args.sources}&`;
        }

        //To check if there is a search parameter 
        if (args.q) {
            url += `q=${args.q}&`;
        }
        
        //This is for pagination
        if (args.page > 1) {
            url += `page=${args.page}&`;
        }

        url += `apiKey=${apiKey}`;
        searchHeadline(url);

    }
}

//This function is called from the getHeadline.js file to send data to the api
function addHeadline(args, callback) {
    sendHeadlines(args, function(data) {
        var headline = data;
        callback(headline);
    })

};

$(document).ready(function() {
    //Populate the homepage with initial default data
    getHeadlineInfo("start");
});
