/*global apiSource,apiKey,$*/


var publisherInfo;

const publisher = {

    getPublisherInfo() {
        return publisherInfo;
    },

    setPublisherInfo(args) {
        publisherInfo = args;
    }
};


function sendPublisher(args, callback) {

    var url = `${apiSource}sources?`;
    var args = args;


    //This function processes the api call
    var searchPublisher = function(args) {
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
    if (!args.country && !args.language && !args.category) {
        console.log("No filter for Publishers");

        url += `&apiKey=${apiKey}`;
        searchPublisher(url);
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

        if (args.language) {
            console.log("language exists");
            url += `language=${args.language}&`;
        }

        url += `apiKey=${apiKey}`;
        searchPublisher(url);

    }

}

function addPublisher(args, callback) {

    console.log("publisher country: " + args.country);
    console.log("publisher category: " + args.category);
    console.log("publisher language: " + args.language);

    sendPublisher(args, function(data) {
        var publishers = data.sources;
        callback(publishers);
        publisher.setPublisherInfo(publishers);
    });
};


function getPublisher() {
    return publisherInfo;
}

/*Populate Sources Dropdown*/
function populateSources(){
    
    var args;
    addPublisher(args, function(response){
        console.log("populate response");
    });
}


