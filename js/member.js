class Member {
  constructor(id, gear, spirit, time, active) {
	this.id = id;
	this.gear = gear;
	this.spirit = spirit;
	this.time = time;
	this.active = active;
  this.personality = Math.floor((Math.random() * 5) + 2);
  this.goInactive = this.goInactive.bind(this);
  this.activeAgain = this.activeAgain.bind(this);

  for (var j = 0; j < 15; j++) {
	var rollStats = Math.floor((Math.random() * 3) + 1);
      if (rollStats == 1) { this.gear += 10; }
      if (rollStats == 2) { this.spirit += 10; }
      if (rollStats == 3) { this.time += 40; }
  }
  if (this.personality == 4) { this.time = this.time / 2 } // Kid

  }


  get valid() {
    if(this.personality == null) { return false; } else { return true; }
  }

  get checkActive() {
    if(this.active == null || this.active == 0) { return false; } else { return true; }
  }

  get dps() {
    var damage = this.gear * this.spirit;
      if (rage == 1) {
        damage = damage * 2;
      }
      if (this.personality == 6) { damage = damage / 2; } // Noob
      if (this.personality == null) { damage = ""; }
      damage = damage * this.active;
      return damage;
  }

  get persName() {
    if (this.personality == null) { return ""; }
    return persNames[this.personality];
  }

  takeDrama(drama) {
    if(!this.valid) return;
    if(!this.checkActive) return;
      if (this.personality == 5) { drama = drama * 2 } // Butthurt
      this.spirit = this.spirit - drama;
      if (this.spirit <= 0) {
        this.rageQuit();
      }
  }


  goInactive(time) {
    if(!this.checkActive) return;
    this.active = 0;
    setTimeout(this.activeAgain, time);
  }
  activeAgain(){ this.active = 1; }

  rageQuit() {
    this.leaveRaid();
    for (i = 1; i < member.length; i++) { // Rage Quit
      member[i].takeDrama(10); // Everyone except leader -10 (-80).
    }
  }

  takeBoost(boost) {
    if(!this.valid) return;
    if(!this.checkActive) return;
    if (this.spirit < 150) { this.spirit = this.spirit + boost; }
    if (this.spirit > 150) { this.spirit = 150; }
  }

  takeCheer(cheer) {
    if(!this.valid) return;
    this.takeBoost(cheer);
  }

  takeLoot(loot) {
    if(!this.valid) return;
    this.gear = this.gear + loot;
    this.takeBoost(loot);
    for (i = 1; i < member.length; i++) {
      if (member[i].personality == 3 && member[i].id !== this.id) { member[i].takeDrama(loot/2); } // All other Loot Hoarders take Drama.
    }
  }

  giftLoot(loot) {
    if(!this.valid) return;
    this.takeLoot(loot);
    for (i = 1; i < member.length; i++) {
      if (member[i].id !== this.id) { member[i].takeDrama(loot/4); } // Everyone except leader and this take Drama.
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
