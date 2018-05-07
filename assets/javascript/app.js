//SET BUTTONS TO START ON THE PAGE
var comedians = ["Kevin Hart", "Joe Rogan", "Dave Chappelle", "Jerry Seinfeld"];
var person;

function alertComedianName() {
    var comedianName = $(this).attr("data-name");
    console.log(comedianName);
}

function renderButtons() {

    $("#buttons-view").empty();

    for (var i = 0; i < comedians.length; i++) {
        var addComedian = $("<button>");

        addComedian.addClass("comedian");
        addComedian.attr("data-name", comedians[i]);
        addComedian.text(comedians[i]);
        $("#buttons-view").append(addComedian);                        
    }

}

$("#add-name").on("click", function() {

    event.preventDefault();

    var comedianName = $("#comedian-input").val().trim();

    comedians.push(comedianName);

    console.log(comedians); 

    renderButtons();

})

$("body").on("click", "button", function() {

    console.log("you clicked");
    console.log(this);
    
    person = $(this).attr("data-name");
    console.log(person);

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + person + "&api_key=DDgW2r3lm4Ndpg9sPEmwtWuBApcHKCwA&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response) {

        $(".gifs-appear-here").empty();

        var results = response.data;

        console.log(results);

        for (var j = 0; j < results.length; j++) {
            var gifDiv = $("<div class='comedian'>");
            var rating = results[j].rating;
            var p = $("<p>").text("Rating: " + rating);
            var personImage = $("<img>");
            personImage.attr("src", results[j].images.fixed_height_still.url,);
            personImage.attr("data-still", results[j].images.fixed_height_still.url,);
            personImage.attr("data-animate", results[j].images.fixed_height.url,);
            personImage.attr("data-state", "still");
            personImage.attr("class", "comedianGif");
            

            gifDiv.append(p);
            gifDiv.append(personImage);

            $(".gifs-appear-here").prepend(gifDiv);
        
        }

            $("body").on("click", ".comedianGif", function() {
                console.log(this);
                console.log($(this).attr("data-state"));

                var state = $(this).attr("data-state");
               
                if (state === "still") {
                    console.log("yes");
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate")
                } else {
                    console.log("no");
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }

                // $(this).attr("src", results[j].images.fixed_height.url);
            });

    })

})
    


renderButtons();