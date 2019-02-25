class Start extends Phaser.Scene {
	constructor(){
		super({key:"Start"})
	}

	preload(){
		this.load.image('logo', 'assets/images/logo.png')
	}

	create(){
		this.image = this.add.image(400, 200, 'logo')

		var tconfig = {
		     x: 400,
		     y: 350,
		     text: 'Press any key to start',
		     style: {
		       fontSize: '24px',
		       fontFamily: 'Arial',
		       color: '#ffffff',
		       align: 'center',
		       lineSpacing: 44,
		     }
		   };
		   var text = this.make.text(tconfig);
		   text.setWordWrapWidth(800, false);
		   text.setOrigin(0.5);

	}
}