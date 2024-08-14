'use client';
import { useContext, useEffect, useState } from 'react';
import { DataTable } from './_home/data-table';
import { ModelContext } from '@/providers/modelProvider';
import { ModelContextType } from '@/types/model';
import { collections, items } from '@/assets/constants/api';
import { columns } from './_home/columns';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Collection } from '@/types/collection';
import collectrAPI from '@/api/CollectrAPI';
import Image from 'next/image';
import { ImageIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [top5, setTop5] = useState<Collection[]>([]);
  const { fetchLatestItems, latestItems, tags } = useContext(
    ModelContext
  ) as ModelContextType;
  const router = useRouter();
  useEffect(() => {
    const getTop5 = async () => {
      const res = await collectrAPI.get(`${collections}/top`);
      setTop5(res.data);
      console.log(res.data);
    };
    fetchLatestItems(`${items}`);
    getTop5();
  }, []);
  return (
    <div className='flex flex-col gap-2 m-12'>
      <div className='container mx-auto mb-12'>
        <DataTable
          data={latestItems}
          columns={columns}
        />
        <div className='mt-16'>
          <h4 className='text-lg font-medium mb-6'>Largest Collections</h4>
          <div className='flex flex-wrap gap-6 justify-center'>
            {top5.map((collection, index) => (
              <Card
                onClick={() => router.push(`collection/${collection.id}`)}
                key={collection.id}
                className='overflow-hidden w-[240px] cursor-pointer hover:shadow-md'
                x-chunk='dashboard-07-chunk-4'>
                <CardHeader>
                  <CardTitle className='text-primary font-mono'>
                    {`#${index + 1}`}
                  </CardTitle>
                  <CardTitle>{collection.title}</CardTitle>
                  <CardDescription className='h-11'>
                    {collection.description.substring(
                      0,
                      Math.min(80, collection.description.length)
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {collection.imageId ? (
                    <div className='relative h-52 w-52'>
                      <Image
                        style={{ objectFit: 'contain' }}
                        fill
                        src={`https://ucarecdn.com/${collection.imageId}/`}
                        alt='collection'
                      />
                    </div>
                  ) : (
                    <div className='flex justify-center items-center h-52 bg-secondary'>
                      <ImageIcon />
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Badge>{collection.catagory.name}</Badge>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        <div className='mt-16'>
          <h4 className='text-lg font-medium mb-6'>Tag Cloud</h4>
          <div className='flex flex-wrap gap-4'>
            {tags.map((item) => (
              <Badge
                variant='secondary'
                className='text-md font-normal hover:bg-primary hover:text-primary-foreground cursor-pointer'
                key={item.id}>
                {item.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
