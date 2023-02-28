"use strict";

window.addEventListener("load", start);

function start() {
  console.log("JavaScript is running!");

startAnimation()
startPosition()
startPositionPotion()
registerClick()

document.querySelector("#mob1_container")
.addEventListener("animationiteration", mobRestart)
document.querySelector("#mob2_container")
.addEventListener("animationiteration", mobRestart)
document.querySelector("#mob3_container")
.addEventListener("animationiteration", mobRestart)
document.querySelector("#human_container")
.addEventListener("animationiteration", mobRestart)
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
}

//JS for enemies
function mobClicked() {
  console.log("Mob clicked")

  let mob = this;
  mob.removeEventListener("click", mobClicked)
  mob.classList.add("paused")
  mob.querySelector("img").classList.add("zoom_out_spin")
  mob.addEventListener("animationend", mobGone);
}
function mobGone() {

  let mob = this;

  mob.removeEventListener("animationend", mobGone);
  mob.querySelector("img").classList.remove("zoom_out_spin")
  mob.classList.remove("paused")
  mobRestart.call(this);
  mob.addEventListener("click", mobClicked)
}
function mobRestart(){ 

  let mob = this;

  mob.classList.remove("run");
  mob.offsetWidth;
  mob.classList.add("run");
  mob.classList
  .remove("position1", "position2", "position3", "position4");

  let pos = Math.floor(Math.random()*4)+1;
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

  let pos = Math.floor(Math.random()*4)+1;
  human.classList.add("position" + pos)
}

//JS for health potion
function potionClicked() {

}
