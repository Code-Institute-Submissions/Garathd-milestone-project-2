/*global apiSource,apiKey*/
function sendThings(args, callback) {

    //Default url with page size of 100
    var url = `${apiSource}everything?pageSize=100&`;

    //This function processes the api call
    var searchEverything = function(args) {
        var xhr = new XMLHttpRequest();

        xhr.open("GET", url);
        xhr.send();

        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                callback(JSON.parse(this.responseText));
            }
        };
    };
    
    //To check if a source has been selected
    if (args.sources != "all" && args.sources) {
        url += `sources=${args.sources}&`;
    }

    //To check if a language has been selected
    if (args.language != "all" && args.language) {
        url += `language=${args.language}&`;
    }

    //To check what type of sortBy has been selected
    if (args.sortBy) {
        url += `sortBy=${args.sortBy}&`;
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
    searchEverything(url);
}

//This function is called from the getEverything.js file to send data to the api
function addThings(args, callback) {
    sendThings(args, function(data) {
        var everything = data;
        callback(everything);
    });

}
