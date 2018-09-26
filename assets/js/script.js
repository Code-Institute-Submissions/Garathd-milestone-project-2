//Callback function
function getData(type, cb) {

    var apiKey = "32ad11f7baf84533819d0089abe5c95c";
    var apiSource = "https://newsapi.org/v2/";

    //Temporary Variables
    var apiCategory = "everything";
    var query = type;

    var xhr = new XMLHttpRequest();

    xhr.open("GET", `${apiSource}${apiCategory}?q=${query}&apiKey=${apiKey}`);
    xhr.send();

    xhr.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {

            cb(JSON.parse(this.responseText));
        }
    };

}

function getArticles() {

    var output = document.getElementById("result");

    var search = document.getElementById('search').value;
    console.log("Search: " + search)

    if (!search) {
        alert("Please Enter Some Information");
    }
    else {
        getData(search, function(data) {
            var articles = data.articles;

            var releases = [];

            articles.forEach(function(entry) {
                releases.push(`<div class="article-post">
                        <div class="row">
                            <div class="col-md-3">
                                <div class="picture">
                                    <img src="${entry.urlToImage}" />
                                </div>
                            </div>
                            <div class="col-md-9">
                                <div class="article-text">
                                    <div class="article-title">${entry.title}</div>
                                    <div class="article-description">${entry.description}</div>
                                </div>
                            </div>
                        </div>
                    </div>`);
            });
            // console.dir(data);
            // console.log("Data of Articles: "+JSON.stringify(articles));
            output.innerHTML = `${releases}`;
        })
    }


}
