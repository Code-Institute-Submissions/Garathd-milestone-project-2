/*global $, addThings, moment*/

var sources;
var language;
var sort;

//Search Stuff
var currentPageSearch = 1;
var currentPageSizeSearch = 100;
var pageResultSearch;


//pagination measures
let sourcesP;
let languageP
let recentP;
let searchP;

function getEverythingInfo(args) {

    var pgResults = document.getElementById("totalResultsInfoSearch");
    var writeInfo = document.getElementById("output");

    sort = $("#menuSortBy option:selected").attr("value");
    language = $("#menuLanguages option:selected").attr("value");
    sources = $("#menuSourcesAdvanced option:selected").attr("value");
    var search = document.getElementById("adSearch").value;

    //Check if page was not entered via pagnation
    if (args != "navigation") {
        currentPageSearch = 1;
    }
    
    //Setting Default Search Text
    if (args == "start") {
        $('#adSearch').val("News");
    }

    if (!args) {
        if (sources == "all" && language == "all" && sort && !search) {
            $('#myModalTwo').modal('show');
            $(".modal-title").html("Invalid Search");
            $(".modal-body").html("Try refining the search criteria");
        }
        else if (sources == "all" && language != "all" && sort && !search) {
            $('#myModalTwo').modal('show');
            $(".modal-title").html("Invalid Search");
            $(".modal-body").html("Try refining the search criteria");
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
        $(".searchMenu").hide();
        $("#loading").show();

        var releases = [];
        var params = new Array();

        params['sortBy'] = sort;
        params['sources'] = sources;
        params['language'] = language;
        params['q'] = search;
        params['page'] = currentPageSearch;

        //pagination measures
        sourcesP = sources;
        languageP = language;
        recentP = sort;
        searchP = search;

        addThings(params, function(response) {

            var searchParameters = response.articles;

            pageResultSearch = response.totalResults;

            if (!args) {
                //Total Results for Pagnation    
                if (currentPageSizeSearch > pageResultSearch || pageResultSearch <= 100) {
                    currentPageSizeSearch = pageResultSearch;

                    pgResults.innerHTML = "<strong>Results: </strong>" + currentPageSizeSearch + " / " + pageResultSearch;
                }
                else if (pageResultSearch >= 100) {
                    currentPageSizeSearch = 100;
                    pgResults.innerHTML = "<strong>Results: </strong>" + currentPageSizeSearch + " / " + pageResultSearch;
                }
                else if (currentPageSizeSearch < pageResultSearch) {
                    currentPageSizeSearch = pageResultSearch;
                    pgResults.innerHTML = "<strong>Results: </strong>" + currentPageSizeSearch + " / " + pageResultSearch;
                }
            }
            else if (args) {
                if (pageResultSearch < currentPageSizeSearch) {
                    currentPageSizeSearch = pageResultSearch;
                    pgResults.innerHTML = "<strong>Results: </strong>" + currentPageSizeSearch + " / " + pageResultSearch;
                }
                else if (currentPageSizeSearch == 0) {
                    currentPageSizeSearch = 100;
                    pgResults.innerHTML = "<strong>Results: </strong>" + currentPageSizeSearch + " / " + pageResultSearch;
                }
            }
            else {
                pgResults.innerHTML = "<strong>Results: </strong>" + currentPageSizeSearch + " / " + pageResultSearch;
            }


            searchParameters.forEach(function(entry) {
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

            //If no articles found
            if (searchParameters.length == 0) {
                writeInfo.innerHTML = `<h1 class="no-articles" align="center">No Articles Found!!!</h1>`;
            }
            else {
                writeInfo.innerHTML = releases.join('');
            }

            /*Ensures the Results are dispplayed*/
            pgResults.innerHTML = "<strong>Results: </strong>" + currentPageSizeSearch + " / " + pageResultSearch;

            $(".searchMenu").show();
            $("#loading").hide();

            //Check the Navigation
            if (pageResultSearch <= 100 || currentPageSizeSearch <= 100) {
                $("button.prevButton").hide();
            }
            else {
                $("button.prevButton").show();
            }


            if (pageResultSearch <= 100 || pageResultSearch == currentPageSizeSearch) {
                $("button.nextButton").hide();
            }
            else {
                $("button.nextButton").show();
            }
        });
    }
};

function prevSearch() {
    var pgResults = document.getElementById("totalResultsInfoSearch");

    if (currentPageSearch > 1) {
        currentPageSearch--;

        var remainder = currentPageSizeSearch % 100;


        if (remainder != 0) {
            currentPageSizeSearch = currentPageSizeSearch - remainder;
        }
        else {
            currentPageSizeSearch = currentPageSizeSearch - 100;
        }

        pgResults.innerHTML = "<strong>Results: </strong>" + currentPageSizeSearch + " / " + pageResultSearch;

        getEverythingInfo("navigation");
    }


}

function nextSearch() {



    var pgResults = document.getElementById("totalResultsInfoSearch");

    if ((pageResultSearch / 100 > 1) && (pageResultSearch > currentPageSizeSearch)) {
        currentPageSearch++;
        currentPageSizeSearch = currentPageSizeSearch + 100;

        pgResults.innerHTML = "<strong>Results: </strong>" + currentPageSizeSearch + " / " + pageResultSearch;

        getEverythingInfo("navigation");

        if (pageResultSearch - currentPageSizeSearch < 0) {

            currentPageSizeSearch = pageResultSearch;

            pgResults.innerHTML = "Results: " + currentPageSizeSearch + " / " + pageResultSearch;

        }
    }
}

$(document).ready(function() {
    getEverythingInfo("start");
});
