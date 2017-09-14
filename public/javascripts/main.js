$(document).ready(function(){

    // Files to appear and disappear login and sign-up
    $(".main-content").click(function(){
        $('#login-form').hide();
        $('#signup-box').hide();
      })
    
    $(".login-btn").on("click", function(){
        $("#login-form").css("display", "block");
    });    

    $(".signup-link").on("click", function(){
        $("#signup-box").css("display", "flex");
        $("#login-form").css("display", "none"); 
    });

    // AJAX request to check user log-in status on new project
    
    $(".new-project-submit").on("click", ()=> {
        isUserLoggedIn();
    });


});

function isUserLoggedIn() {
    $.ajax({
        url: "/api/user",
        method: "get",
        success: (res) => {
            serveSignup(res.user)
        },
        failure: (err) => {
            console.log(err);
        }
    });
}

function serveSignup (bool) {
    if (!bool) {
        event.preventDefault()
        $("#signup-box").css("display", "flex");
}};
