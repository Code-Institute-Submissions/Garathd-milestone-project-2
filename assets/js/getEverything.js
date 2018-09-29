/*global $, addThings, moment*/

var sources;
var language;
var sort;

//Search Stuff
var currentPageSearch = 1;
var currentPageSizeSearch = 100;
var pageResultSearch;


function getEverythingInfo(args) {

    var pageSearch = document.getElementById("pageNumberSearch");
    var pageResultsSearch = document.getElementById("totalResultsInfoSearch");
    var writeInfo = document.getElementById("output");

    //Check if pagnation
    if (args != "navigation") {
        //Clear Fields
        currentPageSearch = 1;
        // pageResults.innerHTML = "<strong>Results: </strong>" + currentPageSize + " / " + pageResult;
        pageSearch.innerHTML = "<strong>Page: </strong>" + currentPageSearch;
        /*End Clear Fields*/
    }


    //Input Stuff
    sort = $("#menuSortBy option:selected").attr("value");
    language = $("#menuLanguages option:selected").attr("value");
    sources = $("#menuSourcesAdvanced option:selected").attr("value");
    var search = document.getElementById("adSearch").value;

    if (!args) {
        if (sources == "all" && language == "all" && sort && !search) {
            alert("Try refining the search");
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
        $("#navigationSearch").hide();
        $("#totalResultsInfoSearch").hide();
        $("#pageNumberSearch").hide();
        $("#loading").show();

        var releases = [];

        var params = new Array();

        params['sortBy'] = sort;
        params['sources'] = sources;
        params['language'] = language;
        params['q'] = search;

        addThings(params, function(response) {

            pageResultSearch = response.totalResults;

            if (!args) {
                //Total Results for Pagnation    
                if (currentPageSizeSearch > pageResultSearch || pageResultSearch <= 100) {
                    currentPageSizeSearch = pageResultSearch;
                    pageResultsSearch.innerHTML = "<strong>Results: </strong>" + currentPageSizeSearch + " / " + pageResultSearch;
                }
                else if (pageResultSearch >= 100) {
                    currentPageSizeSearch = 100;
                    pageResultsSearch.innerHTML = "<strong>Results: </strong>" + currentPageSizeSearch + " / " + pageResultSearch;
                }
                else if (currentPageSizeSearch < pageResultSearch) {
                    currentPageSizeSearch = pageResultSearch;
                    pageResultsSearch.innerHTML = "<strong>Results: </strong>" + currentPageSizeSearch + " / " + pageResultSearch;
                }
            }
            else if (args) {
                if (pageResultSearch < currentPageSizeSearch) {
                    currentPageSizeSearch = pageResultSearch;
                    pageResultsSearch.innerHTML = "<strong>Results: </strong>" + currentPageSizeSearch + " / " + pageResultSearch;
                }
            }
            else {
                pageResultsSearch.innerHTML = "<strong>Results: </strong>" + currentPageSizeSearch + " / " + pageResultSearch;
            }

            response.forEach(function(entry) {
                var formatDate = entry.publishedAt;
                var responseDate = moment(formatDate).format('DD/MM/YYYY');

                var articleInfo = entry;

                //Some Code Checks and Fixes
                if (articleInfo.urlToImage == null) {
                    articleInfo.urlToImage = "assets/images/empty.png";
                }

                if (articleInfo.description == null) {
                    articleInfo.description = "No Description";
                }

                if (articleInfo.content == null) {
                    articleInfo.content = "Read More";
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
                                    <div class="article-content"><a href="${articleInfo.url}" target="_blank">${articleInfo.content}</a></div>
                                </div>
                            </div>
                        </div>
                    </div>`);
            });
            writeInfo.innerHTML = `${releases}`;
            $("#navigationSearch").show();
            $("#totalResultsInfoSearch").show();
            $("#pageNumberHeadlineSearch").show();
            $("#loading").hide();
        });
    }
};

function prevSearch() {
    var pageResults = document.getElementById("totalResultsInfoSearch");
    var page = document.getElementById("pageNumberSearch");

    if (currentPageSearch > 1) {
        currentPageSearch--;
        currentPageSizeSearch = currentPageSizeSearch - 100;

        page.innerHTML = "<strong>Page: </strong>" + currentPageSearch;
        pageResults.innerHTML = "<strong>Results: </strong>" + currentPageSizeSearch + " / " + pageResultSearch;

        getEverythingInfo("navigation");
    }


}

function nextSearch() {

    var pageResults = document.getElementById("totalResultsInfoSearch");
    var page = document.getElementById("pageNumberSearch");

    if ((pageResultSearch / 100 > 1) && (pageResultSearch > currentPageSizeSearch)) {
        currentPageSearch++;
        currentPageSizeSearch = currentPageSizeSearch + 100;

        getEverythingInfo("navigation");

        page.innerHTML = "<strong>Page: </strong>" + currentPageSearch;
        pageResults.innerHTML = "<strong>Results: </strong>" + currentPageSizeSearch + " / " + pageResultSearch;

        if (pageResultSearch - currentPageSizeSearch < 0) {

            currentPageSizeSearch = pageResultSearch;

            page.innerHTML = "Page: " + currentPageSearch;
            pageResults.innerHTML = "Results: " + currentPageSizeSearch + " / " + pageResultSearch;

        }
    }
}
