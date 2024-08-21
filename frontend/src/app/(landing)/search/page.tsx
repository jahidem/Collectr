'use client';
import collectrAPI from '@/api/CollectrAPI';
import { items as itemsApi } from '@/assets/constants/api';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Suspense } from 'react';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

import { Item } from '@/types/item';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FiMessageSquare, FiThumbsUp } from 'react-icons/fi';

export default function Search() {
  const [paging, setPaging] = useState<any>();
  const params = useSearchParams();
  const [items, setItems] = useState<Item[]>([]);
  const text = params.get('text') ?? '';
  const size = params.get('size') ?? '10';
  const page = params.get('page') ?? '0';
  useEffect(() => {
    const fetchItems = async () => {
      const res = await collectrAPI.get(
        `${itemsApi}/search?` +
          `search=${text}&` +
          `page=${page}&` +
          `size=${size}`
      );
      setItems(res.data.content);
      setPaging({
        totalPages: res.data.totalPages,
        first: res.data.first,
        last: res.data.last,
        pageNumber: res.data.number + 1,
        pageSize: size,
      });
    };

    fetchItems();
  }, [page, size, text]);

  useEffect(() => {
    const fetchItems = async () => {
      const res = await collectrAPI.get(itemsApi);
      console.log(res.data);
    };

    fetchItems();
  }, []);

  return items.length ? (
    <div className='container mx-auto m-12'>
      <div className='flex-1 space-y-6'>
        {items.map((item) => (
          <Card
            key={item.id}
            className='w-full '>
            <CardHeader>
              <div className='flex justify-between'>
                <CardTitle>
                  <Link
                    className='hover:underline'
                    href={`/item/${item.id}`}>
                    {' '}
                    {item.name}
                  </Link>
                </CardTitle>
                <div>
                  <Link
                    href={`/profile/${item.user?.id}`}
                    className='underline text-primary'>
                    Owner
                  </Link>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className='flex flex-wrap gap-4'>
                {item.itemTags.map((tag) => (
                  <Badge key={tag.id}>{tag.name}</Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className='gap-x-6'>
              <div className='flex items-center gap-x-2'>
                <p>{item.likes?.length}</p>
                <FiThumbsUp className='text-destructive' />
              </div>
              <div className='flex items-center gap-x-2'>
                <p>{item.comments?.length}</p>
                <FiMessageSquare className='text-destructive' />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      {paging && (
        <Pagination className='mt-12 pb-12'>
          <PaginationContent>
            {!paging.first && (
              <PaginationItem>
                <PaginationPrevious
                  href={`/search?text=${text}&page=${
                    paging.pageNumber - 2
                  }&size=${paging.pageSize}`}
                />
              </PaginationItem>
            )}

            {!paging.first && paging.pageNumber > 2 && (
              <PaginationItem>
                <PaginationLink
                  href={`/search?text=${text}&page=${0}&size=${
                    paging.pageSize
                  }`}>
                  1
                </PaginationLink>
              </PaginationItem>
            )}
            {!paging.first && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {!paging.first && (
              <PaginationItem>
                <PaginationLink
                  href={`/search?text=${text}&page=${
                    paging.pageNumber - 2
                  }&size=${paging.pageSize}`}>
                  {paging.pageNumber - 1}
                </PaginationLink>
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink
                href={`/search?text=${text}&page=${
                  paging.pageNumber - 1
                }&size=${paging.pageSize}`}
                isActive>
                {paging.pageNumber}
              </PaginationLink>
            </PaginationItem>
            {!paging.last && (
              <PaginationItem>
                <PaginationLink
                  href={`/search?text=${text}&page=${paging.pageNumber}&size=${paging.pageSize}`}>
                  {paging.pageNumber + 1}
                </PaginationLink>
              </PaginationItem>
            )}
            {!paging.last && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {!paging.last && paging.pageNumber+1 < paging.totalPages && (
              <PaginationItem>
                <PaginationLink
                  href={`/search?text=${text}&page=${paging.totalPages-1}&size=${paging.pageSize}`}>
                  {paging.totalPages}
                </PaginationLink>
              </PaginationItem>
            )}
            {!paging.last && (
              <PaginationItem>
                <PaginationNext
                  href={`/search?text=${text}&page=${paging.pageNumber}&size=${paging.pageSize}`}
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  ) : (
    <div className='flex h-3/4 w-full justify-center items-center text-lg text-muted-foreground'>
      No items.
    </div>
  );
}
