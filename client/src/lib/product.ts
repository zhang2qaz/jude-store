export interface ProductColor {
  name: string;
  hex: string;
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

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
