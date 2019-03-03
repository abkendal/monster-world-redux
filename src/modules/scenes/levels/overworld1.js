import PlayerView from './../player-view';
console.log(PlayerView)

export class Overworld1 extends PlayerView{
	constructor(){
		super({key:"Overworld1"})
	}

	preload(){

		this.load.image("tiles", "assets/images/tiles/TilesetGrass/overworld_tileset_grass_32.png")
		this.load.image("black", "assets/images/black.jpg")
		this.load.tilemapTiledJSON("map", "assets/images/maps/map3.json")
		this.load.audio('walk', ['assets/audio/effects/pokemon/firered_00A2.wav'])
		this.load.audio('walk-grass', ['assets/audio/effects/pokemon/firered_00A1.wav'])
		this.load.spritesheet('mummy', 'assets/images/characters/metalslug_mummy37x45.png', { frameWidth: 37, frameHeight: 45 })

	}	

	create(data){




	}

	update(time, delta) {


	}
}

























