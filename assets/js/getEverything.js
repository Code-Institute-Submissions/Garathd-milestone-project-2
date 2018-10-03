/*global $, addThings, moment, addPublisher*/
let sources;
let language;
let sort;
let search;
let multiple = [];


var currentPageSearch = 1;
var currentPageSizeSearch = 100;
var pageResultSearch;

function getEverythingInfo(args) {

    //Clear to default
    document.getElementById("output").innerHTML = "";

    var pgResults = document.getElementById("totalResultsInfoSearch");
    var writeInfo = document.getElementById("output");

    //Check if page was not entered via pagnation
    if (args != "navigation") {
        currentPageSearch = 1;
        sort = $("#menuSortBy option:selected").attr("value");
        language = $("#menuLanguages option:selected").attr("value");
        sources = $("#menuSourcesAdvanced option:selected").attr("value");
        search = document.getElementById("adSearch").value;


        if ($("#menuSourcesAdvanced option:selected").attr("value") == "many") {

            if (sources == multiple) {
                sources.toString();
            }
            else {
                sources = multiple;
                sources.toString();
                multiple = [];
            }
        }
        else {
            sources = $("#menuSourcesAdvanced option:selected").attr("value");
            multiple = [];
        }
    }


    console.log("sources: " + sources);
    console.log("language: " + language);
    console.log("sort: " + sort);


    if (!args) {
        if (sources == "all" && language == "all" && !search) {
            $('#myModalTwo').modal('show');
            $(".modal-title").html("Invalid Search");
            $(".modal-body").html("Try refining the search criteria 1");
        }
        else if (sources == "all" && language != "all" && sort && !search) {
            $('#myModalTwo').modal('show');
            $(".modal-title").html("Invalid Search");
            $(".modal-body").html("Try refining the search criteria 2");
        }
        else if (sources == "" && multiple.length == 0) {
            //fix for empty multiple choices
            sources = "many";
            console.log("running many test");
            runNow();
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
                writeInfo.innerHTML = `<h1 class="no-articles" align="center">No Articles Found</h1>`;

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


function sourceChange(sel) {

    console.log("check sel: " + sel.value);

    var writing;

    writing = document.getElementById("checklist");

    var source = [];
    var args = [];

    if (sel.value == "many") {

        $('#selectModalTwo').modal('show');
        $(".modal-title").html("Choose Multiple Sources");

        if (multiple.length == 0 && writing != null) {

            addPublisher(args, function(response) {
                response.forEach(function(entry) {
                    source.push(`<li class="multiple-item"><label>${entry.name}</label><input type="checkbox" id="myCheck" value="${entry.id}" onclick="checkBox(this)"></li>`);
                    source.join("");
                    writing.innerHTML = source.join('');
                });
            });

        }
    }

}

function checkBox(args) {

    var result = args.value;
    var checked = args.checked;

    console.log("value: " + result);
    console.log("checked: " + checked);

    if (!checked) {
        for (var a = 0; a < multiple.length; a++) {
            if (multiple[a] == result) {
                console.log("already exists");
                var index = multiple.indexOf(result);
                multiple.splice(index, 1);
            }
        }
    }
    else {
        multiple.push(result);
    }

    console.log("array: " + JSON.stringify(multiple));

}



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
    document.getElementById("adSearch").value = "";
    document.getElementById("output").innerHTML = `<h1 class="no-articles" align="center">Search Now</h1>`;
    $("button.nextButton").hide();
    $("button.prevButton").hide();
});
