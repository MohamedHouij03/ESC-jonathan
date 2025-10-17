'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Level2Page() {
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
