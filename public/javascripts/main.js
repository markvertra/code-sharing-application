$(document).ready(function(){

    $(".login-btn").on("click", function(){
        $(".login-form").css("display", "block");
    });

    $(".signup-link").on("click", function(){
        $(".signup-box").css("display", "block");
    });

    $(".close-signup").on("click", function(){ 
        $(".signup-box").css("display", "none"); 
    });

});