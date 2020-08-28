export * from "./articles";

export const useArticlesData = async () => await import("../../content/articles.json");

export const articlesRelPath  = 'src/lib/articles/content/articles.json';