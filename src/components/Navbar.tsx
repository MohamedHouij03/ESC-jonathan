"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname, useRouter } from 'next/navigation';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Debug: Log current state on every render
  console.log('Navbar state:', { 
    isLoggedIn, 
    user: user ? { 
      _id: user._id, 
      name: user.name, 
      email: user.email,
      profilePhoto: user.profilePhoto 
    } : undefined 
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    // Initial check for scroll position on mount
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    console.log('Initial navbar auth check:', userData);
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        console.log('Parsed user data:', parsedUser);
        setUser(parsedUser);
        setIsLoggedIn(true);
        console.log('Navbar state: { isLoggedIn: true, user:', parsedUser, '}');
        
        // Fetch fresh user data from database to ensure profile photo is up to date
        if (parsedUser._id) {
          fetch(`/api/user/get-user?userId=${parsedUser._id}`)
            .then(res => res.json())
            .then(data => {
              if (data.success && data.user) {
                console.log('Fresh user data from database:', data.user);
                setUser(data.user);
                // Update localStorage with fresh data
                localStorage.setItem('user', JSON.stringify(data.user));
              }
            })
            .catch(error => {
              console.error('Failed to fetch fresh user data:', error);
              // Keep using localStorage data if fetch fails
            });
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        setIsLoggedIn(false);
        setUser(null);
      }
    } else {
      setIsLoggedIn(false);
      setUser(null);
      console.log('Navbar state: { isLoggedIn: false, user: undefined }');
    }

    // Listen for storage changes (when user logs in/out in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'user') {
        if (e.newValue) {
          setUser(JSON.parse(e.newValue));
          setIsLoggedIn(true);
        } else {
          setUser(null);
          setIsLoggedIn(false);
        }
      }
    };

    // Listen for custom auth events
    const handleAuthChange = () => {
      console.log('Auth change event received');
      const userData = localStorage.getItem('user');
      if (userData) {
        try {
          const parsedUser = JSON.parse(userData);
          console.log('User data found:', parsedUser);
          setUser(parsedUser);
          setIsLoggedIn(true);
          console.log('Navbar state updated: { isLoggedIn: true, user:', parsedUser, '}');
        } catch (error) {
          console.error('Error parsing user data in auth change:', error);
          setUser(null);
          setIsLoggedIn(false);
        }
      } else {
        console.log('No user data found');
        setUser(null);
        setIsLoggedIn(false);
        console.log('Navbar state updated: { isLoggedIn: false, user: undefined }');
      }
    };

    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('authChange', handleAuthChange);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authChange', handleAuthChange);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    setIsProfileDropdownOpen(false);
    window.location.href = '/';
  };

  // Navigation items for logged-in users (no Home)
  const loggedInNavigation = [
    { name: "Courses", href: "/courses" },
    { name: "Routines", href: "/routines" },
    { name: "Vlogs", href: "/vlogs" },
    { name: "Newsletter", href: "/newsletter" },
    { name: "Testimonials", href: "/testimonials-cards" },
    { name: "Contact", href: "/contact" },
    { name: "About", href: "/about" },
  ];

  // Navigation items for non-logged-in users
  const loggedOutNavigation = [
    { name: "Courses", href: "/courses" },
    { name: "Routines", href: "/routines" },
    { name: "Vlogs", href: "/vlogs" },
    { name: "Newsletter", href: "/newsletter" },
    { name: "Testimonials", href: "/testimonials-cards" },
    { name: "Contact", href: "/contact" },
    { name: "About", href: "/about" },
  ];

  const currentNavigation = isLoggedIn ? loggedInNavigation : loggedOutNavigation;

  // Only apply special behavior on home page when logged out
  const isHomePageLoggedOut = pathname === '/' && !isLoggedIn;
  // Show navbar normally on all pages except home page when logged out
  const showNavbar = isScrolled || (isHovered && isHomePageLoggedOut) || (!isHomePageLoggedOut);
  const showTransparentNavbar = !showNavbar;

  // Define base classes that are always present
  const headerBaseClasses = "fixed inset-x-0 top-0 z-50 transition-all duration-300";
  const navBaseClasses = "flex items-center justify-between p-6 lg:px-8";

  // Define classes that change based on state
  const headerDynamicClasses = showTransparentNavbar
    ? "bg-transparent border-transparent -translate-y-full opacity-0 pointer-events-none"
         : "bg-[#E43636] backdrop-blur-sm border-gray-200 translate-y-0 opacity-100 pointer-events-auto";
  
  const textDynamicClasses = showTransparentNavbar ? "text-black" : "text-[#F6EFD2]";

  console.log('Navbar state:', { isLoggedIn, user: user?.name });

  return (
    <>
      {/* Invisible hover zone when navbar is hidden - only on home page when logged out */}
      {!showNavbar && isHomePageLoggedOut && (
        <div 
          className="fixed inset-x-0 top-0 h-20 z-40"
          onMouseEnter={() => setIsHovered(true)}
        />
      )}
      <header 
        className={`${headerBaseClasses} ${headerDynamicClasses}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
      <nav className={`${navBaseClasses} ${textDynamicClasses}`}>
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link 
            href="/" 
            className="-m-1.5 p-1.5"
            onClick={(e) => {
              e.preventDefault();
              if (pathname === '/') {
                // If we're already on home page, scroll to absolute top
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                // If we're on a different page, navigate to home and scroll to top
                router.push('/');
                setTimeout(() => {
                  document.documentElement.scrollTop = 0;
                  document.body.scrollTop = 0;
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 100);
              }
            }}
          >
            <span className={`text-2xl font-bold transition-colors duration-300 ${showTransparentNavbar ? 'drop-shadow' : ''}`}>ESC</span>
          </Link>
        </div>
        
        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? "Close" : "Menu"}
          </button>
        </div>
        
        {/* Desktop navigation and auth buttons */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center">
          {/* Navigation items */}
          <div className="flex items-center gap-x-8 mr-6">
            {currentNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-semibold leading-6 hover:text-gray-300 transition-colors duration-200 whitespace-nowrap`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/book"
              className="ml-2 px-4 py-2 bg-[#E43636] text-[#F6EFD2] rounded-full font-bold text-sm shadow hover:bg-[#b82a2a] transition-colors duration-200 whitespace-nowrap"
            >
              Book Now
            </Link>
          </div>

          {/* Auth buttons */}
          {isLoggedIn ? (
            <div className="relative" ref={profileDropdownRef}>
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className={`flex items-center space-x-2 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium transition-colors ${textDynamicClasses}`}
              >
                <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-[#f0e3d3] text-[#8B4513] text-sm font-semibold flex-shrink-0">
                  {user?.profilePhoto ? (
                    <img 
                      src={user.profilePhoto} 
                      alt={user?.name || 'User'} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.log('Profile photo failed to load:', user.profilePhoto);
                        e.currentTarget.style.display = 'none';
                      }}
                      onLoad={() => console.log('Profile photo loaded successfully:', user.profilePhoto)}
                    />
                  ) : (
                    <span className="text-[#8B4513] font-semibold">
                      {user?.name ? user.name.split(' ').map((n: string) => n.charAt(0)).join('').toUpperCase().slice(0, 2) : 'U'}
                    </span>
                  )}
                </div>
                <span className="whitespace-nowrap font-semibold">{user?.name || 'User'}</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 flex-shrink-0 ${isProfileDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                                     className="absolute right-0 top-full mt-1 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                >
                  <div className="py-1">
                    {/* Username at top */}
                                         <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm font-semibold text-black">{user?.name || 'User'}</p>
                    </div>
                    
                    {/* Profile link */}
                    <Link
                      href="/profile"
                                             className="block px-4 py-2 text-sm text-black hover:bg-gray-100 hover:text-[#E43636] transition-colors"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    
                    {/* Admin Dashboard link - only show for admin */}
                    {user?.email === 'admin@esc.com' && (
                      <Link
                        href="/admin"
                        className="block px-4 py-2 text-sm text-black hover:bg-gray-100 hover:text-[#E43636] transition-colors"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    
                    {/* Sign out button */}
                    <button
                      onClick={handleSignOut}
                                             className="block w-full text-left px-4 py-2 text-sm text-[#E43636] hover:bg-gray-100 hover:text-black transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          ) : (
            // Show Log In and Sign Up buttons only if not logged in
            <div className="flex items-center space-x-4">
              <Link href="/auth/signin">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`text-sm font-semibold leading-6 text-black hover:text-gray-600 transition-colors duration-200 whitespace-nowrap`}
                >
                  Log In
                </motion.button>
              </Link>
              <Link href="/auth/signup">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-md bg-[#E43636] px-3 py-2 text-sm font-semibold text-[#F6EFD2] shadow-sm hover:bg-[#b82a2a] transition-colors duration-200 whitespace-nowrap"
                >
                  Sign Up
                </motion.button>
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile menu - positioned absolutely to not affect layout */}
      <div className={
                 isOpen 
           ? `absolute top-full left-0 right-0 border-b border-gray-200 shadow-lg sm:hidden ${showTransparentNavbar ? 'bg-transparent' : 'bg-[#E43636]'}` 
           : 'hidden'
      }>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {currentNavigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={
                showTransparentNavbar
                  ? "text-black hover:text-[#E43636] block px-3 py-2 rounded-md text-base font-medium"
                  : "text-[#F6EFD2] hover:text-black block px-3 py-2 rounded-md text-base font-medium"
              }
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          
          {/* Mobile auth buttons */}
                     <div className="border-t border-gray-200 pt-4 mt-4">
            {isLoggedIn ? (
              <div className="space-y-2">
                {/* Mobile profile section for logged-in users */}
                                 <div className="px-3 py-2 border-b border-gray-200">
                  <p className="text-sm font-semibold text-black">{user?.name || 'User'}</p>
                </div>
                
                <Link
                  href="/profile"
                  className="text-black hover:text-[#E43636] block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </Link>
                
                {user?.email === 'admin@esc.com' && (
                  <Link
                    href="/admin"
                    className="text-black hover:text-[#E43636] block px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsOpen(false);
                  }}
                  className="text-[#E43636] hover:text-black block px-3 py-2 rounded-md text-base font-medium w-full text-left"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              // Show Log In and Sign Up buttons only if not logged in (mobile)
              <div className="space-y-2">
                <Link href="/auth/signin">
                  <div className="text-black hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium">
                    Log In
                  </div>
                </Link>
                <Link href="/auth/signup">
                  <div className="bg-[#E43636] text-[#F6EFD2] block px-3 py-2 rounded-md text-base font-medium">
                    Sign Up
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
    </>
  );
};

export default Navbar;
