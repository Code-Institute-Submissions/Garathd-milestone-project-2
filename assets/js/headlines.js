/*global apiSource,apiKey,$, getHeadlineInfo*/
function sendHeadlines(args, callback) {

    var url = `${apiSource}top-headlines?pageSize=100&`;
  
    //This function processes the api call
    var searchHeadline = function(args) {
        var xhr = new XMLHttpRequest();

        console.log("url: " + url);

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

        if (args.country != "all" && args.country) {
            url += `country=${args.country}&`;
        }

        if (args.category != "all" && args.category) {
            url += `category=${args.category}&`;
        }

        if (args.sources != "all" && args.sources) {
            url += `sources=${args.sources}&`;
        }

        if (args.q) {
            url += `q=${args.q}&`;
        }
        if (args.page > 1) {
            url += `page=${args.page}&`;
        }

        url += `apiKey=${apiKey}`;
        searchHeadline(url);

    }

}

function addHeadline(args, callback) {
    sendHeadlines(args, function(data) {
        var headline = data;
        callback(headline);
    })

};

$(document).ready(function(){
    getHeadlineInfo("start"); 
});