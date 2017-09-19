// SETUP 3 ACE WINDOWS

var htmlEditor = ace.edit("HTMLeditor");
var cssEditor = ace.edit("CSSeditor");
var jsEditor = ace.edit("JSeditor");
jsEditor.setTheme("ace/theme/terminal");
jsEditor.session.setMode("ace/mode/javascript");
cssEditor.setTheme("ace/theme/terminal");
cssEditor.session.setMode("ace/mode/css");
htmlEditor.setTheme("ace/theme/terminal");
htmlEditor.session.setMode("ace/mode/html"); 

$(document).ready(function(){

    
    
    pageRenderer();

    $("textarea").keyup(function() {
        pageRenderer();
    });

    $("#navbar-save").on("click", ()=> {;
        $("#save-project-btn").trigger("click");
    });

    $("#navbar-publish").on("click", ()=> {
        $("#publish-project-btn").trigger("click");
    });


});

function pageRenderer () {

    const frame = $("iframe");
    const contents = frame.contents();
    const body = contents.find('body');
    const styling = contents
                    .find('head')
                    .append('<style></style>')
                    .children('style');

    let bodyText = ""; 
    bodyText = htmlEditor.getValue() + "<script>" + jsEditor.getValue() + "</script>";
    body.html(bodyText);
    styling.html(cssEditor.getValue());

// moves data to two hidden forms that then push and save the content. getValue is a method of ace
    $("#writeHTML").val(htmlEditor.getValue());
    $("#writeJS").val(jsEditor.getValue());
    $("#writeCSS").val(cssEditor.getValue());
    $("#hiddenHTML").val($("#writeHTML").val());
    $("#hiddenJS").val($("#writeJS").val());
    $("#hiddenCSS").val($("#writeCSS").val());
    $("#projectName").val($("#navbar-project-name-input").val())
    $("#hiddenProjectName").val($("#projectName").val());
}

// Function to reload Iframe and thus reload javascript

function iframeReplacer (iframe) {
    iframe.remove();
    iframe.appendTo($(".display-container"));
}



