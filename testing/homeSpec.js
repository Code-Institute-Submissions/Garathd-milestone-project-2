/*global addHeadline, expect, getMenuItems, addPublisher*/

//Default Test Parameters
var params = [];
params.country = "gb";


//Sending up test data to the api and checking if the response status is ok
describe("Testing Top Headlines", () => {

    it("Checks if the repsonse is ok", (done) => {

        var result = function(args) {
            addHeadline(params, function(response) {
                args(response);
                done();
            });
        };

        //Checking if the status is ok
        result(function(response) {
            expect(response.status).toBe("ok");
        });

    });

    it("Checks if any articles are found", (done) => {
        var result = function(args) {
            addHeadline(params, function(response) {
                args(response);
                done();
            });
        };

        //Checking the the amount of articles found
        result(function(response) {
            var articleSize = response.articles.length;
            expect(articleSize).toBeGreaterThan(0);
        });
    });

    it("Checks if the countries, categories and languages and sort by menu options are working", (done) => {
        var result = function(args) {
            getMenuItems(function(response) {
                args(response.length);
                done();
            });
        };

        //Checking if all the menu options exist and the menu.json can be found
        result(function(response) {
            expect(response).toEqual(4);
        });
    });

    it("Checks if the sources menu option is found", (done) => {
        var result = function(args) {
            var empty = [];
            addPublisher(empty,function(response) {
                args(response);
                done();
            });
        };

        //Checking if all the menu options exist and the menu.json can be found
        result(function(response) {
            expect(response.length).toBeGreaterThan(0);
        });
    })
});
