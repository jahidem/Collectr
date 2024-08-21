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

  const [item, setItem] = useState<Item>();
  const [items, setItems] = useState<Item[]>([]);
  const [latestItems, setLatestItems] = useState<LatestItem[]>([]);

  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User>();
  const [tags, setTags] = useState<ItemTag[]>([]);

  const fetchUsers = async (userApi: string) => {
    const response = await collectrAPI.get(userApi);
    if (response.status == 200) setUsers(response.data);
    console.log(response.data);
  };
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

  const fetchItem = async (api: string) => {
    const response = await collectrAPI.get(api);
    if (response.status == 200) setItem(response.data);
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

  const likeItem = async (api: string, userId: string, itemId: string) => {
    await collectrAPI.post(
      api,
      JSON.stringify({ userId: userId, itemId: itemId })
    );
  };

  const unlikeItem = async (api: string) => {
    await collectrAPI.delete(api);
  };

  const fetchTags = async (api: string) => {
    const response = await collectrAPI.get(api);
    if (response.status == 200) setTags(response.data);
  };
  const deleteCollections = async (
    collectionIds: string[],
    collectionsApi: string
  ) => {
    collectionIds.forEach(async (id) => {
      await collectrAPI.delete(`${collectionsApi}/collection/${id}`);
    });
    collectionIds.forEach((id) =>
      setCollections((state) =>
        state.filter((collection) => collection.id != id)
      )
    );
  };

  const deleteItems = async (itemIds: string[], itemsApi: string) => {
    itemIds.forEach(async (id) => {
      await collectrAPI.delete(`${itemsApi}/item/${id}`);
    });
    itemIds.forEach((id) =>
      setItems((state) => state.filter((item) => item.id != id))
    );
  };

  const deleteUsers = async (userIds: string[], usersApi: string) => {
    await collectrAPI.post(`${usersApi}/user/delete`, JSON.stringify(userIds));
    userIds.forEach((id) =>
      setUsers((state) => state.filter((item) => item.id != id))
    );
  };

  const setAdmin = async (userIds: string[], usersApi: string) => {
    await collectrAPI.post(`${usersApi}/role/admin`, JSON.stringify(userIds));

    userIds.forEach((id) =>
      setUsers((state) =>
        state.map((item) => {
          if (item.id == id) item.role = 'ADMIN';
          return item;
        })
      )
    );
  };

  const revokeAdmin = async (userIds: string[], usersApi: string) => {
    await collectrAPI.post(`${usersApi}/role/user`, JSON.stringify(userIds));

    userIds.forEach((id) =>
      setUsers((state) =>
        state.map((item) => {
          if (item.id == id) item.role = 'USER';
          return item;
        })
      )
    );
  };

  const blockUsers = async (userIds: string[], usersApi: string) => {
    await collectrAPI.post(`${usersApi}/user/block`, JSON.stringify(userIds));

    userIds.forEach((id) =>
      setUsers((state) =>
        state.map((item) => {
          if (item.id == id) item.enabled = false;
          return item;
        })
      )
    );
  };

  const unblockUsers = async (userIds: string[], usersApi: string) => {
    await collectrAPI.post(`${usersApi}/user/unblock`, JSON.stringify(userIds));

    userIds.forEach((id) =>
      setUsers((state) =>
        state.map((item) => {
          if (item.id == id) item.enabled = true;
          return item;
        })
      )
    );
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
        users,
        fetchUsers,
        deleteUsers,
        revokeAdmin,
        setAdmin,
        blockUsers,
        unblockUsers,

        fetchCollection,
        collection,
        setCollection,
        deleteCollections,
        collections,
        setCollections,
        fetchCollections,

        fetchItem,
        item,
        deleteItems,
        items,
        fetchItems,
        fetchLatestItems,
        latestItems,
        likeItem,
        unlikeItem,

        tags,
        fetchTags,
      }}>
      {children}
    </ModelContext.Provider>
  );
};

export default ModelProvider;
