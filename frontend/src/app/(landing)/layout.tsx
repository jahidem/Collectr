'use client';
import Header from '@/components/side-bar/header';
import ModelProvider from '@/providers/modelProvider';

export default function Landing({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <ModelProvider>{children}</ModelProvider>
    </>
  );
}
