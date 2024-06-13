"use client";
import Link from "next/link";
import {useState} from "react";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);

  // Validating username
  const isValidUsername = (username) => {
    return username.length > 3 && /^[a-zA-Z0-9]+$/.test(username);
     // More than 3 characters and only alphanumeric
  }

  // Validating password
  const isValidPassword = (password) => {
    return password.length > 5 && /[!@#$%^&*(),.?":{}|<>]/.test(password); 
    // More than 5 characters and at least 1 special character
  }
  
  async function handleFormSubmit(ev) {
    ev.preventDefault();

    if (!isValidUsername(name)) {
      setError('Username must be more than 3 characters and contain only alphanumeric characters.');
      return;
    }

    if (!isValidPassword(password)) {
      setError('Password must be more than 5 characters and contain at least one special character.');
      return;
    }

    setCreatingUser(true);
    setError(false);
    setUserCreated(false);
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({name, password}),
        headers: {'Content-Type': 'application/json'},
      });
      if (response.ok) {
        setUserCreated(true);
        toast.success('User created successfully!');
      } else {
        
        toast.error('Registration failed. Please try again later.');
      }
    } catch (error) {
      
      toast.error('Network error occurred. Please try again.');
    }
    setCreatingUser(false);
  }
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center">Register</h2>
      {userCreated && (
        <div className="my-2 text-center">
          User Created <br/>
          Now you can{' '}
          <Link className="underline text-blue-400" href={'/login'}>Login &raquo;</Link>
        </div>
      )}
      {error && (
        <div className="my-4 text-center text-red-500">
          {error}
        </div>
      )}
      <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input type="name" placeholder="username" value={name}
               disabled={creatingUser}
               onChange={ev => setName(ev.target.value)}
               className="w-full px-4 py-2 mt-4 border rounded-md" />
        <input type="password" placeholder="password" value={password}
               disabled={creatingUser}
                onChange={ev => setPassword(ev.target.value)}
                className="w-full px-4 py-2 mt-4 border rounded-md"/>
        <button type="submit" disabled={creatingUser}
        className="w-full px-4 py-2 mt-6 font-bold text-white bg-blue-500 rounded-md">
          Register
        </button>
        <div className="text-center my-4 text-gray-500 border-t pt-4">
          Existing account?{' '}
          <Link className="underline" href={'/login'}><b>Login here &raquo;</b></Link>
        </div>
      </form>
      </div>
    </div>
  );
}