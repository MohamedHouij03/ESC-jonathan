'use client';

import CourseNavigation from './CourseNavigation';

interface LessonLayoutProps {
  children: React.ReactNode;
  currentLessonPath?: string;
  nextLessonPath?: string;
}

export default function LessonLayout({ children, currentLessonPath, nextLessonPath }: LessonLayoutProps) {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Course Navigation */}
      {currentLessonPath && (
        <CourseNavigation 
          currentLessonPath={currentLessonPath}
          nextLessonPath={nextLessonPath}
        />
      )}
      
      <div className="mx-auto max-w-7xl px-2 py-16 sm:px-4 md:px-6 lg:px-8 overflow-x-hidden">
        {children}
      </div>
    </div>
  );
} 