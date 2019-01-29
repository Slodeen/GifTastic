
var topics = ["french fries", "cookie", "pizza", "banana", "tea", "coffee", "salad"];


function displayImage(){
  $("#foodImages").empty();
var images = $(this).attr("data-name");
console.log(images);


var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + images + "&api_key=dc6zaTOxFJmzC&limit=10"; 
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) { 
    
        
        var result = response.data;
        console.log("RESULT: ", result);
    
          for (var i = 0; i < result.length; i++) {
    
          var imgDiv = $("<div>");
    
          var rating = $("<p>").text("Rating: " + result[i].rating);
            
          var imageTag = $("<img id='imageImg' class='col-md-4'>" );
          imageTag.addClass("gifs");

          imageTag.attr("src", result[i].images.fixed_height_still.url);
          imageTag.attr("data-still", result[i].images.fixed_height_still.url);
          imageTag.attr("data-animate", result[i].images.fixed_height.url);
          imageTag.attr("data-now", "still");
    
          imgDiv.append(imageTag);
          imgDiv.append(rating);
    
          $("#foodImages").prepend(imgDiv);



          $(".gifs").on("click", function(){

              var state = $(this).attr('data-state');

                if (state === "still") {
                  $(this).attr("src", $(this).attr("data-animate"));
                  $(this).attr("data-state", "animate");
                  } else {
                  $(this).attr("src", $(this).attr("data-still"));
                  $(this).attr("data-state", "still");
                  }});
          
        }})};

        

function btnImage (){

  $("#btnview").empty();

  $("#foodImages").empty();
  
  for (var i = 0; i < topics.length; i++){
    console.log(topics[i]);
    var btnFood = $("<button>");
    btnFood.addClass("btn btn-outline-success");
    btnFood.attr("data-name", topics[i]);
    btnFood.text(topics[i]);
    $("#btnview").append(btnFood); 
  
  }
}
btnImage();



$("#addFood").on("click", function(event){
  event.preventDefault();
  
var images = $("#foodInput").val().trim();
topics.push(images);
btnImage();

})

$(document).on("click", ".btn-outline-success", displayImage);

btnImage();

