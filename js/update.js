// Updates to GUI
function updateGUI(){

// Update Table
var raidTable = window.setInterval(function(){
  document.getElementById("id-player").innerHTML = member[0].id;
  document.getElementById("personality-player").innerHTML = member[0].persName;
  document.getElementById("dps-player").innerHTML = member[0].dps;
  document.getElementById("gear-player").innerHTML = member[0].gear;
  document.getElementById("spirit-player").innerHTML = member[0].spirit;
  document.getElementById("time-player").innerHTML = member[0].time;
for (i = 1; i < member.length; i++) {
  document.getElementById("id"+i).innerHTML = member[i].id;
  document.getElementById("personality"+i).innerHTML = member[i].persName;
  document.getElementById("dps"+i).innerHTML = member[i].dps;
  document.getElementById("gear"+i).innerHTML = member[i].gear;
  document.getElementById("spirit"+i).innerHTML = member[i].spirit;
  document.getElementById("time"+i).innerHTML = member[i].time;
}
  document.getElementById("playerCount").innerHTML = playerCount;
  document.getElementById("dpsTotal").innerHTML = dpsTotal;
  document.getElementById("bossHealth").innerHTML = bossHealth;
  document.getElementById("loot").innerHTML = loot;
  document.getElementById("targetId").innerHTML = targetId;
}, 10);

}
