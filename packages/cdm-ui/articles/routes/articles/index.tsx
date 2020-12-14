export * from "./articles";

export const useArticlesData = async () => await (await import("cdm-content")).articleArchiveData;

export const articlesRelPath  = 'packages/cdm-content/articles/content/articles.json';