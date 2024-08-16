'use client';
import { Suspense } from 'react';

export default function Landing({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Suspense>{children} </Suspense>;
}
