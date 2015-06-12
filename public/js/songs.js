$(function() {
	$("#audio_preview").on("canplay", function() {
	  $("#audio_preview")[0].play();
	});
});
