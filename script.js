"use strict";
window.addEventListener("load", start);

let points = 0
let lives = 3

function start() {
    //Tjekker om JavaScript Kører
    console.log("JavaScript kører!");

    //Start animationerne
    document.querySelector("#warrior1_container").classList.add("run");

    document.querySelector("#monster1_container").classList.add("chase");
    document.querySelector("#monster2_container").classList.add("chase");
    document.querySelector("#monster3_container").classList.add("chase");

    //Registrer click
    document.querySelector("#warrior1_container").addEventListener("click", clickVillager);
  }

function clickVillager() {
    console.log("Click Villager");

    //Forhindrer i at clicke multiple time
    document.querySelector("#warrior1_container").removeEventListener("click", clickVillager);

    //pause animation
    document.querySelector("#warrior1_container").classList.add("paused")

    //Forsvind animation
    document.querySelector("#villager1_sprite").classList.add("zoom_out")

    //Kalder på en function der vil genstarte hele processen
    document.querySelector("#warrior1_container").addEventListener("animationend", villagerGone)

  }

  function villagerGone() {
    //fjerne linjen der bringer os ind
    document.querySelector("#warrior1_container").removeEventListener("animationend", villagerGone)

    //fjerner forsvind animationen
    document.querySelector("#villager1_sprite").classList.remove("zoom_out")

    //fjerner pause tilstanden
    document.querySelector("#warrior1_container").classList.remove("paused");

    //genstart animation
    document.querySelector("#warrior1_container").classList.remove("run");
    document.querySelector("#warrior1_container").offsetWidth;
    document.querySelector("#warrior1_container").classList.add("run");


  }