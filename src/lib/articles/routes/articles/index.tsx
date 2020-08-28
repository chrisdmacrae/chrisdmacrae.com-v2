export * from "./articles";

export const useArticlesData = async () => await import("./articles.json");