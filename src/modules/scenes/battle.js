export class Battle extends Phaser.Scene {
	constructor(){
		super({key:"Battle"})
	}

	preload(){
		this.load.spritesheet('lightning', 'assets/images/effects/lightning.png', { frameWidth: 235, frameHeight: 75 })

	}	


	create(data){
		
		// Get player data, monsters in inventory 
		let hero = {}
		hero.monster = state.monsterInv
		this.monsterImg = this.add.image(150, 500, hero.monster[0].name)
		this.monsterImg.alpha = 0


		let enemy = {}
		if (data.type === 'encounter'){
			enemy.monsters = [state.encounterMonster]
			enemy.image = this.add.image(-100 , 100, enemy.monsters[0].name)
		}
		else if (data.type === 'battle'){

		}

		this.enemyImage = enemy.image
		this.playerImage = this.add.sprite(w + 100, 500, 'mummy').setScale(3)
		this.lightningSprite = this.add.sprite(310, 475, 'lightning')
		this.lightningSprite.alpha = 0

		// Animate enemy onto screen
		this.enemyTween = this.tweens.add({
			targets: this.enemyImage,
			x: 650,
			duration: 1500,
			ease: 'Linear',
		}, this);

		// Make lightning appear
		this.lightningIn = this.tweens.add({
			targets: this.lightningSprite,
			alpha: 1,
			duration: 1,
			ease: 'Linear',
			paused: true
		})

		// Move player sprite and lightning off the screen
		this.playerOut = this.tweens.add({
			targets: [this.playerImage, this.lightningSprite],
			x: -100,
			duration: 1500,
			ease: 'Linear',
			paused: true
		})

		// Fade monster in
		this.monsterIn = this.tweens.add({
			targets: this.monsterImg,
			alpha: 1,
			duration: 1500,
			ease: "Linear",
			paused: true
		})

		// Animate player onto the screen
		this.playerTween = this.tweens.add({
			targets: this.playerImage,
			x: 150,
			duration: 1700,
			ease: 'Linear',
			onComplete: lightningSummon,
			onCompleteParams: [ this.lightningSprite, this.lightningIn, this.playerOut, this.monsterIn ]
		});

		// Summon lightning animation
		this.anims.create({
			key: 'summon',
			frames: this.anims.generateFrameNumbers('lightning', { start: 0, end: 2 }),
			frameRate: 10,
			repeat: -1
		}, this)

		


	}

	update(time, delta) {

		

	}
}

function lightningSummon (tween, targets, image, lightningIn, playerOut, monsterIn) {
	lightningIn.play()
	image.play('summon')

	setTimeout(function() { 
		playerOut.play()
	 }, 1500, playerOut)

	setTimeout(function() { 
		monsterIn.play()
	 }, 1500, monsterIn)
}

























