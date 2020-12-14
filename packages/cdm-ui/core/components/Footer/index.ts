export * from './footer';

export const useFooterData = async () => await (await import("cdm-content")).footerData;

export const footerRelativePath = "packages/cdm-content/general/content/footer.json";