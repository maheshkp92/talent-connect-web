export const BASE_URL = "http://localhost:3000";

export const DEFAULT_PROFILE_IMG_URL =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0Fm3oX8oBQo1wCwB7CfQ1ORGytQy3S08to_mYv2MIlw&s=10";

export const UserType = {
  MENTOR: "mentor",
  MENTEE: "mentee",
  ADMIN: "admin",
} as const;

export const INDUSTRY_SUGGESTIONS = [
  "Fintech",
  "Healthtech",
  "Edtech",
  "SaaS",
  "Artificial Intelligence",
  "E-commerce",
  "Web3 & Crypto",
  "Cybersecurity",
  "Clean Energy",
];

// Predefined choices for form dropdowns
export const SKILL_SUGGESTIONS = [
  "NestJS",
  "React",
  "TypeScript",
  "Next.js",
  "Docker",
  "PostgreSQL",
];
export const LEVEL_OPTIONS = ["beginner", "intermediate", "advanced"];
