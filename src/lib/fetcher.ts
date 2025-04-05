"use server";
import { cookies } from "next/headers";
import config from "@/config/config";
import { ACCESS_TOKEN_COOKIE } from "@/constants/cookies";
import { parseQueryParams } from "./utils";

export async function fetcher(
  endpoint: string,
  init?: RequestInit & {
    query?: Record<string, string | string[]>;
  }
) {
  // token de acceso para peticiones autenticadas
  const token = cookies().get(ACCESS_TOKEN_COOKIE);
  const query = init?.query ? parseQueryParams(init.query) : undefined;

  return fetch(`${config.api_uri}${endpoint}${query ? `?${query}` : ""}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
      ...(token ? { Authorization: `Token ${token?.value}` } : {}),
    },
  });
}
