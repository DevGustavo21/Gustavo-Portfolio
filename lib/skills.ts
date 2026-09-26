export type SkillCategoryId = "prompting" | "automation" | "development" | "productivity";

export type SkillId =
  | "optimizador-prompts"
  | "web-architect-ai"
  | "premium-web-animations"
  | "sales-message-writer"
  | "superpowers";

export type SkillMeta = {
  id: SkillId;
  category: SkillCategoryId;
  file: string;
};

/** Catalog of Claude skills available for download. Add new entries here. */
export const skillsCatalog: SkillMeta[] = [
  {
    id: "optimizador-prompts",
    category: "prompting",
    file: "/skills/optimizador-prompts.skill",
  },
  {
    id: "web-architect-ai",
    category: "development",
    file: "/skills/web-architect-ai.skill",
  },
  {
    id: "premium-web-animations",
    category: "development",
    file: "/skills/premium-web-animations.skill",
  },
  {
    id: "sales-message-writer",
    category: "productivity",
    file: "/skills/sales-message-writer.skill",
  },
  {
    id: "superpowers",
    category: "productivity",
    file: "/skills/superpowers.skill",
  },
];

export const skillCategoryOrder: SkillCategoryId[] = [
  "prompting",
  "automation",
  "development",
  "productivity",
];
