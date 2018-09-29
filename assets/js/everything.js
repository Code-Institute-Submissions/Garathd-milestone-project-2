/*global apiSource,apiKey,$*/
function sendThings(args, callback) {

    var url = `${apiSource}everything?pageSize=100&`;

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
    if (args.sources == "all" && args.language == "all" && args.sortBy == "all" && !args.q) {
        url += `&apiKey=${apiKey}`;
        searchEverything(url);
    }

    //Covers Menu Navigation
    else if (args.sources == undefined && args.language == undefined && args.sortBy == undefined && !args.q) {
        url += `q=news&apiKey=${apiKey}`;
        searchEverything(url);
    }

    else {

        if (args.sources != "all" && args.sources) {
            url += `sources=${args.sources}&`;
        }

        if (args.language != "all" && args.language) {
            url += `language=${args.language}&`;
        }

        if (args.sortBy) {
            url += `sortBy=${args.sortBy}&`;
        }

        if (args.q) {
            url += `q=${args.q}&`;
        }

        if (args.page > 1) {
            url += `page=${args.page}&`;
        }

        url += `apiKey=${apiKey}`;
        searchEverything(url);
    }

}

function addThings(args, callback) {

    sendThings(args, function(data) {
        var everything = data;
        callback(everything);
    })

};
