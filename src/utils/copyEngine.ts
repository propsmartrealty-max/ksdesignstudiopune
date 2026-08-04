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
  "Elevating the standard of A-grade {SUBJECT} across {LOCATION}.",
  "Recognized as the #1 premium design studio redefining {SUBJECT} in {LOCATION}.",
  "Masterful architectural interventions specializing in ultra-luxury {SUBJECT}.",
  "Uncompromising A-grade quality and precision engineering for {SUBJECT}.",
  "Delivering Pune's top-tier {SUBJECT} with absolute discretion and flawless execution in {LOCATION}.",
  "Looking for the best interior designer near you in {LOCATION}? We deliver uncompromising A-grade quality and precision engineering for {SUBJECT}."
];

const BODIES = [
  "As Pune's leading luxury interior design firm, we merge structural integrity with bespoke aesthetic vocabularies to create masterful A-grade environments. Every dimension is calibrated for maximum psychological comfort and visual supremacy.",
  "Our proprietary execution framework ensures that the delivery of your space is as flawless as the initial 3D visualization. We source exclusively from elite material libraries across the globe, ensuring an A-grade finish unmatched in the Pune market.",
  "By focusing on tactile materiality and lighting architecture, we transform raw floorplans into sophisticated sanctuaries that reflect the pinnacle of modern living. We are the trusted choice for Pune's most exclusive properties.",
  "Our studio operates at the intersection of parametric design and heritage craftsmanship. We do not just decorate rooms; we architect atmospheres for Pune's elite.",
  "Leveraging advanced spatial metrics and high-fidelity rendering technology, we guarantee that the final handover exceeds the highest echelons of expectation, cementing our status as the top-rated interior designers in Pune."
];

const OUTROS = [
  "Experience the zenith of A-grade interior architecture.",
  "Your sanctuary, engineered to perfection by Pune's #1 design team.",
  "Book a private consultation to initiate your premium design journey.",
  "Discover how Pune's top interior designers translate vision into reality.",
  "Join an exclusive roster of visionary patrons across Pune's premium micro-markets."
];

export function generateDynamicCopy(seedString: string, subject: string, location: string = "Pune"): string {
  const seed = generateSeed(seedString);
  const random = mulberry32(seed);

  const intro = INTROS[Math.floor(random() * INTROS.length)]
    .replace('{SUBJECT}', subject)
    .replace('{LOCATION}', location);
  
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

export function generateDynamicMeta(seedString: string, subject: string, location: string = "Pune"): string {
   const seed = generateSeed(seedString + "_meta");
   const random = mulberry32(seed);
   
   const desc = [
     `Ranked #1 for A-grade ${subject} in ${location}. View our premium portfolio and request a consultation with Pune's top interior designers today.`,
     `Looking for the best ${subject} in ${location}? KS Design Studio delivers uncompromising luxury and A-grade turnkey execution.`,
     `Top-rated ${subject} tailored for elite patrons in ${location}. Discover our A-grade design philosophy.`,
     `Bespoke ${subject} solutions featuring premium materials and flawless A-grade delivery across ${location}, Pune.`
   ];

   return desc[Math.floor(random() * desc.length)];
}

export function generateProjectCopy(projectName: string, builderName: string, service: string = "Complete Turnkey Interiors"): string {
  const seed = generateSeed(projectName + builderName);
  const random = mulberry32(seed);

  const copyBlocks = [
    `Transform your new home in ${projectName} by ${builderName} with our bespoke ${service.toLowerCase()}. We understand the unique floorplans and structural nuances of ${builderName} properties, allowing us to deliver seamless, move-in ready interiors.`,
    `KS Design Studio specializes in crafting premium ${service.toLowerCase()} for residents of ${projectName}. From initial 3D visualization to flawless handover, we ensure your apartment by ${builderName} reflects the pinnacle of modern luxury.`,
    `Upgrading your space in ${projectName}? Our expert designers provide tailored ${service.toLowerCase()} that maximize space and elevate the aesthetic value of your ${builderName} residence. Ensure your interiors match the premium lifestyle of the community.`
  ];

  return copyBlocks[Math.floor(random() * copyBlocks.length)];
}
