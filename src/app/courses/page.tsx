'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  thumbnail: string;
  isLocked?: boolean;
}

const courses: Course[] = [
  // Removed 'The Anatomy of the Xformer'
  {
    id: 'level1-reformers',
    title: 'Level 1 Training: All Reformers',
    description: 'Master the fundamentals of reformer pilates with our comprehensive Level 1 course. Perfect for beginners looking to build a strong foundation.',
    duration: '6 weeks',
    level: 'beginner',
    category: 'Reformers',
    thumbnail: '/images/coursespics/CSB_3655-Enhanced-NR.jpg',
    isLocked: false
  },
  {
    id: 'level1-megacore',
    title: 'Level 1 Training: Megacore',
    description: 'Take your core strength to the next level with our Megacore program. Designed for those ready to challenge their stability and control.',
    duration: '8 weeks',
    level: 'intermediate',
    category: 'Core',
    thumbnail: '/images/coursespics/image000000.JPG',
    isLocked: true
  },
  {
    id: 'level2',
    title: 'Level 2 Training',
    description: 'Advanced training for experienced practitioners. Focus on complex movements and advanced techniques to enhance your practice.',
    duration: '10 weeks',
    level: 'advanced',
    category: 'Advanced',
    thumbnail: '/images/coursespics/Copy%20of%204.jpg',
    isLocked: true
  }
];

export default function CoursesPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight text-[#E43636] sm:text-5xl mb-4">
            E.S.C.P Courses
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#000000]">
            Discover our comprehensive range of pilates courses designed to help you progress at your own pace.
            From beginners to advanced practitioners, we have the perfect program for you.
          </p>
        </motion.div>

        {/* Courses Grid */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative flex flex-col bg-white rounded-2xl shadow-md border border-[#E2DDB4] overflow-hidden"
            >
              <div className="relative w-full h-60 sm:h-56 md:h-60 lg:h-64">
                <Image
                  src={course.thumbnail}
                  alt={course.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  style={{
                    objectPosition:
                      course.id === 'level1-reformers'
                        ? 'center 35%'
                        : course.id === 'level1-megacore' || course.id === 'level2'
                        ? 'center 50%'
                        : 'center 60%'
                  }}
                />
              </div>
              <div className="p-6 flex flex-col flex-grow bg-white">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-semibold text-[#000000]">
                    {course.title}
                  </h3>
                  {course.isLocked && (
                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <p className="text-[#000000] mb-6 flex-grow">
                  {course.description.replace(/\.$/, '')}
                </p>
                <div className="mt-auto">
                  {course.isLocked ? (
                    <div className="w-full flex justify-center rounded-lg bg-gray-400 px-4 py-3 text-sm font-semibold text-white cursor-not-allowed border border-gray-400">
                      Course Locked
                    </div>
                  ) : (
                    <Link
                      href={`/courses/${course.id}`}
                      className="w-full flex justify-center rounded-lg bg-[#E43636] px-4 py-3 text-sm font-semibold text-[#F6EFD2] shadow-none hover:bg-[#000000] hover:text-[#E43636] transition-all duration-200 border border-[#E43636]"
                    >
                      Start Course
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 