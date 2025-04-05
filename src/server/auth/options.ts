import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";
import type { LoginResponse } from "./types";
import { ACCESS_TOKEN_COOKIE, ACCESS_TOKEN_AGE } from "@/constants/cookies";
import config from "@/config/config";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "usuario",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "contraseña",
        },
      },

      async authorize(credentials, _) {
        const response = await fetch(`${config.api_uri}/auth/login/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
        });

        if (!response.ok) {
          return null;
        }

        const data: LoginResponse = await response.json();
        const token = atob(data.token);

        cookies().set(ACCESS_TOKEN_COOKIE, token, {
          secure: config.next_auth_url.startsWith("https://"),
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
          httpOnly: true,
          expires: new Date(Date.now() + ACCESS_TOKEN_AGE),
        });

        return {
          id: data.id,
          username: data.username,
          firstName: data.first_name,
          lastName: data.last_name,
          email: data.email,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: ACCESS_TOKEN_AGE,
  },
  jwt: {
    maxAge: ACCESS_TOKEN_AGE,
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    session: async ({ session, token }) => {
      return {
        ...session,
        user: {
          id: token.id,
          username: token.username,
          firstName: token.firstName,
          lastName: token.lastName,
          email: token.email,
        },
      };
    },
    jwt: async ({ token, user }) => {
      if (user) {
        return {
          ...token,
          ...user,
        };
      }
      return token;
    },
  },
};
