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
import { FileUploaderRegular } from '@uploadcare/react-uploader';
import { z } from 'zod';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
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
import { collections as collectionsApi } from '@/assets/constants/api';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ImageIcon } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useContext, useState } from 'react';
import { Status } from '@/types/state';
import collectrAPI from '@/api/CollectrAPI';
import { collections } from '@/assets/constants/api';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ModelContext } from '@/providers/modelProvider';
import { ModelContextType } from '@/types/model';

const validationSchema = z.object({
  title: z.string().min(1, {
    message: 'provide a title.',
  }),
  description: z.string(),
  imageId: z.string(),
  itemFields: z.array(
    z.object({
      fieldName: z.string().min(1, { message: 'provide field name.' }),
      itemFieldType: z.string().min(1, {
        message: 'provide a field type.',
      }),
    })
  ),
});

type FormValues = z.infer<typeof validationSchema>;

export default function NewCollection() {
  const [status, setStatus] = useState<Status>(Status.IDLE);
  const [open, setOpen] = useState(false);
  const { fetchCollections, user } = useContext(
    ModelContext
  ) as ModelContextType;
  const defaultValues: FormValues = {
    imageId: '',
    title: '',
    description: '',
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

  async function onSubmit(values: FormValues) {
    console.log(values);
    setStatus(Status.PENDING);

    try {
      const response = await collectrAPI.post(
        collections,
        JSON.stringify(values)
      );
      console.log(response);

      setStatus(response.status == 201 ? Status.SUCCESS : Status.ERROR);
    } catch (err) {
      setStatus(Status.ERROR);
    } finally {
      fetchCollections(`${collectionsApi}/user/${user?.id}`);
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Collection</DialogTitle>
          <DialogDescription>
            Fill up collection info and item template for the collection.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            action=''
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex-1 max-w-md space-y-5'>
            <FormField
              name='title'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-base'>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Collection title'
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
              name='description'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-base'>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Enter collection description'
                      className='mt-3'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Controller
              control={form.control}
              name='imageId'
              render={({ field: { onChange, value } }) => (
                <FormItem>
                  <FormLabel className='text-base'>
                    Collection Cover Image
                  </FormLabel>
                  <div className='flex items-center gap-8'>
                    <FileUploaderRegular
                      onFileUploadSuccess={({ uuid }) => onChange(uuid)}
                      pubkey='18f1e4998292b0fcaa1c'
                      maxLocalFileSizeBytes={500000000}
                      multiple={false}
                      imgOnly={true}
                      sourceList='local, url, camera, gdrive'
                      classNameUploader='my-config'
                    />
                    <Avatar className='h-8 w-24'>
                      {value && (
                        <AvatarImage src={`https://ucarecdn.com/${value}/`} />
                      )}

                      <AvatarFallback className='text-xl'>
                        <ImageIcon />
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </FormItem>
              )}
            />
            <Separator />
            <div className='flex justify-between'>
              <FormDescription className='text-md'>
                Add custom fields for items in this collection:
              </FormDescription>
              <Button
                variant='outline'
                size='sm'
                onClick={() =>
                  append({
                    fieldName: '',
                    itemFieldType: '',
                  })
                }>
                Add
              </Button>
            </div>
            <ScrollArea className='h-48 border-2 border-foreground-muted p-2'>
              {fields.map((_, index) => {
                return (
                  <div
                    key={index}
                    className='my-2'>
                    <div className='flex justify-around'>
                      <FormField
                        control={form.control}
                        name={`itemFields.${index}.fieldName`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Field Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`itemFields.${index}.itemFieldType`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Field Type</FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}>
                                <SelectTrigger className='w-[180px]'>
                                  <SelectValue placeholder='Select Type' />
                                </SelectTrigger>
                                <SelectContent>
                                  {/* <SelectItem value='SELECT_FIELD'>
                                    Option Field
                                  </SelectItem> */}
                                  <SelectItem value='INTEGER_FIELD'>
                                    Integer Field
                                  </SelectItem>
                                  <SelectItem value='STRING_FIELD'>
                                    String Field
                                  </SelectItem>
                                  <SelectItem value='MULTILINE_STRING_FIELD'>
                                    Multiline Field
                                  </SelectItem>
                                  <SelectItem value='BOOLEAN_FIELD'>
                                    Boolean Field
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
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