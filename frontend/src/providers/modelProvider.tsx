'use client';
import collectrAPI from '@/api/CollectrAPI';
import { User } from '@/types/auth';
import { Collection } from '@/types/collection';
import { ModelContextType } from '@/types/model';
import { createContext, FC, ReactNode, useState } from 'react';
export const ModelContext = createContext<ModelContextType | null>(null);

const ModelProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [user, setUser] = useState<User>();

  const fetchUser = async (userApi: string) => {
    const response = await collectrAPI.get(userApi);
    if (response.status == 200) setUser(response.data);
  };
  const fetchCollections = async (collectionsApi: string) => {
    const response = await collectrAPI.get(collectionsApi);
    if (response.status == 200) setCollections(response.data);
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

  return (
    <ModelContext.Provider
      value={{
        user,
        setUser,
        fetchUser,

        deleteCollections,
        collections,
        setCollections,
        fetchCollections,
      }}>
      {children}
    </ModelContext.Provider>
  );
};

export default ModelProvider;
