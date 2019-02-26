class Start2 extends Phaser.Scene {
	constructor(){
		super({key:"Start2"})
	}

	preload(){
		this.load.image('deathcaster', 'assets/images/characters/deathCaster.gif')
		this.load.image('monk', 'assets/images/characters/monk.gif')
	}

	create(){
		this.image1 = this.add.image(w / 3, 200, 'deathcaster').setScale(3,3)
		this.image2 = this.add.image(2*(w / 3), 200, 'monk').setScale(3,3)

		const tconfig = {
			x: w / 2,
			y: 450,
			text: 'Choose a character',
			style: {
				fontSize: '24px',
				fontFamily: 'Arial',
				color: '#000000',
				align: 'center',
				lineSpacing: 44,
			}
		}
		const text = this.make.text(tconfig);
		text.setOrigin(0.5)

		this.input.keyboard.on('keyup_SPACE', function(event){
			this.scene.start('Start3')
		}, this)

	}

}