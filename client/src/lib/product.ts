export interface ProductColor {
  name: string;
  hex: string;
  image: string;
}

export interface RecommendedPairing {
  id: string;
  name: string;
  description: string;
  priceNote: string;
  image: string;
}

export const PRODUCT = {
  id: "jude-french-4door-retro-refrigerator",
  name: "jude French 4-Door Retro Refrigerator",
  price: 49999,
  inventory: 10,
  tagline: "your life, styled",
  description: `Rooted in the bold individuality of New York City, the jude French 4-Door Retro Refrigerator is designed for homes that celebrate personal expression. Each unit features an art-grade lacquer finish in your choice of vibrant color, merging mid-century warmth with modern precision.`,
  brandStatement: `We celebrate the uniqueness of every home by crafting appliances that empower personal style and reflect individuality.`,
  overview: [
    { label: "Configuration", value: "French 4-Door" },
    { label: "Total Capacity", value: "508 Liters" },
    { label: "Compressor", value: "Inverter, Ultra-Quiet" },
    { label: "Color Program", value: "9 Signature Finishes" },
  ],
  features: [
    "508L total capacity across four compartments",
    "French door design with art-grade lacquer finish",
    "Precision temperature control with dual cooling zones",
    "Signature hardware and accent detailing",
    "Ultra-quiet inverter compressor technology",
    "Adjustable glass shelving with LED interior lighting",
  ],
  specs: {
    "Capacity": "508 Liters",
    "Dimensions": '70.9" H × 32.3" W × 27.6" D',
    "Weight": "265 lbs",
    "Energy Rating": "A++",
    "Noise Level": "38 dB",
    "Warranty": "5 Years",
  },
  dimensionsGuide: {
    "Overall (H x W x D)": '70.9" x 32.3" x 27.6"',
    "Cabinet Depth (without door)": '24.8"',
    "Door Swing Clearance": '41.5"',
    "Recommended Rear Clearance": '2"',
    "Recommended Side Clearance": '1" each side',
    "Recommended Top Clearance": '2"',
  },
  finishMaterials: [
    "Art-grade lacquered steel exterior in curated colorways",
    "Anti-fingerprint clear protective top layer",
    "Signature brushed metal handles and trim accents",
    "Tempered glass adjustable shelving with reinforced edges",
  ],
  electricalRequirements: [
    "120V / 60Hz dedicated outlet (U.S. standard)",
    "15A dedicated circuit recommended",
    "3-prong grounded plug required",
    "Do not use extension cords or shared high-load circuits",
  ],
  placementGuidance: [
    "Best for standard U.S. kitchen cutouts with extra rear ventilation space",
    "Allow full door opening clearance before placing next to walls or islands",
    "Keep away from direct heat sources (ovens, radiant cooktops) when possible",
    "Professional leveling at install is recommended for optimal door seal performance",
  ],
  colors: [
    {
      name: "Vermillion Red",
      hex: "#D93A1D",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663377282092/YxovjxdWnDXdlhxf.png",
    },
    {
      name: "Saffron Yellow",
      hex: "#d4a017",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663377282092/qlmnAnNYRwwswEfc.png",
    },
    {
      name: "Royal Blue",
      hex: "#2e4ead",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663377282092/qbWRwLqAlXdXHwJR.png",
    },
    {
      name: "Ivory White",
      hex: "#f5f0e8",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663377282092/UyZjGqDDlwJnrzgm.png",
    },
    {
      name: "Obsidian Black",
      hex: "#1a1a1a",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663377282092/KOgijLULCtmIXowf.png",
    },
    {
      name: "Blush Pink",
      hex: "#d4a0a0",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663377282092/kRxKrbgQcwdBLzSz.png",
    },
    {
      name: "Forest Green",
      hex: "#4a6741",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663377282092/AMwSZkApmGvmHcqN.png",
    },
    {
      name: "Tangerine Orange",
      hex: "#E8762A",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663377282092/zDcwsfuSexdaMOiL.png",
    },
    {
      name: "Lavender Purple",
      hex: "#9b7db8",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663377282092/yzizxSTvpXCTuQuJ.png",
    },
  ] as ProductColor[],
  heroImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663377282092/YxovjxdWnDXdlhxf.png",
  secondaryImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663377282092/qlmnAnNYRwwswEfc.png",
};

export const RECOMMENDED_PAIRINGS: RecommendedPairing[] = [
  {
    id: "pairing-install",
    name: "White-Glove Installation",
    description: "Professional in-home installation and haul-away service.",
    priceNote: "From $399",
    image: PRODUCT.heroImage,
  },
  {
    id: "pairing-protection",
    name: "Extended Protection Plan",
    description: "Priority support and extended parts coverage for peace of mind.",
    priceNote: "From $799",
    image: PRODUCT.secondaryImage,
  },
  {
    id: "pairing-maintenance",
    name: "Annual Care Package",
    description: "Scheduled maintenance and deep-clean service by certified experts.",
    priceNote: "From $249 / year",
    image: PRODUCT.colors[2].image,
  },
];

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
