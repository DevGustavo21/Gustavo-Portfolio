export type SkillCategoryId = "prompting" | "automation" | "development" | "productivity";

export type SkillMeta = {
  id: string;
  category: SkillCategoryId;
  file: string;
  tags: string[];
};

/** Catalog of Claude skills available for download. Add new entries here. */
export const skillsCatalog: SkillMeta[] = [
  {
    id: "optimizador-prompts",
    category: "prompting",
    file: "/skills/optimizador-prompts.skill",
    tags: ["Claude", "Prompts", "IA"],
  },
];

export const skillCategoryOrder: SkillCategoryId[] = [
  "prompting",
  "automation",
  "development",
  "productivity",
];
