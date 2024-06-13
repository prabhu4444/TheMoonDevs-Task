'use client';
import {signIn} from "next-auth/react";
import {useState} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";



export default function LoginPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loginInProgress, setLoginInProgress] = useState(false);

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setLoginInProgress(true);

    const response = await signIn('credentials',{name, password, redirect: false});

    if(!response.error) {
      toast.success('Logged in successfully!');
      router.replace("/profile");
    }
    else {
      toast.error('Login failed. Please check your credentials and try again.');
      console.log("Not Authenticated.");
    }

    setLoginInProgress(false);
  }
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center">Login</h2>
      <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input type="text" name="text" placeholder="Username" value={name}
               disabled={loginInProgress}
               onChange={ev => setName(ev.target.value)}
               className="w-full px-4 py-2 mt-4 border rounded-md" />
        <input type="password" name="password" placeholder="password" value={password}
               disabled={loginInProgress}
               onChange={ev => setPassword(ev.target.value)}
               className="w-full px-4 py-2 mt-4 border rounded-md"/>
        <button disabled={loginInProgress} type="submit"
        className="w-full px-4 py-2 mt-6 font-bold text-white bg-blue-500 rounded-md">Login</button>
        <div className="text-center my-4 text-gray-500 border-t pt-4">
          New to the App?{' '}
          <Link className="underline" href={'/register'}><b>Register here &raquo;</b></Link>
        </div>
      </form>
      </div>
    </div>
  );
}