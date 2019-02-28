class Level1 extends Phaser.Scene {
	constructor(){
		super({key:"Level1"})
	}

	preload(){

		this.load.image("tiles", "assets/images/tiles/TilesetGrass/overworld_tileset_grass_32.png")
		this.load.tilemapTiledJSON("map", "assets/images/maps/map3.json")
		this.load.audio('theme', ['assets/audio/music/morning-sunlight.mp3'])
		this.load.audio('walk', ['assets/audio/effects/pokemon/firered_00A2.wav'])
		this.load.audio('walk-grass', ['assets/audio/effects/pokemon/firered_00A1.wav'])
		this.load.spritesheet('mummy', 'assets/images/characters/metalslug_mummy37x45.png', { frameWidth: 37, frameHeight: 45 })

	}	


	create(){

		// World
		const map = this.make.tilemap({ 
			key: "map" 
		})

		const tileset = map.addTilesetImage("tiles", "tiles")

		const belowLayer = map.createDynamicLayer("background", tileset, 0, 0)
		const worldLayer = map.createDynamicLayer("world", tileset, 0, 0)
		const grassLayer = map.createDynamicLayer("grass", tileset, 0, 0)

		// Set encounter callback to grass tiles
		grassLayer.setTileIndexCallback(167, encounter, this)

		// the player will collide with this layer
		worldLayer.setCollisionByExclusion([-1])


		// set the boundaries of our game world
		this.physics.world.bounds.width = belowLayer.width
		this.physics.world.bounds.height = belowLayer.height
		


		// Player
		// Add player image, fixed to camera center of screen
		player = this.physics.add.sprite(200, 200, 'mummy')

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
		



		// access main camera
		const camera = this.cameras.main

		// Set up the arrows to control the camera
		this.cursors = this.input.keyboard.createCursorKeys()

		// Set up music
		const bgmusic = this.sound.add('theme')
		bgmusic.loop = true
		bgmusic.volume = 0.2
		bgmusic.play()

		// Sound effects
		this.walkSound = this.sound.add('walk')

		// Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
		camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels)

		// make the camera follow the player
		camera.startFollow(player)

		// Set player walking speed
		this.playerSpeed = 120


	}

	update(time, delta) {

		// if (this.cursors.left.isDown){
		// 	this.walkSound.play()
		// }


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

		if (this.cursors.left.isDown || this.cursors.right.isDown || this.cursors.up.isDown || this.cursors.down.isDown) {
			data.walking = true
		}
		else {
			data.walking = false
		}

	}
}































