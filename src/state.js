let state = {
	initialMonster:'',
	grassOverlap:'',
	walking:'',
	startEncounter: false,
	itemInv: [],
	monsterInv: [],
	encounterMonster:'',
	currentBattleMenu: 'main',
	menuItemSelected: 'fight',
	attackEffectiveness: '',
	playerPosition: {
		x: 200,
		y: 200
	},
}

const w = 800
const h = 600
let player