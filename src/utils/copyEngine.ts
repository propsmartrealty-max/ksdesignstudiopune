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

// Elite Hyper-Local Architectural Lexicon
const LOCATION_CONTEXT: Record<string, { intro: string, body: string, outro: string }> = {
  "Baner": {
    intro: "Situated at the nexus of Pune's IT corridor, Baner demands a design language that balances high-speed modernism with serene domesticity.",
    body: "Our studio approaches Baner's premium high-rises with a distinct architectural methodology. We integrate smart-home automation infrastructures seamlessly into bespoke woodwork, utilizing acoustic dampening and biophilic elements to counteract the urban density. Unlike standard contractors, we understand the specific load-bearing constraints and spatial flows of premium Baner developments.",
    outro: "Elevate your Baner residence from a standard apartment to an intelligent sanctuary."
  },
  "Koregaon Park": {
    intro: "Koregaon Park's heritage bungalows and ultra-luxury low-rises require a design vocabulary rooted in organic luxury and timeless grace.",
    body: "Working within Pune's most affluent zip code, our design philosophy honors the lush, green canopy of KP. We source rare, imported Italian marbles and specify custom brass joinery to create atmospheric depth. We specialize in transforming vast floorplans into intimate, high-fidelity luxury spaces that reflect the sophisticated heritage of the neighborhood.",
    outro: "Discover uncompromised architectural luxury in the heart of Koregaon Park."
  },
  "Kalyani Nagar": {
    intro: "Bridging corporate energy with residential prestige, Kalyani Nagar properties are canvases for contemporary, high-contrast interiors.",
    body: "We engineer spaces in Kalyani Nagar that act as premium social hubs. By knocking down restrictive developer floorplans, we create expansive open-concept living zones tailored for entertaining. Our use of monolithic stone islands and concealed architectural lighting provides a museum-quality finish to your home.",
    outro: "Redefine modern luxury living in Kalyani Nagar."
  },
  "Viman Nagar": {
    intro: "Proximity to the airport and luxury retail defines Viman Nagar, inspiring interiors that are globally minded and flawlessly executed.",
    body: "Our Viman Nagar projects are characterized by international design sensibilities. We utilize imported veneer finishes, fluted glass partitions, and minimalist luxury aesthetics to create spaces that feel like 5-star boutique hotels. Every millimeter is precision-engineered in our factory for zero-tolerance installation.",
    outro: "Bring global design standards to your Viman Nagar property."
  },
  "Hinjewadi": {
    intro: "The beating heart of Pune's tech ecosystem, Hinjewadi requires interiors optimized for dual-functionality: hyper-productivity and total relaxation.",
    body: "We design for the modern executive. Our Hinjewadi turnkey solutions feature ergonomic spatial planning, dedicated focus zones, and advanced ambient lighting systems. We prioritize speed of execution without sacrificing A-grade materials, delivering move-in-ready luxury for IT professionals.",
    outro: "Experience intelligent interior engineering in Hinjewadi."
  },
  "Wakad": {
    intro: "As Pune's fastest-growing premium residential hub, Wakad demands interiors that stand out from the generic builder-grade finishes.",
    body: "We elevate Wakad apartments into bespoke designer homes. By stripping away standard fittings, we inject personality through custom upholstery, geometric ceiling topographies, and durable, high-end laminates that resist wear while looking spectacular.",
    outro: "Transform your Wakad property into a signature landmark."
  },
  "Kharadi": {
    intro: "Kharadi's massive IT parks and sprawling residential townships inspire a design approach that is both grand in scale and intimate in detail.",
    body: "Our studio specializes in the sprawling floorplans of Kharadi's luxury towers. We employ large-format vitrified slabs and seamless monolithic aesthetics to enhance the feeling of space. Our turnkey execution means you never have to deal with multiple vendors—we handle everything from civil changes to the final curated artifacts.",
    outro: "Step into seamless, A-grade luxury in Kharadi."
  },
  "Aundh": {
    intro: "Aundh is characterized by established wealth and understated elegance, requiring a highly refined and mature design palette.",
    body: "We avoid flashy, transient trends in our Aundh projects. Instead, we focus on 'Quiet Luxury'—tactile fabrics, matte finishes, warm walnuts, and perfectly calibrated indirect lighting. Our work here is designed to age beautifully, utilizing structural integrity and classic proportions.",
    outro: "Invest in timeless architectural elegance in Aundh."
  },
  "Magarpatta": {
    intro: "The self-contained ecosystem of Magarpatta City necessitates interiors that provide a total escape from the outside world.",
    body: "We design Magarpatta residences as restorative retreats. Utilizing the principles of neuro-architecture, we select color palettes and material textures scientifically proven to reduce stress. Expect curved edges, natural timbers, and flawlessly integrated hidden storage.",
    outro: "Create your ultimate personal retreat in Magarpatta."
  },
  "Balewadi": {
    intro: "The high-street luxury and sporting culture of Balewadi drive a dynamic, active, and highly contemporary design aesthetic.",
    body: "Our Balewadi interiors are bold and structural. We frequently utilize industrial-luxe elements—exposed concrete textures, raw steel accents, and statement lighting fixtures. We design for patrons who want their home to be as dynamic and energetic as their lifestyle.",
    outro: "Command the finest contemporary design in Balewadi."
  },
  "Bandra": {
    intro: "Bandra's unique blend of colonial heritage and contemporary celebrity culture demands an interior narrative that is fiercely original and effortlessly chic.",
    body: "We engineer Bandra residences to be architectural statements. Merging Bohemian luxury with hyper-modern smart home automation, our spaces feature imported Italian marble, bespoke artisanal furniture, and bold color blocking that reflects the vibrant pulse of Mumbai's most sought-after zip code.",
    outro: "Elevate your Bandra property to true celebrity status."
  },
  "Juhu": {
    intro: "Synonymous with sprawling coastal estates and elite privacy, Juhu requires a design vocabulary that maximizes ocean views and natural light while maintaining absolute exclusivity.",
    body: "Our Juhu interior projects are masterclasses in coastal luxury. We utilize expansive floor-to-ceiling glass systems, weather-resistant premium alloys, and organic textures like bleached oak and travertine. Every detail is curated to create a seamless indoor-outdoor sanctuary for Mumbai's elite.",
    outro: "Experience unparalleled coastal luxury in Juhu."
  },
  "Worli": {
    intro: "The towering super-luxury high-rises of Worli Sea Face dictate an interior style that matches the grandeur of the Arabian Sea skyline.",
    body: "We specialize in Worli's ultra-luxury penthouses. Our design approach emphasizes monumental scale—using grand monolithic slabs, automated ambient lighting that mimics the sunset, and reflective metallic accents that pull the skyline into your living room.",
    outro: "Command the Mumbai skyline from your Worli residence."
  },
  "Powai": {
    intro: "Powai's sophisticated lakeside township architecture and high-powered executive demographic inspire interiors that are impeccably structured and highly functional.",
    body: "We design for Powai's corporate elite. Our turnkey solutions feature intelligent spatial planning, integrated home offices with acoustic treatments, and sleek, minimalist aesthetics utilizing premium European hardware and ultra-matte laminates.",
    outro: "Discover structured executive luxury in Powai."
  },
  "Andheri": {
    intro: "The cinematic and commercial epicenter of Mumbai, Andheri requires highly versatile, dynamic, and visually striking interior design.",
    body: "Our Andheri projects fuse cinematic drama with residential comfort. We incorporate statement feature walls, sophisticated mood lighting control systems, and rich, layered textiles to create spaces that are as dramatic as they are welcoming.",
    outro: "Bring cinematic brilliance to your Andheri home."
  },
  "South Mumbai": {
    intro: "South Mumbai represents the absolute pinnacle of Indian legacy wealth. Designing here requires profound respect for heritage architecture combined with invisible modern luxury.",
    body: "We undertake South Mumbai projects with surgical precision. We restore high ceilings and intricate cornices while silently weaving in state-of-the-art climate control and smart home tech. Expect French herringbone floors, classic wainscoting, and curated gallery walls for fine art.",
    outro: "Preserve legacy while embracing the future in South Mumbai."
  },
  "Malabar Hill": {
    intro: "The most exclusive enclave in India, Malabar Hill demands an uncompromising standard of hyper-luxury and complete discretion.",
    body: "Our Malabar Hill executions represent our most elite tier of service. We source rare exotic woods, commission bespoke sculptural furniture, and deploy military-grade soundproofing. The result is a completely bespoke, palatial environment isolated from the chaos of the city.",
    outro: "Ascend to the absolute pinnacle of luxury in Malabar Hill."
  },
  "Navi Mumbai": {
    intro: "The meticulously planned infrastructure of Navi Mumbai provides the perfect canvas for ultra-modern, highly organized interior architecture.",
    body: "We capitalize on Navi Mumbai's spacious floorplans to create expansive, open-concept living. Our designs feature clean geometric lines, integrated smart-storage solutions, and expansive use of natural light to create an atmosphere of pure, uncluttered luxury.",
    outro: "Embrace the future of organized luxury in Navi Mumbai."
  },
  "Thane": {
    intro: "Thane's rapid evolution into a premium luxury destination requires interiors that reflect upward mobility and sophisticated modern tastes.",
    body: "We bring South-Bombay aesthetics to Thane's newest luxury towers. Our turnkey execution delivers A-grade finishes—from flawless PU-coated modular kitchens to premium velvet upholstery—ensuring your Thane residence stands shoulder-to-shoulder with the finest in Mumbai.",
    outro: "Upgrade to premium, A-grade living in Thane."
  }
};

const GENERIC_INTROS = [
  "Ranked as the Top Interior Designers, we elevate the standard of A-grade {SUBJECT}.",
  "Recognized as the #1 premium design studio outperforming standard contractors for {SUBJECT}."
];
const GENERIC_BODIES = [
  "As Pune's leading luxury interior design firm, we merge structural integrity with bespoke aesthetic vocabularies.",
  "Our proprietary execution framework ensures that the delivery of your space is as flawless as the initial 3D visualization."
];
const GENERIC_OUTROS = [
  "Experience the zenith of A-grade interior architecture.",
  "Your sanctuary, engineered to perfection by Pune's #1 design team."
];

export function generateDynamicCopy(seedString: string, subject: string, location: string = "Pune"): string {
  const seed = generateSeed(seedString);
  const random = mulberry32(seed);
  
  // Format location string to match object keys (e.g. "koregaon-park" -> "Koregaon Park")
  const formattedLocation = location.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  let intro = "";
  let body = "";
  let outro = "";

  if (LOCATION_CONTEXT[formattedLocation]) {
    intro = `<span class="font-bold text-brass uppercase tracking-widest text-[10px] mb-2 block">Site Intelligence: ${formattedLocation}</span>` + LOCATION_CONTEXT[formattedLocation].intro;
    body = LOCATION_CONTEXT[formattedLocation].body;
    outro = LOCATION_CONTEXT[formattedLocation].outro;
  } else {
    intro = GENERIC_INTROS[Math.floor(random() * GENERIC_INTROS.length)].replace('{SUBJECT}', subject);
    body = GENERIC_BODIES[Math.floor(random() * GENERIC_BODIES.length)];
    outro = GENERIC_OUTROS[Math.floor(random() * GENERIC_OUTROS.length)];
  }

  let fullCopy = `<p class="mb-4">${intro}</p><p class="mb-4">${body}</p><p class="italic text-brass font-serif">${outro}</p>`;

  // Contextual Inline Backlink Injection
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
