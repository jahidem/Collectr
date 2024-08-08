import type { Metadata } from 'next';
import './globals.css';
import "@uploadcare/react-uploader/core.css"
import AuthProvider from '@/providers/authUserContext';
import { ThemeProvider } from '@/providers/theme-provider';
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
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
