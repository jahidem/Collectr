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

  return authUser ? (
    <Button variant='secondary' className='mt-4'>
      Logout
      <LogOut
        className='h-5 w-5 ml-2'
        cursor='pointer'
        onClick={() => {
          setAuth(null);
          replace('/home');
        }}
      />
    </Button>
  ) : (
    <Link href='/auth/sign-in'>
      <Button>Sign in / sign up</Button>
    </Link>
  );
}
