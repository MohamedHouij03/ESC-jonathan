"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement login logic
    console.log("Login:", formData);
  };

  return (
    <section className="min-h-screen bg-white py-20 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-md border border-[#E2DDB4]">
          <h1 className="text-3xl font-bold text-[#E43636] mb-6">Log In</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#000000]">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1 block w-full rounded-md border-[#E2DDB4] bg-[#F6EFD2] text-[#000000] shadow-sm focus:border-[#E43636] focus:ring-[#E43636]"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#000000]">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="mt-1 block w-full rounded-md border-[#E2DDB4] bg-[#F6EFD2] text-[#000000] shadow-sm focus:border-[#E43636] focus:ring-[#E43636]"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#E43636] focus:ring-[#E43636] border-[#E2DDB4] rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-[#000000]">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-[#E43636] hover:underline">
                  Forgot your password?
                </a>
              </div>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-[#E43636] rounded-md shadow-sm text-sm font-medium text-[#F6EFD2] bg-[#E43636] hover:bg-[#000000] hover:text-[#E43636] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E43636]"
            >
              Log In
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-[#000000]">
            Don't have an account?{' '}
            <Link href="/signin" className="font-medium text-[#E43636] hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
} 