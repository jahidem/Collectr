'use client';
import { CollectrLogo } from '@/components/ui/collectrLogo';
import Image from 'next/image';
import Link from 'next/link';
import collections from '../../../assets/images/collections.jpg';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { register } from '@/assets/constants/api';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Status } from '@/types/state';
import { useState } from 'react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useRouter } from 'next/navigation';
import collectrAPI from '@/api/CollectrAPI';

const FormSchema = z.object({
  firstname: z.string().min(1, {
    message: 'Provide a firstname.',
  }),
  lastname: z.string().min(1, {
    message: 'Provide a lastname.',
  }),
  email: z
    .string()
    .email({
      message: 'Invalid email!',
    })
    .min(1, {
      message: 'Provide a email.',
    }),
  password: z.string().min(1, {
    message: 'Provide a password.',
  }),
});

export default function SignUp() {
  const { push } = useRouter();
  const [status, setStatus] = useState<Status>(Status.IDLE);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  });

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    setStatus(Status.PENDING);
    collectrAPI
      .post(register, JSON.stringify(values))
      .then((res) => {
        push('/auth/sign-in');
      })
      .catch((err) => {
        form.setError('email', {
          type: 'custom',
          message: 'Registered Email, You can sign in.',
        });
      });

    setStatus(Status.IDLE);
  }

  return (
    <div className='h-screen '>
      <div className='h-screen w-full lg:grid lg:grid-cols-2'>
        <div>
          <CollectrLogo />
          <div className='mx-6 lg:ml-12 mt-12 max-w-lg'>
            <div>
              <h1 className='text-2xl font-medium mb-12'>
                Create account for Collectr
              </h1>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='grid gap-4'>
                  <FormField
                    control={form.control}
                    name='firstname'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Firstname</FormLabel>
                        <FormControl>
                          <Input
                            type='firstname'
                            id='firstname'
                            required={true}
                            placeholder='John'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='lastname'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lastname</FormLabel>
                        <FormControl>
                          <Input
                            type='lastname'
                            id='lastname'
                            required={true}
                            placeholder='Snow'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type='email'
                            id='email'
                            required={true}
                            placeholder='your@email.com'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type='password'
                            id='password'
                            required={true}
                            placeholder='correct horse battery staple'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type='submit'
                    disabled={status === Status.PENDING}
                    className='lg:w-32 lg:h-12 lg:text-lg mt-10'>
                    {status === Status.IDLE ? 'Sign up' : <LoadingSpinner />}
                  </Button>
                </form>
              </Form>
              <div className='my-6 text-md'>
                Already have an account?
                <Link
                  href={`/auth/sign-in`}
                  className='underline ml-2'>
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className='hidden lg:block h-full overflow-hidden'>
          <Image
            src={collections}
            alt='Image'
            className='object-cover brightness-150 saturate-150'
          />
        </div>
      </div>
    </div>
  );
}
