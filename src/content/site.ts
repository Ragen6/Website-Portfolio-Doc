/**
 * Single source of truth for the site's public content.
 * Facts below are drawn from Dra. Beatriz Silvestre Tápias's CV.
 */

import doctorPortrait from "@/assets/doctor-portrait.png";
import hospitalPhoto from "@/assets/hospital.jpg";

export const doctor = {
  name: "Dra. Beatriz Silvestre Tápias",
  shortName: "Dra. Beatriz Tápias",
  specialization: "General Practitioner",
  credentials: "MD · ACLS Certified",
  license: "CRM-SP 262561",
  tagline: "Thoughtful, evidence-based general medical care.",
  intro:
    "General Practitioner with training in urgent and emergency care, committed to clear guidance and attentive, evidence-based care.",
  portrait: doctorPortrait,
  bio: [
    "Dra. Beatriz Silvestre Tápias graduated in Medicine from Faculdade de Medicina de Jundiaí in 2024. Her medical training included primary, secondary and tertiary care through Brazil's public health system, clinical simulation, and a two-year clinical clerkship.",
    "She has worked as a General Practitioner in public and private health services, including urgent and emergency care. Her experience also includes Occupational Medicine coverage shifts, volunteer health projects, clinical research and conference presentations.",
  ],
  specialties: ["General Practice", "Urgent & Emergency Care", "Occupational Medicine"],
  languages: ["Portuguese", "English"],
};

export const stats = [
  { label: "Medical degree awarded", value: 2024, suffix: "" },
  { label: "Hours of medical training", value: 9592, suffix: "" },
  { label: "Clinical settings in 2025", value: 4, suffix: "" },
  { label: "Elective clinical rotations", value: 3, suffix: "" },
];

export const education = [
  {
    degree: "Doctor of Medicine",
    institution: "Faculdade de Medicina de Jundiaí (FMJ)",
    period: "Mar 2019 – Nov 2024 · 9,592 hours",
  },
  {
    degree: "Clinical Clerkship (Internship)",
    institution:
      "Hospital de Caridade São Vicente de Paulo, Hospital Regional de Jundiaí and Hospital Universitário de Jundiaí",
    period: "2022 – 2024 · 3,920 hours",
  },
  {
    degree: "High School Diploma",
    institution: "Colégio Albert Sabin / Colégio Mackenzie",
    period: "Completed 2018",
  },
];

export const certifications = [
  "Advanced Cardiovascular Life Support (ACLS) — American Heart Association, completed October 2024; valid internationally through October 2026.",
  "Emergency Medicine elective — Hospital de Caridade São Vicente de Paulo, 160 hours (2024).",
  "Radiology & Diagnostic Imaging elective — Hospital de Caridade São Vicente de Paulo, 80 hours (2023).",
  "Geriatrics elective — Ambulatório de Especialidades, FMJ, 80 hours (2023).",
];

export const timeline = [
  {
    year: "Apr – Jul 2025",
    role: "General Practitioner",
    place: "Hospital Leforte Morumbi",
    description: "Worked as a General Practitioner in a private hospital setting.",
  },
  {
    year: "Mar – May 2025",
    role: "General Practitioner",
    place: "UPA Itatiba (Emergency Care Unit)",
    description: "Worked in the Emergency and Urgent Care department.",
  },
  {
    year: "Jan – May 2025",
    role: "General Practitioner",
    place: "Hospital das Clínicas Campo Limpo Paulista",
    description: "Worked in the Emergency and Urgent Care department.",
  },
  {
    year: "Jan – Mar 2025",
    role: "General Practitioner",
    place: "Hospital Santa Casa de Vinhedo",
    description: "Worked in the Emergency and Urgent Care department.",
  },
];

export type ServiceIcon = "stethoscope" | "heart" | "activity" | "microscope" | "syringe" | "video";

export const services: {
  icon: ServiceIcon;
  title: string;
  description: string;
  points: string[];
}[] = [
  {
    icon: "stethoscope",
    title: "General Medical Care",
    description:
      "General-practice care informed by comprehensive medical training across public and private health services.",
    points: ["Clinical assessment", "Health guidance", "Care planning"],
  },
  {
    icon: "activity",
    title: "Urgent & Emergency Care",
    description:
      "Experience as a General Practitioner in emergency and urgent-care departments in São Paulo state.",
    points: ["Urgent clinical assessment", "Emergency department experience", "Care coordination"],
  },
  {
    icon: "heart",
    title: "Occupational Medicine Coverage",
    description: "Experience providing medical coverage shifts in Occupational Medicine settings.",
    points: ["Coverage shifts", "General medical support", "Workplace health context"],
  },
];

// Documented previous clinical workplaces, not current hospital affiliations.
export const hospitals = [
  {
    id: "campo-limpo-paulista",
    name: "Hospital das Clínicas Campo Limpo Paulista",
    department: "Emergency & Urgent Care · Jan – May 2025",
    photo: hospitalPhoto,
    description: "Worked as a General Practitioner in the Emergency and Urgent Care department.",
    address: {
      line1: "",
      line2: "",
      city: "Campo Limpo Paulista",
      state: "SP",
      postalCode: "",
      country: "Brazil",
    },
    mapQuery: "Hospital das Clínicas Campo Limpo Paulista, SP",
  },
  {
    id: "upa-itatiba",
    name: "UPA Itatiba (Emergency Care Unit)",
    department: "Emergency & Urgent Care · Mar – May 2025",
    photo: hospitalPhoto,
    description: "Worked as a General Practitioner in the Emergency and Urgent Care department.",
    address: {
      line1: "",
      line2: "",
      city: "Itatiba",
      state: "SP",
      postalCode: "",
      country: "Brazil",
    },
    mapQuery: "UPA Itatiba, SP",
  },
  {
    id: "santa-casa-vinhedo",
    name: "Hospital Santa Casa de Vinhedo",
    department: "Emergency & Urgent Care · Jan – Mar 2025",
    photo: hospitalPhoto,
    description: "Worked as a General Practitioner in the Emergency and Urgent Care department.",
    address: {
      line1: "",
      line2: "",
      city: "Vinhedo",
      state: "SP",
      postalCode: "",
      country: "Brazil",
    },
    mapQuery: "Hospital Santa Casa de Vinhedo, SP",
  },
  {
    id: "leforte-morumbi",
    name: "Hospital Leforte Morumbi",
    department: "General Practice · Apr – Jul 2025",
    photo: hospitalPhoto,
    description: "Worked as a General Practitioner in a private hospital setting.",
    address: {
      line1: "",
      line2: "",
      city: "São Paulo",
      state: "SP",
      postalCode: "",
      country: "Brazil",
    },
    mapQuery: "Hospital Leforte Morumbi, São Paulo, SP",
  },
];

// Backward-compatible primary location for map helpers. This is not a practice address.
export const hospital = hospitals[0]!;

export const workingHours: { day: string; hours: string }[] = [];

export const contact = {
  phone: "+55 (11) 99766-5494",
  whatsapp: "5511997665494",
  email: "beatriz.tapias015@gmail.com",
  bookingUrl: "",
};

export const socials = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/beatriz-silvestre-tápias-406a41301",
    icon: "linkedin",
  },
] as const;

export const testimonials: { quote: string; name: string; role?: string; rating: number }[] = [];
export const faqs: { question: string; answer: string }[] = [];

export const site = {
  title: `${doctor.name} — ${doctor.specialization}`,
  description:
    "General medical care by Dra. Beatriz Silvestre Tápias, with experience in urgent and emergency care.",
};

export const whatsappLink = `https://wa.me/${contact.whatsapp}`;

export const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hospital.mapQuery)}`;
export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(hospital.mapQuery)}`;
export const mapsEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(hospital.mapQuery)}&output=embed`;

export const fullAddress = [
  hospital.address.line1,
  hospital.address.line2,
  `${hospital.address.city}, ${hospital.address.state} ${hospital.address.postalCode}`.trim(),
  hospital.address.country,
]
  .filter(Boolean)
  .join(", ");

export const getHospitalMapsUrl = (hosp: (typeof hospitals)[number]) => ({
  search: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hosp.mapQuery)}`,
  directions: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(hosp.mapQuery)}`,
  embed: `https://maps.google.com/maps?q=${encodeURIComponent(hosp.mapQuery)}&output=embed`,
});

export const getHospitalAddress = (hosp: (typeof hospitals)[number]) =>
  [
    hosp.address.line1,
    hosp.address.line2,
    `${hosp.address.city}, ${hosp.address.state} ${hosp.address.postalCode}`.trim(),
    hosp.address.country,
  ]
    .filter(Boolean)
    .join(", ");
