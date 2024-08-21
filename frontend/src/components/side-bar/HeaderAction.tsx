'use client';
import { Input } from '@/components/ui/input';
import { LogOut, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ModeToggle } from '../ui/ModeToggle';
import { useContext } from 'react';
import { AuthContext } from '@/providers/authUserContext';
import { authContextType } from '@/types/auth';
import Link from 'next/link';
import { Button } from '../ui/button';

export function HeaderAction() {
  const { replace, push } = useRouter();
  const { setAuth, authUser, search, setSearch } = useContext(
    AuthContext
  ) as authContextType;

  return (
    <div className='flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4'>
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
  );
}
