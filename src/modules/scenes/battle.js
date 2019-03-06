export class Battle extends Phaser.Scene {
	constructor(){
		super({key:"Battle"})
	}

	preload(){
		this.load.spritesheet('lightning', 'assets/images/effects/lightning.png', { frameWidth: 235, frameHeight: 75 })
		this.load.image('arrow', 'assets/images/icons/arrow2.png')
	}	


	create(data){
		
		// Get player data, monsters in inventory 
		let hero = {}
		hero.monsters = state.monsterInv


		let enemy = {}
		if (data.type === 'encounter'){
			enemy.monsters = [state.encounterMonster]
			enemy.image = this.add.image(-100 , 100, enemy.monsters[0].name)
		}
		else if (data.type === 'battle'){

		}

		// Set initial monster and cursor states
		enemy.currentMonster = enemy.monsters[0]
		enemy.currentHP = enemy.currentMonster.hp

		hero.currentMonster = hero.monsters[0]
		hero.currentHP = hero.currentMonster.hp
		hero.menuCursorPosition = 0

		// Add images
		this.enemyImage = enemy.image
		this.playerImage = this.add.sprite(w, 400, 'mummy').setScale(3)
		this.lightningSprite = this.add.sprite(310, 400, 'lightning')
		this.lightningSprite.alpha = 0
		this.monsterImg = this.add.image(150, 400, hero.monsters[0].name)
		this.monsterImg.alpha = 0

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
			onComplete: monsterSummon,
			onCompleteParams: [ this.lightningSprite, this.lightningIn, this.playerOut, this.monsterIn ]
		});

		// Summon lightning animation
		this.anims.create({
			key: 'summon',
			frames: this.anims.generateFrameNumbers('lightning', { start: 0, end: 2 }),
			frameRate: 10,
			repeat: -1
		}, this)

		// Battle UI
		const fontStyle = {
			fontSize: '32px', 
			fill: '#000'
		}
		const infoBoxWidth = 350
		const infoBoxHeight = 85

		// Main menu arrow positions
		const menuArrowPositions = [
			[-20, 15],
			[233, 15],
			[-20, 70],
			[233, 70]
		]

		// Enemy monster info
		this.enemyBox = this.add.graphics().lineStyle(3, 0x000000).fillStyle(0x031f4c, 1).strokeRect(0, 0, infoBoxWidth, infoBoxHeight)
		this.enemyMonsterName = this.add.text(10, 5,enemy.monsters[0].name, fontStyle);
		this.enemyMonsterLvl = this.add.text(infoBoxWidth - 10, 5, "Lv"+enemy.monsters[0].level, fontStyle).setOrigin(1,0)
		this.enemyMonsterHP = this.add.text(10, infoBoxHeight - 5, ("HP: " + enemy.currentHP + "/" + enemy.currentMonster.hp), fontStyle).setOrigin(0,1)

		this.enemyInfoContainer  = this.add.container(15, 15, [ this.enemyBox, this.enemyMonsterName, this.enemyMonsterLvl, this.enemyMonsterHP])

		// Player monster info
		this.heroBox = this.add.graphics().lineStyle(3, 0x000000).fillStyle(0x031f4c, 1).strokeRect(0, 0, infoBoxWidth, infoBoxHeight)
		this.heroMonsterName = this.add.text(10 , 5,hero.monsters[0].name, fontStyle)
		this.heroMonsterLvl = this.add.text(infoBoxWidth - 10, 5, "Lv"+hero.monsters[0].level, fontStyle).setOrigin(1,0)
		this.heroMonsterHP = this.add.text(10, infoBoxHeight - 5, ("HP: " + hero.currentHP + "/" + hero.currentMonster.hp), fontStyle).setOrigin(0,1)

		this.heroInfoContainer = this.add.container(w - 362, h - 240, [this.heroBox, this.heroMonsterName, this.heroMonsterLvl, this.heroMonsterHP])

		// Main Menu
		this.menuFightTxt = this.add.text(0, 0, 'Fight', fontStyle)
		this.menuBagTxt = this.add.text(250, 0, 'Bag', fontStyle)
		this.menuMonsterTxt = this.add.text(0, 55, 'Monsters', fontStyle)
		this.menuRunTxt = this.add.text(250 , 55, 'Run', fontStyle)
		this.menuArrow = this.add.sprite(menuArrowPositions[0][0], menuArrowPositions[0][1], 'arrow').setScale(0.45)

		this.mainMenuContainer = this.add.container(w - 350, h - 130, [this.menuFightTxt, this.menuBagTxt, this.menuMonsterTxt, this.menuRunTxt, this.menuArrow])

		// Controls
		this.cursors = this.input.keyboard.createCursorKeys()
		const positionArrow = function(){
			this.menuArrow.setPosition(menuArrowPositions[hero.menuCursorPosition][0], menuArrowPositions[hero.menuCursorPosition][1])
		}

		// Left: move selector left
		this.cursors.left.on('down', function(){
			if (hero.menuCursorPosition === 1 || hero.menuCursorPosition === 3) {
				hero.menuCursorPosition = hero.menuCursorPosition - 1
				this.menuArrow.setPosition(menuArrowPositions[hero.menuCursorPosition][0], menuArrowPositions[hero.menuCursorPosition][1])
			}
		}, this)

		// Right: move selector right
		this.cursors.right.on('down', function(){
			if (hero.menuCursorPosition === 0 || hero.menuCursorPosition === 2) {
				hero.menuCursorPosition = hero.menuCursorPosition + 1
				this.menuArrow.setPosition(menuArrowPositions[hero.menuCursorPosition][0], menuArrowPositions[hero.menuCursorPosition][1])

			}
		}, this)

		// Up: move selector up
		this.cursors.up.on('down', function(){
			if (hero.menuCursorPosition === 2 || hero.menuCursorPosition === 3) {
				hero.menuCursorPosition = hero.menuCursorPosition - 2
				this.menuArrow.setPosition(menuArrowPositions[hero.menuCursorPosition][0], menuArrowPositions[hero.menuCursorPosition][1])
			}
		}, this)

		// Down: move selector down
		this.cursors.down.on('down', function(){
			if (hero.menuCursorPosition === 0 || hero.menuCursorPosition === 1){
				hero.menuCursorPosition =hero.menuCursorPosition + 2
				this.menuArrow.setPosition(menuArrowPositions[hero.menuCursorPosition][0], menuArrowPositions[hero.menuCursorPosition][1])
			}
		}, this)



	}

	update(time, delta) {

		

	}
}

// Monster Summon animation sequence
function monsterSummon (tween, targets, image, lightningIn, playerOut, monsterIn) {
	lightningIn.play()
	image.play('summon')

	setTimeout(function() { 
		playerOut.play()
	 }, 1500, playerOut)

	setTimeout(function() { 
		monsterIn.play()
	 }, 1500, monsterIn)
}
































