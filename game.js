
// LOGIC

let buttonColor = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

// CHECK IF KEY IS PRESSED ONCE

$(document).keypress( function() {
  if (started === false){
    nextSequence();
      started = true;
  }
});

// ADD NEW COLOR TO THE SEQUENCE

function nextSequence() {
  userClickedPattern = [];
  let randomNumber = Math.floor((Math.random() * 4));
  let randomChosenColor = buttonColor[randomNumber];
  let showColor = "#" + randomChosenColor;
  let createSound = "sounds/" + randomChosenColor + ".mp3";
  gamePattern.push(randomChosenColor);
  $(showColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(createSound);
  level++;
  $("#level-title").text("Level " + level);
}

// CHECK USER'S CLICK

$(".btn").on("click", handler);

function handler(event) {
  if(!started) return;
    userClickedPattern.push(event.target.id);
    checkAnswer(userClickedPattern.length - 1);
}

// CHECK IF USERS CLICK IS CORRECT

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
      console.log("correct");
      if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
    } else {
      $("body").addClass("game-over");
      setTimeout( function() {
      $("body").removeClass("game-over");
      }, 200);
      $("#level-title").text("Game Over, Press Any Key To Restart");
      playSound("sounds/wrong.mp3");
      startOver();
    }
    
}

// START OVER

function startOver() {
  started = false;
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
}

// ANIMATIONS

$(".btn").on("click", function(event) {
  var currentSound = "sounds/" + event.target.id + ".mp3";
  playSound(currentSound);
  animatePress("#" + event.target.id);
});

function animatePress(currentColor) {
  $(currentColor).addClass("pressed");
    setTimeout( () => {
      $(currentColor).removeClass("pressed");
    }, 100);
}

function playSound(name) {
  const newSound = new Audio(name)
  newSound.play();
}

