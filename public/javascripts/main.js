$(document).ready(function(){

    


    $(".login-btn").on("click", function(){
        $(".login-form").css("display", "block");
        setTimeout(clickCloserTwo, 100);
    });

    $(".signup-link").on("click", function(){
        $("#signup-box").css("display", "block");
        $(".login-form").css("display", "none"); 
        setTimeout(clickCloser, 100);     
    });

    $(".close-signup").on("click", function(){ 
        $("#signup-box").css("display", "none"); 
    });

    
});

function clickCloser() {
    $(document).one("click", function(e) {
        if( e.target.id != 'signup-box') {
            $("#signup-box").hide();
                }
            });
        }

function clickCloserTwo() {
    $(document).one("click", function(e) {
        if( e.target.class != 'login-form') {
            $(".login-form").hide();
                }
            });
        }