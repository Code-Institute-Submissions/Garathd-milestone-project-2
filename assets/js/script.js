/*global $, addPublisher, getPublisher, addHeadline, getHeadline, addThings moment*/

var country;
var category;
var sources;

// $("#menuCountry").change(function() {

// });

function getPublisherInfo() {


    var writeInfo = document.getElementById("output");

    var releases = [];


    var params = new Array();

    var country = "ie";
    var language = "en";
    var category = "general";
    var publisher;

    params['country'] = country;
    params['language'] = language;
    params['category'] = category;


    addPublisher(params, function(response) {
        response.forEach(function(entry) {

            var publisherInfo = entry;

            releases.push(`<div class="article-post">
                                <div class="row">
                                    <div class="col-md-3">
                                        <div class="picture">
                                            <p><strong>Name: </strong>${publisherInfo.name}</p>
                                            <p><strong>Category: </strong>${publisherInfo.category}</p>
                                            <p><strong>Language: </strong>${publisherInfo.language}</p>
                                            <p><strong>Country: </strong>${publisherInfo.country}</p>
                                        </div>
                                    </div>
                                    <div class="col-md-9">
                                        <div class="article-text">
                                            <div class="article-publish">
                                                <div class="article-publisher">
                                                    <div class="publisher-name">
                                                        <p><strong>Description:</strong> ${publisherInfo.description}</p>
                                                        <p><strong>Website:</strong> ${publisherInfo.url}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`);
            writeInfo.innerHTML = `${releases}`;
        });
    });
};

function getHeadlineInfo(args) {
    var writeInfo = document.getElementById("output");

    //Input Stuff
    country = $("#menuCountry option:selected").attr("value");
    category = $("#menuCategory option:selected").attr("value");
    sources = $("#menuSources option:selected").attr("value");
    var search = document.getElementById("searchBoxHeadline").value;


    if (!args) {
        if (country == "all" && category == "all" && sources == "all" && !search) {
            alert("You must enter search data or at least choose a Country or Category or Source");
        }
        else if ((country != "all" || category != "all") && sources != "all") {
            alert("You cannot use search with sources if category and country are specified");
        }
        else {
            runNow();
        }
    }
    else {


        runNow();
    }




    function runNow() {
        var releases = [];

        var params = new Array();

        params['country'] = country;
        params['category'] = category;
        params['sources'] = sources;
        params['q'] = search;

        addHeadline(params, function(response) {
            console.log("Check headline response: " + JSON.stringify(response));
            response.forEach(function(entry) {
                var formatDate = entry.publishedAt;
                var responseDate = moment(formatDate).format('DD/MM/YYYY');

                var articleInfo = entry;

                //Some Code Checks and Fixes
                if (articleInfo.urlToImage == null) {
                    articleInfo.urlToImage = "assets/images/empty.png";
                }

                if (articleInfo.author == null) {
                    articleInfo.author = "Unknown Author";
                }

                if (articleInfo.description == null) {
                    articleInfo.description = "Unknown Description";
                }

                releases.push(`<div class="article-post">
                        <div class="row">
                            <div class="col-md-3">
                                <div class="picture">
                                    <img src="${articleInfo.urlToImage}"></img>
                                </div>
                            </div>
                            <div class="col-md-9">
                                <div class="article-text">
                                    <div class="article-publish">
                                        <div class="article-publisher">
                                        <div class="publisher-name">
                                            <strong>News Source:</strong> ${articleInfo.source.name}
                                        </div>
                                        <div class="published-time">
                                        <strong>Date:</strong> ${responseDate}
                                        </div>
                                    </div>
                                    </div>
                                    <div class="article-title">${articleInfo.title}</div>
                                    <div class="article-description">${articleInfo.description}</div>
                                    <div class="article-author"><strong>Author:</strong> ${articleInfo.author}</div>
                                </div>
                            </div>
                        </div>
                    </div>`);
            });
            writeInfo.innerHTML = `${releases}`;
        });
    }
};


function getEverythingInfo() {
    var writeInfo = document.getElementById("output");

    var releases = [];

    var params = new Array();

    // var country = "gb";
    // var category = "general";
    var sources; // Up to 20 allowed
    var domains;
    var excludeDomains;
    var from;

    var q = "news";
    // var sources;


    // params['country'] = country;
    // params['category'] = category;
    params['q'] = q;

    addThings(params, function(response) {
        console.log("Check addThings response: " + JSON.stringify(response));
        response.forEach(function(entry) {
            var formatDate = entry.publishedAt;
            var responseDate = moment(formatDate).format('DD/MM/YYYY');

            var articleInfo = entry;

            //Some Code Checks and Fixes
            if (articleInfo.urlToImage == null) {
                articleInfo.urlToImage = "assets/images/empty.png";
            }

            if (articleInfo.author == null) {
                articleInfo.author = "Unknown Author";
            }

            if (articleInfo.description == null) {
                articleInfo.description = "Unknown Description";
            }

            releases.push(`<div class="article-post">
                        <div class="row">
                            <div class="col-md-3">
                                <div class="picture">
                                    <img src="${articleInfo.urlToImage}"></img>
                                </div>
                            </div>
                            <div class="col-md-9">
                                <div class="article-text">
                                    <div class="article-publish">
                                        <div class="article-publisher">
                                        <div class="publisher-name">
                                            <strong>News Source:</strong> ${articleInfo.source.name}
                                        </div>
                                        <div class="published-time">
                                        <strong>Date:</strong> ${responseDate}
                                        </div>
                                    </div>
                                    </div>
                                    <div class="article-title">${articleInfo.title}</div>
                                    <div class="article-description">${articleInfo.description}</div>
                                    <div class="article-author"><strong>Author:</strong> ${articleInfo.author}</div>
                                </div>
                            </div>
                        </div>
                    </div>`);
        });
        writeInfo.innerHTML = `${releases}`;
    });

};

$(document).ready(function() {

    /*Populate Sources Dropdown*/
    function populateSources() {

        var sources = document.getElementById("menuSources");
        var source = [];
        source.push("<option id='menuSourceItem' selected value='all'>All Sources</option>");

        var args = [];
        addPublisher(args, function(response) {
            response.forEach(function(entry) {
                source.push(`<option id="menuSourceItem" value="${entry.id}">${entry.name}</option>`);
                sources.innerHTML = `${source}`;
            });
        });
    }
    populateSources();
    getHeadlineInfo("start");
});
