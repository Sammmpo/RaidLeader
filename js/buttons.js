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
  kickButton.classList.remove("locked");
  document.getElementById("kickButton").disabled = false;
  lfmButton.classList.remove("locked");
  document.getElementById("lfmButton").disabled = false;
  var targetButtons = document.getElementsByClassName("targetButton");
  for (i = 0; i < targetButtons.length; i++) {
    targetButtons[i].disabled = false;
    targetButtons[i].classList.remove("locked");
  }
  createRaid();
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

var rollLootButton = document.getElementById("rollLootButton");
rollLootButton.addEventListener("click", rollLoot);
function rollLoot() {
  if (loot >= 1) {
    var roll = Math.floor(Math.random() * member.length);
    member[roll].takeLoot(loot);
    loot -= loot;
  }
}

var giftLootButton = document.getElementById("giftLootButton");
giftLootButton.addEventListener("click", gift);
function gift() {
  if (member[targetId].personality !== null && loot >= 1) {
    member[targetId].giftLoot(loot);
    loot -= loot;
  }
}

var kickButton = document.getElementById("kickButton");
kickButton.addEventListener("click", kick);
function kick() {
  if (member[targetId].personality !== 1 && member[targetId].personality !== null) {
    member[targetId].leaveRaid();
      for (i = 1; i < member.length; i++) {
          //member[i].takeDrama(5);
      }
  }
}

var lfmButton = document.getElementById("lfmButton");
lfmButton.addEventListener("click", lfm);
function lfm() {
  if (member[targetId].personality == null) {
    for (i = 0; i < member.length; i++) {
      if (member[i].personality !== null) { member[i].time -= 60; }
      if (member[i].time <= 0) { member[i].leaveRaid(); }
    }
    member[targetId] = (new Member(targetId, 50, 50, 200, 1));
  }
}


var rageButton = document.querySelector("input[name=rageButton]");
var rageInterval;
rageButton.onchange = function() {
if(this.checked) {
    rage = 1;
    rageInterval = window.setInterval(function(){
      for (i = 1; i < member.length; i++) {
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
      for (i = 1; i < member.length; i++) {
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

var query = document.querySelectorAll('.targetButton');
for (var i = 0; i < query.length; i++) {
    query[i].addEventListener("click", target);
}
function target(event) {
  targetId = event.target.name;
}


// Testing Buttons

var reduceTimeButton = document.getElementById("reduceTimeButton");
reduceTimeButton.addEventListener("click", gmReduceTime);
function gmReduceTime() {
  for (i = 0; i < member.length; i++) {
      if (member[i].personality !== null) { member[i].time -= 100; }
  }
}

var inactiveButton = document.getElementById("inactiveButton");
inactiveButton.addEventListener("click", gmInactive);
function gmInactive() {
  if (member[targetId].personality !== null) {
    member[targetId].goInactive(1000);
  }
}
