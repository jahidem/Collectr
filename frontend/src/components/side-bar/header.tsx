'use client';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { CollectrLogo } from '../ui/collectrLogo';
import { LogOut, Menu, Search } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { ModeToggle } from '../ui/ModeToggle';
import { cn } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
import { useContext } from 'react';
import { AuthContext } from '@/providers/authUserContext';
import { authContextType } from '@/types/auth';

const linkItems = [
  { name: 'Home', href: '/home' },
  { name: 'Search', href: '/search' },
  { name: 'Profile', href: '/profile' },
  { name: 'Admin', href: '/admin' },
];

export default function Header() {
  const pathname = usePathname();
  const { replace, push } = useRouter();
  const { setAuth, authUser, search, setSearch } = useContext(
    AuthContext
  ) as authContextType;
  return (
    <header className='sticky top-0 flex h-16 items-center gap-4 border-b backdrop-blur-md px-4 md:px-6 z-50'>
      <nav className='hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-10'>
        <Link
          href='/home'
          className='flex items-center gap-2 text-lg font-semibold md:text-base'>
          <CollectrLogo className='text-xl' />
          <span className='sr-only'>Acme Inc</span>
        </Link>
        {linkItems
          .filter((item) => {
            if (!authUser && (item.name == 'Profile' || item.name == 'Admin'))
              return false;
            if (authUser?.role != 'ADMIN' && item.name == 'Admin') return false;
            return true;
          })
          .map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'text-muted-foreground transition-colors hover:text-foreground',
                item.href == pathname ? 'text-foreground' : ''
              )}>
              {item.name}
            </Link>
          ))}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant='outline'
            size='icon'
            className='shrink-0 md:hidden'>
            <Menu className='h-5 w-5' />
            <span className='sr-only'>Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side='left'>
          <nav className='grid gap-6 text-lg font-medium'>
            <Link
              href='/home'
              className='flex items-center gap-2 text-lg font-semibold md:text-base'>
              <CollectrLogo className='text-xl' />
            </Link>
            {linkItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'text-muted-foreground transition-colors hover:text-foreground',
                  item.href == pathname ? 'text-foreground' : ''
                )}>
                {item.name}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className='flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4'>
        <div className='ml-auto flex-1 sm:flex-initial'>
          <div className='relative'>
            <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  push(`/search?text=${search}&page=0&size=10`);
                  setSearch('');
                }
              }}
              type='search'
              id='text'
              key='text'
              placeholder='Search items...'
              className='pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]'
            />
          </div>
        </div>
        <ModeToggle />
        {authUser ? (
          <LogOut
            className='h-5 w-5 text-muted-foreground hover:text-foreground mx-4'
            cursor='pointer'
            onClick={() => {
              setAuth(null);
              replace('/home');
            }}
          />
        ) : (
          <Link href='/auth/sign-in'>
            <Button>Sign in / sign up</Button>
          </Link>
        )}
      </div>
    </header>
  );
}
