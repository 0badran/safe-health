import { ServiceCategory } from "./types";

export const ANATOMICAL_FILTERS = [
	"Nose",
	"Face",
	"Eyes & Brows",
	"Hair",
	"Breast",
	"Body",
	"Skin",
] as const;

export type AnatomicalFilter = (typeof ANATOMICAL_FILTERS)[number];

export const SERVICE_CATEGORIES: ServiceCategory[] = [
	{
		id: "plastic-surgery",
		number: "01",
		title: "Plastic Surgery",
		tagline: "SURGICAL INTERVENTION & ARCHITECTURE",
		discipline: "CORE DISCIPLINE",
		description:
			"Precision surgical interventions sculpted to achieve facial and anatomical harmony while preserving natural identity and delicate proportions.",
		procedures: [
			"Rhinoplasty",
			"Deep Plane Facelift",
			"Blepharoplasty (Eyelid Surgery)",
			"Breast Augmentation",
			"Structural Facial Contouring",
		],
		badge1: "Surgical Precision & Proportions",
		badge2: "HAUTE AESTHETIC",
		credential: "Accredited Hospital Operating Suites",
		image: "/images/treatments-plastic-surgery.jpg",
		anatomicalFocus: ["Nose", "Face", "Eyes & Brows", "Breast", "Body"],
	},
	{
		id: "aesthetic-injectables",
		number: "02",
		title: "Aesthetic Injectables",
		tagline: "NON-SURGICAL VOLUME & NEUROMODULATION",
		discipline: "MINIMALLY INVASIVE",
		description:
			"Artful liquid enhancement and neuromodulation designed to restore subtle volume, refine contours, and elevate natural youthfulness with micro-precision.",
		procedures: [
			"Full Facial Volumization",
			"Lip Enhancement & Architecture",
			"Jawline & Chin Sculpting",
			"Dynamic Wrinkle Relaxers",
			"Biostimulator Collagen Regeneration",
		],
		badge1: "Natural Volume & Expression",
		badge2: "EXPERT INJECTORS",
		credential: "FDA-Approved Premium Formulations",
		image: "/images/why-choose/aesthetic-care.jpg",
		anatomicalFocus: ["Face", "Eyes & Brows", "Skin"],
	},
	{
		id: "skin-treatments",
		number: "03",
		title: "Skin Treatments",
		tagline: "CELLULAR RENEWAL & DERMAL LONGEVITY",
		discipline: "CLINICAL DERMATOLOGY",
		description:
			"Advanced cellular rejuvenation protocols and medical-grade dermal therapies targeting deep collagen synthesis, texture refinement, and lasting skin vitality.",
		procedures: [
			"Medical Microneedling & Exosomes",
			"Bio-Nutritional Mesotherapy",
			"Advanced Chemical Resurfacing",
			"Hydra-Infusion Deep Cleansing",
			"Pigmentation Balancing Protocols",
		],
		badge1: "Luminous Cellular Health",
		badge2: "CLINICAL GRADE",
		credential: "Dermatologically Supervised Protocols",
		image: "/images/rhinoplasty.png",
		anatomicalFocus: ["Face", "Skin", "Body"],
	},
	{
		id: "laser-treatments",
		number: "04",
		title: "Laser Treatments",
		tagline: "ABLATIVE & NON-ABLATIVE OPTICAL TECH",
		discipline: "ADVANCED OPTICAL CARE",
		description:
			"Cutting-edge laser systems delivering wavelength-specific optical energy to renew surface clarity, stimulate collagen contraction, and eliminate vascular imperfections.",
		procedures: [
			"Fractional CO2 Resurfacing",
			"Pico Precision Toning",
			"Vascular & Rosacea Optical Laser",
			"Laser Tattoo & Spot Clearing",
			"Non-Ablative Deep Skin Tightening",
		],
		badge1: "Precision Optical Energy",
		badge2: "STATE OF THE ART",
		credential: "Certified Laser Safety Specialists",
		image: "/images/why-choose/patient-focus.png",
		anatomicalFocus: ["Face", "Skin", "Body"],
	},
	{
		id: "hair-restoration",
		number: "05",
		title: "Hair Restoration",
		tagline: "FOLLICULAR LONGEVITY & MICRO-FUE",
		discipline: "TRICHOLOGY & SURGERY",
		description:
			"State-of-the-art graft extraction and regenerative scalp therapies restoring natural density, healthy hairline aesthetics, and permanent follicular vitality.",
		procedures: [
			"Micro Sapphire FUE Transplant",
			"DHI Direct Hair Implantation",
			"Scalp Regenerative PRP & Growth Factors",
			"Beard & Eyebrow Density Restoration",
			"Follicular Stem Activation",
		],
		badge1: "Natural Density & Hairline",
		badge2: "PERMANENT RESULTS",
		credential: "Maximum Graft Viability Guarantee",
		image: "/images/hero-treatment-video.png",
		anatomicalFocus: ["Hair"],
	},
	{
		id: "body-contouring",
		number: "06",
		title: "Body Contouring",
		tagline: "ULTRASONIC SCULPTING & POST-MATERNITY CARE",
		discipline: "BODY ARCHITECTURE",
		description:
			"High-definition ultrasonic fat sculpting, muscle toning, and skin tightening tailored to enhance anatomical curves and rebuild athletic or post-maternity definition.",
		procedures: [
			"High-Definition VASER Liposuction",
			"Abdominoplasty & Muscle Repair",
			"Brazilian Butt Lift (BBL)",
			"Post-Maternity Mommy Makeover",
			"Arm & Thigh Reshaping",
		],
		badge1: "Defined Silhouette & Curves",
		badge2: "ANATOMICAL SCULPTING",
		credential: "Board-Certified Body Specialists",
		image: "/images/transformation-banner.png",
		anatomicalFocus: ["Body", "Breast"],
	},
];

export const TREATMENT_CATEGORIES = SERVICE_CATEGORIES;
