const buttonColours = ["red", "blue", "green", "yellow"];

let started = false;
let level = 0;
let gamePattern = [];
let userClickedPattern = [];
$(document).on("keydown",function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;

  }
});

$(".btn").on("click",function() {
  let userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("Success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  }
     else {
      console.log("wrong");
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 1000);
      $("#level-title").text("Game Over! Press any key to restart");
      startOver();
    }
  }


  function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
  }



  function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }




  function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
