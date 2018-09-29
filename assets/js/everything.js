/*global apiSource,apiKey,$*/


var everythingInfo;

const things = {

    getEverythingInfo() {
        return everythingInfo;
    },

    setEverythingInfo(args) {
        everythingInfo = args;
    }
};


function sendThings(args, callback) {

    var url = `${apiSource}everything?`;
    var args = args;

    //This function processes the api call
    var searchEverything = function(args) {
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
    if (!args.sources && !args.language && !args.sortBy && !args.q) {
        console.log("No filter for Everything");

        url += `&apiKey=${apiKey}`;
        searchEverything(url);
    }

    else {

        if (args.sources != "all" && args.sources) {
            console.log("sources exists");
            url += `sources=${args.sources}&`;
        }

        if (args.language != "all" && args.language) {
            console.log("languages exists");
            url += `language=${args.language}&`;
        }

        if (args.sortBy) {
            console.log("sortBy exists");
            url += `sortBy=${args.sortBy}&`;
        }

        if (args.q) {
            console.log("q exists");
            url += `q=${args.q}&`;
        }

        url += `apiKey=${apiKey}`;
        searchEverything(url);
    }

}

function addThings(args, callback) {

    console.log("Check the args for search: " + args.q);

    sendThings(args, function(data) {

        console.log("Check everything response: " + JSON.stringify(data));
        var everything = data.articles;
        callback(everything);
        things.setEverythingInfo(everything);
    })

};

function getEverythingData() {
    return everythingInfo;
}
