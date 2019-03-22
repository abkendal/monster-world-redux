import Monster from './monsters';
import abilities from './../abilities/abilities';
import elementalTypes from './../elemental-types';

const hpMultiplier = 1;
const attackMultiplier = 2;
const defenseMultiplier = 1;
const spAttackMultiplier = 1;
const spDefenseMultiplier = 1;
const speedMultiplier = 2;
const baseExpYield = 3;

export default class extends Monster {
	constructor(lvl) {
		super(
			lvl,
			hpMultiplier,
			attackMultiplier,
			defenseMultiplier,
			spAttackMultiplier,
			spDefenseMultiplier,
			speedMultiplier,
			baseExpYield
			);

		this.abilities = [
		abilities.bite,
		abilities.waterBlast,
		abilities.stare,
		];

		this.name = 'Beep';
		this.sprite = 'assets/images/monsters/Beep1.png';
		this.type = elementalTypes.water;
	}
}
