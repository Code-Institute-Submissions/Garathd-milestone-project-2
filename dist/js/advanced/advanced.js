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

//Regex for alphanumeric data only used on search fields
function alphanumericsonly(ob) {
    var invalidChars = /([^A-Za-z0-9])/
    if (invalidChars.test(ob.value)) {
        ob.value = ob.value.replace(invalidChars, "");
    }
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



/*global apiSource,apiKey,$*/
function sendThings(args, callback) {

    var url = `${apiSource}everything?pageSize=100&`;

    //This function processes the api call
    var searchEverything = function(args) {
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
    if (args.sources == "all" && args.language == "all" && args.sortBy == "all" && !args.q) {
        url += `&apiKey=${apiKey}`;
        searchEverything(url);
    }

    else {

        if (args.sources != "all" && args.sources) {
            url += `sources=${args.sources}&`;
        }

        if (args.language != "all" && args.language) {
            url += `language=${args.language}&`;
        }

        if (args.sortBy) {
            url += `sortBy=${args.sortBy}&`;
        }

        if (args.q) {
            url += `q=${args.q}&`;
        }

        if (args.page > 1) {
            url += `page=${args.page}&`;
        }

        url += `apiKey=${apiKey}`;
        searchEverything(url);
    }

}

function addThings(args, callback) {

    sendThings(args, function(data) {
        var everything = data;
        callback(everything);
    })

};

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
