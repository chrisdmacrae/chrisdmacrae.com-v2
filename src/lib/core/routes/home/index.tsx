export * from "./home";

export const useHomeData = async () => await import("../../content/home.json");
export const homeRelativePath = "src/lib/core/content/home.json";