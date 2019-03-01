const w = 800
const h = 600
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
		// Preload,
		StartOpen,
		StartMonster,
		Level1,
		Encounter,
		Battle,
	]
};

const game = new Phaser.Game(config);