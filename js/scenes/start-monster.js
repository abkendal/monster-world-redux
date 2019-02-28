class StartMonster extends Phaser.Scene {
	constructor(){
		super({key:"StartMonster"})
	}

	preload(){
		this.load.image('monster1', 'assets/images/monsters/BatBall1.png')
		this.load.image('monster2', 'assets/images/monsters/Beep.png')
		this.load.image('monster3', 'assets/images/monsters/Beholder1.png')
	}

	create(){
		this.image = this.add.image(200, 200, 'monster1')
		this.image2 = this.add.image(400, 200, 'monster2')
		this.image3 = this.add.image(600, 200, 'monster3')

		var tconfig = {
			x: 400,
			y: 350,
			text: 'Choose a monster',
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
			this.scene.start('Level1')
		}, this)


		var rect = new Phaser.Geom.Rectangle(150, 280, 100, 5);
		var graphics = this.add.graphics({ fillStyle: { color: 0x000000 } });
		graphics.fillRectShape(rect);

		// Set up the arrows to control the camera
		this.cursors = this.input.keyboard.createCursorKeys()
		let currentSelection

	}
	update(time, delta) {



	}

}