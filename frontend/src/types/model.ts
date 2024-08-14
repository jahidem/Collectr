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
  deleteCollections: (collectionIds: string[],
    collectionsApi: string) => void;
  fetchCollection: (api: string) => void;

  user: User | undefined;
  setUser: Dispatch<SetStateAction<User | undefined>>;
  fetchUser: (api: string) => void

  deleteItems: (itemIds: string[],
    itemApi: string) => void;
  items: Item[];
  fetchItems: (api: string) => void
  fetchLatestItems: (api: string) => void
  latestItems: LatestItem[];

  tags: ItemTag[];
  fetchTags: (api: string) => void

}