export * from "./kitchen-sink";

export const useKitchenSinkData = async () => await import("../../content/kitchen-sink.json");
export const kitchenSinkRelativePath = "src/lib/core/content/kitchen-sink.json";