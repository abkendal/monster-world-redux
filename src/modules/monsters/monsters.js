// Monster class determines the initial stats of the monster
// based on the level and the multiplier
// Multipliers are defined when individual monsters are instantiated
export default class {
	constructor(
		lvl,
		hpMultiplier,
		attackMultiplier,
		defenseMultiplier,
		spAttackMultiplier,
		spDefenseMultiplier,
		speedMultiplier
		) {
		this.level = lvl;
		this.hpMultiplier = hpMultiplier;
		this.attackMultiplier = attackMultiplier;
		this.defenseMultiplier = defenseMultiplier;
		this.spAttackMultiplier = spAttackMultiplier;
		this.spDefenseMultiplier = spDefenseMultiplier;
		this.speedMultiplier = speedMultiplier;

		this.hp = 10 * hpMultiplier * this.level;
		this.currentHp = this.hp;
		this.condition = 'healthy';
		this.attack = (5 + attackMultiplier) * 11 * this.level / 100 + 2;
		this.defense = (5 + defenseMultiplier) * 11 * this.level / 100 + 2;
		this.spAttack = (5 + spAttackMultiplier) * 11 * this.level / 100 + 2;
		this.spDefense = (5 + spDefenseMultiplier) * 11 * this.level / 100 + 2;
		this.speed = (5 + speedMultiplier) * 11 * this.level / 100 + 2;
		this.currentExp = 0;
		this.expToLevel = 10 + 3 * this.level;
		this.expReward = 5 + 3 * this.level;
	}
}