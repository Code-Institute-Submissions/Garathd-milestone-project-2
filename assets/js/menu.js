/* global $, getMenuItems*/
$(document).ready(function() {

    var countries = [];
    var categories = [];


    var country = document.getElementById("menuCountry");
    var category = document.getElementById("menuCategory");



    getMenuItems(function(response) {

        var countryArray = response[1];
        var categoryArray = response[0];

        countryArray.forEach(function(entry) {

            countries.push(`<option id="menuCountryItem" value="${entry.id}">${entry.name}</option>`);
            country.innerHTML = `${countries}`;
        });

        categoryArray.forEach(function(entry) {
            categories.push(`<option id="menuCategoryItem" value="${entry.id}">${entry.name}</option>`);
            category.innerHTML = `${categories}`;
        });
    });

});
