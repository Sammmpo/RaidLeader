class Player {
  constructor(id, gear, spirit, time, active) {
	this.id = id;
	this.gear = gear;
	this.spirit = spirit;
	this.time = time;
	this.active = active;
  this.personality = 1;
  this.goInactive = this.goInactive.bind(this);
  this.activeAgain = this.activeAgain.bind(this);
  }

  get checkActive() {
    if(this.active == null || this.active == 0) { return false; } else { return true; }
  }

  get dps() {
    var damage = this.gear * this.spirit * this.active;
    return damage;
  }

  get persName() {
    return persNames[this.personality];
  }

  takeLoot(loot) {
    this.gear = this.gear + loot;
    for (i = 1; i < member.length; i++) {
      if (member[i].personality == 3 && member[i].id !== this.id) { member[i].takeDrama(loot/2); } // All Loot Hoarders take Drama.
    }
  }

  giftLoot(loot) {
    this.takeLoot(loot);
    for (i = 1; i < member.length; i++) {
      member[i].takeDrama(loot/4); // Everyone but leader take Drama.
    }
  }

  goInactive(time) {
    if(!this.checkActive) return;
    this.active = 0;
    setTimeout(this.activeAgain, time);
  }
  activeAgain(){ this.active = 1; }

}
