$.getJSON("/articles", function (data) {
    for (var i = 0; i < data.length; i++) {
        if (data[i].saved) {

            $("#savedArticleDump").append("<p data-id='" + data[i]._id + "'>" + "<a href='" + data[i].link + "'>" + data[i].title + "</a>" + "<button id='removeArticle' class='btn btn-warning' data-id='" + data[i]._id + "'>Removed from Saved</button>" + "<button type='button' data-toggle='modal' data-target='#exampleModalCenter' id='makeNote' class='btn btn-info' data-id='" + data[i]._id + "'>Notes</button><hr>");
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

$(document).on("click", "#makeNote", function () {
    $(".noteDump").empty();
    var thisId = $(this).attr("data-id");
    $("#saveNote").attr("data-id", thisId)
    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    }).then(function (data) {
        if (data.length === 0) {
            $(".noteDump").append("<div>There have not been any notes for this article yet.</div>")
        }
        for (i = 0; i < data.length; i++) {
            $(".noteDump").append("<div class='row modal-body'>" + data[i].body + "<button id='removeNote' class='btn btn-danger' data-id='" + data[i]._id + "'>x</button>" + "</div>")
        }
    })
})

$(document).on("click", "#saveNote", function () {
    console.log(this)
    var thisId = $(this).attr("data-id");
    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            body: $("#articleNote").val(),
            articleID: thisId
        }
    })
        .then(function (data) {
            console.log(data);
        });
    window.location.reload();
});

$("#clearArticles").on("click", function () {
    unScrape()
})

function unScrape() {
    $.ajax({
        method: "DELETE",
        url: "/unscrape"
    }),
        window.location.reload();
}

$(document).on("click", "#removeNote", function () {
    var thisId = $(this).attr("data-id");
    console.log(thisId)
    $.ajax({
        method: "DELETE",
        url: "deleteNote/" + thisId
    })
    window.location.reload();
})