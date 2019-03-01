class StartOpen extends Phaser.Scene {
	constructor(){
		super({key:"StartOpen"})
	}

	preload(){
		this.load.audio('gbstart', ['assets/audio/effects/bg-start-sound.mp3'])
		// this.load.audio('theme', ['assets/audio/music/theme.mp3'])
		this.load.image('background', 'assets/images/backgrounds/forest800x600.jpg')
		this.load.image('logo', 'assets/images/logo.png')

	}

	create(){
		this.bgimage = this.add.image(w / 2, h / 2, 'background')
		this.bgimage.setDisplaySize(w, h)
		this.image = this.add.image(w / 2 , 200, 'logo')

		// Gameboy start sound
		this.gbstart = this.sound.add('gbstart')
		this.gbstart.play()

		// Set up music
		this.bgmusic = this.sound.add('theme')
		this.bgmusic.loop = true
		this.bgmusic.volume = 0.2
		// this.bgmusic.play()


		

		var tconfig = {
			x: w / 2,
			y: 450,
			text: 'Press space to start',
			style: {
				fontSize: '24px',
				fontFamily: 'Arial',
				color: '#cccccc',
				align: 'center',
				lineSpacing: 44,
			}
		};
		var text = this.make.text(tconfig);
		text.setWordWrapWidth(800, false);
		text.setOrigin(0.5);

		this.input.keyboard.on('keyup_SPACE', function(event){
			// this.bgmusic.stop()
			this.scene.start('StartMonster')
		}, this)
	}
	update(time, delta) {

	}
}



















