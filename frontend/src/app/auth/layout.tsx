'use client';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/providers/authUserContext';
import { authContextType } from '@/types/auth';

export default function Auth({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { replace } = useRouter();
  const { jwt } = useContext(AuthContext) as authContextType;
  useEffect(() => {
    if (jwt != null) replace('/');
  }, [jwt]);
  return <>{children}</>;
}
