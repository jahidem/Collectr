import type { Metadata } from 'next';
import './globals.css';
import AuthProvider from '@/auth/authUserContext';

export const metadata: Metadata = {
  title: 'Collectr',
  description: 'Your collection, your wealth.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='h-screen'>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
