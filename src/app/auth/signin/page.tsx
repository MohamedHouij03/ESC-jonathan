'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function SignIn() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check for URL parameters
    const emailParam = searchParams.get('email');
    const messageParam = searchParams.get('message');
    
    if (emailParam) {
      setFormData(prev => ({ ...prev, email: emailParam }));
    }
    
    if (messageParam) {
      setMessage(decodeURIComponent(messageParam));
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to sign in');
      }

      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(data));
      
      // Dispatch custom event to update navbar
      window.dispatchEvent(new Event('authChange'));
      
      // Redirect to profile or courses page
      router.push('/profile');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Clear message when user starts typing
    if (message) {
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex justify-center">
          <span className="text-4xl font-bold text-[#E43636] drop-shadow-lg">ESC</span>
        </Link>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 text-center text-3xl font-bold tracking-tight text-[#E43636]"
        >
          Sign in to your account
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-2 text-center text-sm text-[#000000]"
        >
          Or{' '}
          <Link href="/auth/signup" className="font-medium text-[#E43636] hover:underline">
            create a new account
          </Link>
        </motion.p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white border border-[#E2DDB4] py-8 px-4 shadow-md rounded-2xl sm:px-10"
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            {message && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white border border-[#E43636] text-[#E43636] px-4 py-3 rounded-lg text-sm"
              >
                {message}
              </motion.div>
            )}
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white border border-[#E43636] text-[#E43636] px-4 py-3 rounded-lg text-sm"
              >
                {error}
              </motion.div>
            )}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#000000]">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="block w-full appearance-none rounded-lg border border-[#E2DDB4] bg-white px-3 py-3 text-[#000000] placeholder-[#8B7355] shadow-sm focus:border-[#E43636] focus:outline-none focus:ring-[#E43636] sm:text-sm transition-colors"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#000000]">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="block w-full appearance-none rounded-lg border border-[#E2DDB4] bg-white px-3 py-3 text-[#000000] placeholder-[#8B7355] shadow-sm focus:border-[#E43636] focus:outline-none focus:ring-[#E43636] sm:text-sm transition-colors"
                  placeholder="Enter your password"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-[#E2DDB4] bg-white text-[#E43636] focus:ring-[#E43636]"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-[#000000]">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <Link href="/auth/forgot-password" className="font-medium text-[#E43636] hover:underline">
                  Forgot your password?
                </Link>
              </div>
            </div>
            <div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="flex w-full justify-center rounded-lg border border-[#E43636] bg-[#E43636] py-3 px-4 text-sm font-bold text-[#F6EFD2] shadow-none hover:bg-[#000000] hover:text-[#E43636] focus:outline-none focus:ring-2 focus:ring-[#E43636] focus:ring-offset-2 focus:ring-offset-[#F6EFD2] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
} 