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

    //This function processes the api call
    var searchPublisher = function(args) {
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
    if (!args.country && !args.language && !args.category) {

        url += `&apiKey=${apiKey}`;
        searchPublisher(url);
    }

    else {

        if (args.country) {
            url += `country=${args.country}&`;
        }

        if (args.category) {
            url += `category=${args.category}&`;
        }

        if (args.language) {
            url += `language=${args.language}&`;
        }

        url += `apiKey=${apiKey}`;
        searchPublisher(url);

    }
}

function addPublisher(args, callback) {

    sendPublisher(args, function(data) {
        var publishers = data.sources;
        callback(publishers);
        publisher.setPublisherInfo(publishers);
    });
};


function getPublisher() {
    return publisherInfo;
}

