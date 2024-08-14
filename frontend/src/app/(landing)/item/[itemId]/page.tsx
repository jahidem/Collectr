'use client';
import { Separator } from '@/components/ui/separator';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/providers/authUserContext';
import { authContextType } from '@/types/auth';
import {
  collections as collectionsApi,
  items as itemsApi,
  likes,
} from '@/assets/constants/api';
import { BiLike, BiSolidLike } from 'react-icons/bi';

import { ModelContext } from '@/providers/modelProvider';
import { ModelContextType } from '@/types/model';
import { CollectrLogo } from '@/components/ui/collectrLogo';
import { useParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
export default function Collection() {
  const { fetchItem, item, likeItem, unlikeItem } = useContext(
    ModelContext
  ) as ModelContextType;
  const { itemId } = useParams();
  const { authUser } = useContext(AuthContext) as authContextType;

  useEffect(() => {
    if (itemId) {
      fetchItem(`${itemsApi}/item/${itemId}`);
    }
  }, [itemId]);

  return item ? (
    <div className='flex flex-col gap-2 m-12'>
      <div className='flex justify-between'>
        <div className='flex gap-12 items-center'>
          <div className='flex-1 space-y-6'>
            <div className='flex gap-x-12 items-center'>
              <div>
                <p className='font-mono text-primary'>#item</p>
                <h4 className='text-xl font-medium'>{item?.name}</h4>
              </div>
              {authUser && (
                <div>
                  {item.likes.filter((ele) => ele.user.id == authUser?.id)
                    .length ? (
                    <BiSolidLike
                      className='h-10 w-10 cursor-pointer text-destructive'
                      onClick={async () => {
                        if (authUser && item) {
                          await unlikeItem(
                            `${likes}/like/${
                              item.likes.filter(
                                (ele) => ele.user.id == authUser.id
                              )[0].id
                            }`
                          );
                          fetchItem(`${itemsApi}/item/${itemId}`);
                        }
                      }}
                    />
                  ) : (
                    <BiLike
                      className='h-10 w-10 cursor-pointer'
                      onClick={async () => {
                        if (authUser && item) {
                          await likeItem(likes, authUser.id, item.id);
                          fetchItem(`${itemsApi}/item/${itemId}`);
                        }
                      }}
                    />
                  )}
                  <p>{item.likes.length + ' likes'}</p>
                </div>
              )}
            </div>
            <div className='flex flex-wrap gap-2 w-96'>
              {item?.itemTags.map((tag) => (
                <Badge key={tag.id}>{tag.name}</Badge>
              ))}
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-2 w-96'>
          {item?.itemFields.map((field) => (
            <div
              className='flex gap-2'
              key={field.id}>
              <p className='text-lg font-semibold'>{field.fieldName}: </p>
              <p className='text-lg'>{field.fieldValue}</p>
            </div>
          ))}
        </div>
      </div>
      <Separator className='my-4' />
      <div className='container mx-auto mb-12'>
        <h4 className='text-xl font-medium'>Comments</h4>
      </div>
    </div>
  ) : (
    <div className='w-full h-full flex justify-center items-center'>
      <CollectrLogo className='text-4xl' />
    </div>
  );
}
