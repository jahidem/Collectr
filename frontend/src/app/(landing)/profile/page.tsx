'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { Collection } from '@/types/model';
import { useContext } from 'react';
import { AuthContext } from '@/providers/authUserContext';
import { authContextType } from '@/types/auth';
import { User } from 'lucide-react';

import NewCollection from './_profile/NewCollection';

const cardList: Collection[] = [
  {
    title: 'Classic Sci-Fi Literature',
    id: '32',
    imageId: '6b31044c-2140-414c-9e16-64d7fe6e818e',
    description:
      ' A curated collection of timeless science fiction novels that have shaped the genre and continue to inspire.',
    catagory: {
      id: '345',
      name: 'Science Fiction',
    },
    numberOfSelectField: 0,
    numberOfIntegerField: 0,
    numberOfStringField: 0,
    numberOfBooleanField: 0,
    numberOfMultilineStringField: 0,
  },
  {
    title: 'Classic Sci-Fi Literature',
    id: '32',
    imageId: '6b31044c-2140-414c-9e16-64d7fe6e818e',
    description:
      ' A curated collection of timeless science fiction novels that have shaped the genre and continue to inspire.',
    catagory: {
      id: '345',
      name: 'Science Fiction',
    },
    numberOfSelectField: 0,
    numberOfIntegerField: 0,
    numberOfStringField: 0,
    numberOfBooleanField: 0,
    numberOfMultilineStringField: 0,
  },
];
export default function Profile() {
  const { authUser } = useContext(AuthContext) as authContextType;
  return (
    <div className='flex flex-col gap-2 m-12 '>
      <div className='flex gap-4 items-center'>
        <Avatar className='h-16 w-16'>
          <AvatarFallback className='text-xl'>
            <User />
          </AvatarFallback>
        </Avatar>
        <div>
          <h4 className='text-xl font-medium'>
            {authUser ? authUser.firstname + ' ' + authUser.lastname : ''}
          </h4>
          <p className='text-lg text-muted-foreground'>{authUser?.email}</p>
        </div>
      </div>
      <Separator className='my-4' />
      <div className='flex justify-between mx-12'>
        <h4 className='text-xl font-medium'>Collection List</h4>
        <NewCollection />
      </div>
      <div className='flex flex-wrap justify-center mt-6'>
        {cardList.map((card) => (
          <Card
            className='max-w-xs m-4 hover:cursor-pointer'
            key={card.id}>
            <CardHeader className='pb-2'>
              <CardTitle>{card.title}</CardTitle>
              <CardDescription className=''>{card.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Image
                src={`https://ucarecdn.com/${card.imageId}/`}
                alt='collection image'
                width={0}
                height={0}
                sizes='100vw'
                style={{ width: '100%', maxHeight: '160px' }}
                className='my-4 '
              />
            </CardContent>
            <CardFooter>
              <Badge variant='secondary'>{card.catagory.name}</Badge>
            </CardFooter>
          </Card>
        ))}
      </div>

     
    </div>
  );
}
