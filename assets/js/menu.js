/* global $, getMenuItems, gitPage*/
$(document).ready(function() {

    //Setting up the select fields for the homepage
    if (window.location.pathname === '/' || window.location.pathname === '/index.html' || window.location.pathname == gitPage || window.location.pathname == gitPage + 'index.html') {
        var countries = [];
        var categories = [];

        //Getting the id's of selectfields
        var country = document.getElementById("menuCountry");
        var category = document.getElementById("menuCategory");

        //Getting the JSON data
        getMenuItems(function(response) {
            var countryArray = response[1];
            var categoryArray = response[0];

            //Populating the Country Select Field
            countryArray.forEach(function(entry) {
                countries.push(`<option selected value="${entry.id}">${entry.name}</option>`);
                country.innerHTML = countries.join('');
            });

            //Populating the Category Select Field
            categoryArray.forEach(function(entry) {
                categories.push(`<option value="${entry.id}">${entry.name}</option>`);
                category.innerHTML = categories.join('');
            });
        });
    }

    //Setting up the select fields for the homepage
    else if (window.location.pathname === '/advanced.html' || window.location.pathname == gitPage + 'advanced.html') {
        var languages = [];
        var sortBy = [];

        //Getting the id's of selectfields
        var language = document.getElementById("menuLanguages");
        var sort = document.getElementById("menuSortBy");

        //Getting the JSON data
        getMenuItems(function(response) {
            var sortArray = response[3];
            var languageArray = response[2];

            //Populating the Language Select Field
            languageArray.forEach(function(entry) {
                languages.push(`<option id="menuCategoryItem" value="${entry.id}">${entry.name}</option>`);
                language.innerHTML = `${languages}`;
            });

            //Populating the SortBy Select Field
            sortArray.forEach(function(entry) {
                sortBy.push(`<option id="menuCategoryItem" value="${entry.id}">${entry.name}</option>`);
                sort.innerHTML = `${sortBy}`;
            });
        });
    }
});
