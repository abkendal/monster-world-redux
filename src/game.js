

import { StartOpen } from './scenes/start-open.js'
import { StartMonster } from './scenes/start-monster.js'
import { Overworld } from './scenes/overworld.js'

const config = {
	type: Phaser.AUTO,
	width: w,
	height: h,
	backgroundColor: 0xdddddd,
	physics: {
		default: 'arcade',
		arcade: {
			debug: false
		}
	},
	scene: [
		StartOpen,
		StartMonster,
		Overworld,
		Encounter,
		Battle,
	]
};

const game = new Phaser.Game(config);