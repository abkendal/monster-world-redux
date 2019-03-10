export default function (controller, attacker, ability, damageModifier, defender) {
  // Still needs accuracy modifier
  let damage;
  const power = ability.power;



  // Physical attacks use the attack and defense attributes
  if (ability.category === 'physical') {
    damage = power * (attacker.attack * 1.5) * 0.04 / defender.defense * damageModifier;


  // Special attacks use the spAttack and spDefense attributes
  } else if (ability.category === 'special') {
    damage = power * (attacker.spAttack * 1.5) * 0.04 / defender.spDefense * damageModifier;
  }

  if (typeof damage !== 'undefined') {
    if (controller === 'player'){
      this.enemy.currentHP = Math.round(this.enemy.currentHP - damage);
      if (this.enemy.currentHP < 0) {
        this.enemy.currentHP = 0
      }
    }
    else {
      this.hero.currentHP  = Math.round(this.hero.currentHP - damage);
      if (this.hero.currentHP < 0) {
        this.hero.currentHP = 0
      }
    }

  }
}