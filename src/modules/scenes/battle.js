import abilities from './../abilities/abilities';
export class Battle extends Phaser.Scene {
	constructor(){
		super({key:"Battle"})
	}

	preload(){
		this.load.spritesheet('lightning', 'assets/images/effects/lightning.png', { frameWidth: 235, frameHeight: 75 })
		this.load.image('arrow', 'assets/images/icons/arrow2.png')
	}	


	create(data){
		let music = this.scene.get('Music')
		state.currentBattleMenu =  'main'
		state.menuItemSelected = 'fight'
		this.hero = {}
		// Get player data, monsters in inventory 
		this.hero.monsters = state.monsterInv

		// Get enemy data, set up encounter or summoner battle
		this.enemy = {}
		if (data.type === 'encounter'){
			this.enemy.monsters = [state.encounterMonster]
			this.enemy.image = this.add.image(-100 , 100, this.enemy.monsters[0].name)
		}
		else if (data.type === 'battle'){

		}

		// Set initial monster and cursor states
		this.enemy.currentMonster = this.enemy.monsters[0]
		this.enemy.currentHP = this.enemy.currentMonster.hp

		this.hero.currentMonster = this.hero.monsters[0]
		console.log(this.hero.currentMonster)
		this.hero.currentHP = this.hero.currentMonster.hp
		this.hero.menuCursorPosition = 0
		this.hero.monsterAbilities = this.hero.currentMonster.abilities

		// Add images
		this.enemyImage = this.enemy.image
		this.playerImage = this.add.sprite(w, 400, 'mummy').setScale(3)
		this.lightningSprite = this.add.sprite(310, 400, 'lightning')
		this.lightningSprite.alpha = 0
		this.monsterImg = this.add.image(150, 400, this.hero.monsters[0].name)
		this.monsterImg.alpha = 0


		// **** ANIMAITONS ****
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



		// **** BATTLE UI ****
		const fontStyle = {
			fontSize: '32px', 
			fill: '#000'
		}
		const infoBoxWidth = 350
		const infoBoxHeight = 85

		// Menu arrow positions
		this.menuArrowPositions = {
			mainMenu: [
				['fight', -20, 15],
				['bag', 233, 15],
				['monsters', -20, 70],
				['run', 233, 70]
			],
			fightMenu: [
				['ability1', -20, 18],
				['ability2', 280, 18],
				['ability3', -20, 85],
				['ability4', 280, 85]
			]
		}

		// Enemy monster info
		this.enemyBox = this.add.graphics().lineStyle(3, 0x000000).fillStyle(0x031f4c, 1).strokeRect(0, 0, infoBoxWidth, infoBoxHeight)
		this.enemyMonsterName = this.add.text(10, 5,this.enemy.monsters[0].name, fontStyle);
		this.enemyMonsterLvl = this.add.text(infoBoxWidth - 10, 5, "Lv"+this.enemy.monsters[0].level, fontStyle).setOrigin(1,0)
		this.enemyMonsterHP = this.add.text(10, infoBoxHeight - 5, ("HP: " + this.enemy.currentHP + "/" + this.enemy.currentMonster.hp), fontStyle).setOrigin(0,1)

		this.enemyInfoContainer  = this.add.container(15, 15, [ this.enemyBox, this.enemyMonsterName, this.enemyMonsterLvl, this.enemyMonsterHP])

		// Player monster info
		this.heroBox = this.add.graphics().lineStyle(3, 0x000000).fillStyle(0x031f4c, 1).strokeRect(0, 0, infoBoxWidth, infoBoxHeight)
		this.heroMonsterName = this.add.text(10 , 5,this.hero.monsters[0].name, fontStyle)
		this.heroMonsterLvl = this.add.text(infoBoxWidth - 10, 5, "Lv"+this.hero.monsters[0].level, fontStyle).setOrigin(1,0)
		this.heroMonsterHP = this.add.text(10, infoBoxHeight - 5, ("HP: " + this.hero.currentHP + "/" + this.hero.currentMonster.hp), fontStyle).setOrigin(0,1)

		this.heroInfoContainer = this.add.container(w - 362, h - 240, [this.heroBox, this.heroMonsterName, this.heroMonsterLvl, this.heroMonsterHP])

		// Main Menu
		this.menuFightTxt = this.add.text(0, 0, 'Fight', fontStyle)
		this.menuBagTxt = this.add.text(250, 0, 'Bag', fontStyle)
		this.menuMonsterTxt = this.add.text(0, 55, 'Monsters', fontStyle)
		this.menuRunTxt = this.add.text(250 , 55, 'Run', fontStyle)
		this.menuArrow = this.add.sprite(this.menuArrowPositions.mainMenu[0][1], this.menuArrowPositions.mainMenu[0][2], 'arrow').setScale(0.45)

		this.mainMenuContainer = this.add.container(w - 350, h - 130, [this.menuFightTxt, this.menuBagTxt, this.menuMonsterTxt, this.menuRunTxt, this.menuArrow])

		// Fight Menu
		this.ability1Txt = this.add.text(0, 0, this.hero.monsterAbilities[0].name, fontStyle)
		this.ability2Txt = this.add.text(300, 0, this.hero.monsterAbilities[1].name, fontStyle)
		this.ability3Txt = this.add.text(0, 70, '-', fontStyle)
		this.ability4Txt = this.add.text(300, 70, '-', fontStyle)
		this.fightArrow  = this.add.sprite(this.menuArrowPositions.fightMenu[0][1], this.menuArrowPositions.fightMenu[0][2], 'arrow').setScale(0.45)
		if (this.hero.monsterAbilities[2]){
			this.ability3Txt.setText(this.hero.monsterAbilities[2].name)
		}
		if (this.hero.monsterAbilities[3]){
			this.ability4Txt.setText(this.hero.monsterAbilities[3].name)
		}

		this.fightMenuContainer = this.add.container(45, h - 130, [this.ability1Txt, this.ability2Txt, this.ability3Txt, this.ability4Txt, this.fightArrow])
		this.fightMenuContainer.visible = false

		// Battle text
		this.battleText = this.add.text(0, 0, 'Monster used X attack', fontStyle)

		this.battleTextContainer = this.add.container(30, h - 120, [this.battleText])
		this.battleTextContainer.visible = false

		// Enemy dead text
		this.enemyDeathText = this.add.text(0, 0, 'Monster has died', fontStyle)

		this.enemyDeathTextContainer = this.add.container(30, h - 120, [this.enemyDeathText])
		this.enemyDeathTextContainer.visible = false

		// Enemy dead text
		this.lvlUpText = this.add.text(0, 0, '', fontStyle)

		this.lvlUpTextContainer = this.add.container(30, h - 120, [this.lvlUpText])
		this.lvlUpTextContainer.visible = false



		// **** CONTROLS ****
		this.cursors = this.input.keyboard.createCursorKeys()

		// Left: move selector left
		this.cursors.left.on('down', function(){
			if (this.hero.menuCursorPosition === 1 || this.hero.menuCursorPosition === 3) {
				this.hero.menuCursorPosition = this.hero.menuCursorPosition - 1
				updateCursorPosition.apply(this);
			}
		}, this)

		// Right: move selector right
		this.cursors.right.on('down', function(){
			if (this.hero.menuCursorPosition === 0 || this.hero.menuCursorPosition === 2) {
				this.hero.menuCursorPosition = this.hero.menuCursorPosition + 1
				updateCursorPosition.apply(this);
			}
		}, this)

		// Up: move selector up
		this.cursors.up.on('down', function(){
			if (this.hero.menuCursorPosition === 2 || this.hero.menuCursorPosition === 3) {
				this.hero.menuCursorPosition = this.hero.menuCursorPosition - 2
				updateCursorPosition.apply(this);
			}
		}, this)

		// Down: move selector down
		this.cursors.down.on('down', function(){
			if (this.hero.menuCursorPosition === 0 || this.hero.menuCursorPosition === 1){
				this.hero.menuCursorPosition = this.hero.menuCursorPosition + 2
				updateCursorPosition.apply(this);
			}
		}, this)

		// Space: menu select
		this.input.keyboard.on('keydown_SPACE', function(event){
			// Main menu
			if (state.currentBattleMenu === 'main') {
				if (state.menuItemSelected === 'fight'){
					// Set state and change visibility
					state.currentBattleMenu = 'fight'
					state.menuItemSelected = 'ability1'
					this.fightMenuContainer.visible = true
					this.mainMenuContainer.visible = false

					// Set cursor
					this.hero.menuCursorPosition = 0
					this.fightArrow.setPosition(this.menuArrowPositions.fightMenu[this.hero.menuCursorPosition][1], this.menuArrowPositions.fightMenu[this.hero.menuCursorPosition][2])
					state.menuItemSelected = this.menuArrowPositions.fightMenu[this.hero.menuCursorPosition][0]
				}
				else if (state.menuItemSelected === 'run'){
					
					this.scene.start('PlayerView', {level: 'overworld1'})
				}
			}
			// Fight menu
			else if (state.currentBattleMenu === 'fight') {
				// Hide fight menu, display battle text
				this.fightMenuContainer.visible = false
				this.battleTextContainer.visible = true

				// Get speed of both monsters to determine which is faster
				this.enemySpeed = this.enemy.currentMonster.speed
				this.heroSpeed = this.hero.currentMonster.speed

				// Get choser player ability and the randomly selected enemy ability
				this.heroAbility = this.hero.currentMonster.abilities[this.hero.menuCursorPosition]
				this.enemyAbility = this.enemy.currentMonster.abilities[Math.floor(Math.random()*this.enemy.currentMonster.abilities.length)]

				// 1st Attack: Faster monster attacks first
				if (this.heroSpeed > this.enemySpeed) {
					this.abilityUsed = useAbility.apply(this, ['player'])
					// If the defending monster dies from the attack
					if (this.abilityUsed) {

						enemyMonsterDeath.apply(this)
					}
					else {
						state.currentBattleMenu = 'ability1Txt'
					}

				}
				else if (this.enemySpeed >= this.heroSpeed){
					this.abilityUsed = useAbility.apply(this, ['enemy'])
					// If the defending monster dies from the attack
					if (this.abilityUsed) {
						state.currentBattleMenu = 'playerMonsterDeath'
					}
					else {
						state.currentBattleMenu = 'ability1Txt'
					}
				}

				
			}
			//First attacker text displayed
			else if (state.currentBattleMenu === 'ability1Txt') {

				// 2nd Attack: Slower monster attacks second
				if (this.heroSpeed  < this.enemySpeed) {
					this.abilityUsed = useAbility.apply(this, ['player'])

					if (this.abilityUsed) {
						state.currentBattleMenu = 'enemyMonsterDeath'
					}
					else {
						state.currentBattleMenu = 'ability2Txt'
					}

				}
				else if (this.enemySpeed <= this.heroSpeed){
					this.abilityUsed = useAbility.apply(this, ['enemy'])

					if (this.abilityUsed) {
						state.currentBattleMenu = 'playerMonsterDeath'
					}
					else {
						state.currentBattleMenu = 'ability2Txt'
					}
				}
			}
			// Second attacker text displayed
			else if (state.currentBattleMenu === 'ability2Txt'){
				// Set state and change visibility
				state.currentBattleMenu = 'main'
				state.menuItemSelected = 'fight'
				this.battleTextContainer.visible = false
				this.mainMenuContainer.visible = true

				// Set Cursor
				this.hero.menuCursorPosition = 0
				this.menuArrow.setPosition(this.menuArrowPositions.mainMenu[this.hero.menuCursorPosition][1], this.menuArrowPositions.mainMenu[this.hero.menuCursorPosition][2])
				state.menuItemSelected = this.menuArrowPositions.mainMenu[this.hero.menuCursorPosition][0]
			}

			// Enemy monster death
			else if (state.currentBattleMenu === 'enemyMonsterDeath') {
				this.scene.start('PlayerView', {level: 'overworld1'})
			}
		}, this)



	}

	update(time, delta) {
		this.enemyMonsterHP.setText("HP: " + this.enemy.currentHP + "/" + this.enemy.currentMonster.hp)
		this.heroMonsterHP.setText("HP: " + this.hero.currentHP + "/" + this.hero.currentMonster.hp)

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

// Update cursor position on arrow key press
function updateCursorPosition (){
	if (state.currentBattleMenu === 'main'){
		this.menuArrow.setPosition(this.menuArrowPositions.mainMenu[this.hero.menuCursorPosition][1], this.menuArrowPositions.mainMenu[this.hero.menuCursorPosition][2])
		state.menuItemSelected = this.menuArrowPositions.mainMenu[this.hero.menuCursorPosition][0]
	}
	else if (state.currentBattleMenu === 'fight') {
		this.fightArrow.setPosition(this.menuArrowPositions.fightMenu[this.hero.menuCursorPosition][1], this.menuArrowPositions.fightMenu[this.hero.menuCursorPosition][2])
		state.menuItemSelected = this.menuArrowPositions.fightMenu[this.hero.menuCursorPosition][0]
	}
}


// Calculate damage, update health and display ability combat text
function useAbility(attacker){
	if (attacker === 'player'){
		this.effectiveness = abilities.useAbility.apply(this, [attacker, this.hero.currentMonster, this.heroAbility, this.enemy.currentMonster])

		// Set text
		if (this.effectiveness === 1.5 ){
			this.battleText.setText([this.hero.currentMonster.name + " used " + this.heroAbility.name + '.', 'It was super effective!'])
		}
		else if (this.effectiveness === 0.5) {
			this.battleText.setText([this.hero.currentMonster.name + " used " + this.heroAbility.name + '.', 'It was not very effective...'])
		}
		else if (this.effectiveness === 1) {
			this.battleText.setText(this.hero.currentMonster.name + " used " + this.heroAbility.name + '.')
		}

		if (this.enemy.currentHP === 0 ){
			return ['enemy']
		}
	}
	else if (attacker === 'enemy') {
		this.effectiveness = abilities.useAbility.apply(this, [attacker, this.enemy.currentMonster, this.enemyAbility, this.hero.currentMonster])
		
		// Set text
		if (this.effectiveness === 1.5 ){
			this.battleText.setText([this.enemy.currentMonster.name + " used " + this.enemyAbility.name + '.', 'It was super effective!'])
		}
		else if (this.effectiveness === 0.5) {
			this.battleText.setText([this.enemy.currentMonster.name + " used " + this.enemyAbility.name + '.', 'It was not very effective...'])
		}
		else if (this.effectiveness === 1) {
			this.battleText.setText(this.enemy.currentMonster.name + " used " + this.enemyAbility.name + '.')
		}

		if (this.hero.currentHP === 0 ){
			return ['hero']
		}
	}
}

function enemyMonsterDeath(){
	console.log(this)
	this.enemyDeathText.setText(["You have killed " + this.enemy.currentMonster.name + ". ", this.hero.currentMonster.name + " has gained " + this.enemy.currentMonster.expReward + " experience."])
	this.hero.currentMonster.currentExp = this.hero.currentMonster.currentExp  + this.enemy.currentMonster.expReward

	// Level up
	if (this.hero.currentMonster.currentExp >= this.hero.currentMonster.expToLevel){
		let remainder = this.hero.currentMonster.currentExp - this.hero.currentMonster.expToLevel
		this.hero.currentMonster.currentExp === remainder
		this.hero.currentMonster.level = this.hero.currentMonster.level + 1

		this.lvlUpText.setText(this.hero.currentMonster.name + ' has grown to LV. ' + this.hero.currentMonster.level + "!")
		this.lvlUpTextContainer.visible = true
	}

	state.currentBattleMenu = 'enemyMonsterDeath'
	this.battleTextContainer.visible = false
	this.enemyDeathTextContainer.visible = true
}


























