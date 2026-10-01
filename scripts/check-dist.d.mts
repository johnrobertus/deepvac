export const BASE: string;
export const STRUCTURED_DATA_CHECKS: [string, string, number][];
export function routeFile(distDir: string, routePath: string): string;
export function checkPage(html: string, route: { path: string; lang: "en" | "de" }): { errors: string[]; warnings: string[] };
export function readSchemas(html: string): Record<string, unknown>[];
export function checkStructuredData(distDir: string, checks?: [string, string, number][]): string[];
export function checkNotFound(html: string): string[];
export function checkSitemaps(distDir: string): string[];
export function runChecks(distDir: string, routeMap: { en: string; de: string }[]): { errors: string[]; warnings: string[] };
