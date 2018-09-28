/*global $, addPublisher, getPublisher, addHeadline, getHeadline, addThings moment*/

var country;
var category;
var sources;
var currentPage = 1;
var currentPageSize = 100;
var pageResult;

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

    var page = document.getElementById("pageNumber");
    var pageResults = document.getElementById("totalResultsInfo");
    var writeInfo = document.getElementById("output");


    //Check if pagnation
    if (args != "navigation") {
        //Clear Fields
        currentPage = 1;
        // pageResults.innerHTML = "<strong>Results: </strong>" + currentPageSize + " / " + pageResult;
        page.innerHTML = "<strong>Page: </strong>" + currentPage;
        /*End Clear Fields*/
    }

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

        //Show Loading Screen and hide Navigation
        $("#navigation").hide();
        $("#totalResultsInfo").hide();
        $("#pageNumber").hide();
        $("#loading").show();

        var releases = [];

        var params = new Array();

        params['country'] = country;
        params['category'] = category;
        params['sources'] = sources;
        params['q'] = search;
        params['page'] = currentPage;

        addHeadline(params, function(response) {

            var headlineParameters = response.articles;
            pageResult = response.totalResults;

            // page.innerHTML = "<strong>Page: </strong>" + currentPage;



            if (!args) {
                //Total Results for Pagnation    
                if (currentPageSize > pageResult || pageResult <= 100) {
                    currentPageSize = pageResult;
                    pageResults.innerHTML = "<strong>Results: </strong>" + currentPageSize + " / " + pageResult;
                }
                else if (pageResult >= 100) {
                    currentPageSize = 100;
                    pageResults.innerHTML = "<strong>Results: </strong>" + currentPageSize + " / " + pageResult;
                }
                else if (currentPageSize < pageResult) {
                    currentPageSize = pageResult;
                    pageResults.innerHTML = "<strong>Results: </strong>" + currentPageSize + " / " + pageResult;
                }
            }
            else if (args) {
                if (pageResult < currentPageSize) {
                    currentPageSize = pageResult;
                    pageResults.innerHTML = "<strong>Results: </strong>" + currentPageSize + " / " + pageResult;
                }
            }
            else {
                pageResults.innerHTML = "<strong>Results: </strong>" + currentPageSize + " / " + pageResult;
            }


            headlineParameters.forEach(function(entry) {
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
            $("#navigation").show();
            $("#totalResultsInfo").show();
            $("#pageNumber").show();
            $("#loading").hide();
        });
    }
};


function getEverythingInfo() {
    var writeInfo = document.getElementById("output");

    var releases = [];

    var params = new Array();

    // var country = "gb";
    // var category = "general";
    // var sources; // Up to 20 allowed
    // var domains;
    // var excludeDomains;
    // var from;
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


function prev() {
    var pageResults = document.getElementById("totalResultsInfo");
    var page = document.getElementById("pageNumber");

    if (currentPage > 1) {
        currentPage--;
        currentPageSize = currentPageSize - 100;

        page.innerHTML = "<strong>Page: </strong>" + currentPage;
        pageResults.innerHTML = "<strong>Results: </strong>" + currentPageSize + " / " + pageResult;

        getHeadlineInfo("navigation");
    }


}

function next() {

    var pageResults = document.getElementById("totalResultsInfo");
    var page = document.getElementById("pageNumber");

    if ((pageResult / 100 > 1) && (pageResult > currentPageSize)) {
        currentPage++;
        currentPageSize = currentPageSize + 100;

        page.innerHTML = "Page: " + currentPage;
        pageResults.innerHTML = "Results: " + currentPageSize + " / " + pageResult;

        if (pageResult - currentPageSize < 0) {

            currentPageSize = pageResult;

            page.innerHTML = "Page: " + currentPage;
            pageResults.innerHTML = "Results: " + currentPageSize + " / " + pageResult;

        }
    }

    getHeadlineInfo("navigation");
}

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
