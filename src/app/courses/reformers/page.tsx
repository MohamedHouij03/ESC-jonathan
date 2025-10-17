'use client';

import CourseLayout from '@/components/CourseLayout';

const chapters = [
  {
    id: 1,
    title: 'Introduction to Reformers',
    duration: '30 min',
    completed: false
  },
  {
    id: 2,
    title: 'Basic Reformer Exercises',
    duration: '45 min',
    completed: false
  },
  {
    id: 3,
    title: 'Intermediate Techniques',
    duration: '60 min',
    completed: false
  },
  {
    id: 4,
    title: 'Advanced Combinations',
    duration: '75 min',
    completed: false
  },
  {
    id: 5,
    title: 'Final Assessment',
    duration: '45 min',
    completed: false
  }
];

export default function ReformersCoursePage() {
  const handleStartCourse = () => {
    // Handle course start logic
    console.log('Course started');
  };

  const handleChapterClick = (chapterId: number) => {
    // Handle chapter click logic
    console.log(`Chapter ${chapterId} clicked`);
  };

  return (
    <CourseLayout
      title="E.S.C.P - Level 1 Training [All Reformers]"
      description="Master the fundamentals of reformer-based exercises with our comprehensive Level 1 training program. Learn proper form, technique, and essential exercises for all types of reformers."
      chapters={chapters}
      onStartCourse={handleStartCourse}
      onChapterClick={handleChapterClick}
    />
  );
} 