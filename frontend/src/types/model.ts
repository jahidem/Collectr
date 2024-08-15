import { Dispatch, SetStateAction } from "react";
import { Collection } from "./collection";
import { User } from "./auth";
import { Item, ItemTag, LatestItem } from "./item";


export type CollectionCatagory = {
  id: string
  name: string;
}

export type ModelContextType = {
  collection: Collection | undefined;
  collections: Collection[];
  setCollection: Dispatch<SetStateAction<Collection | undefined>>;
  setCollections: Dispatch<SetStateAction<Collection[]>>;
  fetchCollections: (api: string) => void;
  deleteCollections: (collectionIds: string[], collectionsApi: string) => void;
  fetchCollection: (api: string) => void;

  user: User | undefined;
  users: User[],
  setUser: Dispatch<SetStateAction<User | undefined>>;
  fetchUser: (api: string) => void;
  fetchUsers: (api: string) => void;
  deleteUsers: (ids: string[], api: string) => void;
  revokeAdmin: (ids: string[], api: string) => void;
  setAdmin: (ids: string[], api: string) => void;
  blockUsers: (ids: string[], api: string) => void;
  unblockUsers: (ids: string[], api: string) => void;
  
  item: Item | undefined;
  fetchItem: (api: string) => void,
  deleteItems: (itemIds: string[], itemApi: string) => void;
  items: Item[];
  fetchItems: (api: string) => void
  fetchLatestItems: (api: string) => void
  latestItems: LatestItem[];
  likeItem: (api: string, userId: string, itemId: string) => Promise<void>;
  unlikeItem: (api: string) => Promise<void>;

  tags: ItemTag[];
  fetchTags: (api: string) => void

}