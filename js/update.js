// Updates to GUI


// Update Table
window.setInterval(function(){
      for (i = 1; i <= raidSize; i++) {
            document.getElementById("id"+i).innerHTML = persons[i].id;
            document.getElementById("personality"+i).innerHTML = persons[i].personality;
            document.getElementById("dps"+i).innerHTML = persons[i].dps;
            document.getElementById("gear"+i).innerHTML = persons[i].gear;
            document.getElementById("spirit"+i).innerHTML = persons[i].spirit;
            document.getElementById("time"+i).innerHTML = persons[i].time;
      }
      document.getElementById("bossHealth").innerHTML = bossHealth;
      document.getElementById("loot").innerHTML = loot;
}, 10);
