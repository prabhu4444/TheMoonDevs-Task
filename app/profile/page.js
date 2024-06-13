"use client"
import { useEffect } from 'react';
import { signOut } from "next-auth/react"
import useAuthSession from '@/hooks/useAuthSession';
import Link from 'next/link';

const ProfilePage = () => {
  const { isAuthenticated, user, status } = useAuthSession();

  useEffect(() => {
    if (isAuthenticated) {
      console.log('User is authenticated!');
      console.log('User status:', status);
    } else {
      console.log('User is not authenticated.');
    }
  }, [isAuthenticated, status]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md text-center">
        {isAuthenticated ? (
          <>
            <h1 className="text-3xl font-bold mb-6 text-blue-500">Welcome, {user.name}!</h1>
            <div>
              <p>Your profile details go here.</p>
              <button 
                className="px-4 py-2 mt-4 font-bold text-white bg-red-500 rounded-md" 
                onClick={() => signOut()}>
                Logout
            </button>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-6 text-blue-500">Please log in to access your profile.</h1>
            <Link href="/login" className="inline-block px-4 py-2 font-bold text-white bg-blue-500 rounded-md">
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
