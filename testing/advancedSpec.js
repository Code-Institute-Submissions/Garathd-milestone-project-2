/*global addThings, expect, getMenuItems, addPublisher */

//Default Test Parameters       
var params = [];

//Default search term
params.q = "News";

describe("Testing Advanced Search", () => {
    it("Checks if the repsonse is ok", (done) => {
        var result = function(args) {
            addThings(params, function(response) {
                args(response);
                done();
            });
        };
        
        result(function(response){
            expect(response.status).toEqual("ok");
        });
    });
    
    it("Checks if any articles are found", (done) => {
        var result = function(args) {
            addThings(params, function(response) {
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
