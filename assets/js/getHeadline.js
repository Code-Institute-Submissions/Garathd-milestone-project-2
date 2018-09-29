/*global $, addHeadline, moment*/
var country;
var category;
var sources;

//Headline Stuff
var currentPageHeadline = 1;
var currentPageSizeHeadline = 100;
var pageResultHeadline;

function getHeadlineInfo(args) {

    var page = document.getElementById("pageNumberHeadline");
    var pageResults = document.getElementById("totalResultsInfoHeadline");
    var writeInfo = document.getElementById("output");


    //Check if pagnation
    if (args != "navigation") {
        //Clear Fields
        currentPageHeadline = 1;
        // pageResults.innerHTML = "<strong>Results: </strong>" + currentPageSize + " / " + pageResult;
        page.innerHTML = "<strong>Page: </strong>" + currentPageHeadline;
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
        $("#navigationHeadline").hide();
        $("#totalResultsInfoHeadline").hide();
        $("#pageNumberHeadline").hide();
        $("#loading").show();

        var releases = [];

        var params = new Array();

        params['country'] = country;
        params['category'] = category;
        params['sources'] = sources;
        params['q'] = search;
        params['page'] = currentPageHeadline;

        addHeadline(params, function(response) {

            var headlineParameters = response.articles;
            pageResultHeadline = response.totalResults;

            if (!args) {
                //Total Results for Pagnation    
                if (currentPageSizeHeadline > pageResultHeadline || pageResultHeadline <= 100) {
                    currentPageSizeHeadline = pageResultHeadline;
                    pageResults.innerHTML = "<strong>Results: </strong>" + currentPageSizeHeadline + " / " + pageResultHeadline;
                }
                else if (pageResultHeadline >= 100) {
                    currentPageSizeHeadline = 100;
                    pageResults.innerHTML = "<strong>Results: </strong>" + currentPageSizeHeadline + " / " + pageResultHeadline;
                }
                else if (currentPageSizeHeadline < pageResultHeadline) {
                    currentPageSizeHeadline = pageResultHeadline;
                    pageResults.innerHTML = "<strong>Results: </strong>" + currentPageSizeHeadline + " / " + pageResultHeadline;
                }
            }
            else if (args) {
                if (pageResultHeadline < currentPageSizeHeadline) {
                    currentPageSizeHeadline = pageResultHeadline;
                    pageResults.innerHTML = "<strong>Results: </strong>" + currentPageSizeHeadline + " / " + pageResultHeadline;
                }
            }
            else {
                pageResults.innerHTML = "<strong>Results: </strong>" + currentPageSizeHeadline + " / " + pageResultHeadline;
            }


            headlineParameters.forEach(function(entry) {
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
            writeInfo.innerHTML = releases.join('');
            $("#navigationHeadline").show();
            $("#totalResultsInfoHeadline").show();
            $("#pageNumberHeadline").show();
            $("#loading").hide();
        });
    }
};

function prevHeadline() {
    var pageResults = document.getElementById("totalResultsInfoHeadline");
    var page = document.getElementById("pageNumberHeadline");

    if (currentPageHeadline > 1) {
        currentPageHeadline--;
        currentPageSizeHeadline = currentPageSizeHeadline - 100;

        page.innerHTML = "<strong>Page: </strong>" + currentPageHeadline;
        pageResults.innerHTML = "<strong>Results: </strong>" + currentPageSizeHeadline + " / " + pageResultHeadline;

        getHeadlineInfo("navigation");
    }
}

function nextHeadline() {

    var pageResults = document.getElementById("totalResultsInfoHeadline");
    var page = document.getElementById("pageNumberHeadline");

    if ((pageResultHeadline / 100 > 1) && (pageResultHeadline > currentPageSizeHeadline)) {
        currentPageHeadline++;
        currentPageSizeHeadline = currentPageSizeHeadline + 100;

        getHeadlineInfo("navigation");

        page.innerHTML = "<strong>Page: </strong>" + currentPageHeadline;
        pageResults.innerHTML = "<strong>Results: </strong>" + currentPageSizeHeadline + " / " + pageResultHeadline;

        if (pageResultHeadline - currentPageSizeHeadline < 0) {

            currentPageSizeHeadline = pageResultHeadline;

            page.innerHTML = "Page: " + currentPageHeadline;
            pageResults.innerHTML = "Results: " + currentPageSizeHeadline + " / " + pageResultHeadline;

        }
    }
}

$(document).ready(function(){
    getHeadlineInfo("start"); 
});
