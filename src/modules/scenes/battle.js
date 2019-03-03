export class Battle extends Phaser.Scene {
	constructor(){
		super({key:"Battle"})
	}

	preload(){


	}	


	create(data){
		let enemy = {}
		if (data.type === 'encounter'){
			enemy.monsters = [state.encounterMonster]
			enemy.image = this.add.image(-100 , 100, 'Beep')
		}
		this.enemyImage = enemy.image
		this.playerImage = this.add.sprite(w + 100, 500, 'mummy')

		this.enemyTween = this.tweens.add({
			targets: this.enemyImage,
			x: 650,
			duration: 1700,
			ease: 'Linear',
		}, this);

		this.playerTween = this.tweens.add({
			targets: this.playerImage,
			x: 150,
			duration: 1700,
			ease: 'Linear',
		}, this);


	}

	update(time, delta) {

		

	}
}































