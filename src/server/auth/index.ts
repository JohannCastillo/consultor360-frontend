import NextAuth, { DefaultSession, getServerSession } from "next-auth";
import { authOptions } from "@/server/auth/options";
import { AdapterUser } from "next-auth/adapters";
import { SessionUser } from "./types";

declare module "next-auth/adapters" {
  interface AdapterUser extends DefaultSession {
    user: SessionUser;
  }
}

declare module "next-auth" {
  interface Session {
    user: AdapterUser;
  }

  interface User extends SessionUser {
    id: number;
  }
}

export const nextAuth = NextAuth(authOptions);
export const serverSession = async () => getServerSession(authOptions);
