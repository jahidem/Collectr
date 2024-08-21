'use client';

import {
  SortingState,
  getSortedRowModel,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Collection } from '@/types/collection';
import NewCollection from './NewCollection';
import { Button } from '@/components/ui/button';
import React, { useContext, useEffect } from 'react';
import { ModelContext } from '@/providers/modelProvider';
import { ModelContextType } from '@/types/model';
import { collections } from '@/assets/constants/api';
import { AuthContext } from '@/providers/authUserContext';
import { authContextType } from '@/types/auth';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useRouter } from 'next/navigation';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const route = useRouter();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });
  const { deleteCollections, user } = useContext(
    ModelContext
  ) as ModelContextType;
  const { authUser } = useContext(AuthContext) as authContextType;
  return (
    <div>
      {(authUser?.role == 'ADMIN' || authUser?.id == user?.id) && (
        <div className='flex justify-between'>
          <h4 className='text-xl font-medium'>Collection List</h4>

          <div className='flex gap-x-6 mb-6'>
            <NewCollection />
            <Button
              disabled={table.getSelectedRowModel().rows.length == 0}
              onClick={async () => {
                const deleteList = table
                  .getSelectedRowModel()
                  .rows.map((item) => {
                    const collection = item.original as Collection;
                    return collection.id;
                  });
                deleteCollections(deleteList, collections);
              }}
              variant='outline'>
              Delete
            </Button>
          </div>
        </div>
      )}

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className='h-[420px] text-center'>
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
