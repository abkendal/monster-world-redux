export default function (ability, defender) {
  let damageModifier;

  if (ability.type.effective.indexOf(defender.type.name) >= 0) {
    damageModifier = 1.5;
  } else if (ability.type.ineffective.indexOf(defender.type.name) >= 0) {
    damageModifier = 0.5;
  } else {
    damageModifier = 1;
  }
  return damageModifier;
}