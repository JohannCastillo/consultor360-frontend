import config from "@/config/config";

export async function fetcher(endpoint: string, init?: RequestInit) {
  return fetch(`${config.api_uri}${endpoint}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });
}
