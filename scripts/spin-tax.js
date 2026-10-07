const SPIN_ADJECTIVES = ["Premium", "Luxury", "Bespoke", "Exclusive", "High-end", "Custom", "Turnkey", "Architectural", "Modern"];
const SPIN_NOUNS = ["Interiors", "Designs", "Spaces", "Sanctuaries", "Homes", "Residences"];
const SPIN_ACTIONS = ["Crafting", "Designing", "Engineering", "Curating", "Building"];

export function getSpin() {
  const adj = SPIN_ADJECTIVES[Math.floor(Math.random() * SPIN_ADJECTIVES.length)];
  const noun = SPIN_NOUNS[Math.floor(Math.random() * SPIN_NOUNS.length)];
  const action = SPIN_ACTIONS[Math.floor(Math.random() * SPIN_ACTIONS.length)];
  return { adj, noun, action };
}
