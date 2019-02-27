let cameraControls
let player

class Level1 extends Phaser.Scene {
	constructor(){
		super({key:"Level1"})
	}

	preload(){

		this.load.image("tiles", "assets/images/tiles/TilesetGrass/overworld_tileset_grass_32.png")
		this.load.tilemapTiledJSON("map", "assets/images/maps/map2.json")
		this.load.audio('theme', ['assets/audio/music/morning-sunlight.mp3'])
		this.load.audio('walk', ['assets/audio/effects/pokemon/firered_00A2.wav'])
		this.load.audio('walk-grass', ['assets/audio/effects/pokemon/firered_00A1.wav'])

	}

	create(){

		const map = this.make.tilemap({ 
			key: "map" 
		})

		// Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
		// Phaser's cache (i.e. the name you used in preload)
		const tileset = map.addTilesetImage("tiles", "tiles")

		// Parameters: layer name (or index) from Tiled, tileset, x, y
		const belowLayer = map.createStaticLayer("background", tileset, 0, 0)
		const worldLayer = map.createStaticLayer("world", tileset, 0, 0)

		// the player will collide with this layer
		worldLayer.setCollisionByExclusion([-1]);

		// set the boundaries of our game world
		this.physics.world.bounds.width = belowLayer.width;
		this.physics.world.bounds.height = belowLayer.height;
		
		// Add player image, fixed to camera center of screen
		player = this.physics.add.sprite(200, 200, 'deathcaster');
		player.setCollideWorldBounds(true);

		//add collision between player and world layer
		this.physics.add.collider(worldLayer, player);
		
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
		camera.startFollow(player);

		// Set player walking speed
		this.playerSpeed = 150

	}

	update(time, delta) {

	  // if (this.cursors.left.isDown){
	  // 	this.walkSound.play()
	  // }

	  if (this.cursors.left.isDown){
	  	player.body.setVelocityX(-this.playerSpeed)
	  }else if (this.cursors.right.isDown) {
	  	player.body.setVelocityX(this.playerSpeed)
	  }
	  else {
	  	player.body.setVelocityX(0);
	  }

		if (this.cursors.up.isDown){
			player.body.setVelocityY(-this.playerSpeed)
		} else if (this.cursors.down.isDown) {
			player.body.setVelocityY(this.playerSpeed)
		}
		else {
			player.body.setVelocityY(0);
		}
	}

}































