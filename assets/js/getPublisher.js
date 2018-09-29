/*global addPublisher*/
function getPublisherInfo() {

    var writeInfo = document.getElementById("output");

    var releases = [];

    var params = new Array();

    var country = "ie";
    var language = "en";
    var category = "general";

    params['country'] = country;
    params['language'] = language;
    params['category'] = category;


    addPublisher(params, function(response) {
        response.forEach(function(entry) {

            var publisherInfo = entry;

            releases.push(`<div class="article-post">
                                <div class="row">
                                    <div class="col-md-3">
                                        <div class="picture">
                                            <p><strong>Name: </strong>${publisherInfo.name}</p>
                                            <p><strong>Category: </strong>${publisherInfo.category}</p>
                                            <p><strong>Language: </strong>${publisherInfo.language}</p>
                                            <p><strong>Country: </strong>${publisherInfo.country}</p>
                                        </div>
                                    </div>
                                    <div class="col-md-9">
                                        <div class="article-text">
                                            <div class="article-publish">
                                                <div class="article-publisher">
                                                    <div class="publisher-name">
                                                        <p><strong>Description:</strong> ${publisherInfo.description}</p>
                                                        <p><strong>Website:</strong> ${publisherInfo.url}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`);
            writeInfo.innerHTML = `${releases}`;
        });
    });
};
