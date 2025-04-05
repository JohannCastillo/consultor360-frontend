import { useMutation } from "@tanstack/react-query";
import { CreateUserDTO } from "./types";
import { createUser } from "./services";

export const useCreateUser = () =>
  useMutation({
    mutationKey: ["create-user"],
    mutationFn: async (data: CreateUserDTO) => createUser(data),
  });
