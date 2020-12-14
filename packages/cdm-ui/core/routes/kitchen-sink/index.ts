export * from "./kitchen-sink";

export const useKitchenSinkData = async () => await (await import("cdm-content")).kitchenSinkData;
export const kitchenSinkRelativePath = "packages/cdm-content/general/content/kitchen-sink.json";