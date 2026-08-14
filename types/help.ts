export type HelpCategoryId = "products" | "users" | "recipes" | "messages";

export interface HelpCategory {
  id: HelpCategoryId;
  title: string;
  description: string;
  articles: string[];
}

export interface HelpFaqItem {
  id: string;
  categoryId: HelpCategoryId;
  question: string;
  answer: string;
}

export interface HelpData {
  categories: HelpCategory[];
  faqs: HelpFaqItem[];
}
