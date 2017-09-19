$(document).ready(function(){

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
    bodyText = $("#writeHTML").val() + ("<script>" + $("#writeJS").val() + "</script>")
    body.html(bodyText);
    styling.html($("#writeCSS").val());
    $("#hiddenHTML").val($("#writeHTML").val());
    $("#hiddenJS").val($("#writeJS").val());
    $("#hiddenCSS").val($("#writeCSS").val());
    $("#hiddenProjectName").val($("#projectName").val());
}


function iframeReplacer (iframe) {
    iframe.remove()
    iframe.appendTo($(".display-container"))
}

// function thumbnailRenderer (projectId, htmlFile, cssFile, jsFile) {
//         console.log(projectId + htmlFile + cssFile + jsFile);

//         const frame = $("'#" + projectId + "'");
//         const contents = frame.contents();
//         const body = contents.find('body');
//         const styling = contents
//                         .find('head')
//                         .append('<style></style>')
//                         .children('style');

//         const bodyText = htmlFile + "<script>" + jsFile + "</script>"
//         body.html(bodyText);
//         styling.html(cssFile);

// }

