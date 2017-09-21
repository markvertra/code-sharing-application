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
    editLogo();
});
//im a little shit :O___
function editLogo() {

  var logo = document.getElementsByClassName("monkey-logo")[0];
  console.log(logo);
  var svgLogo = SVG(logo);
  console.log(svgLogo);
  svgLogo.attr({
  fill: '#ff0000',
});
  svgLogo.transform({ rotation: 10 });
}

function getInfo() {
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


var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('.navbar').outerHeight();

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();

    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;

    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        $('.navbar').removeClass('nav-up').addClass('nav-down');
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $('.navbar').removeClass('nav-down').addClass('nav-up');
        }
    }

    lastScrollTop = st;
}
