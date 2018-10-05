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
                    countries.push(`<option selected value="${entry.id}">${entry.name}</option>`);
                    country.innerHTML = countries.join('');
                }

                else {
                    countries.push(`<option value="${entry.id}">${entry.name}</option>`);
                    country.innerHTML = countries.join('');
                }
            });
            
            categoryArray.forEach(function(entry) {
                categories.push(`<option value="${entry.id}">${entry.name}</option>`);
                category.innerHTML = categories.join('');
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
