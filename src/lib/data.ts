import westmount from "@/assets/prop-westmount-mansion.jpg";
import penthouse from "@/assets/prop-downtown-penthouse.jpg";
import plateau from "@/assets/prop-plateau-triplex.jpg";
import oldmtl from "@/assets/prop-oldmontreal-loft.jpg";
import griffintown from "@/assets/prop-griffintown-condo.jpg";
import outremont from "@/assets/prop-outremont-townhouse.jpg";
import ndg from "@/assets/prop-ndg-duplex.jpg";
import commercial from "@/assets/prop-downtown-commercial.jpg";
import hampstead from "@/assets/prop-hampstead-home.jpg";
import kitchen from "@/assets/interior-kitchen.jpg";

export type PropertyType = "Luxury" | "Condo" | "House" | "Multi-Family" | "Commercial";

export type Property = {
  id: string;
  title: string;
  address: string;
  neighborhood: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  lotSize?: string;
  yearBuilt: number;
  parking: number;
  floors: number;
  type: PropertyType;
  image: string;
  gallery: string[];
  description: string;
  features: string[];
};

export const properties: Property[] = [
  {
    id: "westmount-heritage-estate",
    title: "Heritage Stone Estate",
    address: "412 Avenue Roslyn",
    neighborhood: "Westmount",
    price: 6450000,
    beds: 6, baths: 5, sqft: 6800, lotSize: "12,400 sqft", yearBuilt: 1912, parking: 4, floors: 3,
    type: "Luxury",
    image: westmount,
    gallery: [westmount, kitchen, penthouse],
    description: "A landmark Edwardian residence on one of Westmount's most coveted streets. Original masonry, ivy-clad façade, and a fully reimagined interior — heritage and contemporary luxury in equal measure.",
    features: ["Heritage façade","Chef's kitchen","Wine cellar","Landscaped gardens","Private garage","Smart home"],
  },
  {
    id: "downtown-penthouse-skyview",
    title: "Skyview Penthouse",
    address: "1500 Boulevard René-Lévesque, PH",
    neighborhood: "Downtown",
    price: 4250000,
    beds: 3, baths: 3, sqft: 3200, yearBuilt: 2022, parking: 2, floors: 1,
    type: "Luxury",
    image: penthouse,
    gallery: [penthouse, kitchen, griffintown],
    description: "A full-floor penthouse perched above Ville-Marie with uninterrupted skyline and river views. Floor-to-ceiling glass, Italian millwork, and a private terrace facing Mount Royal.",
    features: ["Private elevator","Floor-to-ceiling glass","Concierge","Wraparound terrace","Spa bathroom"],
  },
  {
    id: "plateau-triplex-investment",
    title: "Plateau Triplex",
    address: "4521 Rue Saint-Denis",
    neighborhood: "Plateau-Mont-Royal",
    price: 1690000,
    beds: 9, baths: 3, sqft: 4100, yearBuilt: 1908, parking: 0, floors: 3,
    type: "Multi-Family",
    image: plateau,
    gallery: [plateau, ndg],
    description: "Iconic Plateau triplex with the signature exterior staircase, generous units, and strong rental history. Turnkey income in the heart of Montreal's most beloved neighborhood.",
    features: ["3 income units","Original hardwood","Renovated kitchens","Rooftop potential"],
  },
  {
    id: "old-montreal-loft",
    title: "Stone Vault Loft",
    address: "84 Rue Saint-Paul Ouest",
    neighborhood: "Old Montreal",
    price: 2150000,
    beds: 2, baths: 2, sqft: 2400, yearBuilt: 1864, parking: 1, floors: 2,
    type: "Condo",
    image: oldmtl,
    gallery: [oldmtl, kitchen, penthouse],
    description: "A two-storey heritage loft inside a restored 19th-century stone warehouse. Exposed beams, original limestone walls, and bespoke finishes — a rare object in the old city.",
    features: ["Original stone walls","12ft ceilings","Bespoke joinery","Heated floors"],
  },
  {
    id: "griffintown-canal-condo",
    title: "Canal-Front Residence",
    address: "1010 Rue de la Montagne",
    neighborhood: "Griffintown",
    price: 945000,
    beds: 2, baths: 2, sqft: 1280, yearBuilt: 2020, parking: 1, floors: 1,
    type: "Condo",
    image: griffintown,
    gallery: [griffintown, kitchen],
    description: "South-facing condo overlooking the Lachine Canal. Floor-to-ceiling windows, integrated appliances, and full building amenities including pool, gym, and 24/7 concierge.",
    features: ["Canal views","Pool & gym","Concierge","Integrated appliances"],
  },
  {
    id: "outremont-townhouse",
    title: "Brick Bay-Window Townhouse",
    address: "215 Avenue Bloomfield",
    neighborhood: "Outremont",
    price: 2890000,
    beds: 5, baths: 4, sqft: 3600, yearBuilt: 1924, parking: 2, floors: 3,
    type: "House",
    image: outremont,
    gallery: [outremont, kitchen, westmount],
    description: "A graceful Outremont townhouse with original bay windows, mature trees, and a sun-filled garden. Walk to Parc Outremont, Bernard, and the city's most discerning addresses.",
    features: ["Garden","Original moldings","Library","Finished basement"],
  },
  {
    id: "ndg-duplex-investment",
    title: "NDG Brick Duplex",
    address: "5742 Avenue Coolbrook",
    neighborhood: "NDG",
    price: 1195000,
    beds: 7, baths: 3, sqft: 3200, yearBuilt: 1928, parking: 2, floors: 2,
    type: "Multi-Family",
    image: ndg,
    gallery: [ndg, plateau],
    description: "Solid brick duplex on a quiet, tree-lined street in NDG. Owner-occupier or pure investment — both units have been thoughtfully updated.",
    features: ["Updated units","Detached garage","Strong rental yield"],
  },
  {
    id: "downtown-commercial-tower",
    title: "Ste-Catherine Commercial",
    address: "1255 Rue Sainte-Catherine Ouest",
    neighborhood: "Downtown",
    price: 12500000,
    beds: 0, baths: 6, sqft: 24000, yearBuilt: 2008, parking: 18, floors: 8,
    type: "Commercial",
    image: commercial,
    gallery: [commercial, penthouse],
    description: "Class-A office and retail building on Montreal's premier commercial corridor. Long-term anchor tenants, modern systems, and significant repositioning upside.",
    features: ["Anchor retail","LEED systems","Underground parking","High traffic corridor"],
  },
  {
    id: "hampstead-family-home",
    title: "Hampstead Stone Residence",
    address: "59 Finchley Road",
    neighborhood: "Hampstead",
    price: 3290000,
    beds: 5, baths: 4, sqft: 4400, lotSize: "8,200 sqft", yearBuilt: 2014, parking: 2, floors: 2,
    type: "House",
    image: hampstead,
    gallery: [hampstead, kitchen],
    description: "Custom-built stone residence with chef's kitchen, principal suite with dual dressing rooms, and a manicured backyard. Steps from Hampstead Park.",
    features: ["Chef's kitchen","Heated driveway","Theatre room","Backyard pool-ready"],
  },
  {
    id: "csl-modern-condo",
    title: "Côte-Saint-Luc Sky Residence",
    address: "6700 Boulevard Cavendish, PH02",
    neighborhood: "Côte-Saint-Luc",
    price: 1180000,
    beds: 3, baths: 2, sqft: 1850, yearBuilt: 2019, parking: 2, floors: 1,
    type: "Condo",
    image: griffintown,
    gallery: [griffintown, kitchen],
    description: "Bright corner unit with panoramic west-island views, two parking, and full amenities. Ideal lock-and-leave residence.",
    features: ["Corner unit","Two parking","Gym & sauna"],
  },
];

export const neighborhoods = [
  { slug: "westmount", name: "Westmount", image: westmount, vibe: "Heritage stone, leafy crescents, and the city's most established estates.", range: "$1.8M – $15M+" },
  { slug: "outremont", name: "Outremont", image: outremont, vibe: "Quietly intellectual. Belle-époque architecture and Bernard café culture.", range: "$1.4M – $8M" },
  { slug: "old-montreal", name: "Old Montreal", image: oldmtl, vibe: "Cobblestone, 17th-century stone, and Europe-by-the-river evenings.", range: "$900K – $6M" },
  { slug: "griffintown", name: "Griffintown", image: griffintown, vibe: "Modern glass on the Lachine Canal — Montreal's most contemporary address.", range: "$550K – $3M" },
  { slug: "plateau", name: "Plateau-Mont-Royal", image: plateau, vibe: "Triplexes, terraces, and the creative pulse of the city.", range: "$700K – $2.5M" },
  { slug: "ndg", name: "Côte-des-Neiges / NDG", image: ndg, vibe: "Tree-lined, family-anchored, and beautifully diverse.", range: "$650K – $2.2M" },
  { slug: "downtown", name: "Downtown / Ville-Marie", image: penthouse, vibe: "Skyline condos, towers, and the city's commercial heart.", range: "$500K – $5M+" },
  { slug: "hampstead", name: "Hampstead", image: hampstead, vibe: "A quiet, manicured enclave of detached family homes.", range: "$1.5M – $6M" },
  { slug: "cote-saint-luc", name: "Côte-Saint-Luc", image: griffintown, vibe: "Established, well-served, and tightly knit.", range: "$500K – $3M" },
  { slug: "lasalle", name: "LaSalle", image: ndg, vibe: "Riverside, growing, and increasingly investment-grade.", range: "$400K – $1.5M" },
  { slug: "ddo", name: "Dollard-des-Ormeaux", image: hampstead, vibe: "Family-first West Island with strong schools and value.", range: "$600K – $2M" },
  { slug: "west-island", name: "West Island", image: hampstead, vibe: "Lakefront enclaves, mature parks, and commuter ease.", range: "$700K – $4M" },
  { slug: "south-shore", name: "South Shore", image: outremont, vibe: "Cross-bridge value with rising momentum in every segment.", range: "$450K – $2M" },
];

export const services = [
  { title: "Residential Sales & Purchases", body: "Condos, townhomes, detached homes, and plexes — represented with discretion and rigor.", icon: "Home" },
  { title: "Luxury Real Estate", body: "Heritage estates, penthouses, and trophy properties marketed to a curated international audience.", icon: "Crown" },
  { title: "Commercial Real Estate", body: "Office, retail, and mixed-use assets across Greater Montreal's strongest corridors.", icon: "Building2" },
  { title: "Multi-Family & Investment", body: "Plexes and income-generating buildings sourced and underwritten with an investor's eye.", icon: "Layers" },
  { title: "Property Valuation", body: "Complimentary market assessments built on live comparables and neighborhood fluency.", icon: "LineChart" },
  { title: "Advisory & Strategy", body: "Portfolio building, market timing, and disciplined ROI analysis for serious owners.", icon: "Compass" },
  { title: "Buyer & Seller Representation", body: "End-to-end transaction management — negotiation, inspection, financing, closing.", icon: "Handshake" },
  { title: "Pre-Construction & New Development", body: "Privileged access to pre-launch projects and developer allocations.", icon: "HardHat" },
];

export const testimonials = [
  { quote: "Eli and the Nachal team understood our brief in a single conversation. We closed on our Westmount home above expectations and ahead of schedule.", name: "M. & A. Bensimon", role: "Buyers, Westmount" },
  { quote: "Sharp, calm, and entirely transparent. The valuation alone reframed how we think about our portfolio.", name: "D. Cohen", role: "Investor, Multi-Family" },
  { quote: "A rare combination of market depth and personal care. The marketing of our penthouse was best-in-class.", name: "S. Tremblay", role: "Seller, Griffintown" },
  { quote: "They know every street, every building, every nuance. That kind of local fluency is irreplaceable.", name: "J. & R. Levine", role: "Buyers, Outremont" },
];

export const insights = [
  { tag: "Q4 Market", title: "Westmount & Outremont: Inventory Tightens", excerpt: "Single-family supply in the city's prime west-end neighborhoods is down 18% year-over-year. What that means for buyers and sellers heading into the new year." },
  { tag: "Investment", title: "The Case for Montreal Plexes in 2026", excerpt: "Cap rates, rent control, and where the smart capital is rotating. A clear-eyed look at the multi-family thesis." },
  { tag: "Luxury", title: "Penthouse Sales Above $3M Are Quietly Climbing", excerpt: "International buyers are returning to the Ville-Marie corridor. We map the activity tower by tower." },
  { tag: "Neighborhood", title: "Griffintown's Next Chapter", excerpt: "Five years in, the canal district is maturing. Pricing, walkability, and what's coming online next." },
];

export const formatPrice = (n: number) =>
  n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 2)}M` : `$${(n / 1000).toFixed(0)}K`;
