/* global $, getMenuItems*/
$(document).ready(function() {
    
    // var ex = "countries";
    // var ex = "categories";
    var ex = "languages";
    
    getMenuItems(ex, function(response){
        console.log("Response: "+JSON.stringify(response));
    });
    
});
