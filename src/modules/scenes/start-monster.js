
import Batball from './../monsters/batball'
import Beep from './../monsters/beep'
import Beholder from './../monsters/beholder'

export class StartMonster extends Phaser.Scene {
	constructor(){
		super({key:"StartMonster"})
	}

	preload(){
		this.load.image('Batball', 'assets/images/monsters/BatBall1.png')
		this.load.image('Beep', 'assets/images/monsters/Beep.png')
		this.load.image('Beholder', 'assets/images/monsters/Beholder1.png')
		this.load.image('selector', 'assets/images/box-selector.png')
		this.load.audio('cursorSound', ['assets/audio/effects/gameboy/mp3/cw_sound35.mp3'])
	}

	create(){
		// Background image
		this.bgimage = this.add.image(w / 2, h / 2, 'background')
		this.bgimage.setDisplaySize(w, h)

		// Monster images
		this.image = this.add.image(200, 200, 'Batball')
		this.image2 = this.add.image(400, 200, 'Beep')
		this.image3 = this.add.image(600, 200, 'Beholder')

		// Sound effects
		this.cursorSound = this.sound.add('cursorSound')
		this.cursorSound.volume = 0.4

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

		// Starting monsters
		const starterMonster = [
			new Batball(1),
			new Beep(1),
			new Beholder(1)
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
				state.monsterInv.push(starterMonster[0])
			}
			else if (this.starterSelect === 2){
				state.monsterInv.push(starterMonster[1])
			}
			else if (this.starterSelect === 3){
				state.monsterInv.push(starterMonster[2])
			}
			let music = this.scene.get('Music')
			music.theme.stop()
			// this.scene.start('Overworld')
			this.scene.start('PlayerView', {level: 'overworld1'})
		}, this)



	}
	update(time, delta) {



	}

}


















