import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Collection } from '@/types/collection';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, ImageIcon } from 'lucide-react';
import Image from 'next/image';

export const columns: ColumnDef<Collection>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: 'imageUrl',
    header: 'Cover Image',
    cell: ({ row }) =>
      row.original.imageId ? (
        <Image
          height={36}
          width={36}
          src={`https://ucarecdn.com/${row.original.imageId}/`}
          alt={'collection image'}
        />
      ) : (
        <ImageIcon className='h-10 w-10' />
      ),
  },
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          ID
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Title
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'description',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Description
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
];
