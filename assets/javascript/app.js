//SET BUTTONS TO START ON THE PAGE
var comedians = ["Kevin Hart", "Joe Rogan", "Amy Schumer", "Dave Chappelle", "Jerry Seinfeld", "Tiffany Haddish", "Tom Segura", "Amy Poehler", "Katt Williams", "Martin Lawrence", "Sarah Silverman", "Chris Rock", "Ellen Degeneres"];
var person;
var download;

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

    if ($("#comedian-input").val().trim() === "") {
        console.log("add something");
        return;
    }

    var comedianName = $("#comedian-input").val().trim();

    comedians.push(comedianName);

    console.log(comedians); 

    renderButtons();

    $("#comedian-input").empty();

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

        var results = response.data;

        console.log(results);

        // LOOP TO CREATE DIVS FOR EACH GIF 
        for (var j = 0; j < results.length; j++) {
            var gifDiv = $("<div class='col-md-6 comedian'>");
            // var downloadDiv = $("<p class='col-md-6 download'>");
            var rating = results[j].rating;
            var title = results[j].title;
            // var downloadButton = $("<button>").text("CLICK TO DOWNLOAD");
            var pInfo = $("<div class='row' <p>").text("TITLE: " + title.toUpperCase() + " || " + "RATING: " + rating.toUpperCase());
            var pDownload = $("<div class='row download' <button>").text("CLICK TO DOWNLOAD")
            var personImage = $("<img>");
            personImage.attr("src", results[j].images.fixed_height_still.url,);
            personImage.attr("data-still", results[j].images.fixed_height_still.url,);
            personImage.attr("data-animate", results[j].images.fixed_height.url,);
            personImage.attr("data-state", "still");
            personImage.attr("class", "comedianGif");
            

            
            gifDiv.append(pInfo);
            gifDiv.append(personImage);
            gifDiv.append(pDownload);
            // downloadDiv.append(downloadButton);

            $(".gifs-appear-here").prepend(gifDiv);
            // $(gifDiv).append(downloadDiv);
        
        }

            // CAUSES GIF TO START AND STOP ON CLICK
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

            // DOWNLOADS GIF ON USER CLICK OF 'CLICK TO DOWNLOAD'
            $("body").on("click", ".download", function(e) {
                console.log("must want to download");
                e = e || window.event;
                var element = e.target || e.srcElement;
                if (element.type === "gif") {
                    console.log("this is true");
                    var name = element.nameProp;
                    var address = element.href;
                    saveGifAs1(element.nameProp, element.href);
                    return false;
                } else 
                    return true;
            });
            
            function saveGifAs1(name, address) {
                if (confirm("You want to download this gif?")) {
                    window.win = open(address);
                    setTimeout("win.documen.execCommand('SaveAs')", 100);
                    setTimeout("win.close()", 500);
                }
            }

    })

})

renderButtons();