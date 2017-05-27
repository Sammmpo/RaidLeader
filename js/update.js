// Updates to GUI
function updateGUI(){

// Update Table
var raidTable = window.setInterval(function(){
  document.getElementById("id-player").innerHTML = member[0].id;
  document.getElementById("personality-player").innerHTML = member[0].personality;
  document.getElementById("dps-player").innerHTML = member[0].dps;
  document.getElementById("gear-player").innerHTML = member[0].gear;
  document.getElementById("spirit-player").innerHTML = member[0].spirit;
  document.getElementById("time-player").innerHTML = member[0].time;
for (i = 1; i < raidSize; i++) {
  document.getElementById("id"+i).innerHTML = member[i].id;
  document.getElementById("personality"+i).innerHTML = member[i].personality;
  document.getElementById("dps"+i).innerHTML = member[i].dps;
  document.getElementById("gear"+i).innerHTML = member[i].gear;
  document.getElementById("spirit"+i).innerHTML = member[i].spirit;
  document.getElementById("time"+i).innerHTML = member[i].time;
}
  document.getElementById("playerCount").innerHTML = playerCount;
  document.getElementById("bossHealth").innerHTML = bossHealth;
  document.getElementById("loot").innerHTML = loot;
}, 10);

}
