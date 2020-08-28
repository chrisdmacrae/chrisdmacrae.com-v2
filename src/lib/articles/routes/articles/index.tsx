export * from "./articles";

export const useArticlesData = async () => await import("../../content/articles.json");
