import { Dispatch, SetStateAction } from "react";
import { Collection } from "./collection";
import { User } from "./auth";


export type CollectionCatagory = {
  id: string
  name: string;
}

export type ModelContextType = {
  collections: Collection[];
  setCollections: Dispatch<SetStateAction<Collection[]>>;
  fetchCollections: (api: string) => void;
  deleteCollections: (collectionIds: string[],
    collectionsApi: string) => void;

  user: User | undefined;
  setUser: Dispatch<SetStateAction<User | undefined>>;
  fetchUser: (api: string) => void
}