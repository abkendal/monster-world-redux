import Monster from './monsters';
import abilities from './../abilities/abilities';
import elementalTypes from './../elemental-types';

const hpMultiplier = 1;
const attackMultiplier = 2;
const defenseMultiplier = 1;
const spAttackMultiplier = 1;
const spDefenseMultiplier = 1;
const speedMultiplier = 1;

export default class extends Monster {
	constructor(lvl) {
		super(
			lvl,
			hpMultiplier,
			attackMultiplier,
			defenseMultiplier,
			spAttackMultiplier,
			spDefenseMultiplier,
			speedMultiplier
			);

		this.abilities = [
		abilities.scratch,
		abilities.razorLeaf,
		abilities.stare,
		];

		this.name = 'Beholder';
		this.sprite = 'assets/images/monsters/Beholder.png';
		this.type = elementalTypes.grass;
	}
}
