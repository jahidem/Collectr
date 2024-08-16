import process from "process";

export const apiHostname = process.env.NEXT_PUBLIC_API_HOSTNAME;

export const api = `${apiHostname}`;

export const logged = `/api`
export const users = `${logged}/users`;
export const collections = `${logged}/collections`;
export const items = `${logged}/items`;
export const itemTemplates = `${logged}/itemTemplates`
export const collectionCatagories = `${logged}/collectionCatagories`
export const itemTags = `${logged}/itemTags`
export const likes = `${logged}/likes`
export const comments = `${logged}/comments`

export const auth = `/auth`;
export const register = `${auth}/register`;
export const login = `${auth}/login`;
export const userAuth = `${users}/auth`

