'use client';
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
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import LoadingCollectr from '@/components/spinner/LoadingCollectr';
import { Separator } from '@/components/ui/separator';
import MDEditor from '@uiw/react-md-editor';
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
    <div className='flex flex-col gap-2 mt-12'>
      <div className='flex gap-12 items-start px-12'>
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
            <Link
              className='underline text-muted-foreground text-sm'
              href={`/profile/${collection?.user.id}`}>
              Owner
            </Link>
          </div>

          <Badge>{collection?.catagory?.name}</Badge>
        </div>
      </div>
      <MDEditor.Markdown
        className='ml-6 md:ml-12'
        source={collection?.description}
      />

      <Separator className='mb-4' />
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
    <LoadingCollectr />
  );
}
