export class Battle extends Phaser.Scene {
	constructor(){
		super({key:"Battle"})
	}

	preload(){
		this.load.spritesheet('lightning', 'assets/images/effects/lightning.png', { frameWidth: 235, frameHeight: 75 })

	}	


	create(data){
		let enemy = {}

		if (data.type === 'encounter'){
			enemy.monsters = [state.encounterMonster]
			enemy.image = this.add.image(-100 , 100, enemy.monsters[0].name)
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

		this.playerOut = this.tweens.add({
			targets: [this.playerImage, this.lightningSprite],
			x: -100,
			duration: 1500,
			ease: 'Linear',
			paused: true
		})

		// Animate player onto the screen
		this.playerTween = this.tweens.add({
			targets: this.playerImage,
			x: 150,
			duration: 1700,
			ease: 'Linear',
			onComplete: lightningSummon,
			onCompleteParams: [ this.lightningSprite, this.lightningIn, this.playerOut ]
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

function lightningSummon (tween, targets, image, lightningIn, playerOut) {
	lightningIn.play()
	image.play('summon')
	setTimeout(function() { 
		playerOutTween(playerOut)
	 }, 1500, playerOut);
}

function playerOutTween (playerOut){
	playerOut.play()
}


























