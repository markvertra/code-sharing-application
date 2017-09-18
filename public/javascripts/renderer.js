$(document).ready(function(){

  const frame = $("iframe");
  const contents = frame.contents();
  const body = contents.find('body');
  const styling = contents
                  .find('head')
                  .append('<style></style>')
                  .children('style');

  $("input").keyup(function() {

    let bodyText = ""; 

    if ($(this).attr("id") === "writeHTML" || $(this).attr("id") === "writeJS") {
        bodyText = $("#writeHTML").val() + ("<script>" + $("#writeJS").val() + "</script>")
        body.html(bodyText);
        $("#hiddenHTML").val($("#writeHTML").val());
        $("#hiddenJS").val($("#writeJS").val());
    } else if ($(this).attr("id") === "writeCSS") {
        styling.html($(this).val());
        $("#hiddenCSS").val($(this).val());
    } else if ($(this).attr("id") === "projectName") {
        $("#hiddenProjectName").val($(this).val());
    }
  });

});