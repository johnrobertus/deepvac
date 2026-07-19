import { describe, expect, it } from "vitest";
import {
  getAlternatePath,
  getOptionSlugFromPath,
  localizedPath,
  routeMap,
} from "@/lib/routes";

const optionRoutes = routeMap.filter((route) => route.optionSlug);

describe("option detail routes", () => {
  it("defines one bilingual route for every chamber option", () => {
    expect(optionRoutes).toHaveLength(19);
    expect(new Set(optionRoutes.map((route) => route.optionSlug)).size).toBe(19);
  });

  it.each(optionRoutes)("keeps $optionSlug on the equivalent page when switching language", (route) => {
    expect(localizedPath(route.en, "de")).toBe(route.de);
    expect(getAlternatePath(route.en, "de")).toBe(route.de);
    expect(getAlternatePath(route.de, "en")).toBe(route.en);
    expect(getOptionSlugFromPath(route.en)).toBe(route.optionSlug);
    expect(getOptionSlugFromPath(route.de)).toBe(route.optionSlug);
  });
});
