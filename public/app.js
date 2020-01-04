$("#scrape-articles").on("click", function(event) {
    $.ajax({
        method: "GET",
        url: "/scrape"
    })
    .tehn(function(data) {
        console.log(data);
        location.href = ('/');
    })
});

$("body").on("click", "#make-comment", function() {
    console.log("Trying to get information on title");

    var thisId = $(this).attr("data-id");

    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    })

    .then(function(data) {
        $("#comment-modal").modal("show");
        console.log(data);

        $("#notes").append("<h2>" + defaultStatus.title + "<h2>");

        $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");

        $("notes").append("<button data-id='" + data._id + "' + id='save-comment'>Save Note</button>");

        if(data.note) {
            $("#bodyinput").val(data.note.body);
        }
    })
    .catch(function(err) {
        console.log("Error in comment in app.js not working: " + err);
    });
});

$("body").on("click", "#save-comment", function(event) {
    $("#comment-modal").modal("hide");
    var thisId = $(this).attr("data-id");
    console.log("comment saved");

    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            body: $("#comment-input").trim().val()
        }
    })
    .then(function(data) {
        console.log(data);
        $("#comment-input").empty();
    })
    .catch(function(err) {
        console.log("Error in comment in app.js not working: " + err);
    });
});

$("body").on("click", "#save-article", function(event) {
    var thisId = $(this).attr("data-id");
    console.log("Article saved with id: " + thisId);

    $.ajax({
        method: "PUT",
        url: "savedarticles/" + thisId,
    })
    .then(function(data) {
        location.reload();
    })
    .catch(function(err) {
        console.log("Error in article app.js not working: " + err);
    });
});

$("body").on("click", "#unsave-article", function (event) {
   
    var thisId = $(this).attr("data-id");
    console.log("article saved with this id: " + thisId);
   
    $.ajax({
      method: "PUT",
      url: "/unsavedarticles/" + thisId,
    })
      .then(function (data) {
        // Log the response
        location.reload();
      })
      .catch(function (err) {
        console.log("Error in unsaving article app.js not working: " + err);
      });
  });
  
 
  $("body").on("click", "#delete-article", function (event) {
   
    var thisId = $(this).attr("data-id");
    console.log("article saved with this id: " + thisId);
   
    $.ajax({
      method: "DELETE",
      url: "/deletearticles/" + thisId,
    })
      
      .then(function (data) {
        console.log("the article with this id: " + thisId + " was deleted from the database");
        location.reload();
      })
      .catch(function (err) {
        console.log("Error in article app.js not working: " + err);
      });
  });

  $('#saved').on("click", function (event) {
    location.href=('/saved');
  });