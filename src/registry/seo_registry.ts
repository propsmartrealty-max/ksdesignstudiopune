/**
 * Atelier Genesis - Core SEO Registry
 * Containing the intensive gamut of keywords for Pune market dominance.
 */

export const PUNE_MARKETS = {
  WEST_PUNE: ["Baner", "Baner Annexe", "Balewadi", "Mahalunge", "Sus", "Pashan", "Aundh", "Bavdhan", "Kothrud", "Warje", "Karve Nagar", "Erandwane", "Prabhat Road", "Shivajinagar", "Model Colony", "SB Road", "University Road", "Law College Road", "Deccan", "FC Road", "JM Road", "Punawale", "Tathawade", "Ravet", "Kiwale", "Mamurdi"],
  IT_CORRIDOR: ["Hinjewadi Phase 1", "Hinjewadi Phase 2", "Hinjewadi Phase 3", "Wakad", "Pimple Saudagar", "Pimple Nilakh", "Kalewadi", "Thergaon", "Nigdi", "Pimpri", "Chinchwad", "Akurdi", "Pradhikaran", "Bhosari", "Moshi", "Spine Road", "Chikhali", "Charholi", "Dighi", "Talawade", "Sangvi", "Dapodi", "Kasarwadi"],
  EAST_PUNE: ["Kharadi", "New Kharadi", "Viman Nagar", "Koregaon Park", "Kalyani Nagar", "Magarpatta", "Mundhwa", "Hadapsar", "Manjari", "Wagholi", "Lohegaon", "Dhanori", "Yerawada", "Keshav Nagar", "Vishrantwadi"],
  SOUTH_PUNE: ["NIBM", "Mohammed Wadi", "Undri", "Kondhwa", "Pisoli", "Bibwewadi", "Katraj", "Narhe", "Sinhagad Road", "Ambegaon", "Dhankawadi", "Wanowrie", "Amanora"]
};

// Flattened for easy iteration
export const SEO_LOCATIONS = {
  west: PUNE_MARKETS.WEST_PUNE,
  central: ["Shivajinagar", "Deccan", "Model Colony", "Erandwane"],
  east: PUNE_MARKETS.EAST_PUNE,
  south: PUNE_MARKETS.SOUTH_PUNE,
  north: PUNE_MARKETS.IT_CORRIDOR,
};

export const PUNE_NEIGHBORHOOD_USPS: Record<string, string> = {
  "Baner": "High-altitude luxury residences with panoramic hilltop views.",
  "Wakad": "Tech-luxe functional designs for high-speed IT professionals.",
  "Hinjewadi": "Ergonomic work-from-home sanctuaries for the technology elite.",
  "Kharadi": "Modern high-rise silhouettes with expansive eastern light.",
  "Balewadi": "Sophisticated river-facing monographs with quiet luxury vibes.",
  "Bavdhan": "Biophilic bungalow architecture integrated with nature.",
  "Koregaon Park": "Legacy heritage estates with high-fidelity restoration.",
  "Kothrud": "Traditional Maratha Modern aesthetics for cultural heartland homes.",
  "Magarpatta": "Sustainable integrated-city living with futuristic spatial flow.",
  "Viman Nagar": "Cosmopolitan high-density luxury with aviation-inspired geometry.",
  "Tathawade": "Modern scalable apartments designed for growing families.",
  "Punawale": "Emerging premium real estate demanding high-efficiency interiors.",
  "PCMC": "Industrial-chic designs tailored for fast-paced urban expansion."
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
