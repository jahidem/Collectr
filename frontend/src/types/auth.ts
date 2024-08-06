import { Dispatch, SetStateAction } from "react";
import { Status } from "./state";


export interface User {
  id: string;
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
  loading: Status;
  getJwt: () => string | null;
  setAuthUser: Dispatch<SetStateAction<User | undefined>>;
  setAuth: (jwt: string | null) => void;
}

export type LoginType = {
  email: string;
  password: string;
}