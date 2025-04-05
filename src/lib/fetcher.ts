import config from "@/config/config";

export async function fetcher(
  endpoint: string,
  init?: RequestInit & {
    query?: Record<string, string | string[]>;
  }
) {
  const query = init?.query
    ? new URLSearchParams(
        Object.entries(init.query).map(([key, value]) => [key, String(value)])
      ).toString()
    : undefined;

  return fetch(`${config.api_uri}${endpoint}${query ? `?${query}` : ""}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });
}
