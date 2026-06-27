import type { SceneCategory } from "@/data/scenes";

export interface CategoryPageContent {
  slug: string;
  category: SceneCategory;
  title: string;
  dek: string;
  intro: string;
}

export const categoryPages: CategoryPageContent[] = [
  {
    slug: "media",
    category: "Media",
    title: "Cantonese in American media",
    dek: "Scenes from film, television, and public video where Cantonese is already part of the American frame.",
    intro:
      "This is where the archive keeps the on-screen moments that changed how American culture sounded. Some are loud and famous. Some are tiny and easy to miss. The point is that Cantonese is already there.",
  },
  {
    slug: "business",
    category: "Business",
    title: "Cantonese in American business life",
    dek: "Workplaces, storefronts, service economies, and public-facing commerce where Cantonese shapes the American everyday.",
    intro:
      "Business scenes are often the quickest way a language becomes invisible to history. This category keeps track of the moments where Cantonese helps run the room, the shop, the restaurant, or the deal.",
  },
  {
    slug: "politics",
    category: "Politics",
    title: "Cantonese in American political life",
    dek: "Campaigns, city halls, public meetings, and civic scenes where Cantonese is part of how power, persuasion, and representation move.",
    intro:
      "Politics is where belonging gets spoken out loud. These archive pages will follow the moments when Cantonese enters the public square not as a side note, but as part of the American political conversation.",
  },
  {
    slug: "everyday",
    category: "Everyday",
    title: "Cantonese in everyday American life",
    dek: "Buses, sidewalks, kitchens, banquets, stores, and all the scenes that rarely get treated as culture until they are gone.",
    intro:
      "Everyday life is the archive most likely to disappear first. This category is for scenes that matter precisely because nobody on screen pauses to explain why they matter.",
  },
  {
    slug: "history",
    category: "History",
    title: "Cantonese American history scenes",
    dek: "Historic footage, public memory, and cultural records that show how long Cantonese has already been part of American life.",
    intro:
      "History scenes help the archive make its broader argument: this language was never arriving from nowhere. It has already lived here, argued here, sung here, and organized here.",
  },
];

export function getCategoryPageContent(slug: string) {
  return categoryPages.find((page) => page.slug === slug);
}
