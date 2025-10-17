'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    studioName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!formData.agreeToTerms) {
      setError('You must agree to the terms and conditions');
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          studioName: formData.studioName,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Failed to create account' }));
        
        // Check if user already exists
        if (errorData.error === 'User already exists') {
          // Redirect to login page with the email pre-filled
          router.push(`/auth/signin?email=${encodeURIComponent(formData.email)}&message=${encodeURIComponent('Account already exists. Please sign in with your password.')}`);
          return;
        }
        
        throw new Error(errorData.error || 'Failed to create account');
      }

      const data = await response.json();

      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(data));
      
      // Dispatch custom event to update navbar
      window.dispatchEvent(new Event('authChange'));
      
      router.push('/profile');
    } catch (err) {
      console.error('Registration error:', err);
      setError(err instanceof Error ? err.message : 'Failed to create account');
    } finally {
      setIsLoading(false);
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
          Create your account
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-2 text-center text-sm text-[#000000]"
        >
          Or{' '}
          <Link href="/auth/signin" className="font-medium text-[#E43636] hover:underline">
            sign in to your account
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
              <label htmlFor="name" className="block text-sm font-medium text-[#000000]">
                Full name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full appearance-none rounded-lg border border-[#E2DDB4] bg-white px-3 py-3 text-[#000000] placeholder-gray-400 shadow-sm focus:border-[#E43636] focus:outline-none focus:ring-[#E43636] sm:text-sm transition-colors"
                  placeholder="Enter your full name"
                />
              </div>
            </div>
            <div>
              <label htmlFor="studioName" className="block text-sm font-medium text-[#000000]">
                Studio name
              </label>
              <div className="mt-1">
                <input
                  id="studioName"
                  name="studioName"
                  type="text"
                  required
                  value={formData.studioName}
                  onChange={handleChange}
                  className="block w-full appearance-none rounded-lg border border-[#E2DDB4] bg-white px-3 py-3 text-[#000000] placeholder-gray-400 shadow-sm focus:border-[#E43636] focus:outline-none focus:ring-[#E43636] sm:text-sm transition-colors"
                  placeholder="Enter your studio name"
                />
              </div>
            </div>
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
                  onChange={handleChange}
                  className="block w-full appearance-none rounded-lg border border-[#E2DDB4] bg-white px-3 py-3 text-[#000000] placeholder-gray-400 shadow-sm focus:border-[#E43636] focus:outline-none focus:ring-[#E43636] sm:text-sm transition-colors"
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
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full appearance-none rounded-lg border border-[#E2DDB4] bg-white px-3 py-3 text-[#000000] placeholder-gray-400 shadow-sm focus:border-[#E43636] focus:outline-none focus:ring-[#E43636] sm:text-sm transition-colors"
                  placeholder="Create a password"
                />
              </div>
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#000000]">
                Confirm password
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="block w-full appearance-none rounded-lg border border-[#E2DDB4] bg-white px-3 py-3 text-[#000000] placeholder-gray-400 shadow-sm focus:border-[#E43636] focus:outline-none focus:ring-[#E43636] sm:text-sm transition-colors"
                  placeholder="Confirm your password"
                />
              </div>
            </div>
            <div className="flex items-center">
              <input
                id="agreeToTerms"
                name="agreeToTerms"
                type="checkbox"
                required
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="h-4 w-4 rounded border-[#E2DDB4] bg-white text-[#E43636] focus:ring-[#E43636]"
              />
              <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-[#000000]">
                I agree to the{' '}
                <Link href="/terms" className="font-medium text-[#E43636] hover:underline">
                  Terms and Conditions
                </Link>
              </label>
            </div>
            <div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="flex w-full justify-center rounded-lg border border-[#E43636] bg-[#E43636] py-3 px-4 text-sm font-bold text-[#F6EFD2] shadow-none hover:bg-[#000000] hover:text-[#E43636] focus:outline-none focus:ring-2 focus:ring-[#E43636] focus:ring-offset-2 focus:ring-offset-[#F6EFD2] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isLoading ? 'Creating account...' : 'Create account'}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
} 