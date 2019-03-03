
import { StartOpen } from './modules/scenes/start-open.js'
import { StartMonster } from './modules/scenes/start-monster.js'
import { PlayerView } from './modules/scenes/player-view.js'
import { Battle } from './modules/scenes/battle.js'

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
		PlayerView,
		Battle,
	]
};

const game = new Phaser.Game(config);