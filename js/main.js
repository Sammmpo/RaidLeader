// The game mechanics

var persons = [];
var raidSize = 10;
function spawnPersons(){
  for (i = 1; i <= raidSize; i++) {
    persons[i] = {id:i, personality:1, dps:0, gear:50, spirit:50, time:50, available:1, inRaid:1};
    for (j = 1; j <= 15; j++) {
      var RNG = Math.floor((Math.random() * 3) + 1);
      if (RNG == 1) { persons[i].gear += 10; }
      if (RNG == 2) { persons[i].spirit += 10; }
      if (RNG == 3) { persons[i].time += 10; }
    }
    persons[i].time = persons[i].time * 6;
    persons[i].dps = persons[i].gear * persons[i].spirit;
  }
}
spawnPersons();

var bossHealth = 1000000;
var loot = 0;


var startGameButton = document.getElementById("startGameButton");
startGameButton.addEventListener("click", startGame);
var pullButton = document.getElementById("pullButton");
pullButton.addEventListener("click", pull);


var reduceTimeButton = document.getElementById("reduceTimeButton");
reduceTimeButton.addEventListener("click", gmReduceTime);

function startGame() {
  startGameButton.classList.add("locked");
  document.getElementById("startGameButton").disabled = true;
  pullButton.classList.remove("locked");
  document.getElementById("pullButton").disabled = false;
  timer();
}

function pull() {
  dps();
  pullButton.classList.add("locked");
  document.getElementById("pullButton").disabled = true;
}

function timer() {
  window.setInterval(function(){
    for (i = 1; i <= persons.length; i++) {
      persons[i].time -= 1;
      if (persons[i].time <= 0) {
        personQuits(persons[i]);
      }
    }
  }, 1000);
}
function personQuits(quitter) {
  quitter.personality = 0;
  quitter.dps = 0;
  quitter.gear = 0;
  quitter.spirit = 0;
  quitter.time = 0;
  quitter.available = 0;
  quitter.inRaid = 0;
}
function dps() {
  var dpsInterval = window.setInterval(function(){
    if (bossHealth > 0) {
      for (i = 1; i <= persons.length; i++) {
          if (persons[i].available == 1 && persons[i].inRaid == 1) {
            bossHealth -= persons[i].dps;
          }
          if (bossHealth < 0) { bossHealth = 0; }
      }
    }
    if (bossHealth <= 0) { // Boss dies.
      clearInterval(dpsInterval);
      bossHealth = 1000000;
      loot += 1;
      pullButton.classList.remove("locked");
      document.getElementById("pullButton").disabled = false;
    }
  }, 1000);
}



function gmReduceTime() {
  for (i = 1; i <= persons.length; i++) {
    persons[i].time -= 100;
    if (persons[i].time <= 0) {
      personQuits(persons[i]);
    }
  }
}
