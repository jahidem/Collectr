'use client';
import { CollectrLogo } from '@/components/ui/collectrLogo';
import { AuthContext } from '@/providers/authUserContext';
import { authContextType } from '@/types/auth';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';

export default function Profile() {
  const { authUser } = useContext(AuthContext) as authContextType;
  const router = useRouter();
  useEffect(() => {
    if(authUser)
      router.replace(`/profile/${authUser?.id}`);
  }, [authUser, router]);
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <CollectrLogo className='text-4xl' />
    </div>
  );
}
