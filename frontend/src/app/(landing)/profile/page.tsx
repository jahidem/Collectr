'use client';
import LoadingCollectr from '@/components/spinner/LoadingCollectr';
import { AuthContext } from '@/providers/authUserContext';
import { authContextType } from '@/types/auth';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';

export default function Profile() {
  const { authUser } = useContext(AuthContext) as authContextType;
  const router = useRouter();
  useEffect(() => {
    if (authUser) router.replace(`/profile/${authUser?.id}`);
  }, [authUser, router]);
  return <LoadingCollectr />;
}
