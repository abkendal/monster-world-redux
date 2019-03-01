class StartMonster extends Phaser.Scene {
	constructor(){
		super({key:"StartMonster"})
	}

	preload(){
		this.load.image('monster1', 'assets/images/monsters/BatBall1.png')
		this.load.image('monster2', 'assets/images/monsters/Beep.png')
		this.load.image('monster3', 'assets/images/monsters/Beholder1.png')
		this.load.image('selector', 'assets/images/box-selector.png')
		this.load.audio('cursorSound', ['assets/audio/effects/gameboy/mp3/cw_sound35.mp3'])

	}

	create(){
		
		// Background image
		this.bgimage = this.add.image(w / 2, h / 2, 'background')
		this.bgimage.setDisplaySize(w, h)

		// Monster images
		this.image = this.add.image(200, 200, 'monster1')
		this.image2 = this.add.image(400, 200, 'monster2')
		this.image3 = this.add.image(600, 200, 'monster3')

		// Sound effects
		this.cursorSound = this.sound.add('cursorSound')

		// Text
		var tconfig = {
			x: 400,
			y: 450,
			text: 'Choose a monster',
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

			
		// Monster selector box
		this.selector = this.add.image(200, 200, 'selector')
		this.selector.setScale(0.8)

		const starterMonster = [
			'Eyeball',
			'Beep',
			'Beholder'
		]

		// Set up the arrows to control selector box
		this.cursors = this.input.keyboard.createCursorKeys()
		this.starterSelect = 1

		// Controls

		// Left: move selector left
		this.cursors.left.on('down', function(){
			if (this.starterSelect === 3 || this.starterSelect === 2) {
				this.starterSelect = this.starterSelect -1
				this.selector.x = this.selector.x - 200
				this.cursorSound.play()
			}
		}, this)

		// Right: move selector right
		this.cursors.right.on('down', function(){
			if (this.starterSelect === 1 || this.starterSelect === 2){
				this.starterSelect = this.starterSelect +1
				this.selector.x = this.selector.x + 200
				this.cursorSound.play()
			}
		}, this)

		// Space: Select starting monster and move on to next scene
		this.input.keyboard.on('keyup_SPACE', function(event){
			if (this.starterSelect === 1){
				data.monsterInv.push(starterMonster[0])
			}
			else if (this.starterSelect === 2){
				data.monsterInv.push(starterMonster[1])
			}
			else if (this.starterSelect === 3){
				data.monsterInv.push(starterMonster[2])
			}
			console.log(data.monsterInv)
			this.scene.start('Level1')
		}, this)



	}
	update(time, delta) {



	}

}


















