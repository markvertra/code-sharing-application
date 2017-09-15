
$(document).ready(function(){

    // Files to appear and disappear login and sign-up
    $(".main-content").click(function(){
        $('#login-form').hide();
        $('#signup-box').hide();
        $('#project-signup-box').hide();
      })
    
    $(".login-btn").on("click", function(){
        $("#login-form").css("display", "block");
    });    

    $(".signup-link").on("click", function(){
        $("#signup-box").css("display", "flex");
        $("#login-form").css("display", "none"); 
    });

    // AJAX request to check user log-in status on new project
    
    $("#new-project-submit").on("click", ()=> {
        isUserLoggedIn();
        $("#secret-projectName").val($("#projectName").val());
        const $projectHTML = $("#project-HTML");
        const $projectCSS = $("#project-CSS");
        const $projectJS = $("#project-JS");
        $projectHTML.clone();
        $projectCSS.clone();
        $projectJS.clone();
        $(".hidden-input").hide();
        $projectHTML.appendTo($(".hidden-input"));
        $projectCSS.appendTo($(".hidden-input"));
        $projectJS.appendTo($(".hidden-input"));

    });


});

function isUserLoggedIn() {
    $.ajax({
        url: "/api/user",
        method: "get",
        success: (res) => {
            if (res.user) {
                
            }
            serveSignup(res.user)
        },
        failure: (err) => {
            console.log(err);
        }
    });
}

function serveSignup (bool) {
    if (!bool) {
        $("#project-signup-box").css("display", "flex");
     } 
}
