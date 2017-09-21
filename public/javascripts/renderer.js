// SETUP 3 ACE WINDOWS

const P5Library = '<script src= "https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.14/p5.min.js"></script>';

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
    createIframe();

    $("textarea").keyup(function() {
        createIframe();
    });

    $("#navbar-save").on("click", () => {
        $("#save-project-btn").trigger("click");
    });

    $("#navbar-publish").on("click", ()=> {
        $("#publish-project-btn").trigger("click");
    });

    $("#write-css").on("click", () => {
        $("#write-html").show();
        $("#write-js").show();
        $("#write-css").hide();
        $("#CSS-window-container").show();
        $("#HTML-window-container").hide();
        $("#JS-window-container").hide();
    });

    $("#write-js").on("click", () => {
        $("#write-html").show();
        $("#write-css").show();
        $("#write-js").hide();
        $("#CSS-window-container").hide();
        $("#HTML-window-container").hide();
        $("#JS-window-container").show();
    });

    $("#write-html").on("click", () => {
        $("#write-css").show();
        $("#write-js").show();
        $("#write-html").hide();
        $("#CSS-window-container").hide();
        $("#HTML-window-container").show();
        $("#JS-window-container").hide();
    });

    $(window).resize(() => {
        if ($(window).width() > 600) {
          $(".edit-window-container").show();
        }
      });
});

function createScript(src){
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = src;
  return script;
}


function createIframe() {
  if ($('iframe')) {
    iframeReplacer($('iframe'));
  }

  var script = createScript("https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.7/p5.min.js");

  var newIframe = $('<iframe>');
  newIframe.attr('id', 'results-frame');

  newIframe.on('load', function() {
      $(this).contents().find('head').append(script);
  });
  $('body').append(newIframe);
  pageRenderer();
}

function pageRenderer () {

    const frame = $("iframe");
    const contents = frame.contents();
    const body = contents.find('body');
    const styling = contents.find('head');


    let bodyText = "";
    bodyText = htmlEditor.getValue();
    body.append(bodyText);
    styling.append( '<style>' + cssEditor.getValue() + '</style>' + "<script>" + jsEditor.getValue() + "</script>" );

// moves data to two hidden forms that then push and save the content. getValue is a method of ace
    $("#writeHTML").val(htmlEditor.getValue());
    $("#writeJS").val(jsEditor.getValue());
    $("#writeCSS").val(cssEditor.getValue());
    $("#hiddenHTML").val($("#writeHTML").val());
    $("#hiddenJS").val($("#writeJS").val());
    $("#hiddenCSS").val($("#writeCSS").val());
    $("#projectName").val($("#navbar-project-name-input").val());
    $("#hiddenProjectName").val($("#projectName").val());
}

// Function to reload Iframe and thus reload javascript
function iframeReplacer (iframe) {
    iframe.remove();
    //iframe.appendTo($(".display-container"));
}
