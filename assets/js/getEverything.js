/*global $, addThings, moment, addPublisher*/
let sources;
let language;
let sort;
let search;
let multiple = [];

//Default Settings for Pagination
var currentPageSearch = 1;
var currentPageSizeSearch = 100;
var pageResultSearch;

//Search with Advanced Search
function getEverythingInfo(args) {

    //Clears search now message
    document.getElementById("output").innerHTML = "";

    var pgResults = document.getElementById("totalResultsInfoSearch");
    var writeInfo = document.getElementById("output");

    //Check if not using pagination
    if (args != "navigation") {
        currentPageSearch = 1;
        sort = $("#menuSortBy option:selected").attr("value");
        language = $("#menuLanguages option:selected").attr("value");
        sources = $("#menuSourcesAdvanced option:selected").attr("value");
        search = document.getElementById("adSearch").value;

        //This is to check if the Multiple Sources field is being used for searching
        if ($("#menuSourcesAdvanced option:selected").attr("value") == "many") {

            if (sources == multiple) {
                sources.toString();
            }
            else {
                sources = multiple;
                sources.toString();
            }

        }
        else {
            sources = $("#menuSourcesAdvanced option:selected").attr("value");
        }
    }

    //Code for checking the user input matches minimum search criteria for the API
    if (!args) {
        if (sources == "all" && language == "all" && !search) {
            $('#myModalTwo').modal('show');
            $(".modal-title").html("Invalid Search");
            $(".modal-body").html("Try refining the search criteria 1");
            console.log("1");
        }
        else if (sources == "all" && language != "all" && sort && !search) {
            $('#myModalTwo').modal('show');
            $(".modal-title").html("Invalid Search");
            $(".modal-body").html("Try refining the search criteria 2");
            console.log("2");
        }
        //Reloads the page if no sources are selected
        else if (sources == "" && multiple.length == 0) {
            window.location.href = 'advanced.html';
        }
        else {
            runNow();
        }
    }
    else {
        runNow();
    }

    function runNow() {

        //Show Loading Screen and Hide Navigation
        $(".searchMenu").hide();
        $("#loading").show();
        $(".menu-header").css("background-color", "#ffffff");

        var releases = [];
        var params = new Array();

        //Setting search parameters from user input
        params['sortBy'] = sort;
        params['sources'] = sources;
        params['language'] = language;
        params['q'] = search;
        params['page'] = currentPageSearch;

        //Sending up search parameters to the api
        addThings(params, function(response) {

            var searchParameters = response.articles;

            //Total Articles Found
            pageResultSearch = response.totalResults;

            //Code for Page Results
            if (!args) {
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

            //Iterating through the search results array
            searchParameters.forEach(function(entry) {
                var formatDate = entry.publishedAt;
                var responseDate = moment(formatDate).format('DD/MM/YYYY');

                var articleInfo = entry;

                //If no article image then use placeholder image
                if (articleInfo.urlToImage == null) {
                    articleInfo.urlToImage = "assets/images/empty.png";
                }

                //If no description then display default message
                if (articleInfo.description == null) {
                    articleInfo.description = "No Description";
                }

                //If no content returned via the api then use default message for link to the original article
                if (articleInfo.content == null) {
                    articleInfo.content = "Read More";
                }

                //Pushing HTML and Article Fields into an Array
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

            //No articles found
            if (searchParameters.length == 0) {
                writeInfo.innerHTML = `<h1 class="no-articles" align="center">No Articles Found</h1>`;

            }
            else {
                //Outputs the Search Results to the Page and gets rid of any commas from between each article
                writeInfo.innerHTML = releases.join('');
            }

            /*Ensures the Results are displayed*/
            pgResults.innerHTML = "<strong>Results: </strong>" + currentPageSizeSearch + " / " + pageResultSearch;

            //Show Navigation and Hide the Loading Screen
            $(".searchMenu").show();
            $("#loading").hide();
            $(".menu-header").css("background-color", "#f6f6f6");

            //Show and Hide Previous Button
            if (pageResultSearch <= 100 || currentPageSizeSearch <= 100) {
                $("button.prevButton").hide();
            }
            else {
                $("button.prevButton").show();
            }

            //Show and Hide Next Button
            if (pageResultSearch <= 100 || pageResultSearch == currentPageSizeSearch) {
                $("button.nextButton").hide();
            }
            else {
                $("button.nextButton").show();
            }
        });
    }
};

//Function for when source information changes
function sourceChange(sel) {

    //Get data from select field
    var writing = document.getElementById("checklist");

    var source = [];
    var args = [];

    if (sel.value == "many") {

        $('#selectModalTwo').modal('show');
        $(".modal-title").html("Choose Multiple Sources");

        if (multiple.length == 0 && writing != null) {

            //Populates the Multiple Sources Modal with all the Publishers
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

//Adds a value to an array to see what checkboxes have been checked
function checkBox(args) {

    //To get the value of the checked box
    var result = args.value;

    //To see if a box is checked
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
        //Puts all the checkbox choices in an array to be used for searches
        multiple.push(result);
    }

}


//Previous Button
function prevSearch() {

    //This is where the current list of pages and the total amount of articles is displayed
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

        //Search using pagination
        getEverythingInfo("navigation");
    }


}

//Next button
function nextSearch() {

    //This is where the current list of pages and the total amount of articles is displayed
    var pgResults = document.getElementById("totalResultsInfoSearch");

    if ((pageResultSearch / 100 > 1) && (pageResultSearch > currentPageSizeSearch)) {
        currentPageSearch++;
        currentPageSizeSearch = currentPageSizeSearch + 100;

        pgResults.innerHTML = "<strong>Results: </strong>" + currentPageSizeSearch + " / " + pageResultSearch;

        //Search using pagination
        getEverythingInfo("navigation");

        if (pageResultSearch - currentPageSizeSearch < 0) {

            currentPageSizeSearch = pageResultSearch;

            pgResults.innerHTML = "Results: " + currentPageSizeSearch + " / " + pageResultSearch;

        }
    }
}

$(document).ready(function() {

    //Setting Page Defaults
    document.getElementById("adSearch").value = "";
    document.getElementById("output").innerHTML = `<h1 class="no-articles" align="center">Search Now</h1>`;

    //Hiding the previous and next buttons
    $("button.nextButton").hide();
    $("button.prevButton").hide();
});
