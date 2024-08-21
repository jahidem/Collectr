'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { z } from 'zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  collectionCatagories,
  items as itemsApi,
  itemTags,
  itemTemplates,
} from '@/assets/constants/api';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { SetStateAction, useContext, useEffect, useState } from 'react';
import { Status } from '@/types/state';
import collectrAPI from '@/api/CollectrAPI';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ModelContext } from '@/providers/modelProvider';
import { ModelContextType } from '@/types/model';
import { Checkbox } from '@/components/ui/checkbox';
import { ItemTag } from '@/types/item';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CaretSortIcon } from '@radix-ui/react-icons';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Badge } from '@/components/ui/badge';
import { Scroll, X } from 'lucide-react';

const validationSchema = z.object({
  name: z.string().min(1, {
    message: 'provide a name.',
  }),
  tags: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    })
  ),
  itemFields: z.array(
    z.object({
      fieldValue: z.any(),
    })
  ),
});

type FormValues = z.infer<typeof validationSchema>;

export default function NewItem() {
  const [status, setStatus] = useState<Status>(Status.IDLE);
  const [tags, setTags] = useState<ItemTag[]>([]);

  const [open, setOpen] = useState(false);
  const { fetchItems, user, collection } = useContext(
    ModelContext
  ) as ModelContextType;
  const defaultValues: FormValues = {
    name: '',
    tags: [],
    itemFields: [],
  };
  const form = useForm<FormValues>({
    resolver: zodResolver(validationSchema),
    defaultValues: defaultValues,
  });

  const { fields, append } = useFieldArray({
    name: 'itemFields',
    control: form.control,
  });

  useEffect(() => {
    if (collection) {
      let currValue = defaultValues;
      collection.itemTemplate.itemFields.forEach((element) => {
        currValue.itemFields.push({
          fieldValue: '',
        });
        form.reset(currValue);
      });
    }
  }, [collection]);
  useEffect(() => {
    collectrAPI.get(itemTags).then((res) => setTags(res.data));
  }, []);

  async function onSubmit(values: FormValues) {
    console.log(values);
    setStatus(Status.PENDING);

    try {
      const response = await collectrAPI.post(
        itemsApi,
        JSON.stringify({ ...values, collectionId: collection?.id })
      );

      setStatus(response.status == 201 ? Status.SUCCESS : Status.ERROR);
    } catch (err) {
      setStatus(Status.ERROR);
    } finally {
      fetchItems(`${itemsApi}/collection/${collection?.id}`);
      setStatus(Status.IDLE);
      form.reset(defaultValues);
      setOpen(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create</Button>
      </DialogTrigger>
      <DialogContent className='px-0'>
        <DialogHeader className='px-6'>
          <DialogTitle>New Item</DialogTitle>
          <DialogDescription>
            Fill up info to create new item.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className='overflow-auto h-96 lg:h-[520px]'>
          <Form {...form}>
            <form
              action=''
              onSubmit={form.handleSubmit(onSubmit)}
              className='flex-1 space-y-5 px-6'>
              <FormField
                name='name'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-base'>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Item name'
                        type='text'
                        className='mt-3'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='tags'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel>Tags</FormLabel>
                    <div className='flex flex-wrap gap-4'>
                      {field.value.map((item) => (
                        <Badge
                          onClick={() => {
                            form.setValue('tags', [
                              ...field.value.filter((tag) => tag.id != item.id),
                            ]);
                          }}
                          variant='secondary'
                          className='gap-x-2 items-center hover:cursor-pointer'
                          key={item.id}>
                          <p>{item.name}</p>
                          <X className='h-4 w-4 ' />
                        </Badge>
                      ))}
                    </div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant='outline'
                            role='combobox'
                            className={cn(
                              'justify-between',
                              !field.value && 'text-muted-foreground'
                            )}>
                            Add tag
                            <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='p-0'>
                        <Command>
                          <CommandInput
                            placeholder='Search tags...'
                            className='h-9'
                          />
                          <CommandList>
                            <CommandEmpty>No tags found.</CommandEmpty>
                            <CommandGroup>
                              {tags
                                .filter((item) => {
                                  let includ = true;
                                  field.value.forEach((ele) => {
                                    if (ele.id == item.id) includ = false;
                                  });
                                  return includ;
                                })
                                .map((tag) => (
                                  <CommandItem
                                    value={tag.name}
                                    key={tag.id}
                                    onSelect={() => {
                                      form.setValue('tags', [
                                        ...field.value,
                                        tag,
                                      ]);
                                    }}>
                                    {tag.name}
                                  </CommandItem>
                                ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      This is the tag for the collection.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator />
              <FormDescription className='text-md'>
                Custom fields:
              </FormDescription>
              <ScrollArea className='h-48 border-2 border-foreground-muted p-2'>
                {collection?.itemTemplate.itemFields.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className='my-2'>
                      <FormField
                        control={form.control}
                        name={`itemFields.${index}.fieldValue`}
                        render={({ field }) => (
                          <FormItem className='mx-2 mb-6'>
                            <FormControl>
                              {item.itemFieldType == 'BOOLEAN_FIELD' ? (
                                <div className='flex gap-x-2 '>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                  <FormLabel>{item.fieldName}</FormLabel>
                                </div>
                              ) : (
                                <>
                                  <div className='flex justify-between'>
                                    <FormLabel>{item.fieldName}</FormLabel>
                                    <p className='text-muted-foreground text-sm'>
                                      {item.itemFieldType}
                                    </p>
                                  </div>

                                  <Input
                                    {...field}
                                    type={
                                      item.itemFieldType == 'INTEGER_FIELD'
                                        ? 'number'
                                        : 'text'
                                    }
                                  />
                                </>
                              )}
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  );
                })}
              </ScrollArea>

              <div className='flex justify-between'>
                <DialogClose asChild>
                  <Button
                    variant='secondary'
                    onClick={() => form.reset(defaultValues)}>
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  type='submit'
                  disabled={status === Status.PENDING}>
                  {status === Status.IDLE ? 'Submit' : <LoadingSpinner />}
                </Button>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
