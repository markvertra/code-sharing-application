$(document).ready(function(){

    $(".search-projects").keyup(() => {
        $(".none-found").hide();
        const searchText = $(".search-projects").val();
        const projectBoxes = $(".project-box");
        const includedProjectBoxes = $(".project-box:contains(" + searchText + ")");
        projectBoxes.hide();
        includedProjectBoxes.show();
        if (includedProjectBoxes.length === 0) {
            $(".none-found").show();
        }
    });

});

function getInfo() {
    console.log("HOLA");
    $("#results-div").remove();
    $("#results-box").append("<div id='results-div'></h1>");
    const penHTML = $("#pen-HTML").val();
    const penCSS = $("#pen-CSS").val();
    const penJS = $("#pen-JS").val();
    console.log("<style>" + penCSS + "</style>");
    $("#results-div").append("<style>" + penCSS + "</style>");
    $("#results-div").append(penHTML);
    $("#results-div").append("<script>" + penJS + "</script>");
  }
