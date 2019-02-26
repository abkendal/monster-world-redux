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
			// gravity: {y: 500},
			debug: false
		}
	},
	scene: [
		// Preload,
		Start,
		Start2,
		Start3,
		Level1
	]
};

const game = new Phaser.Game(config);