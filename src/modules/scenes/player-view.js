import Batball from './../monsters/batball'
import Beep from './../monsters/beep'
import Beholder from './../monsters/beholder'

export class PlayerView extends Phaser.Scene {
	constructor(){
		super({key:"PlayerView"})
	}

	preload(){

		this.load.image("overworld-grass-tiles", "assets/images/tiles/TilesetGrass/overworld_tileset_grass_32.png")
		this.load.image("black", "assets/images/black.jpg")
		this.load.tilemapTiledJSON("map", "assets/images/maps/map3.json")
		this.load.audio('walk', ['assets/audio/effects/pokemon/firered_00A2.wav'])
		this.load.audio('walk-grass', ['assets/audio/effects/pokemon/firered_00A1.wav'])
		this.load.spritesheet('mummy', 'assets/images/characters/metalslug_mummy37x45.png', { frameWidth: 37, frameHeight: 45 })

	}	

	create(data){


		
		let music = this.scene.get('Music')
		let mapkey
		let tilekey
		let monsterLvl 
		let monsters

		if (data.level === 'overworld1'){
			music.morningSunlight.play()
			mapkey = 'map'
			tilekey = 'overworld-grass-tiles'
			monsterLvl = [1,2,3]
			monsters = [Batball, Beep, Beholder]
		}

		// World
		const map = this.make.tilemap({ 
			key: mapkey
		})
		const tileset = map.addTilesetImage("tiles", tilekey)
		

		// Set map layers
		const belowLayer = map.createDynamicLayer("background", tileset, 0, 0)
		const worldLayer = map.createDynamicLayer("world", tileset, 0, 0)
		const grassLayer = map.createDynamicLayer("grass", tileset, 0, 0)

		// Set encounter callback to grass tiles
		grassLayer.setTileIndexCallback(166, encounterRand, this)
		grassLayer.setTileIndexCallback(167, encounterRand, this)
		grassLayer.setTileIndexCallback(168, encounterRand, this)
		grassLayer.setTileIndexCallback(178, encounterRand, this)
		grassLayer.setTileIndexCallback(179, encounterRand, this)
		grassLayer.setTileIndexCallback(180, encounterRand, this)


		// the player will collide with this layer
		worldLayer.setCollisionByExclusion([-1])

		// set the boundaries of our game world
		this.physics.world.bounds.width = belowLayer.width
		this.physics.world.bounds.height = belowLayer.height
		

		// Player
		// Add player image
		player = this.physics.add.sprite(state.playerPosition.x, state.playerPosition.y, 'mummy')

		// Prevent player from walking off screen
		player.setCollideWorldBounds(true)

		//add collision between player and world layer
		this.physics.add.collider(player, worldLayer)

		// add overlap detection between player and grass layer, will trigger tile callback
		this.physics.add.overlap(player, grassLayer)

		// Walk animation
		this.anims.create({
			key: 'walk',
			frames: this.anims.generateFrameNumbers('mummy', { start: 0, end: 17 }),
			frameRate: 10,
			repeat: -1
		})

		// Tween encounter flash
		const blackScreen = this.add.image(w / 2, h / 2, 'black')
		blackScreen.alpha = 0
		this.tween = this.tweens.add({
			targets: blackScreen,
			alpha: 1,
			duration: 400,
			ease: 'Linear',
			yoyo: true,
			repeat: -1,
			paused: true
		});
		
		

		// access main camera
		const camera = this.cameras.main

		// Set up the arrows to control the camera
		this.cursors = this.input.keyboard.createCursorKeys()

		// Sound effects
		this.walkSound = this.sound.add('walk')

		// Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
		camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels)

		// make the camera follow the player
		camera.startFollow(player)

		// Set player walking speed
		this.playerSpeed = 100

	}

	update(time, delta) {

		// Movement controls
		// X velocity
		if (this.cursors.left.isDown){
			player.body.setVelocityX(-this.playerSpeed)
		}else if (this.cursors.right.isDown) {
			player.body.setVelocityX(this.playerSpeed)
		}
		else {
			player.body.setVelocityX(0)
		}

		// Y velocity
		if (this.cursors.up.isDown){
			player.body.setVelocityY(-this.playerSpeed)
		} else if (this.cursors.down.isDown) {
			player.body.setVelocityY(this.playerSpeed)
		}
		else {
			player.body.setVelocityY(0)
		}


		// Player walking animation
		if (this.cursors.left.isDown){
			player.anims.play('walk', true)
			player.flipX= true
		}
		else if (this.cursors.right.isDown) {
			player.anims.play('walk', true)
			player.flipX= false
		}
		else if (this.cursors.up.isDown){
			player.anims.play('walk', true)
			player.flipX= true
		}
		else if (this.cursors.down.isDown) {
			player.anims.play('walk', true)
			player.flipX= false
		}
		else {
			player.anims.play('walk', false)
		}

		// Check if player is walking in any direction
		if (this.cursors.left.isDown || this.cursors.right.isDown || this.cursors.up.isDown || this.cursors.down.isDown) {
			state.walking = true


			// Switch to encounter level if encounter triggered while walking 
			if (state.startEncounter){
				state.startEncounter = false
				let music = this.scene.get('Music')
				music.morningSunlight.stop()
				music.wildEncounter.play()
				this.tween.play()
				const timedEvent = this.time.delayedCall(2000, startEncounter, [], this);
			}
		}
		else {
			state.walking = false
		}

	}
}

// Random monster encounter
function encounterRand () {
	if (state.walking){
		const rand = Math.random()
		if (rand > 0.992) {
			state.playerPosition.x = player.x
			state.playerPosition.y = player.y
			console.log(state.playerPosition)
			state.startEncounter = true
			state.encounterMonster = new Beep(1)
		}
	}
}

// Move to encounter scene, function used for delayed event
function startEncounter(){
	this.scene.start('Battle', {type: 'encounter'})
}




























