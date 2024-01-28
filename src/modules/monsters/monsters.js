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
		speedMultiplier,
		baseExpYield
		) {
		this.level = lvl
		this.hpMultiplier = hpMultiplier
		this.attackMultiplier = attackMultiplier
		this.defenseMultiplier = defenseMultiplier
		this.spAttackMultiplier = spAttackMultiplier
		this.spDefenseMultiplier = spDefenseMultiplier
		this.speedMultiplier = speedMultiplier
		this.baseExpYield = baseExpYield

		this.hp = 10 + (hpMultiplier * this.level)
		this.currentHp = this.hp
		this.condition = 'healthy'
		this.attack = (5 + attackMultiplier) * 11 * this.level / 100 + 2
		this.defense = (5 + defenseMultiplier) * 11 * this.level / 100 + 2
		this.spAttack = (5 + spAttackMultiplier) * 11 * this.level / 100 + 2
		this.spDefense = (5 + spDefenseMultiplier) * 11 * this.level / 100 + 2
		this.speed = (5 + speedMultiplier) * 11 * this.level / 100 + 2
		this.currentExp = 0
		this.expToLevel = Math.pow(this.level, 3)
		this.expReward = this.baseExpYield * this.level
	}
	levelUp(){
		this.level ++;
		this.hp = 10 + (this.hpMultiplier * this.level);
		this.attack = (5 + this.attackMultiplier) * 11 * this.level / 100 + 2
		this.defense = (5 + this.defenseMultiplier) * 11 * this.level / 100 + 2
		this.spAttack = (5 + this.spAttackMultiplier) * 11 * this.level / 100 + 2
		this.spDefense = (5 + this.spDefenseMultiplier) * 11 * this.level / 100 + 2
		this.speed = (5 + this.speedMultiplier) * 11 * this.level / 100 + 2
		this.expToLevel = Math.pow(this.level, 3)
	}
}