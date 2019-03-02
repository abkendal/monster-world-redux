export class Music extends Phaser.Scene {
	constructor(){
		super({key:"Music"})
	}

	preload(){
		this.load.audio('theme', ['assets/audio/music/theme.mp3'])
		this.load.audio('morning-sunlight', ['assets/audio/music/morning-sunlight.mp3'])
		this.load.audio('wild-encounter', ['assets/audio/music/wild-encounter.mp3'])
	}	


	create(){

		// Theme
		this.theme = this.sound.add('theme')
		this.theme.loop = true
		this.theme.volume = 0.2

		// Morning Sun
		this.morningSunlight = this.sound.add('morning-sunlight')
		this.morningSunlight.loop = true
		this.morningSunlight.volume = 0.5

		// Wild Encounter
		this.wildEncounter = this.sound.add('wild-encounter')
		this.wildEncounter.loop = true
		this.wildEncounter.volume = 0.5

		// Start initial song 1 second after game loads
		const timedEvent = this.time.delayedCall(500, startSong, [], this);
	}

	update(time, delta) {
		if (data.openingThemeStart){
			this.theme.play()
			data.openingThemeStart = false
		}

	}

}

function startSong(){
	data.openingThemeStart = true
}
