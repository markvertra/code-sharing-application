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

    // SETUP 3 ACE WINDOWS
    
    pageRenderer();

    $("textarea").keyup(function() {
        pageRenderer();
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
    $("#writeHTML").val(htmlEditor.getValue());
    $("#writeJS").val(jsEditor.getValue());
    $("#writeCSS").val(cssEditor.getValue())
    $("#hiddenHTML").val($("#writeHTML").val());
    $("#hiddenJS").val($("#writeJS").val());
    $("#hiddenCSS").val($("#writeCSS").val());
    $("#hiddenProjectName").val($("#projectName").val());
}

function iframeReplacer (iframe) {
    iframe.remove();
    iframe.appendTo($(".display-container"));
}



