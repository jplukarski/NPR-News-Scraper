$.getJSON("/articles", function (data) {

    for (var i = 0; i < data.length; i++) {
        if (!data[i].saved) {

            $("#articleDump").append("<div class='class=articles'><p data-id='" + data[i]._id + "'>" + "<a href='" + data[i].link + "'>" + data[i].title + "</a>" + "<button class='btn btn-info' id='saveArticle' data-id='" + data[i]._id + "'>Save Article</button></div><hr>");
        }
    }
})

$("#clearArticles").on("click", function () {
    unScrape()
})

$("#articleScraper").on("click", function () {
    $("#articleDump")
    unScrape()
    scrape()

})

function unScrape() {
    $.ajax({
        method: "DELETE",
        url: "/unscrape"
    }),
        window.location.reload();
}

function scrape() {
    $.ajax({
        method: "GET",
        url: "/scrape"
    }),
        window.location.reload();
}

$(document).on("click", "#saveArticle", function () {
    var thisId = $(this).attr("data-id");
    // console.log(thisId)
    $.ajax({
        method: "POST",
        url: "/saveArticle/" + thisId
    }),
        window.location.reload();
})