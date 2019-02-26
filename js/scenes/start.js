class Start extends Phaser.Scene {
	constructor(){
		super({key:"Start"})
	}

	preload(){
		this.load.image('logo', 'assets/images/logo.png')
	}

	create(){
		this.image = this.add.image(w / 2 , 200, 'logo')

		var tconfig = {
			x: w / 2,
			y: 450,
			text: 'Press space to start',
			style: {
				fontSize: '24px',
				fontFamily: 'Arial',
				color: '#000000',
				align: 'center',
				lineSpacing: 44,
			}
		};
		var text = this.make.text(tconfig);
		text.setWordWrapWidth(800, false);
		text.setOrigin(0.5);

		this.input.keyboard.on('keyup_SPACE', function(event){
			this.scene.start('Start2')
		}, this)

	}

}