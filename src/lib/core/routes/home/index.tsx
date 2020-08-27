export * from "./home";

export const useHomeData = async () => await import("../../content/home.json");
export const homeRelativePath = "./lib/core/content/home.json";