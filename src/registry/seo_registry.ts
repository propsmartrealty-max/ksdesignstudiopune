/**
 * Atelier Genesis - Core SEO Registry
 * Containing the intensive gamut of keywords for Pune market dominance.
 */

export const PUNE_MARKETS = {
  WEST_PUNE: ["Baner", "Baner Annexe", "Balewadi", "Mahalunge", "Sus", "Pashan", "Aundh", "Bavdhan", "Kothrud", "Warje", "Karve Nagar", "Erandwane", "Prabhat Road", "Shivajinagar", "Model Colony", "SB Road", "University Road", "Law College Road", "Deccan", "FC Road", "JM Road"],
  IT_CORRIDOR: ["Hinjawadi Phase 1", "Hinjawadi Phase 2", "Hinjawadi Phase 3", "Wakad", "Punawale", "Tathawade", "Ravet", "Kiwale", "Pimple Saudagar", "Pimple Nilakh", "Kalewadi", "Thergaon", "Nigdi", "Pimpri", "Chinchwad"],
  EAST_PUNE: ["Kharadi", "New Kharadi", "Viman Nagar", "Koregaon Park", "Kalyani Nagar", "Magarpatta", "Mundhwa", "Hadapsar", "Manjari", "Wagholi", "Lohegaon", "Dhanori", "Yerawada", "Keshav Nagar"],
  SOUTH_PUNE: ["NIBM", "Mohammed Wadi", "Undri", "Kondhwa", "Pisoli", "Bibwewadi", "Katraj", "Narhe", "Sinhagad Road", "Ambegaon", "Dhankawadi", "PCMC", "Moshi", "Chikhali", "Charholi", "Akurdi", "Bhosari", "Talawade", "Pradhikaran", "Chakan", "Spine Road"]
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
  "Hinjawadi Phase 1": "Ergonomic work-from-home sanctuaries for the technology elite.",
  "Kharadi": "Modern high-rise silhouettes with expansive eastern light.",
  "Balewadi": "Sophisticated river-facing monographs with quiet luxury vibes.",
  "Bavdhan": "Biophilic bungalow architecture integrated with nature.",
  "Koregaon Park": "Legacy heritage estates with high-fidelity restoration.",
  "Kothrud": "Traditional Maratha Modern aesthetics for cultural heartland homes.",
  "Magarpatta": "Sustainable integrated-city living with futuristic spatial flow.",
  "Viman Nagar": "Cosmopolitan high-density luxury with aviation-inspired geometry."
};

export const SEO_PROPERTY_TYPES = [
  "Apartment Interiors", "Luxury Apartment Interiors", "Studio Apartment", 
  "2 BHK", "2.5 BHK", "3 BHK", "3.5 BHK", "4 BHK", "4.5 BHK", "5 BHK", 
  "Villa", "Bungalow", "Farmhouse", "Row House", "Independent House", 
  "Penthouse", "Duplex", "Builder Floors"
];

// VOLUME 1 & 2 SILOS COMBINED
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

// VOLUME 2 INTENT KEYWORDS
export const BUYER_INTENT_KEYWORDS = [
  "Hire Interior Designer Pune", "Book Interior Designer Pune", "Interior Designer Near Me Pune", 
  "Top Rated Interior Designers Pune", "Interior Design Services Pune", "Interior Design Experts Pune", 
  "Interior Design Firm Pune", "Interior Design Agency Pune", "Interior Design Consultancy Pune", 
  "Interior Execution Company Pune", "Best Interior Design Company Pune", "Book Free Interior Consultation Pune",
  "Interior Design Cost Pune", "Interior Quote Pune", "Interior Estimate Pune", "Interior Cost Calculator Pune",
  "Interior Design Packages Pune", "Interior EMI Pune"
];

export const BRAND_TRUST_KEYWORDS = [
  "Experienced Interior Designers Pune", "Award Winning Interior Designers Pune", "Trusted Interior Designers Pune",
  "Professional Interior Company Pune", "Licensed Interior Contractors Pune", "Custom Home Interiors Pune",
  "Interior Design Specialists Pune", "Complete Turnkey Interior Experts Pune", "Reliable Interior Designers Pune",
  "Top Reviewed Interior Designers Pune"
];

export const CONFIGURATION_KEYWORDS = [
  "2 BHK Interior", "2 BHK Home Interiors", "2 BHK Turnkey Interior", "2 BHK Modular Kitchen",
  "3 BHK Interior", "3 BHK Luxury Interior", "3 BHK Premium Interior", "3 BHK Complete Interiors",
  "4 BHK Interior", "4 BHK Luxury Interior", "4 BHK Villa Style Interior",
  "5 BHK Interior", "Luxury Penthouse Interior", "Duplex Interior"
];

export const COST_GUIDES = [
  "Interior Cost Pune", "Interior Cost Baner", "Interior Cost Wakad", "Interior Cost Hinjawadi", "Interior Cost Kharadi",
  "Luxury Interior Cost", "Budget Interior Cost", "Villa Interior Cost", "Bungalow Interior Cost", "Office Interior Cost", 
  "Commercial Interior Cost", "Kitchen Cost", "Wardrobe Cost", "Renovation Cost", "False Ceiling Cost", "Painting Cost"
];

export const SEO_LONG_TAIL = [
  "best interior designer for 2 bhk in Pune", "turnkey interior designer in Baner Pune", "affordable interior designer in Wakad Pune",
  "luxury villa interior designer in Kharadi Pune", "modular kitchen designer in Hadapsar Pune", "office interior designer in Hinjewadi Pune",
  "home interior packages Pune price", "interior designer Pune with execution", "Luxury Interior Designers for Apartments in Baner",
  "Premium Turnkey Interior Designers in Balewadi", "Affordable Interior Designers for 3 BHK in Wakad", "Best Interior Designers for Villas in Mahalunge",
  "Interior Design Company for Luxury Homes in Aundh", "Modern Apartment Interior Designers in Baner Annexe", "Complete Home Interior Solutions in Bavdhan",
  "Turnkey Interior Designers for Premium Apartments in Sus", "Modular Kitchen Designers for Luxury Homes in Pashan", "Interior Renovation Company in Kothrud",
  "Home Interior Designers for New Apartments in Baner", "Interior Designers for Ready Possession Flats in Mahalunge", "Luxury Office Interior Designers in Aundh",
  "Commercial Interior Design Company in Baner", "Interior Designers for Independent Houses in Balewadi"
];
