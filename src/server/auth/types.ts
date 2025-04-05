export type SessionUser = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
};

export interface LoginResponse {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  token: string;
}
