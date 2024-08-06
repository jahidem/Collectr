'use client';
import { authContextType, User } from '@/types/auth';
import { Status } from '@/types/state';
import { useRouter } from 'next/navigation';
import { createContext, FC, ReactNode, useEffect, useState } from 'react';

export const AuthContext = createContext<authContextType | null>(null);

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { push } = useRouter();
  const [authUser, setAuthUser] = useState<User>();
  const [jwt, setJwtState] = useState<string | null>(null);
  const [loading, setLoading] = useState<Status>(Status.IDLE);

  useEffect(() => {
    setLoading(Status.PENDING);
    if (getJwt() == null) push('/auth/sign-in');
    else push('/home');
    setLoading(Status.SUCCESS);
  }, []);

  const setAuth = (newJwt: string | null) => {
    setJwtState(newJwt);
    if (newJwt != null) localStorage.setItem('jwt', newJwt);
    else localStorage.removeItem('jwt');
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
        loading
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
