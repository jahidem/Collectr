'use client';
import { Separator } from '@/components/ui/separator';
import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '@/providers/authUserContext';
import { authContextType } from '@/types/auth';
import {
  collections as collectionsApi,
  comments,
  items as itemsApi,
  likes,
} from '@/assets/constants/api';
import { BiLike, BiSolidLike } from 'react-icons/bi';

import { ModelContext } from '@/providers/modelProvider';
import { ModelContextType } from '@/types/model';
import { useParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import collectrAPI from '@/api/CollectrAPI';
import Link from 'next/link';
import { Status } from '@/types/state';
import { stat } from 'fs';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ScrollArea } from '@/components/ui/scroll-area';
import LoadingCollectr from '@/components/spinner/LoadingCollectr';
export default function Collection() {
  const [comment, setComment] = useState<string>('');
  const [status, setStatus] = useState<Status>(Status.IDLE);
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

  useEffect(() => {
    let fetchItemInterval = undefined;
    if (itemId) {
      fetchItemInterval = setInterval(() => {
        fetchItem(`${itemsApi}/item/${itemId}`);
      }, 5000);
    }
    return () => clearInterval(fetchItemInterval);
  }, [itemId]);

  return item ? (
    <div className='flex flex-col gap-2 mt-12'>
      <div className='flex justify-between px-12'>
        <div className='flex gap-12 items-center'>
          <div className='flex flex-col space-y-6'>
            <div className='flex gap-x-12 items-center'>
              <div>
                <p className='font-mono text-primary'>#item</p>
                <h4 className='text-xl font-medium'>{item?.name}</h4>
                <Link
                  className='underline text-muted-foreground text-sm'
                  href={`/profile/${item?.user?.id}`}>
                  Owner
                </Link>
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
                  <p>
                    {item.likes.length +
                      ' like' +
                      (item.likes.length > 1 ? 's' : '')}
                  </p>
                </div>
              )}
              {!authUser && (
                <div>
                  <BiLike className='h-10 w-10 cursor-pointer' />
                  <p>
                    {item.likes.length +
                      ' like' +
                      (item.likes.length > 1 ? 's' : '')}
                  </p>
                </div>
              )}
            </div>
            <div className='flex flex-wrap gap-2 max-w-96'>
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
        <ScrollArea className='h-96 p-4 border-2 rounded-md mt-6 border-secondary'>
          {item.comments.map((ele) => (
            <div
              key={ele.id}
              className='max-w-fit mb-6 bg-secondary p-4 rounded-3xl text-sm'>
              <Link
                href={`/profile/${ele.user.id}`}
                className='hover:underline font-semibold '>
                {ele.user.email}
              </Link>
              <p>{ele.value}</p>
            </div>
          ))}
        </ScrollArea>
        {authUser && (
          <div className='flex flex-col gap-2 mt-6 items-start'>
            <Textarea
              placeholder='Type your comment here.'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              className='mt-2'
              disabled={status == Status.PENDING}
              onClick={async () => {
                setStatus(Status.PENDING);
                await collectrAPI.post(
                  `${comments}`,
                  JSON.stringify({
                    userId: authUser.id,
                    itemId: item.id,
                    comment: comment,
                  })
                );
                fetchItem(`${itemsApi}/item/${itemId}`);
                setComment('');
                setStatus(Status.IDLE);
              }}>
              {status == Status.PENDING ? (
                <LoadingSpinner className='text-sm' />
              ) : (
                'Comment'
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  ) : (
    <LoadingCollectr />
  );
}
