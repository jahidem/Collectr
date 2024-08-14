'use client';
import { CollectrLogo } from '@/components/ui/collectrLogo';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
export default function Page() {
  const router = useRouter();
  useEffect(() => {
    router.push('/home');
  }, []);
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <CollectrLogo className='text-4xl' />
    </div>
  );
}
