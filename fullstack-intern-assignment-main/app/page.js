'use client';

import Link from "next/link";

const HomePage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md text-center">
      <h1 className="text-3xl font-bold mb-6 text-blue-500">TechMoonDev : FullStack Intern Assignment</h1>

        <div>
          <Link href={'/register'}
            className="inline-block w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md mb-4"
          >
            Register
          </Link>
          <h2 className="text-2xl py-4 font-bold">OR</h2>
          <Link
            href={'/login'}
            className="inline-block w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md"
          >
            Login
          </Link>
        </div>    
      </div>
    </div>
  );
};

export default HomePage;
