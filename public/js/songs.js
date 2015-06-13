$(function() {
	$("#audio_preview").on("canplay", function() {
	  $("#audio_preview")[0].play();
	});

	$(".guessInput").on("submit", function(e) {
		e.preventDefault();
		
		$("#audio_preview")[0].pause()
		var input = $(".guess").val();
		var artist = $("#artistData").html();
		var track = $("#trackData").html();
		var album = $("#albumData").html();
		var image = $("#imageData").html();
		if(input === artist || input === track) {
			console.log("right!");

			//Display Correct Page
			$("#artist").html(artist);
			$("#track").html(track);
			$("#album").html(album);
			$("#albumArt").attr("src", image);

			$("#correctView").show();
			$("#secondView").hide();
			$("#wrongView").hide();

			//Update Score
			var stringScore = $("#currentScore").html();
			var score = parseInt(stringScore) + 1;
			var name = $("#name").html();

			$("#inputName").attr("value", name);
			$("#inputScore").attr("value", score);


			// rightAns++
		} else {
			$("#artistWrong").html(artist)
			$("#trackWrong").html(track)
			$("#albumWrong").html(album)
			$("#albumArtWrong").attr("src", image)

			$("#secondView").hide();
			$("#wrongView").show();
			console.log("wrong!");

			// wrongAns++
		}
		console.log(input);
	});
});
