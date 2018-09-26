/*global apiSource,apiKey*/

/*------------------------------------------------------------------------------------*/
//Callback function
function getData(sources, search, cb) {

    var sources = sources;

    if (!sources) {
        sources = "allSources";
    }

    var query = search;
    var category;

    var url = `${apiSource}`;

    console.log("check sources: " + sources);

    //Default Load News
    if (sources == "allSources" && !query) {
        
        //On Default the News feed searches for a random category
        var randomTypes = ['business', 'entertainment', 'health', 'science', 'technology', 'sports'];
        var random = randomTypes[Math.floor(Math.random() * randomTypes.length)];
        
        category = "top-headlines";
        url += `${category}?country=gb&category=${random}&apiKey=${apiKey}`;
        console.log("Check the default: " + url);
    }

    //Search for Everything
    else if (sources == "allSources" && query) {
        category = "everything";
        url += `${category}?q=${query}&apiKey=${apiKey}`;
        console.log("Check the url everything: " + url);
    }

    //Search for Sources only
    else if (sources != "allSources" && !query) {
        category = "top-headlines";
        url += `${category}?sources=${sources}&apiKey=${apiKey}`;
        console.log("Check the url sources only: " + url);
    }

    //Specific Source with a Search Term
    else if (sources != "allSources" && query) {
        category = "top-headlines";
        url += `${category}?sources=${sources}&q=${query}&apiKey=${apiKey}`;
        console.log("Specific Source with a Search Term: " + url);
    }




    var xhr = new XMLHttpRequest();

    xhr.open("GET", url);
    xhr.send();

    xhr.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };

}

function getArticles() {

    //Sets up the article element
    var writeArticle = document.getElementById("articles");

    var sources = document.getElementById('sourceList').value;
    var search = document.getElementById('search').value;

    console.log("sources: " + sources);

    if (!search && sources == "allSources") {
        alert("Please Enter Some Information");
    }
    else {
        getData(sources, search, function(data) {
            var articles;
            console.log("Response: " + JSON.stringify(data));

            //Checking data
            if (!data.articles) {
                articles = data.sources;
            }
            else {
                articles = data.articles;
            }

            var releases = [];

            //Check news articles exist
            if (articles.length > 0) {
                articles.forEach(function(entry) {
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
                writeArticle.innerHTML = `${releases}`;
            }
            else {
                releases.push(`<div class="no-articles">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="message">
                                    <h1 text-align="center">No Articles Found</h1>
                                </div>
                            </div>
                        </div>
                    </div>`);
                writeArticle.innerHTML = `${releases}`;
            }
        })
    }
}

//Initialise
$(document).ready(function() {
    getArticles();

});
