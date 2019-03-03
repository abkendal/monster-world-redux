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

		this.enemyTween = this.tweens.add({
			targets: this.enemyImage,
			x: 650,
			duration: 1500,
			ease: 'Linear',
		}, this);

		this.playerTween = this.tweens.add({
			targets: this.playerImage,
			x: 150,
			duration: 1700,
			ease: 'Linear',
			onComplete: function(){
				this.lightningSprite = this.add.sprite(50, 300, 'lightning')
				this.lightningSprite.play('summon')
			}
		});


		// Walk animation
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































