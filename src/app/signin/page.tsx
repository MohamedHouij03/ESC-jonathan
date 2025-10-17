"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement sign in logic
    console.log("Sign in:", formData);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('token', 'dummy-token'); // Since the login route doesn't return a token
        
        // Dispatch custom event to update navbar
        window.dispatchEvent(new Event('authChange'));
        
        router.push('/profile');
      } else {
        const errorData = await response.json();
        console.error('Sign in failed:', errorData.error);
        alert(errorData.error || 'Sign in failed');
      }
    } catch (error) {
      console.error('Error during sign in:', error);
      alert('Error during sign in');
    }
  };

  return (
    <section className="min-h-screen bg-white py-20 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Sign In</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign In
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
} 