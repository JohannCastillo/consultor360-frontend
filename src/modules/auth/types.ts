import { SessionUser } from "@/server/auth/types";

export type User = SessionUser;

export type CreateUserDTO = Omit<User, "id" | "firstName" | "lastName"> & {
  password: string;
};

export type LoginUserDTO = {
  username: string;
  password: string;
};
