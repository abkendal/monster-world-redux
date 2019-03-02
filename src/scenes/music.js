class Music extends Phaser.Scene {
	constructor(){
		super({key:"Music"})
	}

	preload(){
		this.load.audio('theme', ['assets/audio/music/theme.mp3'])
		this.load.audio('morning-sunlight', ['assets/audio/music/morning-sunlight.mp3'])
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

		// Start song after 1 second
		const timedEvent = this.time.delayedCall(850, startSong, [], this);
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
