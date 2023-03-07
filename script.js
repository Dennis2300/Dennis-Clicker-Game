"use strict";

window.addEventListener("load", ready);

let lives = 0
let points = 0

function ready() {
  console.log("Main Menu");
  document.querySelector("#btn_start").addEventListener("click", start);
  document.querySelector("#level_complete_btn").addEventListener("click", showStartScreen);
  document.querySelector("#btn_restart").addEventListener("click", showStartScreen);
}

function showStartScreen() {
  document.querySelector("#start").classList.remove("hidden");
  document.querySelector("#game_over").classList.add("hidden");
  document.querySelector("#level_complete").classList.add("hidden");
}

function start() {
  console.log("Game is running");
  document.querySelector("#start").classList.add("hidden");


  document.querySelector("#sound_game").volume = 0.5
  document.querySelector("#sound_game").play()

  resetPoints()
  resetLives()
  showGameScreen()
  startAnimation()
  startPosition()
  startPositionPotion()
  registerClick()

  //Skifter position når de er ude af skærmen
  document.querySelector("#mob1_container")
    .addEventListener("animationiteration", mobRestart)
  document.querySelector("#mob2_container")
    .addEventListener("animationiteration", mobRestart)
  document.querySelector("#mob3_container")
    .addEventListener("animationiteration", mobRestart)
  document.querySelector("#human_container")
    .addEventListener("animationiteration", mobRestart)
  document.querySelector("#potion_container")
    .addEventListener("animationiteration", potionRestart)
}

function resetPoints() {
  points = 0
  displayPoints()
}

function resetLives() {
  lives = 5
  //fjerner alle hearts
  document.querySelector("#heart1").classList.remove("broken_heart");
  document.querySelector("#heart2").classList.remove("broken_heart");
  document.querySelector("#heart3").classList.remove("broken_heart");
  document.querySelector("#heart4").classList.remove("broken_heart");
  document.querySelector("#heart5").classList.remove("broken_heart");
  //tilføjer alle hearts
  document.querySelector("#heart1").classList.add("active_heart");
  document.querySelector("#heart2").classList.add("active_heart");
  document.querySelector("#heart3").classList.add("active_heart");
  document.querySelector("#heart4").classList.add("active_heart");
  document.querySelector("#heart5").classList.add("active_heart");

}

function showGameScreen() {
  document.querySelector("#start").classList.add("hidden");
  document.querySelector("#game_over").classList.add("hidden");
  document.querySelector("#level_complete").classList.add("hidden");
}

function startAnimation() {
  document.querySelector("#mob1_container").classList.add("run")
  document.querySelector("#mob2_container").classList.add("run")
  document.querySelector("#mob3_container").classList.add("run")
  document.querySelector("#human_container").classList.add("run")
}

function startPosition() {
  document.querySelector("#mob1_container").classList.add("position1")
  document.querySelector("#mob2_container").classList.add("position2")
  document.querySelector("#mob3_container").classList.add("position3")
  document.querySelector("#human_container").classList.add("position4")
}

function startPositionPotion() {
  document.querySelector("#potion_container").classList.add("potion_position1")
}

function registerClick() {
  document.querySelector("#mob1_container").addEventListener("click", mobClicked);
  document.querySelector("#mob2_container").addEventListener("click", mobClicked);
  document.querySelector("#mob3_container").addEventListener("click", mobClicked);
  document.querySelector("#human_container").addEventListener("click", humanClicked);
  document.querySelector("#potion_container").addEventListener("click", potionClicked);
}

//JS for enemies
function mobClicked() {
  console.log("Mob clicked")

  let mob = this;
  mob.removeEventListener("click", mobClicked)
  mob.classList.add("paused")
  mob.querySelector("img").classList.add("zoom_out_spin")
  mob.addEventListener("animationend", mobGone);

  document.querySelector("#sound_hit_mobs").volume = 0.5
  document.querySelector("#sound_hit_mobs").play()
  document.querySelector("#sound_hit_mobs").currentTime = 0

  increasePoint()
}
function mobGone() {

  let mob = this;

  mob.removeEventListener("animationend", mobGone);
  mob.querySelector("img").classList.remove("zoom_out_spin")
  mob.classList.remove("paused")
  mobRestart.call(this);
  mob.addEventListener("click", mobClicked)
}
function mobRestart() {

  let mob = this;

  mob.classList.remove("run");
  mob.offsetWidth;
  mob.classList.add("run");
  mob.classList
    .remove("position1", "position2", "position3", "position4");

  let pos = Math.floor(Math.random() * 4) + 1;
  mob.classList.add("position" + pos)
}

//JS for villager
function humanClicked() {
  console.log("Human clicked");

  let human = this;
  human.removeEventListener("click", humanClicked)
  human.classList.add("paused")
  human.querySelector("img").classList.add("fly_heaven")
  human.addEventListener("animationend", humanGone)

  document.querySelector("#sound_hit_human").volume = 1
  document.querySelector("#sound_hit_human").play()
  document.querySelector("#sound_hit_human").currentTime = 0

  decreaseLives()
}
function humanGone() {
  let human = this;

  human.removeEventListener("animationend", humanGone)
  human.querySelector("img").classList.remove("fly_heaven")
  humanRestart.call(this)
  human.addEventListener("click", humanClicked)
}
function humanRestart() {

  let human = this;

  human.classList.remove("run");
  human.offsetWidth;
  human.classList.add("run");
  human.classList
    .remove("position1", "position2", "position3", "position4");
  human.classList.remove("paused")

  let pos = Math.floor(Math.random() * 4) + 1;
  human.classList.add("position" + pos)
}

//JS for health potion
function potionClicked() {
  console.log("Potion clicked");

  let potion = this
  potion.removeEventListener("click", potionClicked)
  potion.classList.add("paused")
  potion.querySelector("img").classList.add("zoom_out")
  potion.addEventListener("animationend", potionGone)

  document.querySelector("#sound_potion").volume = 0.5
  document.querySelector("#sound_potion").play()
  document.querySelector("#sound_potion").currentTime = 0

  increaseLives()
}

function potionGone() {
  let potion = this;

  potion.removeEventListener("animationend", potionGone)
  potion.querySelector("img").classList.remove("zoom_out")
  potion.classList.remove("paused")
  potionRestart.call(this)
  potion.addEventListener("click", potionClicked)
}

function potionRestart() {
  let potion = this;

  potion.classList.remove("falling");
  potion.offsetWidth;
  potion.classList.add("falling");
  potion.classList
    .remove("potion_position1", "potion_position2", "potion_position3", "potion_position4", "potion_position5", "potion_position6", "potion_position7", "potion_position8");

  let pos = Math.floor(Math.random() * 8) + 1;
  potion.classList.add("potion_position" + pos)
}

//Increase point & hvis kill count funktioner
function increasePoint() {
  console.log("Point Gained!");
  points++;
  displayPoints()

  if (points >= 10) {
    levelComplete();
  }

}

function displayPoints() {
  document.querySelector("#kill_count").textContent = points;
}

//Decrease liv funktioner
function decreaseLives() {
  showDecreasedLives()

  if (lives <= 1) {
    gameOver()
  }

  lives--;
}
function showDecreasedLives() {
  document.querySelector("#heart" + lives).classList.remove("active_heart");
  document.querySelector("#heart" + lives).classList.add("broken_heart");
}

//Increase liv funktioner
function increaseLives() {
  lives++;
  showIncreasedLives()
}
function showIncreasedLives() {
  document.querySelector("#heart" + lives).classList.remove("broken_heart");
  document.querySelector("#heart" + lives).classList.add("active_heart");
}

//Game Over Screen
function gameOver() {
  console.log("Game Over!");
  document.querySelector("#game_over").classList.remove("hidden");


  document.querySelector("#sound_gameOver").volume = 0.5
  document.querySelector("#sound_gameOver").play()
  document.querySelector("#sound_gameOver").currentTime = 0

  stopGame()

}

//Level Complete
function levelComplete() {
  console.log("Level Complete");
  document.querySelector("#level_complete").classList.remove("hidden");

  document.querySelector("#sound_lvl_complete").play()

  stopGame()
}

function stopGame() {
  document.querySelector("#mob1_container").classList.remove("run")
  document.querySelector("#mob2_container").classList.remove("run")
  document.querySelector("#mob3_container").classList.remove("run")
  document.querySelector("#human_container").classList.remove("run")
  document.querySelector("#potion_container").classList.remove("run")

  document.querySelector("#mob1_container").removeEventListener("click", mobClicked)
  document.querySelector("#mob2_container").removeEventListener("click", mobClicked)
  document.querySelector("#mob3_container").removeEventListener("click", mobClicked)
  document.querySelector("#human_container").removeEventListener("click", humanClicked);
  document.querySelector("#potion_container").removeEventListener("click", potionClicked);

  document.querySelector("#sound_game").pause()

  document.querySelector("#sound_hit_human").pause()
  document.querySelector("#sound_hit_mobs").pause()
  document.querySelector("#sound_potion").pause()
}