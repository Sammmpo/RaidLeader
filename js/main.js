// The game mechanics

var member = [];
var raidSize = 10;

var playerCount = 0;
var bossHealth = 1000000;
var loot = 100;
var rage = 0;
var cheer = 0;

class Player {
  constructor(id, gear, spirit, time, active) {
	this.id = id;
	this.gear = gear;
	this.spirit = spirit;
	this.time = time;
	this.active = active;
  this.personality = 1;
  }

  get dps() {
      return this.gear * this.spirit;
  }

  takeLoot(loot) {
    this.gear = this.gear + loot;
  }

  giftLoot(loot) {
    this.takeLoot(loot);
    for (i = 1; i < raidSize; i++) {
      member[i].takeDrama(5); // Everyone but leader -5 (-45).
    }
  }

}

class Member {
  constructor(id, gear, spirit, time, active) {
	this.id = id;
	this.gear = gear;
	this.spirit = spirit;
	this.time = time;
	this.active = active;
  this.personality = Math.floor((Math.random() * 5) + 2);

  for (var j = 0; j < 15; j++) {
	var rollStats = Math.floor((Math.random() * 3) + 1);
      if (rollStats == 1) { this.gear += 10; }
      if (rollStats == 2) { this.spirit += 10; }
      if (rollStats == 3) { this.time += 60; }
  }
  }

  get dps() {
    var damage = this.gear * this.spirit;
      if (rage == 1) {
        damage = this.gear * this.spirit * 2;
      }
      if (this.personality == 6) { damage = damage / 2; } // Noob
      return damage;
  }

  takeDrama(drama) {
    if (this.personality == 5) { drama = drama * 2 } // Butthurt
    this.spirit = this.spirit - drama;
  }

  takeBoost(boost) {
    this.spirit = this.spirit + boost;
  }

  takeCheer(cheer) {
    this.takeBoost(cheer);
  }

  takeLoot(loot) {
    this.gear = this.gear + loot;
    this.takeBoost(20);
    if (this.personality == 3) { this.takeBoost(10); } // This Loot Hoarder +10.
    for (i = 1; i < raidSize; i++) {
      if (member[i].personality == 3) { member[i].takeDrama(10); } // All Loot Hoarders -10.
    }
  }

  giftLoot(loot) {
    this.takeLoot(loot);
    this.takeBoost(5); // This gets Loot, so avoid the following -5.
    for (i = 1; i < raidSize; i++) {
      member[i].takeDrama(5); // Everyone except leader -5 (-40).
    }
  }

}

function spawnRaid(){
  member.push(new Player(0, 100, 100, 1200, 1));
  for (i = 1; i < raidSize; i++) {
    member.push(new Member(i, 50, 50, 300, 1));
  }
}


var startGameButton = document.getElementById("startGameButton");
startGameButton.addEventListener("click", startGame);
function startGame() {
  startGameButton.classList.add("locked");
  document.getElementById("startGameButton").disabled = true;
  pullButton.classList.remove("locked");
  document.getElementById("pullButton").disabled = false;
  document.getElementById("cheerButton").disabled = false;
  document.getElementById("rageButton").disabled = false;
  rollLootButton.classList.remove("locked");
  document.getElementById("rollLootButton").disabled = false;
  giftLootButton.classList.remove("locked");
  document.getElementById("giftLootButton").disabled = false;
  spawnRaid();
  timer();
  liveCheck();
  updateGUI();
}



var pullButton = document.getElementById("pullButton");
pullButton.addEventListener("click", pull);
function pull() {
  dps();
  pullButton.classList.add("locked");
  document.getElementById("pullButton").disabled = true;
}


var rageButton = document.querySelector("input[name=rageButton]");
var rageInterval;
rageButton.onchange = function() {
if(this.checked) {
    rage = 1;
    rageInterval = window.setInterval(function(){
      for (i = 1; i < raidSize; i++) {
        if (member[i].personality !== 0) {
          member[i].takeDrama(1);
        }
      }
    }, 1000);
  } else {
    clearInterval(rageInterval);
    rage = 0;
  }
}

var cheerButton = document.querySelector("input[name=cheerButton]");
var cheerInterval;
cheerButton.onchange = function() {
if(this.checked) {
    cheer = 1;
    cheerInterval = window.setInterval(function(){
      for (i = 1; i < raidSize; i++) {
        if (member[i].personality !== 0 && member[i].spirit < 100) {
          member[i].takeCheer(1);
        }
      }
    }, 1000);
  } else {
    clearInterval(cheerInterval);
    cheer = 0;
  }
}






function timer() {
  var timeInterval = window.setInterval(function(){
    for (i = 0; i < raidSize; i++) {
      if (member[i].personality !== 0) { member[i].time -= 1; }
    }
  }, 1000);
}

function liveCheck() {
  var checkInterval = window.setInterval(function(){
    if (member[0].time <= 0) { location.reload(); } // F5 if player time expires.
    var count = 1;
    for (i = 1; i < raidSize; i++) {
      member[i].dps = member[i].gear * member[i].spirit;
      if (member[i].time <= 0 || member[i].spirit <= 0) {
        member[i].personality = 0;
        member[i].gear = 0;
        member[i].spirit = 0;
        member[i].time = 0;
        member[i].active = 0;
      }
      if (member[i].personality !== 0) { count++; }
      playerCount = count;
    }
  }, 10);
}


function dps() {
  var dpsInterval = window.setInterval(function(){
    if (bossHealth > 0 && cheer == 0) {
      for (i = 0; i < raidSize; i++) {
          if (member[i].active == 1 && member[i].personality !== 0) {
            bossHealth -= member[i].dps;
          }
          if (bossHealth < 0) { bossHealth = 0; }
      }
    }
    if (bossHealth <= 0) { // Boss dies.
      clearInterval(dpsInterval);
      bossHealth = 1000000;
      loot += 20;
      pullButton.classList.remove("locked");
      document.getElementById("pullButton").disabled = false;
    }
  }, 1000);
}

var rollLootButton = document.getElementById("rollLootButton");
rollLootButton.addEventListener("click", rollLoot);
function rollLoot() {
  if (loot >= 10) {
    var roll = Math.floor(Math.random() * raidSize);
    member[roll].takeLoot(20);
    loot -= 20;
  }
}

function processForm(e) {
    if (e.preventDefault) e.preventDefault();
    var id = document.querySelector('input[name="memberid"]:checked').value;;
    if (loot > 0) {
      member[id].giftLoot(20);
      loot -= 20;
    }
    return false;
}

var form = document.getElementById('giftForm');
if (form.attachEvent) {
    form.attachEvent("submit", processForm);
} else {
    form.addEventListener("submit", processForm);
}

// GM Commands for testing

var reduceTimeButton = document.getElementById("reduceTimeButton");
reduceTimeButton.addEventListener("click", gmReduceTime);
function gmReduceTime() {
  for (i = 0; i < raidSize; i++) {
      member[i].time -= 100;
  }
}
