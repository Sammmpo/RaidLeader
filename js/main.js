// The game mechanics

var member = [];
var raidSize = 10;
createRaid();

var persNames = [
  "None",
  "Raid Leader (you)", "Common", "Loot Hoarder", "Kid", "Butthurt",
  "Noob"
];

var playerCount = 0;
var dpsTotal = 0;
var bossHealth = 1000000;
var loot = 20;
var rage = 0;
var cheer = 0;
var targetId = 0;

function createRaid(){
  member.splice(0, 10);
  member.push(new Player(0, 100, 100, 900, 1));
  for (i = 1; i < raidSize; i++) {
    member.push(new Member(i, 50, 50, 200, 1));
  }
}

function timer() {
  var timeInterval = window.setInterval(function(){
    for (i = 0; i < member.length; i++) {
      if (member[i].personality !== null) { member[i].time -= 1; }
      if (member[i].time <= 0) { member[i].leaveRaid(); }
    }
  }, 1000);
}

function liveCheck() {
  var checkInterval = window.setInterval(function(){
    if (member[0].time <= 0) { location.reload(); } // F5 if player time expires.
    var count = 0;
    var dpsCount = 0;
    for (i = 0; i < member.length; i++) {
      if (member[i].personality !== null) {
        count++;
        dpsCount = dpsCount + member[i].dps
      }
      playerCount = count;
      dpsTotal = dpsCount;
    }
  }, 10);
}


function dps() {
  var dpsInterval = window.setInterval(function(){
    if (bossHealth > 0 && cheer == 0) {
      for (i = 0; i < member.length; i++) {
          if (member[i].active == 1 && member[i].personality !== null) {
            bossHealth -= member[i].dps;
          }
          if (bossHealth < 0) { bossHealth = 0; }
      }
    }
    if (bossHealth <= 0) { // Boss dies.
      clearInterval(dpsInterval);
      bossHealth = 3000000;
      loot += 20;
      for (i = 1; i < member.length; i++) {
        member[i].takeBoost(10);
      }
      pullButton.classList.remove("locked");
      document.getElementById("pullButton").disabled = false;
    }
  }, 1000);
}
