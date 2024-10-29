import type { UndefinedInitialDataOptions } from "@tanstack/react-query";

export type ConfigQuery<T> = Omit<
  UndefinedInitialDataOptions<T>,
  "queryKey" | "queryFn"
>;
