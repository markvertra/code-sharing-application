$(document).ready(function(){

  pageRenderer($("#writeHTML").attr("id"));
  pageRenderer($("#writeCSS").attr("id"));
  pageRenderer($("#writeJS").attr("id"));

  $("textarea").keyup(function() {
    let objectId = $(this).attr("id");
    pageRenderer(objectId);
   });

});

function pageRenderer (objectId) {

    const frame = $("iframe");
    const contents = frame.contents();
    const body = contents.find('body');
    const styling = contents
                    .find('head')
                    .append('<style></style>')
                    .children('style');

    let bodyText = ""; 
    if (objectId === "writeHTML" || objectId === "writeJS") {
        bodyText = $("#writeHTML").val() + ("<script>" + $("#writeJS").val() + "</script>")
        body.html(bodyText);
        $("#hiddenHTML").val($("#writeHTML").val());
        $("#hiddenJS").val($("#writeJS").val());
    } else if (objectId === "writeCSS") {
        styling.html($("#writeCSS").val());
        $("#hiddenCSS").val($("#writeCSS").val());
    } else if (objectId === "projectName") {
        $("#hiddenProjectName").val($(this).val());
    }

}

function iframeReplacer (iframe) {
    iframe.remove()
    iframe.appendTo($(".display-container"))
}

function thumbnailRenderer (projectId, htmlFile, cssFile, jsFile) {
        console.log(projectId + htmlFile + cssFile + jsFile);

        const frame = $("'#" + projectId + "'");
        const contents = frame.contents();
        const body = contents.find('body');
        const styling = contents
                        .find('head')
                        .append('<style></style>')
                        .children('style');

        const bodyText = htmlFile + "<script>" + jsFile + "</script>"
        body.html(bodyText);
        styling.html(cssFile);

}

