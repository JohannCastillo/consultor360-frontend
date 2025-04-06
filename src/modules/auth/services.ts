"use server";

import { fetcher } from "@/lib/fetcher";
import { CreateUserDTO, User } from "./types";
import { ApiResponse } from "@/types/api-response";
import { cookies } from "next/headers";
import config from "@/config/config";
import { ACCESS_TOKEN_COOKIE } from "@/constants/cookies";

export async function createUser(
  data: CreateUserDTO
): Promise<ApiResponse<User>> {
  try {
    const response = await fetcher("/auth/register/", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const _data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        error: _data,
      };
    }

    return {
      success: true,
      data: _data,
    };
  } catch (error) {
    return {
      success: false,
      error: "Ocurrió un error inesperado al crear el usuario",
    };
  }
}

export async function serverSignOut(): Promise<ApiResponse<null>> {
  // remove acces token cookie
  cookies().set(ACCESS_TOKEN_COOKIE, "", {
    secure: config.next_auth_url.startsWith("https://"),
    path: "/",
    httpOnly: true,
    expires: new Date(),
  });

  return { success: true, data: null };
}
