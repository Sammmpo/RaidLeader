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

var rollLootButton = document.getElementById("rollLootButton");
rollLootButton.addEventListener("click", rollLoot);
function rollLoot() {
  if (loot >= 20) {
    var roll = Math.floor(Math.random() * member.length);
    member[roll].takeLoot(20);
    loot -= 20;
  }
}

var query = document.querySelectorAll('.targetButton');
for (var i = 0; i < query.length; i++) {
    query[i].addEventListener("click", target);
}
function target(event) {
  targetId = event.target.name;
}

function processGiftForm(e) {
    if (e.preventDefault) e.preventDefault();
    var giftId = document.querySelector('input[name="memberid"]:checked').value;;
    if (member[giftId].personality !== null && loot >= 20) {
      member[giftId].giftLoot(20);
      loot -= 20;
    }
    return false;
}
var giftForm = document.getElementById('giftForm');
if (giftForm.attachEvent) {
    giftForm.attachEvent("submit", processGiftForm);
} else {
    giftForm.addEventListener("submit", processGiftForm);
}

function processKickForm(e) {
    if (e.preventDefault) e.preventDefault();
    var kickId = document.querySelector('input[name="memberKickId"]:checked').value;;
      if (member[kickId].personality !== 1 && member[kickId].personality !== null) {
        member[kickId].leaveRaid();
          for (i = 1; i < member.length; i++) {
              member[i].takeDrama(5);
          }
        } else { console.log("You can't kick this!"); }
    return false;
}
var kickForm = document.getElementById('kickForm');
if (kickForm.attachEvent) {
    kickForm.attachEvent("submit", processKickForm);
} else {
    kickForm.addEventListener("submit", processKickForm);
}


// GM Commands for testing

var reduceTimeButton = document.getElementById("reduceTimeButton");
reduceTimeButton.addEventListener("click", gmReduceTime);
function gmReduceTime() {
  for (i = 0; i < member.length; i++) {
      if (member[i].personality !== null) { member[i].time -= 100; }
  }
}
