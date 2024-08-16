'use client';
import { useContext, useEffect } from 'react';
import { users as usersApi } from '@/assets/constants/api';
import { ModelContext } from '@/providers/modelProvider';
import { ModelContextType } from '@/types/model';
import { CollectrLogo } from '@/components/ui/collectrLogo';
import { useParams, useRouter } from 'next/navigation';
import { DataTable } from './_admin/data-table';
import { columns } from './_admin/columns';
import { AuthContext } from '@/providers/authUserContext';
import { authContextType } from '@/types/auth';
export default function Admin() {
  const { fetchUsers, users } = useContext(ModelContext) as ModelContextType;
  const { authUser, fetchAuthUser } = useContext(
    AuthContext
  ) as authContextType;
  const router = useRouter();
  useEffect(() => {
    if (authUser) {
      if (authUser.role == 'ADMIN') fetchUsers(usersApi);
      else router.replace('/home');
    }
  }, [authUser]);
  useEffect(() => {
    const checkAdmin = async () => {
      await fetchAuthUser();
      router.replace('/home');
    };
    if (authUser && users) {
      const currUsers = users.filter((item) => item.id == authUser.id);
      if (currUsers.length && currUsers[0].role != 'ADMIN') {
        checkAdmin();
      }
    }
  }, [authUser, fetchAuthUser, router, users]);

  return users ? (
    <div className='container mx-auto'>
      <DataTable
        columns={columns}
        data={users}
      />
    </div>
  ) : (
    <div className='w-full h-full flex justify-center items-center'>
      <CollectrLogo className='text-4xl' />
    </div>
  );
}
