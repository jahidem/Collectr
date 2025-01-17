'use client';
import collectrAPI from '@/api/CollectrAPI';
import { userAuth } from '@/assets/constants/api';
import { authContextType, User } from '@/types/auth';
import { useRouter } from 'next/navigation';
import { createContext, FC, ReactNode, useEffect, useState } from 'react';

export const AuthContext = createContext<authContextType | null>(null);

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [authUser, setAuthUser] = useState<User>();
  const [jwt, setJwtState] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getJwt();
  }, []);
  useEffect(() => {
    if (jwt) fetchAuthUser();
  }, [jwt]);

  const fetchAuthUser = async () => {
    const response = await collectrAPI.post(userAuth);
    if (response.status == 200) {
      const data = response.data;
      setAuthUser(data);
      console.log(data);
    }
  };
  const setAuth = (newJwt: string | null) => {
    setJwtState(newJwt);
    if (newJwt != null) localStorage.setItem('jwt', newJwt);
    else {
      localStorage.removeItem('jwt');
      setAuthUser(undefined);
    }
  };
  const getJwt = () => {
    const localJwt = localStorage.getItem('jwt');
    if (jwt == null) {
      setJwtState(localJwt);
      return localJwt;
    }
    return jwt;
  };

  return (
    <AuthContext.Provider
      value={{
        getJwt,
        jwt,
        authUser,
        setAuthUser,
        setAuth,
        fetchAuthUser,

        search,
        setSearch,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
