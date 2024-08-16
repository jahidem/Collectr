import { Dispatch, SetStateAction } from "react";


export interface User {
  id: string;
  email: string;
  role: string;
  firstname: string;
  lastname: string;
  setting: string;
  createdAt: string;
  enabled: boolean;
}

export type authContextType = {
  authUser?: User;
  jwt: string | null;
  getJwt: () => string | null;
  setAuthUser: Dispatch<SetStateAction<User | undefined>>;
  setAuth: (jwt: string | null) => void;
  fetchAuthUser: () => Promise<void>;

  search: string;
  setSearch: Dispatch<SetStateAction<string>>;

}

export type LoginType = {
  email: string;
  password: string;
}