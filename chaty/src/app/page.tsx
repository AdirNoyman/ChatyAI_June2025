'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { authClient } from '@/lib/auth-client';

const Home = () => {
  const { data: session } = authClient.useSession();

  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onSubmit = () => {
    authClient.signUp.email(
      {
        email,
        name,
        password,
      },
      {
        onError: () => {
          window.alert(
            'An error occurred during sign up. Please try again. 🤨'
          );
        },
        onSuccess: () => {
          window.alert('Sign up successful! You can now log in. 🥳🤘');
        },
      }
    );
  };

  const onLogin = () => {
    authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onError: () => {
          window.alert('Login failed. Please check your credentials. 😢');
        },
        onSuccess: () => {
          window.alert('Login successful! Welcome back! 🎉');
        },
      }
    );
  };

  if (session) {
    return (
      <div className='flex flex-col p-4 gap-y-4'>
        <p>Logged in as {session.user.name}</p>
        <Button onClick={() => authClient.signOut()}>Sign Out</Button>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-y-10'>
      {/* SIGN-UP */}
      <div className='max-w-md w-full space-y-8'>
        <div className='bg-white p-8 rounded-lg shadow-md'>
          <h2 className='text-2xl font-bold text-gray-900 text-center mb-6'>
            Sign Up
          </h2>
          <div className='space-y-4'>
            <Input
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full'
            />
            <Input
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full'
            />
            <Input
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full'
            />
            <Button onClick={onSubmit} className='w-full'>
              Create User
            </Button>
          </div>
        </div>
      </div>
      {/* LOGIN */}
      <div className='max-w-md w-full space-y-8'>
        <div className='bg-white p-8 rounded-lg shadow-md'>
          <h2 className='text-2xl font-bold text-gray-900 text-center mb-6'>
            Login
          </h2>
          <div className='space-y-4'>
            <Input
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full'
            />           
            <Input
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full'
            />
            <Button onClick={onLogin} className='w-full'>
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
