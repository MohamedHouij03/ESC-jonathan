'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CourseLayout from '@/components/CourseLayout';

const chapters = [
  {
    id: 1,
    title: 'Introduction to Megacore',
    duration: '30 min',
    completed: false
  },
  {
    id: 2,
    title: 'Core Fundamentals',
    duration: '45 min',
    completed: false
  },
  {
    id: 3,
    title: 'Basic Megacore Exercises',
    duration: '60 min',
    completed: false
  },
  {
    id: 4,
    title: 'Intermediate Workouts',
    duration: '75 min',
    completed: false
  },
  {
    id: 5,
    title: 'Advanced Techniques',
    duration: '60 min',
    completed: false
  },
  {
    id: 6,
    title: 'Final Assessment',
    duration: '45 min',
    completed: false
  }
];

export default function MegacoreCoursePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to courses page since this course is locked
    router.push('/courses');
  }, [router]);

  // Show loading while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E43636] mx-auto mb-4"></div>
        <p className="text-[#000000]">Redirecting...</p>
      </div>
    </div>
  );
} 