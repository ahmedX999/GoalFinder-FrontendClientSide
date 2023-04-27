import Head from 'next/head'
import Link from 'next/link'

import { AuthLayout } from '@/components/AuthLayout'
import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'
import { useSession, signIn, signOut } from 'next-auth/react';
export default function Login() {
const {  data: session } = useSession();
  console.log(session);
  return (
    <>
      <Head>
        <title>Sign In - Pocket</title>
      </Head>
      <AuthLayout
        title="Sign in to account"
        subtitle={
          <>
            Don’t have an account?{' '}
            <Link href="/register" className="text-cyan-600">
              Sign up
            </Link>{' '}
            for a free trial.
          </>
        }
      >
        <form>
          <div className="space-y-6">
            <TextField
              label="Email address"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
            />
            <TextField
              label="Password"
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
          </div>
          <Button type="submit" color="cyan" className="mt-8 w-full">
            Sign in to account
          </Button>
     
        </form>
        <Button color="red" className="mt-8 w-full" onClick={() => signIn()}>
           Sign in with google
          </Button>
      </AuthLayout>
     
    </>
  )
}
