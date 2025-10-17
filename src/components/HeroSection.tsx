"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import HeroSlideshow from '@/components/HeroSlideshow';

export default function HeroSection() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsLoggedIn(!!localStorage.getItem('user'));
    }
  }, []);

  if (isLoggedIn) return null;

  return (
    <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden p-0 m-0 -mt-20 pt-20">
      {/* Full background slider, starts at the very top */}
      <div className="absolute inset-0 z-0">
        <HeroSlideshow />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-red-900/40 to-black/60 pointer-events-none" />
      </div>
      {/* Overlayed hero content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg"
        >
          Exercise Strength Core <span className="text-red-500">[esc]</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-red-100"
        >
          Empowering everyone with the tools and resources to be better versions of themselves through fitness
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => setShowLoginModal(true)}
            className="px-8 py-3 bg-white text-red-600 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg"
          >
            Log In
          </button>
          <Link href="/auth/signup">
            <button className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full font-semibold hover:from-red-700 hover:to-red-800 transition-colors shadow-lg">
              Sign Up
            </button>
          </Link>
        </motion.div>
      </div>
      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-[#F6EFD2] border border-[#E43636] rounded-xl shadow-2xl w-full max-w-md p-8 relative text-[#000000] mx-4">
            <button
              className="absolute top-4 right-4 text-[#000000] hover:text-[#E43636] transition-colors"
              onClick={() => setShowLoginModal(false)}
              aria-label="Close login modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-3xl font-bold mb-8 text-center text-[#E43636]">Log In</h2>
            {loginError && (
              <div className="bg-[#E43636]/10 border border-[#E43636] text-[#E43636] px-4 py-3 rounded-lg text-sm mb-6">
                {loginError}
              </div>
            )}
            <form
              className="space-y-6"
              onSubmit={async (e) => {
                e.preventDefault();
                setLoginError('');
                setLoginLoading(true);
                try {
                  const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(loginForm),
                  });
                  const data = await response.json();
                  if (!response.ok) throw new Error(data.error || 'Failed to sign in');
                  localStorage.setItem('user', JSON.stringify(data));
                  window.dispatchEvent(new Event('authChange'));
                  setShowLoginModal(false);
                  // Optionally redirect or update state here
                } catch (err) {
                  setLoginError(err instanceof Error ? err.message : 'Failed to sign in');
                } finally {
                  setLoginLoading(false);
                }
              }}
            >
              <div>
                <label htmlFor="login-email" className="block text-sm font-medium text-[#000000] mb-2">Email address</label>
                <input
                  id="login-email"
                  type="email"
                  required
                  value={loginForm.email}
                  onChange={e => setLoginForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-[#E2DDB4] text-[#000000] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E43636] focus:border-[#E43636]"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label htmlFor="login-password" className="block text-sm font-medium text-[#000000] mb-2">Password</label>
                <input
                  id="login-password"
                  type="password"
                  required
                  value={loginForm.password}
                  onChange={e => setLoginForm(f => ({ ...f, password: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-[#E2DDB4] text-[#000000] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E43636] focus:border-[#E43636]"
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="submit"
                disabled={loginLoading}
                className="w-full py-3 px-4 bg-[#E43636] text-[#F6EFD2] font-semibold rounded-lg hover:bg-[#b82a2a] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#E43636] focus:ring-offset-2 focus:ring-offset-[#F6EFD2] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loginLoading ? 'Logging in...' : 'Log In'}
              </button>
              <div className="flex justify-between mt-6 text-sm">
                <Link href="/auth/forgot-password" className="text-[#000000] hover:text-[#E43636] transition-colors">Forgot password?</Link>
                <button
                  type="button"
                  className="text-[#000000] hover:text-[#E43636] transition-colors"
                  onClick={() => { setShowLoginModal(false); window.location.href = '/auth/signup'; }}
                >
                  Create account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
} 