'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function NewsletterPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [user, setUser] = useState<any>(null);

  // Check if user is logged in and pre-fill email
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setEmail(parsedUser.email || '');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');
    
    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email,
          source: 'newsletter_page',
          userId: user?._id || null
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubscribed(true);
        setMessage(data.message);
        setEmail('');
      } else {
        setError(data.error || 'Failed to subscribe. Please try again.');
      }
    } catch (error) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight text-[#E43636] sm:text-5xl">
            Stay Updated
          </h1>
          <p className="mt-4 text-lg leading-8 text-black">
            Subscribe to our newsletter for the latest fitness tips, workout routines, and exclusive content.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-[#E43636] sm:mt-20 bg-white shadow-xl"
        >
          <div className="p-8 sm:p-10">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <h3 className="text-2xl font-bold tracking-tight text-[#E43636]">Newsletter Benefits</h3>
                <ul className="mt-6 space-y-4">
                  <li className="flex gap-x-3">
                    <svg className="h-6 w-5 flex-none text-[#E43636]" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                    <span className="text-black">Weekly workout tips and techniques</span>
                  </li>
                  <li className="flex gap-x-3">
                    <svg className="h-6 w-5 flex-none text-[#E43636]" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                    <span className="text-black">Exclusive exercise routines</span>
                  </li>
                  <li className="flex gap-x-3">
                    <svg className="h-6 w-5 flex-none text-[#E43636]" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                    <span className="text-black">Nutrition advice and meal plans</span>
                  </li>
                  <li className="flex gap-x-3">
                    <svg className="h-6 w-5 flex-none text-[#E43636]" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                    <span className="text-black">Early access to new features</span>
                  </li>
                </ul>
              </div>

              <div className="sm:col-span-2">
                {/* User Status */}
                {user && (
                  <div className="mb-6 p-4 bg-[#F6EFD2] rounded-lg border border-[#E2DDB4]">
                    <p className="text-sm text-[#000000]">
                      <span className="font-semibold">Welcome back, {user.name}!</span>
                      <br />
                      Your email ({user.email}) is pre-filled below.
                    </p>
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="mt-8">
                  <div className="flex flex-col gap-y-4 sm:flex-row sm:gap-x-4">
                    <div className="flex-1">
                      <label htmlFor="email" className="sr-only">
                        Email address
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full rounded-md border border-[#E43636] px-3.5 py-2 bg-white text-black shadow-sm ring-1 ring-inset ring-[#E2DDB4] placeholder:text-[#E2DDB4] focus:ring-2 focus:ring-inset focus:ring-[#E43636] sm:text-sm sm:leading-6"
                        placeholder="Enter your email"
                        required
                        disabled={isLoading || isSubscribed}
                      />
                    </div>
                    <motion.button
                      type="submit"
                      disabled={isLoading || isSubscribed}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-none rounded-md bg-[#E43636] px-3.5 py-2.5 text-sm font-semibold text-[#F6EFD2] shadow-lg hover:bg-[#b82a2a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E43636] disabled:opacity-50 transition-all duration-200"
                    >
                      {isLoading ? 'Subscribing...' : isSubscribed ? 'Subscribed!' : 'Subscribe'}
                    </motion.button>
                  </div>
                  
                  {/* Success Message */}
                  {message && (
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 text-sm text-green-600 font-medium"
                    >
                      {message}
                    </motion.p>
                  )}
                  
                  {/* Error Message */}
                  {error && (
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 text-sm text-red-600 font-medium"
                    >
                      {error}
                    </motion.p>
                  )}
                  
                  <p className="mt-4 text-xs text-[#E43636]">
                    We care about your data. Read our{' '}
                    <a href="#" className="font-semibold text-black hover:text-[#E43636] transition-colors">
                      privacy policy
                    </a>
                    .
                  </p>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 