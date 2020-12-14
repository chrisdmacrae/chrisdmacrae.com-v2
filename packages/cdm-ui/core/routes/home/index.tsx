export * from "./home";

export const useHomeData = async () => await (await import("cdm-content")).homeData;
export const homeRelativePath = "packages/cdm-content/general/content/home.json";