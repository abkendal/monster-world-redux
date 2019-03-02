let controls

class Preload extends Phaser.Scene {
	constructor(){
		super({key:"Preload"})
	}

	preload(){
		this.load.image('deathcaster', 'assets/images/characters/deathCaster.gif')
		this.load.image('monk', 'assets/images/characters/monk.gif')
	}

	create(){
		this.scene.start('Start1')

	}

}








