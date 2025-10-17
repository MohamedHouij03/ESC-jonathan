'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Lesson {
  id: string;
  title: string;
}

interface Chapter {
  id: string;
  title: string;
  lessons: Lesson[];
}

const LEVEL1_REFORMERS_LESSONS: Record<string, Chapter> = {
  'chapter-1': {
    id: 'chapter-1',
    title: 'Chapter 1: Introduction',
    lessons: [
      { id: '1-1', title: 'The Anatomy of the Xformer' },
      { id: '1-2', title: 'Move Slow: High intensity and Low Impact' }
    ]
  },
  'chapter-2': {
    id: 'chapter-2',
    title: 'Chapter 2: Abdominal Exercises',
    lessons: [
      { id: '2-1', title: 'Anatomy of Rectus Abdominis' },
      { id: '2-2', title: 'Kneeling Crunch (rainbow crunch)' },
      { id: '2-3', title: 'Straight Arm Crunch' },
      { id: '2-4', title: 'Knee Strap Crunch' },
      { id: '2-5', title: 'Seated Crunch' }
    ]
  },
  'chapter-3': {
    id: 'chapter-3',
    title: 'Chapter 3: Core Exercises',
    lessons: [
      { id: '3-1', title: 'Anatomy of Transverse Abdominis' },
      { id: '3-2', title: 'Ab Wheel' },
      { id: '3-3', title: 'Saw' },
      { id: '3-4', title: 'Plank to Pike & Forearm Plank to Pike' },
      { id: '3-5', title: 'Panther' },
      { id: '3-6', title: 'Reverse Boomerang & Back Boomerang' },
      { id: '3-7', title: 'Seal & Reverse Seal' },
      { id: '3-8', title: 'Angel' },
      { id: '3-9', title: 'Core & Abdominal Block: different body positions & transitioning' },
      { id: '3-10', title: 'Core and Abdominal Block: Practicing Cues' }
    ]
  },
  'chapter-4': {
    id: 'chapter-4',
    title: 'Chapter 4: Light Leg Exercises',
    lessons: [
      { id: '4-1', title: 'Platform Lunge' },
      { id: '4-2', title: 'Single Leg Squat' },
      { id: '4-3', title: 'Carriage Lunge' },
      { id: '4-4', title: 'Floor Lunge' },
      { id: '4-5', title: 'Side Lunge' },
      { id: '4-6', title: 'Light Squats' },
      { id: '4-7', title: 'Curtsy Lunge' },
      { id: '4-8', title: 'Standing Inner Thighs' },
      { id: '4-9', title: 'Squatting Inner Thighs' },
      { id: '4-10', title: 'Kneeling Inner Thighs' },
      { id: '4-11', title: 'Hamstring Curl (and Single Leg Hamstring Curl)' }
    ]
  },
  'chapter-5': {
    id: 'chapter-5',
    title: 'Chapter 5: Medium Leg Exercises',
    lessons: [
      { id: '5-1', title: 'Back Reverse Platform Lunge' },
      { id: '5-2', title: 'Back Kneeling Inner Thighs' },
      { id: '5-3', title: 'Back Carriage Lunge' },
      { id: '5-4', title: "Back Single Leg Squat" },
      { id: '5-5', title: 'Back Light Squats' },
      { id: '5-6', title: 'Back Standing Inner Thigh' },
      { id: '5-7', title: 'Well Lunge' },
      { id: '5-8', title: 'Back Reverse Floor Lunge (over the back platform)' }
    ]
  },
  'chapter-6': {
    id: 'chapter-6',
    title: 'Chapter 6: Heavy Leg Exercises',
    lessons: [
      { id: '6-1', title: 'Standing Outer Thighs' },
      { id: '6-2', title: 'Heavy Squat' },
      { id: '6-3', title: 'Skater and Shifted Skater' },
      { id: '6-4', title: "Sprinter's Lunge" },
      { id: '6-5', title: "Side Kick" },
      { id: '6-6', title: "Black Widow" },
      { id: '6-7', title: 'Praying Mantis' },
      { id: '6-8', title: 'Donkey Kick' },
      { id: '6-9', title: 'Side Laying Leg Press' },
      { id: '6-10', title: 'Heavy Single Leg Press (in Bridge Position)' },
      { id: '6-11', title: 'Scooter Kick' },
      { id: '6-12', title: 'Heavy Carriage Lunge W\ ROW' },
      { id: '6-13', title: 'Bungee Kick' },
      { id: '6-14', title: 'Bungee Straight Leg' },
      { id: '6-15', title: 'Leg Block — different body positions & transitioning' },
      { id: '6-16', title: 'Leg Block — Practicing Cues' }
    ]
  },
  'chapter-7': {
    id: 'chapter-7',
    title: 'Chapter 7: Oblique Exercises',
    lessons: [
      { id: '7-1', title: 'Torse Twist 1.0 & 2.0' },
      { id: '7-2', title: 'Oblique Sweep' },
      { id: '7-3', title: 'Oblique Kickback' },
      { id: '7-4', title: 'Oblique Glute Kickback' },
      { id: '7-5', title: 'Back Reverse Side Kneeling Crunch' },
      { id: '7-6', title: 'Twister' },
      { id: '7-7', title: 'Bicycle Kicks' },
      { id: '7-8', title: 'Side Plank' },
      { id: '7-9', title: 'Nighthawk' },
      { id: '7-10', title: 'Twisted Plank to Pike' },
      { id: '7-11', title: 'Twisted Ab Wheel' },
      { id: '7-12', title: 'Twisted Saw' },
      { id: '7-13', title: 'Dancing Panther' },
      { id: '7-14', title: 'Mermaid Crunch' },
      { id: '7-15', title: 'Bow and Arrow' },
      { id: '7-16', title: 'Twisted Forearm Plank to Pike' },
      { id: '7-17', title: 'Bird Dog and Reverse Bird Dog' },
      { id: '7-18', title: 'Oblique Block: different body positions' },
      { id: '7-19', title: 'Oblique Block: Practicing Cues' }
    ]
  },
  'chapter-8': {
    id: 'chapter-8',
    title: 'Chapter 8: Upper Body Exercises',
    lessons: [
      { id: '8-1', title: 'Bicep Curl' },
      { id: '8-2', title: 'Alligator Jaw' },
      { id: '8-3', title: 'Chest Expansion' },
      { id: '8-4', title: 'Tricep KickBack' },
      { id: '8-5', title: 'Newspaper' },
      { id: '8-6', title: 'Serve the Platter & Serve the Party Platter' },
      { id: '8-7', title: 'Shoulder Press' },
      { id: '8-8', title: 'Tricep Extension' },
      { id: '8-9', title: 'Hug a Tree & Chest Press' },
      { id: '8-10', title: 'Forward Facing Bicep Curl' },
      { id: '8-11', title: 'Carriage Seated Row' },
      { id: '8-12', title: 'Carriage Seated Heavy Bicep Curl' },
      { id: '8-13', title: 'Back Seated Serve the Platter' },
      { id: '8-14', title: 'Back Seated Shoulder Press 1.0 & 2.0' },
      { id: '8-15', title: 'Back Seated Tricep Extension' },
      { id: '8-16', title: 'Back Kneeling Bicep Curl' },
      { id: '8-17', title: 'Back Kneeling Chest Expansion' },
      { id: '8-18', title: 'Handlebar Lat Pull, Bicep Curl, and Side Lat Pull (Obliques and Upper Body)' },
      { id: '8-19', title: 'Lat Pushdown' },
      { id: '8-20', title: 'Upper Body Block: different body positions' },
      { id: '8-21', title: 'Upper Body Block: Practicing Cues' }
    ]
  },
  'chapter-9': {
    id: 'chapter-9',
    title: 'Chapter 9: Clients and Pregnancy',
    lessons: [
      { id: '9-1', title: 'A Conversation about Pregnancy 01' },
      { id: '9-2', title: 'A Conversation about Pregnancy 02' },
      { id: '9-3', title: 'Pregnant Clients: guidelines and information' },
      { id: '9-4', title: 'Pregnant Friendly Routine' }
    ]
  },
  'chapter-10': {
    id: 'chapter-10',
    title: "Chapter 10: It's Practice Time!!",
    lessons: [
      { id: '10-1', title: 'How to Cue Variations (aka Challenges) & Variations for Exercises' },
      { id: '10-2', title: 'How to Cue' },
      { id: '10-3', title: 'Cues and Communication' },
      { id: '10-4', title: 'How to Formulate a Full Routine (45 min & 50 Min)' },
      { id: '10-5', title: 'how to formulate leg routines (light, heavy, progression, regression)' },
      { id: '10-6', title: 'When to Modify with Springs, Add Spring, and Use the Stabilization Bar' },
      { id: '10-7', title: 'My Review of a Workout Routine Created by a New Instructor (part 1)' },
      { id: '10-8', title: 'My Review of a Workout Routine Created by a New Instructor (part 2)' },
      { id: '10-9', title: 'My Review of a Workout Routine Created by a New Instructor (part 3)' },
      { id: '10-10', title: 'Mock Class In Portugal' },
      { id: '10-11', title: 'Ari Teaching a Mock Class' },
      { id: '10-12', title: 'Kenza Mock Class' },
      { id: '10-13', title: 'Erina teaching her mock class' }
    ]
  },
  'chapter-11': {
    id: 'chapter-11',
    title: 'Extra Exercise Tutorials',
    lessons: [
      { id: '11-1', title: 'Stretches for after class' },
      { id: '11-2', title: 'The different variations (aka challenges) for exercises in each muscle group block' },
      { id: '11-3', title: 'Ab Wheel (Aka Wheelbarrow)' },
      { id: '11-4', title: 'Additional Upper Body: Seated, Kneeling, & Standing Exercises at the Back' },
      { id: '11-5', title: 'Back Plank to Pike' },
      { id: '11-6', title: 'Back Kneeling Crunch' },
      { id: '11-7', title: 'Back Reverse Twister (aka French Twist)' },
      { id: '11-8', title: 'Back Single Leg Squat' },
      { id: '11-9', title: 'Back Reverse Floor Lunge (on the side of the carriage) (another video)' },
      { id: '11-10', title: 'Back Floor Lunge (over the back platform) (another video)' },
      { id: '11-11', title: 'Black Widow (aka spider kick)' },
      { id: '11-12', title: 'Dancing Panther' },
      { id: '11-13', title: 'Forward Facing Bicep Curl (another video)' },
      { id: '11-14', title: 'Glute Kickback' },
      { id: '11-15', title: 'Praying Mantis (aka Spider Lunge)' },
      { id: '11-16', title: 'Reverse Plank to Pike' },
      { id: '11-17', title: 'Reverse Saw' },
      { id: '11-18', title: 'Reverse Twisted Plank to Pike' },
      { id: '11-19', title: 'Teaching Service the Platter to Lillian' },
      { id: '11-20', title: 'Super Lunge (aka fifth lunge)' },
      { id: '11-21', title: 'X-Lunge Variations' },
      { id: '11-22', title: 'Lat Pushdown, Handlebar Exercises, Exercises at the back using the short hard handles, Curtsy Single Leg Step Up' },
      { id: '11-23', title: '3 bird dog upper body oblique variations' },
      { id: '11-24', title: 'Spring Conversion from the Xformer to the Megacore' },
      { id: '11-25', title: 'New instructors practicing to cue upper body' },
      { id: '11-26', title: 'Learning form correction for platform lunge' },
      { id: '11-27', title: 'Form correction for Well Luge, X-lunge, and Back Single Leg squat' },
      { id: '11-28', title: 'How to correct Well Lunge and X-Lunge and Single legs Squat (Eleni)' }
    ]
  },
  'chapter-12': {
    id: 'chapter-12',
    title: 'Chapter 12: Full Workout Videos',
    lessons: [
      { id: '12-1', title: '40 minute Xformer Workout Video' },
      { id: '12-2', title: '45 minute Xformer Workout Video' },
      { id: '12-3', title: '12 minute Xformer Workout Video' },
      { id: '12-4', title: '45 minute Xformer Workout Video (2)' },
      { id: '12-5', title: '40 minute Xformer Workout Video (2)' },
      { id: '12-6', title: '40 minute Xformer Workout Video (3)' },
      { id: '12-7', title: '45 minute Xformer Workout Video (3)' },
      { id: '12-8', title: '44 minute Workout Video' },
      { id: '12-9', title: '45 minute Workout Video (4)' },
      { id: '12-10', title: '9-minute Workout at the Back' }
    ]
  }
};

export default function LessonCompletionManager() {
  const [selectedLessons, setSelectedLessons] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [user, setUser] = useState<any>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Load user data and completed lessons from localStorage or Supabase
    const userData = localStorage.getItem('user');
    const localProgressData = localStorage.getItem('localProgress');
    
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      
      const courseProgress = parsedUser.courseProgress?.find((cp: any) => cp.courseId === 'level1-reformers');
      if (courseProgress) {
        setCompletedLessons(courseProgress.completedLessons?.map((l: any) => l.lessonId) || []);
        setProgress(courseProgress.progress || 0);
      }
    } else if (localProgressData) {
      const parsedLocal = JSON.parse(localProgressData);
      setUser(parsedLocal);
      
      const courseProgress = parsedLocal.courseProgress?.find((cp: any) => cp.courseId === 'level1-reformers');
      if (courseProgress) {
        setCompletedLessons(courseProgress.completedLessons?.map((l: any) => l.lessonId) || []);
        setProgress(courseProgress.progress || 0);
      }
    }
  }, []);

  // Handle lesson selection toggling
  const handleLessonToggle = (lessonId: string) => {
    setSelectedLessons(prev => {
      if (prev.includes(lessonId)) {
        // Deselect the lesson
        return prev.filter(id => id !== lessonId);
      } else {
        // Select the lesson
        return [...prev, lessonId];
      }
    });
  };

  // Handle chapter selection toggling (select/deselect all lessons in a chapter)
  const handleChapterToggle = (chapterId: string) => {
    const chapter = LEVEL1_REFORMERS_LESSONS[chapterId];
    if (!chapter) return;

    const chapterLessonIds = chapter.lessons.map(lesson => lesson.id);
    const allSelected = chapterLessonIds.every(id => selectedLessons.includes(id));
    
    if (allSelected) {
      // Deselect all lessons in this chapter
      setSelectedLessons(prev => prev.filter(id => !chapterLessonIds.includes(id)));
    } else {
      // Select all lessons in this chapter
      setSelectedLessons(prev => [...new Set([...prev, ...chapterLessonIds])]);
    }
  };

  // Handle select/deselect all lessons
  const handleSelectAll = () => {
    const allLessonIds = Object.values(LEVEL1_REFORMERS_LESSONS)
      .flatMap(chapter => chapter.lessons.map(lesson => lesson.id));
    
    const allSelected = allLessonIds.every(id => selectedLessons.includes(id));
    
    if (allSelected) {
      setSelectedLessons([]);
    } else {
      setSelectedLessons(allLessonIds);
    }
  };

  // Function to mark selected lessons as completed
  const markSelectedAsCompleted = async () => {
    console.log("Selected Lessons before API call:", selectedLessons);
    if (selectedLessons.length === 0) {
      alert('Please select at least one lesson to mark as completed.');
      return;
    }

    setIsProcessing(true);
    
    try {
      const courseId = 'level1-reformers';
      const courseName = 'Level 1 Reformers';
      
      // Process each selected lesson
      for (const lessonId of selectedLessons) {
        // Find lesson and chapter info
        let lessonTitle = '';
        let chapterId = '';
        let chapterName = '';
        
        for (const [chapterKey, chapter] of Object.entries(LEVEL1_REFORMERS_LESSONS)) {
          const lesson = chapter.lessons.find(l => l.id === lessonId);
          if (lesson) {
            lessonTitle = lesson.title;
            chapterId = chapterKey.replace('chapter-', '');
            chapterName = `Chapter ${chapterId}`;
            break;
          }
        }

        if (user && user._id && user._id !== 'local-user') {
          // Save to database for logged-in users
          const response = await fetch('/api/user/complete-lesson', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: user._id,
              courseId: courseId,
              courseName: courseName,
              chapterId: chapterId,
              chapterName: chapterName,
              lessonId: lessonId,
              lessonTitle: lessonTitle,
            }),
          });
          
          const data = await response.json();
          
          if (data.success && data.courseProgress) {
            // Update local storage with new progress
            const updatedUser = { ...user };
            if (!updatedUser.courseProgress) updatedUser.courseProgress = [];
            const courseProgressIndex = updatedUser.courseProgress.findIndex((cp: any) => cp.courseId === courseId);
            if (courseProgressIndex !== -1) {
              updatedUser.courseProgress[courseProgressIndex] = data.courseProgress;
            } else {
              updatedUser.courseProgress.push(data.courseProgress);
            }
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setUser(updatedUser);
            setCompletedLessons(data.courseProgress.completedLessons?.map((l: any) => l.lessonId) || []);
            setProgress(data.courseProgress.progress || 0);
            
            // Dispatch event to notify other components
            window.dispatchEvent(new CustomEvent('progressUpdated', {
              detail: { courseId, courseProgress: data.courseProgress }
            }));
          }
        } else {
          // Save to local storage for anonymous users
          const localUser = {
            _id: 'local-user',
            name: 'Local User',
            email: 'local@example.com',
            courseProgress: user?.courseProgress || []
          };
          
          // Find or create course progress
          let courseProgress = localUser.courseProgress.find((cp: any) => cp.courseId === courseId);
          if (!courseProgress) {
            courseProgress = {
              courseId: courseId,
              courseName: courseName,
              progress: 0,
              completedChapters: [],
              completedLessons: [],
              lastAccessed: new Date(),
              startedAt: new Date(),
            };
            localUser.courseProgress.push(courseProgress);
          }
          
          // Add completed lesson if not already completed
          const existingLesson = courseProgress.completedLessons.find(
            (completedLesson: any) => completedLesson.lessonId === lessonId
          );
          if (!existingLesson) {
            courseProgress.completedLessons.push({
              lessonId: lessonId,
              lessonTitle: lessonTitle,
              chapterId: chapterId || '',
              chapterName: chapterName || '',
              completedAt: new Date(),
            });
          }
          
          // Calculate progress percentage
          const totalLessons = 147; // Total lessons in level1-reformers
          courseProgress.progress = Math.round((courseProgress.completedLessons.length / totalLessons) * 100);
          
          // Save to localStorage
          localStorage.setItem('localProgress', JSON.stringify(localUser));
          setUser(localUser);
          setCompletedLessons(courseProgress.completedLessons.map((l: any) => l.lessonId));
          setProgress(courseProgress.progress);
        }
        
        // Small delay to avoid overwhelming the server
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      // Clear selection
      setSelectedLessons([]); 
      
      // Trigger progress update event
      window.dispatchEvent(new CustomEvent('progressUpdated', { 
        detail: { courseId: courseId, progress: progress } 
      }));
      
      alert(`Successfully marked ${selectedLessons.length} lessons as completed!`);
      
    } catch (error) {
      console.error('Error marking lessons as completed:', error);
      alert('Error marking lessons as completed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const totalLessons = Object.values(LEVEL1_REFORMERS_LESSONS).reduce((sum, chapter) => sum + chapter.lessons.length, 0);
  const completedCount = completedLessons.length;
  const selectedCount = selectedLessons.length;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#E43636] mb-4">Level 1 Reformers - Lesson Completion Manager</h1>
        
        {/* Progress Overview */}
        <div className="bg-[#F6EFD2] rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-[#E43636] mb-4">Progress Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#E43636]">{completedCount}</div>
              <div className="text-sm text-gray-600">Completed Lessons</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#E43636]">{totalLessons - completedCount}</div>
              <div className="text-sm text-gray-600">Remaining Lessons</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#E43636]">{progress}%</div>
              <div className="text-sm text-gray-600">Overall Progress</div>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-[#E43636] h-3 rounded-full transition-all duration-500" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-6">
          <motion.button
            onClick={handleSelectAll}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {selectedCount === totalLessons ? 'Deselect All' : 'Select All'}
          </motion.button>
          
          <motion.button
            onClick={markSelectedAsCompleted}
            disabled={selectedCount === 0 || isProcessing}
            whileHover={{ scale: selectedCount > 0 && !isProcessing ? 1.05 : 1 }}
            whileTap={{ scale: selectedCount > 0 && !isProcessing ? 0.95 : 1 }}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
              selectedCount === 0 || isProcessing
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {isProcessing ? (
              <>
                <svg className="w-4 h-4 mr-2 animate-spin inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Processing...
              </>
            ) : (
              `Mark ${selectedCount} Lessons as Completed`
            )}
          </motion.button>
        </div>
      </div>

      {/* Chapters */}
      <div className="space-y-6">
        {Object.values(LEVEL1_REFORMERS_LESSONS).map((chapter) => {
          const chapterLessonIds = chapter.lessons.map(lesson => lesson.id);
          const chapterCompletedCount = chapter.lessons.filter(lesson => completedLessons.includes(lesson.id)).length;
          const chapterSelectedCount = chapter.lessons.filter(lesson => selectedLessons.includes(lesson.id)).length;
          const allChapterSelected = chapterLessonIds.every(id => selectedLessons.includes(id));
          
          return (
            <div key={chapter.id} className="border border-gray-200 rounded-lg overflow-hidden">
              {/* Chapter Header */}
              <div 
                className="bg-[#F6EFD2] p-4 cursor-pointer hover:bg-[#E2DDB4] transition-colors"
                onClick={() => handleChapterToggle(chapter.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      checked={allChapterSelected}
                      onChange={() => handleChapterToggle(chapter.id)}
                      className="w-4 h-4 text-[#E43636] rounded focus:ring-[#E43636]"
                    />
                    <h3 className="text-lg font-semibold text-[#E43636]">{chapter.title}</h3>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">
                      {chapterCompletedCount}/{chapter.lessons.length} completed
                    </span>
                    <span className="text-sm text-gray-600">
                      {chapterSelectedCount} selected
                    </span>
                    <svg 
                      className={`w-5 h-5 text-[#E43636] transition-transform ${allChapterSelected ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Chapter Lessons */}
              <div className="bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-4">
                  {chapter.lessons.map((lesson) => {
                    const isCompleted = completedLessons.includes(lesson.id);
                    const isSelected = selectedLessons.includes(lesson.id);
                    
                    return (
                      <div
                        key={lesson.id}
                        className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                          isCompleted
                            ? 'bg-green-50 border-green-200'
                            : isSelected
                            ? 'bg-blue-50 border-blue-200'
                            : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                        }`}
                        onClick={() => handleLessonToggle(lesson.id)}
                      >
                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleLessonToggle(lesson.id)}
                            className="w-4 h-4 text-[#E43636] rounded focus:ring-[#E43636]"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium text-gray-900">{lesson.id}</span>
                              {isCompleted && (
                                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                            <p className="text-xs text-gray-600 truncate">{lesson.title}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
