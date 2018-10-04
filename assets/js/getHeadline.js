/*global $, addHeadline, addPublisher, moment*/
let country;
let category;
let sources;
let search;
let multiple = [];


var currentPageHeadline = 1;
var currentPageSizeHeadline = 100;
var pageResultHeadline;

function getHeadlineInfo(args) {


    var pageResults = document.getElementById("totalResultsInfoHeadline");
    var writeInfo = document.getElementById("output");


    //Check if pagination has been used
    if (args != "navigation") {
        currentPageHeadline = 1;
        country = $("#menuCountry option:selected").attr("value");
        category = $("#menuCategory option:selected").attr("value");
        search = document.getElementById("searchBoxHeadline").value;

        if ($("#menuSources option:selected").attr("value") == "many") {

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
            sources = $("#menuSources option:selected").attr("value");
            multiple = [];
        }
    }

    //Default Settings and for Repopulating for no articles found
    if (args == "start") {
        country = "gb";
        search = "";
        $("#totalResultsInfoHeadline").hide();
    }
    else {
        $("#totalResultsInfoHeadline").show();
    }

    if (!args) {

        if (country == "all" && category == "all" && !search && sources == "all" && sources != "many") {

            $('#myModal').modal('show');
            $(".modal-title").html("Invalid Search");
            $(".modal-body").html("You must enter search data or at least choose a Country or Category or Source");

        }
        else if ((country != "all" || category != "all") && sources != "all") {

            $('#myModal').modal('show');
            $(".modal-title").html("Invalid Search");
            $(".modal-body").html("You cannot use search with sources if category and country are specified");

        }
        //Reloads the page but fixes an awkward problem
        else if (sources == "" && multiple.length == 0) {
         window.location.href = 'index.html';
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
        $(".headlineMenu").hide();
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

            //If no articles found
            if (headlineParameters.length == 0) {
                writeInfo.innerHTML = `<h1 class="no-articles" align="center">No Articles Found</h1>`;
            }
            else {
                writeInfo.innerHTML = releases.join('');
            }


            $(".headlineMenu").show();
            $("#loading").hide();

            //Check the Navigation
            if (pageResultHeadline <= 100 || currentPageSizeHeadline <= 100) {
                $("button.prevButton").hide();
            }
            else {
                $("button.prevButton").show();
            }


            if (pageResultHeadline <= 100 || pageResultHeadline == currentPageSizeHeadline) {
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

    var writing = document.getElementById("checklist");
    console.log("writing: " + writing);

    var source = [];
    var args = [];

    if (sel.value == "many") {

        $('#selectModal').modal('show');
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
    
    //This deletes a checkbox entry if box is unclicked
    if (!checked) {
        for (var a = 0; a < multiple.length; a++) {
            if (multiple[a] == result) {
                var index = multiple.indexOf(result);
                multiple.splice(index, 1);
            }
        }
    }
    else {
        multiple.push(result);
    }

}

function prevHeadline() {
    var pageResults = document.getElementById("totalResultsInfoHeadline");

    if (currentPageHeadline > 1) {
        currentPageHeadline--;

        var remainder = currentPageSizeHeadline % 100;


        if (remainder != 0) {
            currentPageSizeHeadline = currentPageSizeHeadline - remainder;
        }
        else {
            currentPageSizeHeadline = currentPageSizeHeadline - 100;
        }

        pageResults.innerHTML = "<strong>Results: </strong>" + currentPageSizeHeadline + " / " + pageResultHeadline;

        getHeadlineInfo("navigation");
    }
}

function nextHeadline() {


    var pageResults = document.getElementById("totalResultsInfoHeadline");

    if ((pageResultHeadline / 100 > 1) && (pageResultHeadline > currentPageSizeHeadline)) {
        currentPageHeadline++;
        currentPageSizeHeadline = currentPageSizeHeadline + 100;

        getHeadlineInfo("navigation");

        pageResults.innerHTML = "<strong>Results: </strong>" + currentPageSizeHeadline + " / " + pageResultHeadline;

        if (pageResultHeadline - currentPageSizeHeadline < 0) {

            currentPageSizeHeadline = pageResultHeadline;
            pageResults.innerHTML = "Results: " + currentPageSizeHeadline + " / " + pageResultHeadline;

        }
    }
}

$(document).ready(function() {
    getHeadlineInfo("start");
});
