'use client';
import Header from '@/components/side-bar/header';

export default function Landing({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
