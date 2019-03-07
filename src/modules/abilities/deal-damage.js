export default function (attacker, ability, damageModifier, defender) {
  // Still needs accuracy modifier
  let damage;
  const power = ability.power;
  console.log(defender)
  console.log(this.enemy)


  // Physical attacks use the attack and defense attributes
  if (ability.category === 'physical') {
    damage = power * (attacker.attack * 1.5) * 0.04 / defender.defense * damageModifier;


  // Special attacks use the spAttack and spDefense attributes
  } else if (ability.category === 'special') {
    damage = power * (attacker.spAttack * 1.5) * 0.04 / defender.spDefense * damageModifier;
    console.log(damage, power, attacker.attack, defender.defense, damageModifier)
  }

  if (typeof damage !== 'undefined') {
    this.enemy.currentHP = Math.round(this.enemy.currentHP - damage);
  }
}