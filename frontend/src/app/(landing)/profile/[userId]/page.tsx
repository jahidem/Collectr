'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/providers/authUserContext';
import { authContextType } from '@/types/auth';
import { User } from 'lucide-react';
import { collections as collectionsApi, users } from '@/assets/constants/api';
import { DataTable } from './_profile/data-table';
import { columns } from './_profile/columns';
import { ModelContext } from '@/providers/modelProvider';
import { ModelContextType } from '@/types/model';
import { CollectrLogo } from '@/components/ui/collectrLogo';
import { useParams } from 'next/navigation';

export default function Profile() {
  const { user, fetchUser, collections, fetchCollections } = useContext(
    ModelContext
  ) as ModelContextType;
  const { userId } = useParams();
  const { authUser } = useContext(AuthContext) as authContextType;

  useEffect(() => {
    fetchUser(`${users}/user/${userId}`);
    fetchCollections(`${collectionsApi}/user/${userId}`);
  }, [userId]);

  return (
    userId &&
    user && (
      <div className='flex flex-col gap-2 m-12'>
        <div className='flex gap-4 items-center'>
          <Avatar className='h-16 w-16'>
            <AvatarFallback className='text-xl'>
              <User />
            </AvatarFallback>
          </Avatar>
          <div>
            <h4 className='text-xl font-medium'>
              {user.firstname + ' ' + user.lastname}
            </h4>
            <p className='text-lg text-muted-foreground'>{user.email}</p>
          </div>
        </div>
        <Separator className='my-4' />
        <div className='container mx-auto'>
          <DataTable
            columns={
              authUser && (authUser.id == userId || authUser.role == 'ADMIN')
                ? columns
                : columns.slice(1)
            }
            data={collections}
          />
        </div>
      </div>
    )
  );
}
