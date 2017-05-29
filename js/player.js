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

  get persName() {
    return persNames[this.personality];
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
