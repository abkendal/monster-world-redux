export default function (ability, defender) {
  let damageModifier;

  // Super effective
  if (ability.type.effective.indexOf(defender.type.name) >= 0) {
    damageModifier = 1.5;
  } 
  // Not very effective
  else if (ability.type.ineffective.indexOf(defender.type.name) >= 0) {
    damageModifier = 0.5;
  } 
  // Normal
  else {
    damageModifier = 1;
  }
  return damageModifier;
}