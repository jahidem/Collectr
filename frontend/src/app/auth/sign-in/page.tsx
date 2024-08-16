'use client';
import { CollectrLogo } from '@/components/ui/collectrLogo';
import Image from 'next/image';
import Link from 'next/link';
import collections from '../../../assets/images/collections.jpg';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { api, login } from '@/assets/constants/api';
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
import githubIcon from '../../../assets/images/github.svg';
import googleIcon from '../../../assets/images/google.svg';
import { Status } from '@/types/state';
import { useContext, useState } from 'react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useRouter } from 'next/navigation';
import collectrAPI from '@/api/CollectrAPI';
import { AuthContext } from '@/providers/authUserContext';
import { authContextType } from '@/types/auth';

const FormSchema = z.object({
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

export default function SignIn() {
  const { replace } = useRouter();
  const [status, setStatus] = useState<Status>(Status.IDLE);
  const { setAuth } = useContext(AuthContext) as authContextType;
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  });

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    setStatus(Status.PENDING);

    try {
      const response = await collectrAPI.post(login, JSON.stringify(values));
      console.log(response);

      setStatus(response.status == 200 ? Status.SUCCESS : Status.ERROR);
      const data = response.data;
      setAuth(data.token);
    } catch (err) {
      setStatus(Status.ERROR);
    } finally {
      setStatus(Status.IDLE);
      if (status == Status.SUCCESS) replace('/profile');
      else
        form.setError('email', {
          type: 'custom',
          message: 'Unregistred / Blocked Email',
        });
    }
  }

  return (
    <div className='h-screen '>
      <div className='h-screen w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]'>
        <div>
          <CollectrLogo />
          <div className='mx-24 mt-36 max-w-lg'>
            <div>
              <h1 className='text-2xl font-medium'>Sign In to Collectr</h1>
              <div className='mt-6 grid gap-2 grid-cols-1 sm:grid-cols-1 xl:grid-cols-2'>
                <button
                  type='button'
                  className='type-interface-01 button-secondary-text hover:button-secondary-background--hover hover:button-secondary-text--hover active:button-secondary-background--active active:button-secondary-text--hover--active border border-solid button-secondary-border h-10 py-2.5 px-3 focus-visible:outline focus-visible:outline-focus-action outline-offset-2 outline-2 group w-full inline-flex items-center justify-center'>
                  <div className='flex items-center space-x-1.5'>
                    <Image
                      priority
                      src={githubIcon}
                      alt='github icon'
                    />
                    <span>GitHub</span>
                  </div>
                </button>

                <button
                  type='button'
                  className='type-interface-01 button-secondary-text hover:button-secondary-background--hover hover:button-secondary-text--hover active:button-secondary-background--active active:button-secondary-text--hover--active border border-solid button-secondary-border h-10 py-2.5 px-3 focus-visible:outline focus-visible:outline-focus-action outline-offset-2 outline-2 group w-full inline-flex items-center justify-center'>
                  <div className='flex items-center space-x-1.5'>
                    <Image
                      priority
                      src={googleIcon}
                      alt='google icon'
                    />
                    <span>Google</span>
                  </div>
                </button>
              </div>
              <p className='text-center my-4'>or</p>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='grid gap-4'>
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
                    className='w-32 h-12 text-lg mt-10'>
                    {status === Status.IDLE ? 'Sign in' : <LoadingSpinner />}
                  </Button>
                </form>
              </Form>
              <div className='mt-6 text-md'>
                Don&apos;t have an account?
                <Link
                  href={`/auth/sign-up`}
                  className='underline ml-2'>
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>

        <Image
          src={collections}
          alt='Image'
          className='h-screen object-fit brightness-150 saturate-150'
        />
      </div>
    </div>
  );
}
