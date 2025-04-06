import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Parse query params from an Object
 */
export function parseQueryParams(
  queryObj: Record<string, string | string[]>
): URLSearchParams | null {
  const entries = Object.entries(queryObj);

  if (entries.length === 0) return null;

  const searchParams = new URLSearchParams();

  entries.forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => searchParams.append(key, v));
    } else {
      searchParams.append(key, String(value));
    }
  });

  return searchParams;
}