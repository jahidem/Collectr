import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { LatestItem } from '@/types/item';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import Link from 'next/link';

export const columns: ColumnDef<LatestItem>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => (
      <Link
        href={`/item/${row.original.id}`}
        className='hover:underline'>
        {row.original.id.substring(0,13)}
      </Link>
    ),
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Name
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'collection.title',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Collection
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => (
      <Link
        href={`collection/${row.original.collection.id}`}
        className='hover:underline'>
        {row.original.collection.title}
      </Link>
    ),
  },
  {
    accessorKey: 'user.email',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          User
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => (
      <Link
        href={`profile/${row.original.user.id}`}
        className='hover:underline'>
        {row.original.user.email}
      </Link>
    ),
  },
  {
    accessorKey: 'itemTags',
    header: () => <p >Tags </p>,
    cell: ({ row }) => (
      <div className='flex flex-wrap gap-4'>
        {row.original.itemTags.map((item) => (
          <Badge
            variant='outline'
            key={item.id}>
            {item.name}
          </Badge>
        ))}
      </div>
    ),
  },
];
