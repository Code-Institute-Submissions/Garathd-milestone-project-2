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
    if (!args.country && !args.category && !args.q) {
        console.log("No filter for Headlines");

        url += `&apiKey=${apiKey}`;
        searchEverything(url);
    }

    else {

        if (args.country) {
            console.log("country exists");
            url += `country=${args.country}&`;
        }

        if (args.category) {
            console.log("category exists");
            url += `category=${args.category}&`;
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

    console.log("everything country: " + args.country);
    console.log("headline category: " + args.category);
    console.log("headline q: " + args.q);

    sendThings(args, function(data) {
        var everything = data.articles;
        callback(everything);
        things.setEverythingInfo(everything);
    })

};

function getEverythingData() {
    return everythingInfo;
}
