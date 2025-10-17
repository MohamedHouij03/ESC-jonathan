'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useUserProgress } from '@/hooks/useUserProgress';

const COURSE_ID = 'level1-reformers';
const COURSE_NAME = 'Level 1 Reformers';

interface CourseProgress {
  courseId: string;
  courseName: string;
  progress: number;
  completedChapters: Array<{
    chapterId: string;
    chapterName: string;
    completedAt: string;
  }>;
  completedLessons?: Array<{
    lessonId: string;
    chapterId: string;
    completedAt: string;
  }>;
  lastAccessed: string;
  startedAt: string;
}

interface User {
  _id: string;
  name: string;
  studioName: string;
  email: string;
  profilePhoto?: string;
  currentLocation?: string;
  comments?: string;
  courseProgress?: CourseProgress[];
  lastLogin: string;
  loginHistory?: Array<{
    timestamp: string;
    ipAddress: string;
    location: string;
  }>;
  createdAt: string;
}

export default function Level1ReformersPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Use the improved progress hook
const { 
    user, 
    progress, 
    completedLessons, 
    completedChapters, 
    loading: progressLoading, 
    error: progressError,
    isLessonCompleted
  } = useUserProgress(COURSE_ID);

  // Type assertion to fix TypeScript errors
  const typedUser = user as User | null;

  const chapters = [
    {
      id: 'chapter-1',
      title: 'Chapter 1: Introduction',
      lessons: [
        { id: '1-1', title: 'The Anatomy of the Xformer', completed: false },
        { id: '1-2', title: 'Move Slow: High intensity and Low Impact', completed: false },
      ]
    },
    {
      id: 'chapter-2',
      title: 'Chapter 2: Abdominal Exercises',
      lessons: [
        { id: '2-1', title: 'Anatomy of Rectus Abdominis', completed: false },
        { id: '2-2', title: 'Kneeling Crunch (rainbow crunch)', completed: false },
        { id: '2-3', title: 'Straight Arm Crunch', completed: false },
        { id: '2-4', title: 'Knee Strap Crunch', completed: false },
        { id: '2-5', title: 'Seated Crunch', completed: false },
      ]
    },
    {
      id: 'chapter-3',
      title: 'Chapter 3: Core Exercises',
      lessons: [
        { id: '3-1', title: 'Anatomy of Transverse Abdominis', completed: false },
        { id: '3-2', title: 'Ab Wheel', completed: false },
        { id: '3-3', title: 'Saw', completed: false },
        { id: '3-4', title: 'Plank to Pike & Forearm Plank to Pike', completed: false },
        { id: '3-5', title: 'Panther', completed: false },
        { id: '3-6', title: 'Reverse Boomerang & Back Boomerang', completed: false },
        { id: '3-7', title: 'Seal & Reverse Seal', completed: false },
        { id: '3-8', title: 'Angel', completed: false },
        { id: '3-9', title: 'Core & Abdominal Block: different body positions & transitioning', completed: false },
        { id: '3-10', title: 'Core and Abdominal Block: Practicing Cues', completed: false },
      ]
    },
    {
      id: 'chapter-4',
      title: 'Chapter 4: Light Leg Exercises',
      lessons: [
        { id: '4-1', title: 'Platform Lunge', completed: false },
        { id: '4-2', title: 'Single Leg Squat', completed: false },
        { id: '4-3', title: 'Carriage Lunge', completed: false },
        { id: '4-4', title: 'Floor Lunge', completed: false },
        { id: '4-5', title: 'Side Lunge', completed: false },
        { id: '4-6', title: 'Light Squats', completed: false },
        { id: '4-7', title: 'Curtsy Lunge', completed: false },
        { id: '4-8', title: 'Standing Inner Thighs', completed: false },
        { id: '4-9', title: 'Squatting Inner Thighs', completed: false },
        { id: '4-10', title: 'Kneeling Inner Thighs', completed: false },
        { id: '4-11', title: 'Hamstring Curl (and Single Leg Hamstring Curl)', completed: false },
      ]
    },
    {
      id: 'chapter-5',
      title: 'Chapter 5: Medium Leg Exercises',
      lessons: [
        { id: '5-1', title: 'Back Reverse Platform Lunge', completed: false },
        { id: '5-2', title: 'Back Kneeling Inner Thighs', completed: false },
        { id: '5-3', title: 'Back Carriage Lunge', completed: false },
        { id: '5-4', title: "Back Single Leg Squat", completed: false },
        { id: '5-5', title: 'Back Light Squats', completed: false },
        { id: '5-6', title: 'Back Standing Inner Thigh', completed: false },
        { id: '5-7', title: 'Well Lunge', completed: false },
        { id: '5-8', title: 'Back Reverse Floor Lunge (over the back platform)', completed: false },
      ]
    },
    {
      id: 'chapter-6',
      title: 'Chapter 6: Heavy Leg Exercises',
      lessons: [
        { id: '6-1', title: 'Standing Outer Thighs', completed: false },
        { id: '6-2', title: 'Heavy Squat', completed: false },
        { id: '6-3', title: 'Skater and Shifted Skater', completed: false },
        { id: '6-4', title: "Sprinter's Lunge", completed: false },
        { id: '6-5', title: "Side Kick", completed: false },
        { id: '6-6', title: "Black Widow", completed: false },
        { id: '6-7', title: 'Praying Mantis', completed: false },
        { id: '6-8', title: 'Donkey Kick', completed: false },
        { id: '6-9', title: 'Side Laying Leg Press', completed: false },
        { id: '6-10', title: 'Heavy Single Leg Press (in Bridge Position)', completed: false },
        { id: '6-11', title: 'Scooter Kick', completed: false },
        { id: '6-12', title: 'Heavy Carriage Lunge W\ ROW', completed: false },
        { id: '6-13', title: 'Bungee Kick', completed: false },
        { id: '6-14', title: 'Bungee Straight Leg', completed: false },
        { id: '6-15', title: 'Leg Block — different body positions & transitioning', completed: false },
        { id: '6-16', title: 'Leg Block — Practicing Cues', completed: false },
      ]
    },
    {
      id: 'chapter-7',
      title: 'Chapter 7: Oblique Exercises',
      lessons: [
        { id: '7-1', title: 'Torse Twist 1.0 & 2.0', completed: false },
        { id: '7-2', title: 'Oblique Sweep', completed: false },
        { id: '7-3', title: 'Oblique Kickback', completed: false },
        { id: '7-4', title: 'Oblique Glute Kickback', completed: false },
        { id: '7-5', title: 'Back Reverse Side Kneeling Crunch', completed: false },
        { id: '7-6', title: 'Twister', completed: false },
        { id: '7-7', title: 'Bicycle Kicks', completed: false },
        { id: '7-8', title: 'Side Plank', completed: false },
        { id: '7-9', title: 'Nighthawk', completed: false },
        { id: '7-10', title: 'Twisted Plank to Pike', completed: false },
        { id: '7-11', title: 'Twisted Ab Wheel', completed: false },
        { id: '7-12', title: 'Twisted Saw', completed: false },
        { id: '7-13', title: 'Dancing Panther', completed: false },
        { id: '7-14', title: 'Mermaid Crunch', completed: false },
        { id: '7-15', title: 'Bow and Arrow', completed: false },
        { id: '7-16', title: 'Twisted Forearm Plank to Pike', completed: false },
        { id: '7-17', title: 'Bird Dog and Reverse Bird Dog', completed: false },
        { id: '7-18', title: 'Oblique Block: different body positions', completed: false },
        { id: '7-19', title: 'Oblique Block: Practicing Cues', completed: false },
      ]
    },
    {
      id: 'chapter-8',
      title: 'Chapter 8: Upper Body Exercises',
      lessons: [
        { id: '8-1', title: 'Bicep Curl', completed: false },
        { id: '8-2', title: 'Alligator Jaw', completed: false },
        { id: '8-3', title: 'Chest Expansion', completed: false },
        { id: '8-4', title: 'Tricep KickBack', completed: false },
        { id: '8-5', title: 'Newspaper', completed: false },
        { id: '8-6', title: 'Serve the Platter & Serve the Party Platter', completed: false },
        { id: '8-7', title: 'Shoulder Press', completed: false },
        { id: '8-8', title: 'Tricep Extension', completed: false },
        { id: '8-9', title: 'Hug a Tree & Chest Press', completed: false },
        { id: '8-10', title: 'Forward Facing Bicep Curl', completed: false },
        { id: '8-11', title: 'Carriage Seated Row', completed: false },
        { id: '8-12', title: 'Carriage Seated Heavy Bicep Curl', completed: false },
        { id: '8-13', title: 'Back Seated Serve the Platter', completed: false },
        { id: '8-14', title: 'Back Seated Shoulder Press 1.0 & 2.0', completed: false },
        { id: '8-15', title: 'Back Seated Tricep Extension', completed: false },
        { id: '8-16', title: 'Back Kneeling Bicep Curl', completed: false },
        { id: '8-17', title: 'Back Kneeling Chest Expansion', completed: false },
        { id: '8-18', title: 'Handlebar Lat Pull, Bicep Curl, and Side Lat Pull (Obliques and Upper Body)', completed: false },
        { id: '8-19', title: 'Lat Pushdown', completed: false },
        { id: '8-20', title: 'Upper Body Block: different body positions', completed: false },
        { id: '8-21', title: 'Upper Body Block: Practicing Cues', completed: false },
      ]
    },
    {
      id: 'chapter-9',
      title: 'Chapter 9: Clients and Pregnancy',
      lessons: [
        { id: '9-1', title: 'A Conversation about Pregnancy 01', completed: false },
        { id: '9-2', title: 'A Conversation about Pregnancy 02', completed: false },
        { id: '9-3', title: 'Pregnant Clients: guidelines and information', completed: false },
        { id: '9-4', title: 'Pregnant Friendly Routine', completed: false },
      ]
    },
    {
      id: 'chapter-10',
      title: "Chapter 10: It's Practice Time!!",
      lessons: [
        { id: '10-1', title: 'How to Cue Variations (aka Challenges) & Variations for Exercises', completed: false },
        { id: '10-2', title: 'How to Cue', completed: false },
        { id: '10-3', title: 'Cues and Communication', completed: false },
        { id: '10-4', title: 'How to Formulate a Full Routine (45 min & 50 Min)', completed: false },
        { id: '10-5', title: 'how to formulate leg routines (light, heavy, progression, regression)', completed: false },
        { id: '10-6', title: 'When to Modify with Springs, Add Spring, and Use the Stabilization Bar', completed: false },
        { id: '10-7', title: 'My Review of a Workout Routine Created by a New Instructor (part 1)', completed: false },
        { id: '10-8', title: 'My Review of a Workout Routine Created by a New Instructor (part 2)', completed: false },
        { id: '10-9', title: 'My Review of a Workout Routine Created by a New Instructor (part 3)', completed: false },
        { id: '10-10', title: 'Mock Class In Portugal', completed: false },
        { id: '10-11', title: 'Ari Teaching a Mock Class', completed: false },
        { id: '10-12', title: 'Kenza Mock Class', completed: false },
        { id: '10-13', title: 'Erina teaching her mock class', completed: false },
      ]
    },
    {
      id: 'chapter-11',
      title: 'Extra Exercise Tutorials',
      lessons: [
        { id: '11-1', title: 'Stretches for after class', completed: false },
        { id: '11-2', title: 'The different variations (aka challenges) for exercises in each muscle group block', completed: false },
        { id: '11-3', title: 'Ab Wheel (Aka Wheelbarrow)', completed: false },
        { id: '11-4', title: 'Additional Upper Body: Seated, Kneeling, & Standing Exercises at the Back', completed: false },
        { id: '11-5', title: 'Back Plank to Pike', completed: false },
        { id: '11-6', title: 'Back Kneeling Crunch', completed: false },
        { id: '11-7', title: 'Back Reverse Twister (aka French Twist)', completed: false },
        { id: '11-8', title: 'Back Single Leg Squat', completed: false },
        { id: '11-9', title: 'Back Reverse Floor Lunge (on the side of the carriage) (another video)', completed: false },
        { id: '11-10', title: 'Back Floor Lunge (over the back platform) (another video)', completed: false },
        { id: '11-11', title: 'Black Widow (aka spider kick)', completed: false },
        { id: '11-12', title: 'Dancing Panther', completed: false },
        { id: '11-13', title: 'Forward Facing Bicep Curl (another video)', completed: false },
        { id: '11-14', title: 'Glute Kickback', completed: false },
        { id: '11-15', title: 'Praying Mantis (aka Spider Lunge)', completed: false },
        { id: '11-16', title: 'Reverse Plank to Pike', completed: false },
        { id: '11-17', title: 'Reverse Saw', completed: false },
        { id: '11-18', title: 'Reverse Twisted Plank to Pike', completed: false },
        { id: '11-19', title: 'Teaching Service the Platter to Lillian', completed: false },
        { id: '11-20', title: 'Super Lunge (aka fifth lunge)', completed: false },
        { id: '11-21', title: 'X-Lunge Variations', completed: false },
        { id: '11-22', title: 'Lat Pushdown, Handlebar Exercises, Exercises at the back using the short hard handles, Curtsy Single Leg Step Up', completed: false },
        { id: '11-23', title: '3 bird dog upper body oblique variations', completed: false },
        { id: '11-24', title: 'Spring Conversion from the Xformer to the Megacore', completed: false },
        { id: '11-25', title: 'New instructors practicing to cue upper body', completed: false },
        { id: '11-26', title: 'Learning form correction for platform lunge', completed: false },
        { id: '11-27', title: 'Form correction for Well Luge, X-lunge, and Back Single Leg squat', completed: false },
        { id: '11-28', title: 'How to correct Well Lunge and X-Lunge and Single legs Squat (Eleni)', completed: false },
      ]
    },
    {
      id: 'chapter-12',
      title: 'Full Workout Videos',
      lessons: [
        { id: '12-1', title: '40 minute Xformer Workout Video', completed: false },
        { id: '12-2', title: '45 minute Xformer Workout Video', completed: false },
        { id: '12-3', title: '12 minute Xformer Workout Video', completed: false },
        { id: '12-4', title: '45 minute Xformer Workout Video (2)', completed: false },
        { id: '12-5', title: '40 minute Xformer Workout Video (2)', completed: false },
        { id: '12-6', title: '40 minute Xformer Workout Video (3)', completed: false },
        { id: '12-7', title: '45 minute Xformer Workout Video (3)', completed: false },
        { id: '12-8', title: '44 minute Workout Video', completed: false },
        { id: '12-9', title: '45 minute Workout Video (4)', completed: false },
        { id: '12-10', title: '9-minute Workout at the Back', completed: false },
      ]
    },
  ];

  useEffect(() => {
    // Check if user is enrolled in this course
    if (typedUser && typedUser.courseProgress) {
      const isEnrolledInCourse = typedUser.courseProgress.some(cp => cp.courseId === COURSE_ID);
      setIsEnrolled(isEnrolledInCourse);
    } else if (typedUser && typedUser._id === 'local-user') {
      // Local user (anonymous) - allow access
      setIsEnrolled(true);
    } else if (typedUser === null && !progressLoading) {
      // No user data and not loading - allow anonymous access
      setIsEnrolled(false);
    }
    
    setIsLoading(false);
  }, [typedUser, progressLoading]);

  // Progress updates are now handled by the useUserProgress hook

  const handleChapterClick = (chapterId: string) => {
    setSelectedChapter(selectedChapter === chapterId ? null : chapterId);
  };

  // Debug function to check lesson completion status
  const debugLessonStatus = (lessonId: string) => {
    console.log(`🔍 Debugging lesson ${lessonId}:`);
    console.log('- completedLessons array:', completedLessons);
    console.log('- isLessonCompleted result:', isLessonCompleted(lessonId));
    console.log('- user data:', typedUser);
    console.log('- progress:', progress);
    
    if (typedUser?.courseProgress) {
      const courseProgress = typedUser.courseProgress.find((cp: any) => cp.courseId === 'level1-reformers');
      if (courseProgress) {
        console.log('- course progress:', courseProgress);
        console.log('- completed lessons in course progress:', courseProgress.completedLessons);
      }
    }
  };

  // Add useEffect to log when completedLessons changes
  useEffect(() => {
    console.log('📊 Course page - completedLessons updated:', completedLessons);
    console.log('📊 Course page - progress updated:', progress);
  }, [completedLessons, progress]);


  const handleLessonComplete = (chapterId: string, lessonId: string) => {
    console.log(`Marking lesson ${lessonId} in chapter ${chapterId} as complete`);
  };

  const handleEnroll = async () => {
    if (!typedUser) return;
    setEnrolling(true);
    try {
      const res = await fetch('/api/user/update-progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: typedUser._id,
          courseId: COURSE_ID,
          courseName: COURSE_NAME,
          progress: 0
        })
      });
      if (res.ok) {
        const data = await res.json();
        // Update localStorage user
        const updatedUser = { ...typedUser };
        if (!updatedUser.courseProgress) updatedUser.courseProgress = [];
        updatedUser.courseProgress.push(data.courseProgress);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setIsEnrolled(true);
      }
    } finally {
      setEnrolling(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  if (!typedUser) return null;

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Header */}
              <div className="border-b border-[#E2DDB4] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-extrabold text-[#000000]">ESCP Level 1 Training</h1>
              <p className="text-[#000000]/60">All Reformers Course</p>
            </div>
            <div className="flex items-center gap-4">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg border border-[#E2DDB4] hover:bg-[#E2DDB4]/40 transition-colors"
              >
                <span className="text-[#000000] font-bold text-lg">☰</span>
              </button>
              <Link href="/courses" className="text-[#000000] hover:text-[#E43636] font-medium transition-colors">
                Back to Courses
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Sidebar */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          {/* Sidebar */}
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl border-l border-[#E2DDB4]">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-[#000000]">Course Navigation</h3>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-[#E2DDB4]/40 transition-colors"
                >
                  <span className="text-[#000000] font-bold text-lg">✕</span>
                </button>
              </div>
              <div className="space-y-2 max-h-[calc(100vh-120px)] overflow-y-auto">
                {chapters.map((chapter, index) => (
                  <div key={chapter.id} className="border-b border-[#E2DDB4] pb-2">
                    <button
                      onClick={() => {
                        setSelectedChapter(selectedChapter === chapter.id ? null : chapter.id);
                      }}
                      className="w-full text-left p-3 rounded-lg hover:bg-[#E2DDB4]/40 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#E43636] text-[#F6EFD2] flex items-center justify-center text-sm font-semibold">
                            {index + 1}
                          </div>
                          <span className="font-medium text-[#000000] text-sm">{chapter.title}</span>
                        </div>
                        <span
                          className={`text-[#000000] transition-transform duration-200 ${
                            selectedChapter === chapter.id ? 'rotate-180' : ''
                          }`}
                        >
                          ▼
                        </span>
                      </div>
                    </button>
                    {selectedChapter === chapter.id && (
                      <div className="ml-11 mt-2 space-y-1">
                        {chapter.lessons.map((lesson, lessonIdx) => (
                          <Link
                            key={lesson.id}
                            href={`/courses/level1-reformers/content/${chapter.id}/${lesson.id}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block p-2 rounded hover:bg-[#E2DDB4]/40 transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-[#E43636] text-[#F6EFD2] flex items-center justify-center text-xs font-semibold">
                                {lessonIdx + 1}
                              </div>
                              <span className="text-sm text-[#000000]/80">{lesson.title}</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {!isEnrolled && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={handleEnroll}
            disabled={enrolling}
            className="w-full bg-[#E43636] text-[#F6EFD2] py-3 px-4 rounded-lg font-medium hover:bg-[#000000] hover:text-[#F6EFD2] transition-all duration-200 shadow-md mb-6 border border-[#E43636]"
          >
            {enrolling ? 'Enrolling...' : 'Enroll in this Course'}
          </button>
        </div>
      )}

      {/* Progress Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow p-6 mb-8 border border-[#E2DDB4]"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[#000000]">Course Progress</h2>
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-[#E43636]">{progress}%</span>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between text-sm text-[#000000]/80 mb-2">
              <span>Overall Progress</span>
              <span>{completedLessons.length} / 147 lessons</span>
            </div>
            <div className="w-full bg-white rounded-full h-3 border border-[#E2DDB4]">
              <div
                className="h-3 rounded-full bg-[#E43636] transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#E43636]">{completedChapters.length}</div>
              <div className="text-sm text-[#000000]">Chapters Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#E43636]">{chapters.length - completedChapters.length}</div>
              <div className="text-sm text-[#000000]">Chapters Remaining</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#E43636]">147</div>
              <div className="text-sm text-[#000000]">Total Lessons</div>
            </div>
          </div>
        </motion.div>

        {/* Course Chapters */}
        <div className="space-y-6">
          {chapters.map((chapter, index) => (
            <motion.div
              key={chapter.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow overflow-hidden border border-[#E2DDB4]"
            >
              <div
                className="p-6 cursor-pointer hover:bg-[#F6EFD2]/40 transition-colors duration-200"
                onClick={() => handleChapterClick(chapter.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-[#E43636] text-[#F6EFD2] flex items-center justify-center text-sm font-semibold">{index + 1}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#000000]">{chapter.title}</h3>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-[#000000]/60">
                        <span>Lessons: {chapter.lessons.length}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-[#000000] transition-transform duration-200 ${
                        selectedChapter === chapter.id ? 'rotate-180' : ''
                      }`}
                    >
                      ▼
                    </span>
                  </div>
                </div>
              </div>

              {/* Chapter Lessons */}
              {selectedChapter === chapter.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-[#E2DDB4]"
                >
                  <div className="p-6 space-y-4">
                    {chapter.lessons.map((lesson, lessonIdx) => (
                      <Link
                        key={lesson.id}
                        href={`/courses/level1-reformers/content/${chapter.id}/${lesson.id}`}
                        className="block"
                      >
                        <div className={`flex items-center justify-between p-4 rounded-lg transition-colors duration-200 cursor-pointer ${
                          isLessonCompleted(lesson.id) 
                            ? 'bg-green-50 border border-green-200 hover:bg-green-100' 
                            : 'bg-white hover:bg-[#E2DDB4]/40'
                        }`}
                        onDoubleClick={() => debugLessonStatus(lesson.id)}>
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                              isLessonCompleted(lesson.id)
                                ? 'bg-green-600 text-white'
                                : 'bg-[#E43636] text-[#F6EFD2]'
                            }`}>
                              {lessonIdx + 1}
                            </div>
                            <div>
                              <h4 className={`font-medium text-sm ${
                                isLessonCompleted(lesson.id) 
                                  ? 'text-green-800' 
                                  : 'text-[#000000]'
                              }`}>
                                {lesson.title}
                              </h4>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {isLessonCompleted(lesson.id) ? (
                              <div className="flex items-center justify-center w-6 h-6 bg-green-100 rounded-full">
                                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                            ) : (
                              <>
                                <span className="text-sm text-[#000000]/60">Click to view lesson</span>
                                <span className="text-[#E43636] font-bold">→</span>
                              </>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
