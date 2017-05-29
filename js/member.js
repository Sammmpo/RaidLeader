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
  if (this.personality == 4) { this.time = this.time / 2 } // Kid

  }


  get valid() {
    if(this.personality == null) { return false; } else { return true; }
  }

  get dps() {
    var damage = this.gear * this.spirit;
      if (rage == 1) {
        damage = this.gear * this.spirit * 2;
      }
      if (this.personality == 6) { damage = damage / 2; } // Noob
      if (this.personality == null) { damage = ""; }
      return damage;
  }

  get persName() {
    if (this.personality == null) { return ""; }
    return persNames[this.personality];
  }

  takeDrama(drama) {
    if(!this.valid) return;
    if (this.personality == 5) { drama = drama * 2 } // Butthurt
    this.spirit = this.spirit - drama;
    if (this.spirit <= 0) {
      for (i = 1; i < raidSize; i++) {
        member[i].takeDrama(10); // Everyone except leader -10 (-80).
      }
      this.leaveRaid();
    }
  }

  takeBoost(boost) {
    if(!this.valid) return;
    this.spirit = this.spirit + boost;
  }

  takeCheer(cheer) {
    if(!this.valid) return;
    this.takeBoost(cheer);
  }

  takeLoot(loot) {
    if(!this.valid) return;
    this.gear = this.gear + loot;
    this.takeBoost(20);
    if (this.personality == 3) { this.takeBoost(10); } // This Loot Hoarder +10.
    for (i = 1; i < raidSize; i++) {
      if (member[i].personality == 3) { member[i].takeDrama(10); } // All Loot Hoarders -10.
    }
  }

  giftLoot(loot) {
    if(!this.valid) return;
    this.takeLoot(loot);
    this.takeBoost(5); // This gets Loot, so avoid the following -5.
    for (i = 1; i < raidSize; i++) {
      member[i].takeDrama(5); // Everyone except leader -5 (-40).
    }
  }

  leaveRaid() {
    if(!this.valid) return;
  	this.gear = null;
  	this.spirit = null;
  	this.time = null;
  	this.active = null;
    this.personality = null;
  }

}
