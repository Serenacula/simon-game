let pattern = [];
let playerCounter = 0;
let buttons = ["green", "red", "yellow", "blue"];
let start = false;
console.log("index.js loaded");

// If the player clicks, start the game
$("body").keydown(startGame);

// If the player clicks a button
$(".btn").click(function(event) {
  console.log(event.target);

  // Check if the game has started first
  if (start == true) {
    animateButton($("#" + event.target.id));
    buttonClick(event);
  }
});

// What to do when the player clicks a button
function buttonClick(event) {

  // Check if the click is correct
  if (event.target.id == pattern[playerCounter]) {
    // Increase the click counter
    playerCounter += 1;
    // If we've reached the end of the pattern
    if (playerCounter == pattern.length) {
      // Update the score
      $(".title").text("Score: " + (pattern.length));
      $(".game-square").removeClass("adjust-game-position");
      // Show the true pattern again, with 1 added on
      setTimeout(function() {
        showPattern();
      }, 1000);
      // Reset the player counter
      playerCounter = 0;

    }
  } else {
    // If the player has put in the incorrect response
    $(".title").html("Final Score: " + (pattern.length-1) + "<br/><br/>Press any key to start");
    // This adjusts the position of the game-square so that it does not shift about with new lines
    $(".game-square").addClass("adjust-game-position");
    reset();
  }
}

function animateButton(button) {
  // Play a sound
  sound = new Audio("sounds/" + button.attr("id") + ".mp3");
  sound.play();

  // Play the 'animate' CSS class
  button.addClass("animate");
  setTimeout(function() {
    button.removeClass("animate");
  }, 200);
}

function showPattern() {
  choice = buttons[Math.floor(Math.random() * 4)];
  pattern.push(choice);
  console.log(choice);

  animateButton($("#" + choice));
}

function reset() {
  start = false;

}

function startGame() {
  $(".title").text("Score: 0");
  $(".game-square").removeClass("adjust-game-position");
  pattern = [];
  playerCounter = 0;
  showPattern();
  start = true;
}
