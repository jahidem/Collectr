import process from "process";

export const apiHostname = process.env.NEXT_PUBLIC_API_HOSTNAME;

export const api = `${apiHostname}`;

export const auth = `/auth`;
export const users = `/api/users`;
export const collections = `/api/collections`;
export const register = `${auth}/register`;
export const login = `${auth}/login`;
export const userAuth = `${users}/auth`

