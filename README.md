# iTunes Song Guessing Game With Express

The goal of this project is to modify your itunes guessing game to have a server side component. 

### Requirements

The guessing game will now save the users high score.  That can either be total number of correct answers, or highest guessing percentage.  Whatever you prefer, but guessing percentage is a little more complicated because you need to save correct guesses and incorrect guesses in the database.  The high scores should have full CRUD capability.

You will need the following routes:

* GET /scores
* POST /scores (optional ?nextsong=true)
* PUT /scores/:id (optional ?nextsong=true)
* GET /scores/new
* GET /scores/:id/edit
* DELETE /scores/:id
* GET /randomsong  (optionally /randomsong?id=myscoreid)

The routes with /scores should be the normal crud capabilities.  The route for /randomsong is explained below.


### Random Song Route Requirements


* __IMPORTANT__ The randomsong route will return an html page to the user with a random song.  The random song should already be on the page when the page loads (In other words, the request to get the song will be made on the server side in express).
* Using javascript on the client side, play the random song as before, allow the user to guess the name of the song, title or artist, and then display if the guess is right or wrong.
* Have a button in your UI to play the next song once you have finished a guess.  The next song logic will be a little tricky:
	* If the user does not have a score yet, when the user clicks next song make a post request to /scores?nextsong=true that creates a new song in the database then redirects to /randomsong?id=myscoreid
	* If the user has a score already, when he clicks next song, make a put request to /scores/:id to update the score, then redirect to /randomsong?id=myscoreid
	* If a POST is sent to /scores or a put sent to /scores/:id and no nextsong query param is provided, then the redirect logic should act normally.  In other words, it should redirect to a show page, or an index page.
	
### Score data

You should at least save the following for a score document:

1. Players name
2. high score
3. Date of score (optional but date objects can get complicated so this is a good challenege).

## Styling

__Style your app__.  Make navigating around easy.  Make the different crud pages for scores look nice.  And of course, make the guessing game portion look as beautiful as before.

## HINTS

* Since we are no longer making client side requests to the itunes api, jsonp is not necessary.
* The response from the server for the /randomsong route can preload a form to submit the score.   Your client side javascript can handle updating the values once you know if the song is correctly guessed or not.
* __Start with the basic crud first__.  Since we haven't done a lot of client side javascript along with server side code, the randomsong route may seem challenging.  Don't work on it first!  Frist make the basic CRUD for scores.