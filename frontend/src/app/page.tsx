'use client';
import CollectrLoading from '@/components/generic/CollectrLoading';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
export default function Page() {
  const router = useRouter();
  useEffect(() => {
    router.push('/home');
  }, []);
  return (
    <CollectrLoading/>
  );
}
