/*global apiSource,apiKey,$*/
function sendPublisher(args, callback) {

    //Default url
    var url = `${apiSource}sources?&apiKey=${apiKey}`;
    
        var xhr = new XMLHttpRequest();

        xhr.open("GET", url);
        xhr.send();

        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                callback(JSON.parse(this.responseText));
            }
        };
}

//This is called from the script.js file and is used to populate select field
function addPublisher(args, callback) {
    sendPublisher(args, function(data) {
        var publishers = data.sources;
        callback(publishers);
    });
};
