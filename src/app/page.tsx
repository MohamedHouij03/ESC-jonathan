'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import HeroSlideshow from '@/components/HeroSlideshow';
import RevealOnScroll from '@/components/RevealOnScroll';
import HeroSection from '@/components/HeroSection';

const images = [
  '/images/banner/A7404964 (2).jpg',
  '/images/banner/7a9ae62bebc0a8e32ecafda8b9025fdb.jpg',
  '/images/banner/95ff267774eb66a356ff5346f993efb2.jpg',
  '/images/banner/A7404373-2 (2).jpg',
  '/images/banner/A7404969 (1).jpg',
  '/images/banner/64188e37c55836c6271da3cfcfa00354.jpg',
];

interface User {
  _id: string;
  name: string;
  studioName: string;
  email: string;
  lastLogin: string;
  loginHistory: Array<{
    timestamp: string;
    ipAddress: string;
    location: string;
  }>;
  createdAt: string;
  profilePhoto?: string;
  courseProgress?: Array<{
    courseId: string;
    courseName: string;
    progress: number;
    completedChapters: Array<{ chapterId: string; chapterName: string; completedAt: string }>;
    lastAccessed: string;
    startedAt: string;
  }>;
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const router = useRouter();
  
  // Derived state for dashboard
  const lastCourse = user?.courseProgress && user.courseProgress.length > 0
    ? [...user.courseProgress].sort((a, b) => new Date(b.lastAccessed).getTime() - new Date(a.lastAccessed).getTime())[0]
    : null;
  const inProgressCount = user?.courseProgress ? user.courseProgress.filter(c => {
    return c.progress > 0 && c.progress < 100;
  }).length : 0;
  const avgCompletion = user?.courseProgress && user.courseProgress.length > 0
    ? Math.round(user.courseProgress.reduce((acc, c) => {
        return acc + c.progress;
      }, 0) / user.courseProgress.length)
    : 0;

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setIsLoading(false);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/');
  };

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Show personalized dashboard for logged-in users
  if (user) {
    return (
      <div className="min-h-screen bg-white pt-24">
        {/* Greeting Header */}
        <header className="border-b border-[#000000]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between gap-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden border border-[#000000]/10 bg-white">
                  {user.profilePhoto ? (
                    <img src={user.profilePhoto} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xl font-bold text-[#000000]">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-extrabold text-[#000000]">
                    <div>Welcome back,</div>
                    <div className="text-2xl md:text-3xl">{user.name}</div>
                  </h1>
                  <p className="text-[#000000]/60">Let’s pick up where you left off.</p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-3">
                {lastCourse && (
                  <Link href={`/courses/${lastCourse.courseId}`}>
                    <button className="px-4 py-2 rounded-lg bg-[#000000] text-white border border-[#000000]">Continue {lastCourse.courseName}</button>
                  </Link>
                )}
                <Link href="/profile">
                  <button className="px-4 py-2 rounded-lg bg-[#000000] text-white border border-[#000000]">View Profile</button>
                </Link>
              </div>
            </motion.div>
          </div>
        </header>

        {/* Main Dashboard */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Progress Summary */}
          <section className="mb-10">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-xl border border-[#000000]/10 bg-white p-5 shadow">
                <div className="text-sm text-[#000000]/60">Courses in progress</div>
                <div className="text-2xl font-bold text-[#000000] mt-1">{inProgressCount}</div>
              </div>
              <div className="rounded-xl border border-[#000000]/10 bg-white p-5 shadow">
                <div className="text-sm text-[#000000]/60">Average completion</div>
                <div className="text-2xl font-bold text-[#000000] mt-1">{avgCompletion}%</div>
              </div>
              <div className="rounded-xl border border-[#000000]/10 bg-white p-5 shadow">
                <div className="text-sm text-[#000000]/60">Member since</div>
                <div className="text-2xl font-bold text-[#000000] mt-1">{new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</div>
              </div>
            </div>
          </section>
          {/* Continue Learning */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-10"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-[#000000]">Continue learning</h2>
              <Link href="/courses" className="text-sm text-[#000000]/70 hover:text-[#000000]">Browse courses</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link href="/courses/level1-reformers" className="group">
                <div className="rounded-xl border border-[#000000]/10 bg-white shadow hover:shadow-md transition-shadow overflow-hidden">
                  <div className="relative h-40">
                    <Image src="/images/coursespics/CSB_3655-Enhanced-NR.jpg" alt="Level 1 Reformers" fill className="object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-[#000000]">Level 1 Training: All Reformers</h3>
                    <p className="text-sm text-[#000000]/60">Resume from last chapter</p>
                  </div>
                </div>
              </Link>
              <Link href="/courses/level1-megacore" className="group">
                <div className="rounded-xl border border-[#000000]/10 bg-white shadow hover:shadow-md transition-shadow overflow-hidden">
                  <div className="relative h-40">
                    <Image src="/images/coursespics/image000000.JPG" alt="Level 1 Megacore" fill className="object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-[#000000]">Level 1 Training: Megacore</h3>
                    <p className="text-sm text-[#000000]/60">Up next: Core stability</p>
                  </div>
                </div>
              </Link>
              <Link href="/vlogs" className="group">
                <div className="rounded-xl border border-[#000000]/10 bg-white shadow hover:shadow-md transition-shadow overflow-hidden">
                  <div className="relative h-40">
                    <Image src="/images/CSB_8883-Enhanced-NR (1).jpg" alt="Vlogs" fill className="object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-[#000000]">Latest Vlogs</h3>
                    <p className="text-sm text-[#000000]/60">New coaching uploads</p>
                  </div>
                </div>
              </Link>
            </div>
          </motion.section>

          {/* Current Courses */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-10"
          >
            <h2 className="text-xl font-bold text-[#000000] mb-4">Your courses</h2>
            {user.courseProgress && user.courseProgress.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {user.courseProgress.map((c) => (
                  <div key={c.courseId} className="rounded-xl border border-[#000000]/10 bg-white p-5 shadow">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-semibold text-[#000000]">{c.courseName}</div>
                        <div className="text-sm text-[#000000]/60">Progress {c.progress}%</div>
                      </div>
                      <Link href={`/courses/${c.courseId}`}>
                        <button className="px-3 py-2 rounded-lg bg-[#000000] text-white text-sm">Resume</button>
                      </Link>
                    </div>
                    <div className="mt-3 w-full bg-[#000000]/10 rounded-full h-2 border border-[#000000]/10">
                      <div className="h-2 rounded-full bg-[#000000]" style={{ width: `${c.progress}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-[#000000]/10 bg-white p-6 text-[#000000]/70">No active courses yet. Browse courses to get started.</div>
            )}
          </motion.section>

          {/* Recommendations */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-10"
          >
            <h2 className="text-xl font-bold text-[#000000] mb-4">Recommended for you</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/courses/level2" className="group">
                <div className="rounded-xl border border-[#000000]/10 bg-white p-5 shadow hover:border-[#000000] transition-all">
                  <div className="font-semibold text-[#000000] mb-1">Level 2 Training</div>
                  <div className="text-sm text-[#000000]/60">Advance your skills</div>
                </div>
              </Link>
              <Link href="/vlogs" className="group">
                <div className="rounded-xl border border-[#000000]/10 bg-white p-5 shadow hover:border-[#000000] transition-all">
                  <div className="font-semibold text-[#000000] mb-1">Coaching Vlogs</div>
                  <div className="text-sm text-[#000000]/60">Popular this week</div>
                </div>
              </Link>
              <Link href="/routines" className="group">
                <div className="rounded-xl border border-[#000000]/10 bg-white p-5 shadow hover:border-[#000000] transition-all">
                  <div className="font-semibold text-[#000000] mb-1">Full-body Routine</div>
                  <div className="text-sm text-[#000000]/60">Because you like core</div>
                </div>
              </Link>
            </div>
          </motion.section>

          {/* Quick Actions */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl font-bold text-[#000000] mb-4">Quick actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/courses" className="group">
                <div className="rounded-xl border border-[#000000]/10 bg-white p-5 shadow hover:border-[#000000] transition-all">
                  <div className="font-semibold text-[#000000] mb-1">Browse courses</div>
                  <div className="text-sm text-[#000000]/60">Find something new</div>
                </div>
              </Link>
              <Link href="/routines" className="group">
                <div className="rounded-xl border border-[#000000]/10 bg-white p-5 shadow hover:border-[#000000] transition-all">
                  <div className="font-semibold text-[#000000] mb-1">Work out</div>
                  <div className="text-sm text-[#000000]/60">Pick a routine</div>
                </div>
              </Link>
              <Link href="/profile" className="group">
                <div className="rounded-xl border border-[#000000]/10 bg-white p-5 shadow hover:border-[#000000] transition-all">
                  <div className="font-semibold text-[#000000] mb-1">Profile</div>
                  <div className="text-sm text-[#000000]/60">Manage account</div>
                </div>
              </Link>
              <button onClick={handleSignOut} className="text-left group">
                <div className="rounded-xl border border-[#000000]/10 bg-white p-5 shadow hover:border-[#000000] transition-all">
                  <div className="font-semibold text-[#000000] mb-1">Sign out</div>
                  <div className="text-sm text-[#000000]/60">We’ll see you soon</div>
                </div>
              </button>
            </div>
          </motion.section>
        </main>
      </div>
    );
  }

  // Show home page for non-logged-in users
  if (!user) {
    return (
      <div className="min-h-screen bg-white">
        {/* Hero Banner Section */}
        <HeroSection />
        
        {/* Mission Section */}
        <RevealOnScroll>
        <section className="relative bg-white overflow-hidden py-40 md:py-56 min-h-screen">
          {/* Background Image with reduced luminosity */}
          <img
            src="/images/A7404373-2 (1).jpg"
            alt="Mission background"
            className="absolute inset-0 w-full h-full object-cover brightness-50 blur-[0.5px] pointer-events-none"
          />
          {/* Foreground Content */}
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <div className="space-y-8">
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="text-4xl md:text-5xl font-bold text-[#F6EFD2]"
              >
                My Mission
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
                className="text-xl md:text-2xl leading-relaxed text-[#F6EFD2]"
              >
                This website was originally created to support the clients at the studio that I taught "Modern Pilates" at.
                My mission was, and still is, to provide a platform for instructors and clients to learn about the method of
                fitness I was certified in which includes: exercise names and their spring loads, modifications,
                intensifications, and variations.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
                className="text-xl md:text-2xl leading-relaxed text-[#F6EFD2]"
              >
                I want to empower everyone with the tools and resources to be better versions of themselves through fitness
                regardless of the apparatus (Reformer, Megaformer, or Xformer) or methodology (Pilates, Lagree, Modern Pilates, and more).
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
                className="text-xl md:text-2xl leading-relaxed text-[#F6EFD2]"
              >
                I was encouraged on February 23, 2024 to decide where i stand between Lagree and Xformer, and the decision
                I have made as of today March 8, 2024 is NEITHER
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
                className="text-xl md:text-2xl leading-relaxed text-[#F6EFD2] font-bold"
              >
                I choose the human race<br />
                I teach [esc] Pilates<br />
                I stand for Exercise, Strength, and Core
              </motion.p>
            </div>
          </div>
        </section>
        </RevealOnScroll>

        {/* Video Header Section */}
        <RevealOnScroll>
        <section className="relative min-h-[90vh] bg-black overflow-hidden">
          {/* Background Video */}
          <div className="absolute inset-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="https://www.dropbox.com/scl/fi/d1wim302c5zryovdjnslb/Final-Edit_1.mp4?rlkey=i517uxt8vokktw9kz0xhunbbm&st=mb8p6y7t&dl=1" type="video/mp4" />
              <source src="/videos/hero-video.webm" type="video/webm" />
              <source src="/videos/hero-video.mp4" type="video/mp4" />
            </video>
          </div>
          
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-black/30"></div>
          
          {/* Hero Content */}
          <div className="relative z-10 flex items-center justify-center min-h-[90vh]">
            <div className="text-center max-w-4xl mx-auto px-4">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg"
              >
                ESC
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl md:text-2xl text-white mb-8 drop-shadow-md"
              >
                Transform Your Fitness Journey
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link href="/auth/signup">
                  <button className="px-8 py-4 bg-[#E43636] text-white rounded-full font-semibold hover:bg-[#000000] hover:text-[#E43636] transition-colors text-lg shadow-lg border-2 border-[#E43636]">
                    Get Started
                  </button>
                </Link>
                <Link href="/courses">
                  <button className="px-8 py-4 bg-transparent text-white rounded-full font-semibold hover:bg-white hover:text-black transition-colors text-lg shadow-lg border-2 border-white">
                    Explore Courses
                  </button>
                </Link>
              </motion.div>
            </div>
          </div>
          
        </section>
        </RevealOnScroll>
        
        {/* Section 3 with Background Video */}
        <RevealOnScroll>
        <section className="relative py-32 md:py-40 pb-20 bg-white overflow-hidden w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] min-h-[100vh]">
          {/* Background Video */}
          <div className="absolute inset-0 pointer-events-none">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
            >
              <source src="https://www.dropbox.com/scl/fi/bocoe19lkww1g6hz0t2i7/What-You-Receive-When-Working-Together-Xformer-Teacher-Training-Megacore-Teacher-Training.mp4?rlkey=kbcf5h4y6rdsb5v9szwn1tib2&st=ahpspv8e&dl=1" type="video/mp4" />
            </video>
          </div>
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
          {/* Foreground Content */}
          <div className="relative z-10 max-w-3xl mx-auto px-4 text-center py-8">
            <h2 className="text-4xl font-extrabold text-[#F6EFD2] mb-4 drop-shadow-sm border-b-2 border-[#F6EFD2] inline-block pb-2">Book Your First Class</h2>
            <p className="text-xl mb-8 text-[#F6EFD2]">Experience the energy, motivation, and results of your first class with us. No commitment—just bring your best self and get started!</p>
            <Link href="/book">
              <button
                className="px-10 py-4 bg-[#E43636] text-[#F6EFD2] rounded-full font-bold text-lg shadow-xl hover:bg-[#000000] hover:text-[#E43636] transition-colors border-2 border-[#E43636]"
              >
                Book Now
              </button>
            </Link>
          </div>
        </section>
        </RevealOnScroll>
      </div>
    );
  }
}
