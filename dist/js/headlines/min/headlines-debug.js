/* global $*/
const apiKey = "32ad11f7baf84533819d0089abe5c95c";
const apiSource = "https://newsapi.org/v2/";
/*-----------------------------------------------*/

function getMenuItems(callback) {

    var array = new Array();

    $.getJSON("assets/data/menu.json", function(data) {
        $.each(data, function(index, value) {
            array.push(value);
        });
        callback(array);
    });
};

$(window).scroll(function() {
    if ($(this).scrollTop() > 300) {
        $('.scrollTop').show();
    }
    else {
        $('.scrollTop').hide();
    }
});


$(document).ready(function() {

    //$("#headlineSearch").hide();
    $("#loading").hide();
    $('.scrollTop').hide();

    var scrollTop = $(".scrollTop");

    $(scrollTop).click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
        return false;

    });

    $("button.nextButton").hide();
    $("button.prevButton").hide();

});

/* global $, getMenuItems*/
$(document).ready(function() {

    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
        var countries = [];
        var categories = [];

        var country = document.getElementById("menuCountry");
        var category = document.getElementById("menuCategory");

        getMenuItems(function(response) {
            var countryArray = response[1];
            var categoryArray = response[0];


            countryArray.forEach(function(entry) {

                if (entry.id == "gb") {
                    countries.push(`<option id="menuCountryItem" selected value="${entry.id}">${entry.name}</option>`);
                    country.innerHTML = `${countries}`;
                }

                else {
                    countries.push(`<option id="menuCountryItem" value="${entry.id}">${entry.name}</option>`);
                    country.innerHTML = `${countries}`;
                }
            });
            
            categoryArray.forEach(function(entry) {
                categories.push(`<option id="menuCategoryItem" value="${entry.id}">${entry.name}</option>`);
                category.innerHTML = `${categories}`;
            });
        });
    }


    else if (window.location.pathname === '/advanced.html') {
        var languages = [];
        var sortBy = [];

        var language = document.getElementById("menuLanguages");
        var sort = document.getElementById("menuSortBy");

        getMenuItems(function(response) {
            var sortArray = response[3];
            var languageArray = response[2];


            languageArray.forEach(function(entry) {
                languages.push(`<option id="menuCategoryItem" value="${entry.id}">${entry.name}</option>`);
                language.innerHTML = `${languages}`;
            });

            sortArray.forEach(function(entry) {
                sortBy.push(`<option id="menuCategoryItem" value="${entry.id}">${entry.name}</option>`);
                sort.innerHTML = `${sortBy}`;
            });
        });
    }


});

/*global apiSource,apiKey,$*/


var publisherInfo;

const publisher = {

    getPublisherInfo() {
        return publisherInfo;
    },

    setPublisherInfo(args) {
        publisherInfo = args;
    }
};


function sendPublisher(args, callback) {

    var url = `${apiSource}sources?`;

    //This function processes the api call
    var searchPublisher = function(args) {
        var xhr = new XMLHttpRequest();

        xhr.open("GET", url);
        xhr.send();

        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                callback(JSON.parse(this.responseText));
            }
        };
    }


    //This to check if no check have been selected
    if (!args.country && !args.language && !args.category) {

        url += `&apiKey=${apiKey}`;
        searchPublisher(url);
    }

    else {

        if (args.country) {
            url += `country=${args.country}&`;
        }

        if (args.category) {
            url += `category=${args.category}&`;
        }

        if (args.language) {
            url += `language=${args.language}&`;
        }

        url += `apiKey=${apiKey}`;
        searchPublisher(url);

    }
}

function addPublisher(args, callback) {

    sendPublisher(args, function(data) {
        var publishers = data.sources;
        callback(publishers);
        publisher.setPublisherInfo(publishers);
    });
};


function getPublisher() {
    return publisherInfo;
}


/*global $, addHeadline, addPublisher, moment*/
var country;
var category;
var sources;
var search;
var multiple = [];

//Default Settings for pagination
var currentPageHeadline = 1;
var currentPageSizeHeadline = 100;
var pageResultHeadline;

//Search for Top Headline Data
function getHeadlineInfo(args) {

    var pageResults = document.getElementById("totalResultsInfoHeadline");
    var writeInfo = document.getElementById("output");


    //Check if not using pagination
    if (args != "navigation") {
        currentPageHeadline = 1;
        country = $("#menuCountry option:selected").attr("value");
        category = $("#menuCategory option:selected").attr("value");
        search = document.getElementById("searchBoxHeadline").value;

        //This is to check if the Multiple Sources field is being used for searching
        if ($("#menuSources option:selected").attr("value") == "many") {

            if (sources == multiple) {
                sources.toString();
            }
            else {
                sources = multiple;
                sources.toString();
            }

        }
        else {
            sources = $("#menuSources option:selected").attr("value");
        }
    }

    //Default Settings and for Repopulating for when no Articles are found
    if (args == "start") {
        country = "gb";
        search = "";
        $("#totalResultsInfoHeadline").hide();
    }
    else {
        $("#totalResultsInfoHeadline").show();
    }

    //Code for checking the user input matches minimum search criteria for the API
    if (!args) {
        if (country == "all" && category == "all" && !search && sources == "all") {
            $('#myModal').modal('show');
            $("#myModal .modal-title").html("Please Try Again");
            $("#myModal .modal-message").html("You must enter search data or at least choose a Country or Category or Source");
        }
        else if ((country != "all" || category != "all") && sources != "all") {
            $('#myModal').modal('show');
            $("#myModal .modal-title").html("Please Try Again");
            $("#myModal .modal-message").html("You cannot use search with sources if category and country are specified");
        }
        //Reloads the page if no sources are selected
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

        //Show Loading Screen and Hide Navigation
        $(".headlineMenu").hide();
        $("#loading").show();
        $(".menu-header").css("background-color", "#ffffff");

        var releases = [];
        var params = new Array();

        //Setting search parameters from user input
        params['country'] = country;
        params['category'] = category;
        params['sources'] = sources;
        params['q'] = search;
        params['page'] = currentPageHeadline;

        //Sending up search parameters to the api
        addHeadline(params, function(response) {

            var headlineParameters = response.articles;

            //Total Articles Found
            pageResultHeadline = response.totalResults;

            //Code for Page Results
            if (!args) {
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

            //Iterating through the search results array
            headlineParameters.forEach(function(entry) {
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
            if (headlineParameters.length == 0) {
                writeInfo.innerHTML = `<h1 class="no-articles" align="center">No Articles Found</h1>`;
            }
            else {
                //Outputs the Search Results to the Page and gets rid of any commas from between each article
                writeInfo.innerHTML = releases.join('');
            }

            //Show Navigation and Hide the Loading Screen
            $(".headlineMenu").show();
            $("#loading").hide();
            $(".menu-header").css("background-color", "#f7f7f7");

            //Show and Hide Previous Button
            if (pageResultHeadline <= 100 || currentPageSizeHeadline <= 100) {
                $("button.prevButton").hide();
            }
            else {
                $("button.prevButton").show();
            }

            //Show and Hide Next Button
            if (pageResultHeadline <= 100 || pageResultHeadline == currentPageSizeHeadline) {
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

        $('#selectModal').modal('show');
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

function prevHeadline() {

    //This is where the current list of pages and the total amount of articles is displayed
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

    //This is where the current list of pages and the total amount of articles is displayed
    var pageResults = document.getElementById("totalResultsInfoHeadline");

    if ((pageResultHeadline / 100 > 1) && (pageResultHeadline > currentPageSizeHeadline)) {
        currentPageHeadline++;
        currentPageSizeHeadline = currentPageSizeHeadline + 100;

        //Search using pagination
        getHeadlineInfo("navigation");

        pageResults.innerHTML = "<strong>Results: </strong>" + currentPageSizeHeadline + " / " + pageResultHeadline;

        if (pageResultHeadline - currentPageSizeHeadline < 0) {

            currentPageSizeHeadline = pageResultHeadline;
            pageResults.innerHTML = "Results: " + currentPageSizeHeadline + " / " + pageResultHeadline;

        }
    }
}

$(document).ready(function() {

    //Starts the page with default information
    getHeadlineInfo("start");
});

/*global apiSource,apiKey,$, getHeadlineInfo*/
function sendHeadlines(args, callback) {

    var url = `${apiSource}top-headlines?pageSize=100&`;
  
    //This function processes the api call
    var searchHeadline = function(args) {
        var xhr = new XMLHttpRequest();

        console.log("url: " + url);

        xhr.open("GET", url);
        xhr.send();

        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                callback(JSON.parse(this.responseText));
            }
        };
    }

    //This to check if no check have been selected
    if (!args.country && !args.category && !args.source && !args.q) {

        url += `country=gb&apiKey=${apiKey}`;
        searchHeadline(url);
    }

    else {

        if (args.country != "all" && args.country) {
            url += `country=${args.country}&`;
        }

        if (args.category != "all" && args.category) {
            url += `category=${args.category}&`;
        }

        if (args.sources != "all" && args.sources) {
            url += `sources=${args.sources}&`;
        }

        if (args.q) {
            url += `q=${args.q}&`;
        }
        if (args.page > 1) {
            url += `page=${args.page}&`;
        }

        url += `apiKey=${apiKey}`;
        searchHeadline(url);

    }

}

function addHeadline(args, callback) {
    sendHeadlines(args, function(data) {
        var headline = data;
        callback(headline);
    })

};

$(document).ready(function(){
    getHeadlineInfo("start"); 
});
/*global $, addPublisher, getHeadlineInfo*/

function searchHeadline() {
    window.location.href = 'index.html';
}

function advancedSearch() {
    window.location.href = 'advanced.html';
}

$(document).ready(function() {

    /*Populate Sources Dropdown*/
    function populateSources() {


        //Checks which page has been selected
        if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
            var sources = document.getElementById("menuSources");
        }

        else if (window.location.pathname === '/advanced.html') {
            var sources = document.getElementById("menuSourcesAdvanced");
        }


        var source = [];
        source.push("<option id='menuSourceItem' selected value='all'>All Sources</option>");
        source.push("<option id='menuSourceItem' value='many'>Multiple Sources</option>");

        var args = [];
        addPublisher(args, function(response) {
            response.forEach(function(entry) {
                source.push(`<option id="menuSourceItem" value="${entry.id}">${entry.name}</option>`);
                sources.innerHTML = `${source}`;
            });
        });
    }
    populateSources();

});
