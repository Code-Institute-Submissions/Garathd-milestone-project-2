/*global apiSource,apiKey,$*/


var headlineInfo;

const headlines = {

    getHeadlineInfo() {
        return headlineInfo;
    },

    setHeadlineInfo(args) {
        headlineInfo = args;
    }
};


function sendHeadlines(args, callback) {

    var url = `${apiSource}top-headlines?pageSize=100&`;
    var args = args;


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

        url += `&apiKey=${apiKey}`;
        searchHeadline(url);
    }

    else {

        if (args.country != "all" && args.country) {
            console.log("country exists");
            url += `country=${args.country}&`;
        }

        if (args.category != "all" && args.category) {
            console.log("category exists");
            url += `category=${args.category}&`;
        }

        if (args.sources != "all" && args.sources) {
            console.log("sources exists");
            url += `sources=${args.sources}&`;
        }

        if (args.q) {
            console.log("q exists");
            url += `q=${args.q}&`;
        }
        if(args.page > 1){
            url += `page=${args.page}&`;
        }

        url += `apiKey=${apiKey}`;
        searchHeadline(url);

    }

}

function addHeadline(args, callback) {

    console.log("headline country: " + args.country);
    console.log("headline category: " + args.category);
    console.log("headline source: " + args.source);
    console.log("headline q: " + args.q);

    sendHeadlines(args, function(data) {
        console.log("data: " + JSON.stringify(data));
        var headline = data;
        callback(headline);
        headlines.setHeadlineInfo(headline);
    })

};

function getHeadline() {
    return headlineInfo;
}

function enableHeadline() {
    $("#headlineSearch").show();
};
