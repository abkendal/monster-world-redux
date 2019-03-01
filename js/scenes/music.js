class Music extends Phaser.Scene {
	constructor(){
		super({key:"Music"})
	}

	preload(){
		this.load.audio('theme', ['assets/audio/music/theme.mp3'])
	}	


	create(){

		this.bgmusic = this.sound.add('theme')
		this.bgmusic.loop = true
		this.bgmusic.volume = 0.2
		// this.bgmusic.play()

		let key = 'StartOpen'
		let opened = new StartOpen(key)
		this.scene.add(key, opened, true)

		let timedEvent = this.time.delayedCall(1000, startSong, [], this);
	}

	update(time, delta) {
		if (data.openingThemeStart){
			this.bgmusic.play()
			data.openingThemeStart = false
		}

	}

}

function startSong(){
	data.openingThemeStart = true
}
