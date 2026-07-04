// Deterministic pseudo-random number generator based on a string seed
// This ensures that the same URL path always gets the exact same copy.
function mulberry32(a: number) {
  return function() {
    var t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}

function generateSeed(str: string) {
  let h = 0xdeadbeef;
  for(let i = 0; i < str.length; i++)
      h = Math.imul(h ^ str.charCodeAt(i), 2654435761);
  return (h ^ h >>> 16) >>> 0;
}

const INTROS = [
  "Elevating the standard of {SUBJECT} across Pune.",
  "Redefining spatial aesthetics for {SUBJECT}.",
  "Masterful architectural interventions specializing in {SUBJECT}.",
  "Uncompromising luxury and precision engineering for {SUBJECT}.",
  "Delivering world-class {SUBJECT} with absolute discretion and flawless execution."
];

const BODIES = [
  "We merge structural integrity with bespoke aesthetic vocabularies to create masterful environments. Every dimension is calibrated for maximum psychological comfort and visual supremacy.",
  "Our proprietary execution framework ensures that the delivery of your space is as flawless as the initial 3D visualization. We source exclusively from elite material libraries across the globe.",
  "By focusing on tactile materiality and lighting architecture, we transform raw floorplans into sophisticated sanctuaries that reflect the pinnacle of modern living.",
  "Our studio operates at the intersection of parametric design and heritage craftsmanship. We do not just decorate rooms; we architect atmospheres.",
  "Leveraging advanced spatial metrics and high-fidelity rendering technology, we guarantee that the final handover exceeds the highest echelons of expectation."
];

const OUTROS = [
  "Experience the zenith of interior architecture.",
  "Your sanctuary, engineered to perfection.",
  "Book a private consultation to initiate the process.",
  "Discover how we translate vision into reality.",
  "Join an exclusive roster of visionary patrons."
];

export function generateDynamicCopy(seedString: string, subject: string): string {
  const seed = generateSeed(seedString);
  const random = mulberry32(seed);

  const intro = INTROS[Math.floor(random() * INTROS.length)].replace('{SUBJECT}', subject);
  const body = BODIES[Math.floor(random() * BODIES.length)];
  const outro = OUTROS[Math.floor(random() * OUTROS.length)];

  let fullCopy = `${intro} ${body} ${outro}`;

  // Contextual Inline Backlink Injection
  // We randomly decide if we should inject a link based on the seed
  if (random() > 0.3) {
    fullCopy = fullCopy.replace(/Pune/g, '<a href="/interiors-in/pune" class="font-medium hover:text-brass transition-colors decoration-brass/30 underline underline-offset-4">Pune</a>');
  }
  if (random() > 0.5) {
    fullCopy = fullCopy.replace(/luxury/gi, '<a href="/services/luxury-apartments" class="font-medium hover:text-brass transition-colors decoration-brass/30 underline underline-offset-4">luxury</a>');
  }

  return fullCopy;
}

export function generateDynamicMeta(seedString: string, subject: string): string {
   const seed = generateSeed(seedString + "_meta");
   const random = mulberry32(seed);
   
   const desc = [
     `Award-winning ${subject}. View our portfolio and request a consultation today.`,
     `Looking for ${subject}? KS Design Studio delivers uncompromising luxury and turnkey execution.`,
     `Expert ${subject} tailored for elite patrons. Discover our design philosophy.`,
     `Bespoke ${subject} solutions featuring premium materials and flawless delivery.`
   ];

   return desc[Math.floor(random() * desc.length)];
}
