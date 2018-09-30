$.getJSON("/articles", function (data) {
    for (var i = 0; i < data.length; i++) {
        if (data[i].saved) {

            $("#savedArticleDump").append("<p data-id='" + data[i]._id + "'>" + "<a href='" + data[i].link + "'>" + data[i].title + "</a>" + "<button id='removeArticle' data-id='" + data[i]._id + "'>Removed from Saved</button>");
        }
    }
})

$(document).on("click", "#removeArticle", function () {
    var thisId = $(this).attr("data-id");
    // console.log(thisId)
    $.ajax({
        method: "POST",
        url: "/removeArticle/" + thisId
    }),
        window.location.reload();
})