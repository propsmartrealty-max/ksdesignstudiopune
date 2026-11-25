/**
 * Atelier Genesis - Core SEO Registry
 * Containing the intensive gamut of keywords for Pune market dominance.
 */

export const PUNE_MARKETS = {
  WEST_PUNE: ["Baner", "Baner Annexe", "Balewadi", "Mahalunge", "Sus", "Pashan", "Aundh", "Bavdhan", "Kothrud", "Warje", "Karve Nagar", "Erandwane", "Prabhat Road", "Shivajinagar", "Model Colony", "SB Road", "University Road", "Law College Road", "Deccan", "FC Road", "JM Road", "Punawale", "Tathawade", "Ravet", "Kiwale", "Mamurdi"],
  IT_CORRIDOR: ["Hinjewadi Phase 1", "Hinjewadi Phase 2", "Hinjewadi Phase 3", "Wakad", "Pimple Saudagar", "Pimple Nilakh", "Pimple Gurav", "Kalewadi", "Thergaon", "Nigdi", "Pimpri", "Chinchwad", "Akurdi", "Pradhikaran", "Bhosari", "Moshi", "Spine Road", "Chikhali", "Charholi", "Dighi", "Talawade", "Sangvi", "Dapodi", "Kasarwadi"],
  EAST_PUNE: ["Kharadi", "New Kharadi", "Viman Nagar", "Koregaon Park", "Kalyani Nagar", "Magarpatta", "Mundhwa", "Hadapsar", "Manjari", "Wagholi", "Lohegaon", "Dhanori", "Yerawada", "Keshav Nagar", "Vishrantwadi"],
  SOUTH_PUNE: ["NIBM", "NIBM Road", "Mohammed Wadi", "Undri", "Kondhwa", "Pisoli", "Bibwewadi", "Katraj", "Narhe", "Sinhagad Road", "Ambegaon", "Dhankawadi", "Wanowrie", "Amanora", "Camp", "Swargate", "Sadashiv Peth", "Narayan Peth", "Shukrawar Peth"]
};

export const MUMBAI_MARKETS = {
  SOUTH_MUMBAI: ["South Mumbai", "Malabar Hill", "Worli", "Lower Parel", "Prabhadevi", "Dadar", "Mahalaxmi", "Tardeo", "Peddar Road", "Breach Candy", "Colaba", "Marine Drive", "Cuffe Parade", "Byculla"],
  WESTERN_SUBURBS: ["Bandra", "Bandra West", "Bandra East", "Juhu", "Juhu Scheme", "Khar", "Santacruz", "Vile Parle", "Andheri", "Andheri West", "Andheri East", "Lokhandwala", "Versova", "Oshiwara", "Goregaon", "Malad", "Kandivali", "Borivali"],
  CENTRAL_MUMBAI: ["Powai", "BKC", "Kurla", "Chembur", "Ghatkopar", "Vikhroli", "Mulund", "Sion"],
  THANE_NAVI_MUMBAI: ["Thane", "Majiwada", "Ghodbunder Road", "Hiranandani Estate", "Navi Mumbai", "Vashi", "Nerul", "Belapur", "Kharghar", "Palm Beach Road", "Seawoods", "Panvel", "Airoli"]
};

export const ALL_PUNE_LOCATIONS = [
  ...PUNE_MARKETS.WEST_PUNE,
  ...PUNE_MARKETS.IT_CORRIDOR,
  ...PUNE_MARKETS.EAST_PUNE,
  ...PUNE_MARKETS.SOUTH_PUNE
];

export const ALL_MUMBAI_LOCATIONS = [
  ...MUMBAI_MARKETS.SOUTH_MUMBAI,
  ...MUMBAI_MARKETS.WESTERN_SUBURBS,
  ...MUMBAI_MARKETS.CENTRAL_MUMBAI,
  ...MUMBAI_MARKETS.THANE_NAVI_MUMBAI
];

// Flattened for easy iteration
export const SEO_LOCATIONS = {
  west: [...PUNE_MARKETS.WEST_PUNE, ...MUMBAI_MARKETS.WESTERN_SUBURBS],
  central: ["Shivajinagar", "Deccan", "Model Colony", "Erandwane", ...MUMBAI_MARKETS.SOUTH_MUMBAI],
  east: [...PUNE_MARKETS.EAST_PUNE, ...MUMBAI_MARKETS.CENTRAL_MUMBAI],
  south: PUNE_MARKETS.SOUTH_PUNE,
  north: [...PUNE_MARKETS.IT_CORRIDOR, ...MUMBAI_MARKETS.THANE_NAVI_MUMBAI],
};

export const GEO_COORDINATES: Record<string, { lat: number, lng: number }> = {
  // Pune & PCMC
  "Baner": { lat: 18.5590, lng: 73.7868 },
  "Wakad": { lat: 18.5996, lng: 73.7486 },
  "Hinjewadi Phase 1": { lat: 18.5913, lng: 73.7389 },
  "Hinjewadi Phase 2": { lat: 18.5833, lng: 73.7144 },
  "Hinjewadi Phase 3": { lat: 18.5750, lng: 73.6933 },
  "Hinjewadi": { lat: 18.5913, lng: 73.7389 },
  "Balewadi": { lat: 18.5759, lng: 73.7788 },
  "Aundh": { lat: 18.5573, lng: 73.8058 },
  "Kothrud": { lat: 18.5074, lng: 73.8077 },
  "Kharadi": { lat: 18.5515, lng: 73.9348 },
  "New Kharadi": { lat: 18.5550, lng: 73.9450 },
  "Viman Nagar": { lat: 18.5679, lng: 73.9143 },
  "Koregaon Park": { lat: 18.5362, lng: 73.8939 },
  "Kalyani Nagar": { lat: 18.5471, lng: 73.9033 },
  "Magarpatta": { lat: 18.5126, lng: 73.9255 },
  "Hadapsar": { lat: 18.4967, lng: 73.9417 },
  "Pimple Saudagar": { lat: 18.5927, lng: 73.7944 },
  "Pimple Nilakh": { lat: 18.5815, lng: 73.7876 },
  "Pimple Gurav": { lat: 18.5878, lng: 73.8182 },
  "Tathawade": { lat: 18.6186, lng: 73.7461 },
  "Punawale": { lat: 18.6337, lng: 73.7371 },
  "Ravet": { lat: 18.6439, lng: 73.7441 },
  "Mahalunge": { lat: 18.5721, lng: 73.7431 },
  "Sus": { lat: 18.5489, lng: 73.7589 },
  "Chinchwad": { lat: 18.6279, lng: 73.7834 },
  "Pimpri": { lat: 18.6298, lng: 73.7997 },
  "Pashan": { lat: 18.5398, lng: 73.7977 },
  "Nigdi": { lat: 18.6508, lng: 73.7656 },
  "Akurdi": { lat: 18.6496, lng: 73.7707 },
  "Bhosari": { lat: 18.6275, lng: 73.8466 },
  "Moshi": { lat: 18.6781, lng: 73.8447 },
  "Bavdhan": { lat: 18.5133, lng: 73.7758 },
  "NIBM": { lat: 18.4777, lng: 73.8986 },
  "Undri": { lat: 18.4601, lng: 73.9079 },
  "Wagholi": { lat: 18.5808, lng: 73.9806 },
  "Dhanori": { lat: 18.5888, lng: 73.8920 },
  "Lohegaon": { lat: 18.5954, lng: 73.9248 },
  "Sinhagad Road": { lat: 18.4812, lng: 73.8315 },
  "Warje": { lat: 18.4795, lng: 73.7925 },
  "Shivajinagar": { lat: 18.5314, lng: 73.8446 },
  "Erandwane": { lat: 18.5089, lng: 73.8340 },

  // Mumbai Micro-Markets
  "Bandra": { lat: 19.0596, lng: 72.8295 },
  "Bandra West": { lat: 19.0544, lng: 72.8250 },
  "Bandra East": { lat: 19.0620, lng: 72.8450 },
  "Juhu": { lat: 19.1075, lng: 72.8263 },
  "Worli": { lat: 19.0178, lng: 72.8178 },
  "Lower Parel": { lat: 18.9950, lng: 72.8300 },
  "Prabhadevi": { lat: 19.0144, lng: 72.8280 },
  "Dadar": { lat: 19.0178, lng: 72.8478 },
  "Powai": { lat: 19.1176, lng: 72.9060 },
  "Andheri": { lat: 19.1136, lng: 72.8697 },
  "Andheri West": { lat: 19.1363, lng: 72.8277 },
  "Andheri East": { lat: 19.1155, lng: 72.8752 },
  "Goregaon": { lat: 19.1663, lng: 72.8526 },
  "Malad": { lat: 19.1874, lng: 72.8484 },
  "Borivali": { lat: 19.2307, lng: 72.8567 },
  "South Mumbai": { lat: 18.9438, lng: 72.8354 },
  "Malabar Hill": { lat: 18.9548, lng: 72.7985 },
  "BKC": { lat: 19.0674, lng: 72.8687 },
  "Chembur": { lat: 19.0522, lng: 72.8995 },
  "Ghatkopar": { lat: 19.0860, lng: 72.9090 },
  "Mulund": { lat: 19.1726, lng: 72.9565 },
  "Navi Mumbai": { lat: 19.0330, lng: 73.0297 },
  "Vashi": { lat: 19.0771, lng: 72.9986 },
  "Kharghar": { lat: 19.0473, lng: 73.0699 },
  "Nerul": { lat: 19.0330, lng: 73.0182 },
  "Palm Beach Road": { lat: 19.0200, lng: 73.0150 },
  "Thane": { lat: 19.2183, lng: 72.9781 },
  "Ghodbunder Road": { lat: 19.2600, lng: 72.9500 },
  "Hiranandani Estate": { lat: 19.2550, lng: 72.9800 },

  // Default to Studio HQ (Vision One Mall, Wakad, Pune)
  "Default": { lat: 18.5996, lng: 73.7486 }
};

export const PUNE_NEIGHBORHOOD_USPS: Record<string, string> = {
  // Pune Elite & Emerging Tech Corridors
  "Baner": "High-altitude luxury residences with panoramic hilltop views.",
  "Koregaon Park": "Legacy heritage estates with high-fidelity restoration.",
  "Kalyani Nagar": "Opulent riverside penthouses with cosmopolitan flair.",
  "Viman Nagar": "Cosmopolitan high-density luxury with aviation-inspired geometry.",
  "Hinjewadi": "Ergonomic work-from-home sanctuaries for the technology elite.",
  "Wakad": "Tech-luxe functional designs for high-speed IT professionals.",
  "Kharadi": "Modern high-rise silhouettes with expansive eastern light.",
  "Aundh": "Refined classical interiors tailored for established luxury estates.",
  "Magarpatta": "Sustainable integrated-city living with futuristic spatial flow.",
  "Balewadi": "Sophisticated river-facing monographs with quiet luxury vibes.",
  "Pashan": "Tranquil, nature-integrated designs emphasizing biophilic elements.",
  "Kothrud": "Traditional Maratha Modern aesthetics for cultural heartland homes.",
  "Bavdhan": "Biophilic bungalow architecture seamlessly integrated with nature.",
  "Punawale": "Emerging premium real estate demanding high-efficiency interiors.",
  "Tathawade": "Modern scalable apartments designed for growing families.",
  "Ravet": "Sleek, minimalist architectural flow for the modern urbanite.",
  "Pimple Saudagar": "Vibrant, family-first luxury interiors with maximal utility.",
  "Hadapsar": "Expansive contemporary spaces bridging industrial chic and luxury.",
  "NIBM": "Elite, high-society residential designs with bespoke international styling.",
  "Undri": "Spacious villa and row-house interiors optimized for slow living.",

  // Mumbai Elite & Core Hubs
  "Bandra": "Bohemian luxury and sea-facing penthouses with artistic architectural flow.",
  "Bandra West": "Pali Hill and Carter Road luxury monographs with bespoke brass and Italian marble.",
  "Juhu": "A-list celebrity-grade estates demanding peak material sophistication.",
  "Worli": "Ultra-luxury high-rise monographs with sweeping Arabian Sea views.",
  "Lower Parel": "Industrial-luxe duplexes and sky villas in high-density luxury high-rises.",
  "Prabhadevi": "Coastal view apartments balancing traditional sanctity with modern minimalism.",
  "Powai": "Lakeside corporate luxury with high-tech, smart-home integrations.",
  "Andheri": "Dynamic, high-energy spatial layouts for fast-paced modern lifestyles.",
  "Andheri West": "Cinematic feature walls, acoustic home theaters, and open-plan entertainment suites.",
  "Goregaon": "Contemporary high-rise apartments with streamlined modular efficiency.",
  "Malad": "Modern compact luxury with modular flex-spaces for urban professionals.",
  "Borivali": "Vastu-aligned family sanctuaries balancing warm woodwork with natural light.",
  "South Mumbai": "Art Deco heritage restorations and ultra-premium classical interiors.",
  "Malabar Hill": "Billionaire-tier legacy estates requiring uncompromising craftsmanship.",
  "BKC": "High-altitude corporate suites and executive residences with seamless acoustics.",
  "Navi Mumbai": "Expansive, master-planned contemporary villas and modern apartments.",
  "Vashi": "Refined executive living with minimalist modular kitchens and acoustic lounges.",
  "Kharghar": "Spacious, nature-facing residences optimized for calm and open-air flow.",
  "Palm Beach Road": "Super-luxury waterfront penthouses with Italian marble and smart automation.",
  "Thane": "Lakeside premium residences bridging nature with high-density luxury.",
  "Ghodbunder Road": "Modern high-rises with space-saving ergonomic furniture and modular kitchens.",
  "Hiranandani Estate": "Neoclassical architectural luxury tailored for European-inspired township residences."
};

export const SEO_PROPERTY_TYPES = [
  "Apartment Interiors", "Luxury Apartment Interiors", "Studio Apartment", 
  "1 BHK", "2 BHK", "2.5 BHK", "3 BHK", "3.5 BHK", "4 BHK", "4.5 BHK", "5 BHK", 
  "Villa", "Bungalow", "Farmhouse", "Row House", "Independent House", 
  "Penthouse", "Duplex", "Builder Floors"
];

export const SERVICE_SILOS = {
  RESIDENTIAL: ["Luxury Apartments", "Premium Apartments", "Budget Apartments", "2 BHK", "3 BHK", "4 BHK", "5 BHK", "Penthouse", "Duplex", "Villa", "Bungalow", "Farmhouse", "Row House", "Independent House", "Smart Homes", "Minimal Homes", "Modern Homes", "Luxury Homes", "Complete Home Interior", "Full Home Interior", "House Interior", "Home Decor"],
  COMMERCIAL: ["Office Interior", "IT Office", "Corporate Office", "Startup Office", "Restaurant", "Cafe", "Retail", "Showroom", "Hospital", "Clinic", "Salon", "Gym", "Hotel", "Coworking Space", "Educational Institute", "Industrial Office", "Warehouse Office"],
  TURNKEY: ["Complete Home Interiors", "Interior Execution", "Project Management", "Furniture Manufacturing", "Civil Work", "Electrical", "Plumbing", "Painting", "Automation", "False Ceiling", "Flooring", "Lighting", "Curtains", "Soft Furnishing", "Complete Interior Solutions", "End to End Home Interiors", "Design to Delivery Interiors"],
  LUXURY: ["Italian Interior", "Modern Luxury", "Minimal Luxury", "Scandinavian", "Japanese", "Industrial", "Contemporary", "Classic", "Neo Classical", "Luxury Villas", "Luxury Bungalows", "Luxury Apartments", "Luxury Offices", "Luxury Residence", "Designer Luxury Homes"],
  PREMIUM: ["Premium Apartment", "Premium Home", "Premium Villa", "Premium Office", "Premium Turnkey", "Premium Modular Kitchen", "Premium Wardrobe Design", "Premium Furniture", "Premium Living Room", "Premium Bedroom"],
  BUDGET: ["Affordable Interiors", "Budget Apartments", "Budget Homes", "Budget Kitchen", "Budget Wardrobes", "Budget Renovation", "Affordable Turnkey", "Budget Commercial", "Low Cost Interior", "Cost Effective Interior", "Value for Money Interior", "Economical Home Interior"],
  MODULAR: ["Modular Kitchen", "L Shape Kitchen", "U Shape Kitchen", "Island Kitchen", "Parallel Kitchen", "Straight Kitchen", "Wardrobes", "Sliding Wardrobes", "Walk-in Wardrobes", "TV Units", "Vanity", "Crockery Unit", "Bookshelf", "Study Unit", "Custom Furniture"]
};

export const SEO_SERVICES = [...SERVICE_SILOS.RESIDENTIAL, ...SERVICE_SILOS.COMMERCIAL, ...SERVICE_SILOS.TURNKEY, ...SERVICE_SILOS.MODULAR];

export const BUYER_INTENT_KEYWORDS = [
  "Hire", "Book", "Near Me", "Top Rated", "Services", "Experts", "Firm", "Agency", "Consultancy", "Execution", "Best", "Free Consultation"
];

export const BRAND_TRUST_KEYWORDS = [
  "Experienced", "Award Winning", "Trusted", "Professional", "Licensed", "Custom", "Specialists", "Turnkey Experts", "Reliable", "Top Reviewed"
];

export const CONFIGURATION_KEYWORDS = [
  "2 BHK Interior", "2 BHK Home Interiors", "2 BHK Turnkey Interior", "2 BHK Modular Kitchen",
  "3 BHK Interior", "3 BHK Luxury Interior", "3 BHK Premium Interior", "3 BHK Complete Interiors",
  "4 BHK Interior", "4 BHK Luxury Interior", "4 BHK Villa Style Interior",
  "5 BHK Interior", "Luxury Penthouse Interior", "Duplex Interior"
];

export const COST_GUIDES = [
  "Cost", "Price", "Quotation", "Estimate", "Package", "EMI"
];

// PHASE 3 & 7: BUILDER & PROJECT ECOSYSTEM
export const BUILDERS: Record<string, string[]> = {
  "Godrej Properties": ["Godrej Hillside", "Godrej Forest Grove", "Godrej Park World", "Godrej Green Cove", "Godrej Evergreen Square", "Godrej 24"],
  "VTP Realty": ["VTP Blue Waters", "VTP Sierra", "VTP Bellissimo", "VTP Leonara", "VTP Pegasus", "VTP Alpine", "VTP Earth One", "VTP Dolce Vita", "VTP Cygnus", "VTP Purvanchal"],
  "Kolte-Patil Developers": ["Life Republic", "24K Stargaze", "24K Opula", "24K Sereno", "24K Altura", "Ivy Estate"],
  "Kohinoor Group": ["Kohinoor Central Park", "Kohinoor Westview Reserve", "Kohinoor Famville", "Kohinoor Viva City", "Kohinoor Sapphire", "Kohinoor Rainbow", "Kohinoor Grandeur", "Kohinoor Riverdale", "Kohinoor Kaleido"],
  "Mahindra Lifespaces": ["Mahindra Citadel", "Mahindra Antheia"],
  "Lodha": ["Lodha Belmondo", "Lodha Massimo"],
  "Gera Developments": ["Gera World of Joy", "Gera Island of Joy"],
  "Vilas Javdekar": ["Yashwin Encore", "Palladio", "Songbird", "Yashwin"],
  "Pharande Spaces": ["Pharande Puneville", "Pharande Kairosa", "Pharande Celestial City", "Pharande L Axis"],
  "Rama Group": ["Rama Melange", "Rama Metro Life", "Rama Codename Kingdom"],
  "Pride Group": ["Pride World City", "Pride Purple Park", "Pride Aloma", "Pride Platinum"],
  "Kumar Properties": ["Kumar Megapolis", "Kumar Padmalaya", "Kumar Sophronia", "Kumar Princeville", "Kumar Prospera", "Kumar Parc Residences"],
  "Nyati Group": ["Nyati Elysia", "Nyati Emerald", "Nyati Equinox", "Nyati Windchimes", "Nyati Chesterfield", "Nyati Elan"],
  "Kasturi Housing": ["Kasturi The Balmoral Hillside", "Kasturi Epitome"],
  "Shapoorji Pallonji": ["Shapoorji Sensorium", "Shapoorji Joyville", "Shapoorji Vanaha"],
  "Rohan Builders": ["Rohan Ekam", "Rohan Seher", "Rohan Mithila"],
  "Kalpataru": ["Kalpataru Jade Skyline"],
  "Supreme Universal": ["Supreme Estia", "Supreme Pallacio"]
};

// Flatten builders for quick access
export const ALL_PROJECTS = Object.values(BUILDERS).flat();
export const ALL_BUILDERS = Object.keys(BUILDERS);

export const SEO_COMPARISONS = [
  "Livspace vs Local Interior Designer",
  "HomeLane vs KS Design Studio",
  "Turnkey Interior Designer vs Carpenter",
  "Acrylic vs Laminate Kitchen",
  "HDHMR vs Plywood Wardrobes",
  "PU vs Laminate Finish",
  "Quartz vs Granite Countertop"
];

export const AI_VOICE_SEARCH = [
  "Who is the best interior designer in Pune",
  "Which interior designer works in Wakad",
  "How much does home interior cost in Pune",
  "How much does a 3 BHK interior cost",
  "Who provides turnkey interiors near me",
  "Which interior designer offers modular kitchens in Baner",
  "Best interior designer for Godrej Park World",
  "Budget interior ideas for a new flat in Hinjewadi",
  "Recommend a luxury interior designer in Baner"
];

export const POSSESSION_KEYWORDS = [
  "interior designer after possession",
  "home interiors after registration",
  "flat interior after possession",
  "apartment interior after handover",
  "new home furnishing",
  "complete interiors before shifting",
  "move in ready interiors",
  "possession interior package"
];
