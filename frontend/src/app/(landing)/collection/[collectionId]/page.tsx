'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/providers/authUserContext';
import { authContextType } from '@/types/auth';
import { ImageIcon, User } from 'lucide-react';
import {
  auth,
  collections as collectionsApi,
  items as itemsApi,
} from '@/assets/constants/api';
import { DataTable } from './_collection/data-table';
import { columns } from './_collection/columns';
import { ModelContext } from '@/providers/modelProvider';
import { ModelContextType } from '@/types/model';
import { CollectrLogo } from '@/components/ui/collectrLogo';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
export default function Collection() {
  const { items, collection, fetchCollection, fetchItems } = useContext(
    ModelContext
  ) as ModelContextType;
  const { collectionId } = useParams();
  const { authUser } = useContext(AuthContext) as authContextType;

  useEffect(() => {
    if (collectionId) {
      fetchCollection(`${collectionsApi}/collection/${collectionId}`);
      fetchItems(`${itemsApi}/collection/${collectionId}`);
    }
  }, [collectionId]);

  return collectionId ? (
    <div className='flex flex-col gap-2 m-12'>
      <div className='flex gap-12 items-center'>
        <div
          style={{
            position: 'relative',
            width: `${160}px`,
            height: `${180}px`,
          }}>
          {collection?.imageId ? (
            <Image
              fill
              style={{ objectFit: 'contain', zIndex: -10 }}
              src={`https://ucarecdn.com/${collection.imageId}/`}
              alt={'collection image'}
            />
          ) : (
            <div className='flex justify-center items-center h-36 rounded-lg bg-secondary'>
              <ImageIcon />
            </div>
          )}
        </div>
        <div className='flex-1 space-y-4'>
          <div>
            <p className='font-mono text-primary'>#collection</p>
            <h4 className='text-xl font-medium'>{collection?.title}</h4>
          </div>
          <p className='text-lg text-muted-foreground'>
            {collection?.description}
          </p>
          <Badge>{collection?.catagory?.name}</Badge>
        </div>
      </div>
      <Separator className='my-4' />
      <div className='container mx-auto mb-12'>
        <DataTable
          columns={
            authUser &&
            ((collection && authUser.id == collection.user.id) ||
              authUser.role == 'ADMIN')
              ? columns
              : columns.slice(1)
          }
          data={items}
        />
      </div>
    </div>
  ) : (
    <div className='w-full h-full flex justify-center items-center'>
      <CollectrLogo className='text-4xl' />
    </div>
  );
}
