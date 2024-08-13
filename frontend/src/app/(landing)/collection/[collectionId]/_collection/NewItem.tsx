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
  collections as collectionsApi,
  itemTemplates,
} from '@/assets/constants/api';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useContext, useEffect, useState } from 'react';
import { Status } from '@/types/state';
import collectrAPI from '@/api/CollectrAPI';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ModelContext } from '@/providers/modelProvider';
import { ModelContextType } from '@/types/model';
import { Checkbox } from '@/components/ui/checkbox';

const validationSchema = z.object({
  name: z.string().min(1, {
    message: 'provide a name.',
  }),
  tags: z.string(),
  itemFields: z.array(
    z.object({
      fieldValue: z.any(),
    })
  ),
});

type FormValues = z.infer<typeof validationSchema>;

export default function NewItem() {
  const [status, setStatus] = useState<Status>(Status.IDLE);
  const [open, setOpen] = useState(false);
  const { fetchCollections, user, collection } = useContext(
    ModelContext
  ) as ModelContextType;
  const defaultValues: FormValues = {
    name: '',
    tags: '',
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

  async function onSubmit(values: FormValues) {
    console.log(values);
    // setStatus(Status.PENDING);

    // try {
    //   const response = await collectrAPI.post(
    //     collectionsApi,
    //     JSON.stringify(values)
    //   );
    //   console.log(response);

    //   setStatus(response.status == 201 ? Status.SUCCESS : Status.ERROR);
    // } catch (err) {
    //   setStatus(Status.ERROR);
    // } finally {
    //   fetchCollections(`${collectionsApi}/user/${user?.id}`);
    //   setStatus(Status.IDLE);
    //   form.reset(defaultValues);
    //   setOpen(false);
    // }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[560px] overflow-auto'>
        <DialogHeader>
          <DialogTitle>New Item</DialogTitle>
          <DialogDescription>
            Fill up info to create new item.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            action=''
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex-1 space-y-5'>
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
              name='tags'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-base'>Tags</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Enter item tags'
                      className='mt-3'
                      {...field}
                    />
                  </FormControl>
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
      </DialogContent>
    </Dialog>
  );
}
