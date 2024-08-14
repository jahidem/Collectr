'use client';
import collectrAPI from '@/api/CollectrAPI';
import { itemTags } from '@/assets/constants/api';
import { User } from '@/types/auth';
import { Collection } from '@/types/collection';
import { Item, ItemTag, LatestItem } from '@/types/item';
import { ModelContextType } from '@/types/model';
import { createContext, FC, ReactNode, useEffect, useState } from 'react';
export const ModelContext = createContext<ModelContextType | null>(null);

const ModelProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [collection, setCollection] = useState<Collection>();

  const [items, setItems] = useState<Item[]>([]);
  const [latestItems, setLatestItems] = useState<LatestItem[]>([]);
  const [user, setUser] = useState<User>();
  const [tags, setTags] = useState<ItemTag[]>([]);

  const fetchUser = async (userApi: string) => {
    const response = await collectrAPI.get(userApi);
    if (response.status == 200) setUser(response.data);
  };
  const fetchCollections = async (collectionsApi: string) => {
    const response = await collectrAPI.get(collectionsApi);
    if (response.status == 200) setCollections(response.data);
    console.log(response.data);
  };
  const fetchCollection = async (api: string) => {
    const response = await collectrAPI.get(api);
    if (response.status == 200) setCollection(response.data);
    console.log(response.data);
  };

  const fetchItems = async (api: string) => {
    const response = await collectrAPI.get(api);
    if (response.status == 200) setItems(response.data);
    console.log(response.data);
  };

  const fetchLatestItems = async (api: string) => {
    const response = await collectrAPI.get(api);
    if (response.status == 200) setLatestItems(response.data);
    console.log(response.data);
  };

  const fetchTags = async (api: string) => {
    const response = await collectrAPI.get(api);
    if (response.status == 200) setTags(response.data);
  };
  const deleteCollections = async (
    collectionIds: string[],
    collectionsApi: string
  ) => {
    collectionIds.forEach((id) =>
      setCollections((state) =>
        state.filter((collection) => collection.id != id)
      )
    );

    collectionIds.forEach(async (id) => {
      await collectrAPI.delete(`${collectionsApi}/collection/${id}`);
    });
  };

  const deleteItems = async (itemIds: string[], itemsApi: string) => {
    itemIds.forEach((id) =>
      setItems((state) => state.filter((item) => item.id != id))
    );

    itemIds.forEach(async (id) => {
      await collectrAPI.delete(`${itemsApi}/item/${id}`);
    });
  };

  useEffect(() => {
    fetchTags(itemTags);
  }, []);
  return (
    <ModelContext.Provider
      value={{
        user,
        setUser,
        fetchUser,

        fetchCollection,
        collection,
        setCollection,
        deleteCollections,
        collections,
        setCollections,
        fetchCollections,

        deleteItems,
        items,
        fetchItems,
        fetchLatestItems,
        latestItems,

        tags,
        fetchTags,
      }}>
      {children}
    </ModelContext.Provider>
  );
};

export default ModelProvider;
