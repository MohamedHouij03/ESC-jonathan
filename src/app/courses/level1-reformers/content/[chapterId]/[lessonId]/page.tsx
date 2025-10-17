"use client";

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Lesson {
  id: string;
  title: string;
  completed: boolean;
}

interface Chapter {
  id: string;
  title: string;
  lessons: Lesson[];
}

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const { chapterId, lessonId } = params as { chapterId: string; lessonId: string };
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // This would typically come from an API or database
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
        { id: '3-1', title: 'Anatomy of Transverse Abdominis (Copy)', completed: false },
        { id: '3-2', title: 'Ab Wheel', completed: false },
        { id: '3-3', title: 'Ab Wheel (another video)', completed: false },
        { id: '3-4', title: 'Flying Ab Wheel', completed: false },
        { id: '3-5', title: 'Saw', completed: false },
        { id: '3-6', title: 'Saw (another video)', completed: false },
        { id: '3-7', title: 'Plank to Pike & Forearm Plank to Pike', completed: false },
        { id: '3-8', title: 'Panther', completed: false },
        { id: '3-9', title: 'Panther Variations / Challenges', completed: false },
        { id: '3-10', title: 'Panther (another video)', completed: false },
        { id: '3-11', title: 'Hi Panther', completed: false },
        { id: '3-12', title: 'Back Reverse Hi Panther', completed: false },
        { id: '3-13', title: 'Heavy Panther', completed: false },
        { id: '3-14', title: 'Reverse Boomerang', completed: false },
        { id: '3-15', title: 'Seal', completed: false },
        { id: '3-16', title: 'Seal (Another Video)', completed: false },
        { id: '3-17', title: 'Angel', completed: false },
        { id: '3-18', title: 'Angel (Another Video)', completed: false },
        { id: '3-19', title: 'Reverse Angel', completed: false },
        { id: '3-20', title: 'Core & Abdominal Block: different body positions & transitioning', completed: false },
        { id: '3-21', title: 'Core and Abdominal Block: Practicing Cues', completed: false },
      ]
    },
    {
      id: 'chapter-4',
      title: 'Chapter 4: Light Leg Exercises',
      lessons: [
        { id: '4-1', title: 'Platform Lunge', completed: false },
        { id: '4-2', title: 'Platform Lunge (another video)', completed: false },
        { id: '4-3', title: 'Single Leg Squat', completed: false },
        { id: '4-4', title: 'Single Leg Squat (another video)', completed: false },
        { id: '4-5', title: 'Carriage Lunge', completed: false },
        { id: '4-6', title: 'Floor Lunge', completed: false },
        { id: '4-7', title: 'Side Lunge', completed: false },
        { id: '4-8', title: 'Side Lunge (another video)', completed: false },
        { id: '4-9', title: 'Light Squats', completed: false },
        { id: '4-10', title: 'Light Squats (Another Video)', completed: false },
        { id: '4-11', title: 'Curtsy Lunge', completed: false },
        { id: '4-12', title: 'Curtsy Lunge (another video)', completed: false },
        { id: '4-13', title: 'Standing Inner Thighs', completed: false },
        { id: '4-14', title: 'Standing Inner Thighs (Another Video)', completed: false },
        { id: '4-15', title: 'Squatting Inner Thighs', completed: false },
        { id: '4-16', title: 'Kneeling Inner Thighs', completed: false },
        { id: '4-17', title: 'Hamstring Curl (and Single Leg Hamstring Curl)', completed: false },
      ]
    },
    {
      id: 'chapter-5',
      title: 'Chapter 5: Medium Leg Exercises',
      lessons: [
        { id: '5-1', title: 'Back Reverse Platform Lunge', completed: false },
        { id: '5-2', title: 'Back Reverse Platform Lunge (another video)', completed: false },
        { id: '5-3', title: 'Back Kneeling Inner Thighs', completed: false },
        { id: '5-4', title: "Unpopular Opinion: Inner Thighs DON'T have to be performed on both sides", completed: false },
        { id: '5-5', title: 'Back Kneeling Inner Thighs (Another Video)', completed: false },
        { id: '5-6', title: 'Back Carriage Lunge', completed: false },
        { id: '5-7', title: 'Back Single Leg Squat', completed: false },
        { id: '5-8', title: 'Back Single Leg Squat (Another Video)', completed: false },
        { id: '5-9', title: 'Back Light Squats', completed: false },
        { id: '5-10', title: 'Back Standing Inner Thighs', completed: false },
        { id: '5-11', title: 'Well Lunge', completed: false },
        { id: '5-12', title: 'Well Lunge (another video)', completed: false },
        { id: '5-13', title: 'Well Lunge (another video 2)', completed: false },
        { id: '5-14', title: 'Back Reverse Floor Lunge (over back platform)', completed: false },
        { id: '5-15', title: 'Back Reverse Floor Lunge (over back platform) Another Video', completed: false },
        { id: '5-16', title: 'Back Reverse Floor Lunge (on the side of the carriage)', completed: false },
      ]
    },
    {
      id: 'chapter-6',
      title: 'Chapter 6: Heavy Leg Exercises',
      lessons: [
        { id: '6-1', title: 'Standing Outer Thighs', completed: false },
        { id: '6-2', title: 'Heavy Squat', completed: false },
        { id: '6-3', title: 'Skater and Shifted Skater', completed: false },
        { id: '6-4', title: 'Staggered Skater', completed: false },
        { id: '6-5', title: "Sprinter's Lunge", completed: false },
        { id: '6-6', title: "Sprinter's Lunge (another video)", completed: false },
        { id: '6-7', title: 'Side Kick', completed: false },
        { id: '6-8', title: 'Black Widow', completed: false },
        { id: '6-9', title: 'Praying Mantis', completed: false },
        { id: '6-10', title: 'Praying Mantis (Another Video)', completed: false },
        { id: '6-11', title: 'Praying Mantis (HONOR)', completed: false },
        { id: '6-12', title: 'Donkey Kick', completed: false },
        { id: '6-13', title: 'Side Laying Leg Press', completed: false },
        { id: '6-14', title: 'Single Leg Press (in a glute bridge position)', completed: false },
        { id: '6-15', title: 'Scooter Kick', completed: false },
        { id: '6-16', title: 'Heavy Carriage Lunge w/ Row', completed: false },
        { id: '6-17', title: 'Heavy Carriage Lunge w/ Row', completed: false },
      ]
    },
    {
      id: 'chapter-7',
      title: 'Chapter 7: Oblique Exercises',
      lessons: [
        { id: '7-1', title: 'Torse Twist 1.0 & 2.0', completed: false },
        { id: '7-2', title: 'Torso Twist 1.0 & 2.0 (Another Video)', completed: false },
        { id: '7-3', title: 'Oblique Sweep', completed: false },
        { id: '7-4', title: 'Oblique Kickback (start video at 2:27)', completed: false },
        { id: '7-5', title: 'Oblique Glute Kickback', completed: false },
        { id: '7-6', title: 'Back Reverse Side Kneeling Crunch', completed: false },
        { id: '7-7', title: 'Twister', completed: false },
        { id: '7-8', title: 'Back Reverse Twister', completed: false },
        { id: '7-9', title: 'Bicycle Kicks', completed: false },
        { id: '7-10', title: 'Bicycle Kicks (Another Video) plus Single Leg Squat', completed: false },
        { id: '7-11', title: 'Side Plank', completed: false },
        { id: '7-12', title: 'Nighthawk', completed: false },
        { id: '7-13', title: 'Twisted Plank to Pike', completed: false },
        { id: '7-14', title: 'Twisted Ab Wheel', completed: false },
        { id: '7-15', title: 'Twisted Saw', completed: false },
        { id: '7-16', title: 'Dancing Panther', completed: false },
        { id: '7-17', title: 'Mermaid Crunch', completed: false },
        { id: '7-18', title: 'Bow and Arrow', completed: false },
        { id: '7-19', title: 'Forearm Exercises', completed: false },
        { id: '7-20', title: 'Bird Dog and Reverse Bird Dog', completed: false },
        { id: '7-21', title: 'Bird Dog and Variations (using the long black straps)', completed: false },
        { id: '7-22', title: 'Bird Dog and Variations (Another Video) - Using the Long Black Straps', completed: false },
        { id: '7-23', title: 'Twisted Ab Wheel', completed: false },
        { id: '7-24', title: 'Twisted Saw', completed: false },
        { id: '7-25', title: 'Chapter 7 - Lesson 7.25', completed: false },
        { id: '7-26', title: 'Chapter 7 - Lesson 7.26', completed: false },
        { id: '7-27', title: 'Chapter 7 - Lesson 7.27', completed: false },
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
      ]
    },
    {
      id: 'extra-tutorials',
      title: 'Extra Exercise Tutorials',
      lessons: [
        { id: 'ex-1', title: 'Stretches for after class', completed: false },
        { id: 'ex-2', title: 'The different variations (aka challenges) for exercises in each muscle group block', completed: false },
        { id: 'ex-3', title: 'Ab Wheel (aka wheelbarrow)', completed: false },
        { id: 'ex-4', title: 'Additional Upper Body: Seated, Kneeling, & Standing Exercises at the Back', completed: false },
        { id: 'ex-5', title: 'Back Plank to Pike', completed: false },
        { id: 'ex-6', title: 'Back Kneeling Crunch', completed: false },
        { id: 'ex-7', title: 'Back Reverse Twister (aka French Twist)', completed: false },
      ]
    },
  ];

  useEffect(() => {
    const foundChapter = chapters.find(ch => ch.id === chapterId);
    if (foundChapter) {
      setChapter(foundChapter);
      const foundLesson = foundChapter.lessons.find(les => les.id === lessonId);
      if (foundLesson) {
        setLesson(foundLesson);
      } else {
        // Lesson not found, redirect to course page
        router.push('/courses/level1-reformers');
      }
    } else {
      // Chapter not found, redirect to course page
      router.push('/courses/level1-reformers');
    }
    setIsLoading(false);
  }, [chapterId, lessonId, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!lesson || !chapter) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Lesson Not Found</h1>
          <Link href="/courses/level1-reformers" className="text-blue-600 hover:text-blue-700">
            Back to Course
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{lesson.title}</h1>
              <p className="text-gray-600">{chapter.title}</p>
            </div>
            <Link href="/courses/level1-reformers" className="text-blue-600 hover:text-blue-700 font-medium">
              Back to Course
            </Link>
          </div>
        </div>
      </div>

      {/* Lesson Content */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="w-full">
          <div className="space-y-8">
            {/* Lesson Title */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{lesson.title}</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
            </div>

            {/* Lesson Content */}
            <div className="w-full">
              <h3 className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8 text-center tracking-tight drop-shadow">Lesson Content</h3>
              <div className="space-y-10">
                {/* Video Section */}
                <div className="w-full">
                  <h3 className="text-2xl font-bold text-blue-800 mb-4">Video Tutorial</h3>
                  <div className="relative w-full h-0 pb-[56.25%] rounded-lg overflow-hidden shadow-lg">
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src="https://www.youtube.com/embed/placeholder"
                      title={`${lesson.title} - Video Tutorial`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <p className="text-sm text-gray-600 text-center mt-4">
                    Watch the tutorial for this lesson
                  </p>
                </div>

                {/* Content Section */}
                <div className="w-full">
                  <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Lesson Details</h3>
                    <div className="space-y-4 text-gray-700">
                      <p>
                        This lesson covers important concepts and techniques related to <strong>{lesson.title}</strong>.
                      </p>
                      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                        <h4 className="font-semibold text-blue-800 mb-2">Key Learning Objectives:</h4>
                        <ul className="list-disc ml-6 space-y-1">
                          <li>Understand the proper form and technique</li>
                          <li>Learn modifications and variations</li>
                          <li>Practice with guidance and feedback</li>
                          <li>Apply knowledge to your workout routine</li>
                        </ul>
                      </div>
                      <p>
                        Detailed instructions, step-by-step guidance, and practice exercises will be provided in this lesson.
                        Follow along with the video tutorial and practice the techniques demonstrated.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Additional Resources */}
                <div className="w-full">
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl shadow-lg p-8 border border-green-200">
                    <h3 className="text-2xl font-bold text-green-800 mb-4">Additional Resources</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white rounded-lg p-6 shadow-sm">
                        <h4 className="font-semibold text-gray-900 mb-2">📚 Study Materials</h4>
                        <p className="text-gray-600 text-sm">
                          Review the course materials and practice the exercises regularly to master the techniques.
                        </p>
                      </div>
                      <div className="bg-white rounded-lg p-6 shadow-sm">
                        <h4 className="font-semibold text-gray-900 mb-2">💡 Tips & Tricks</h4>
                        <p className="text-gray-600 text-sm">
                          Focus on proper form and breathing techniques for optimal results and injury prevention.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-6 border-t border-gray-200">
              <button
                onClick={() => {
                  const currentIndex = chapter.lessons.findIndex(l => l.id === lessonId);
                  if (currentIndex > 0) {
                    const prevLesson = chapter.lessons[currentIndex - 1];
                    router.push(`/courses/level1-reformers/content/${chapterId}/${prevLesson.id}`);
                  }
                }}
                disabled={chapter.lessons.findIndex(l => l.id === lessonId) === 0}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors duration-200"
              >
                Previous Lesson
              </button>
              
              <button
                onClick={() => {
                  const currentIndex = chapter.lessons.findIndex(l => l.id === lessonId);
                  if (currentIndex < chapter.lessons.length - 1) {
                    const nextLesson = chapter.lessons[currentIndex + 1];
                    router.push(`/courses/level1-reformers/content/${chapterId}/${nextLesson.id}`);
                  }
                }}
                disabled={chapter.lessons.findIndex(l => l.id === lessonId) === chapter.lessons.length - 1}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors duration-200"
              >
                Next Lesson
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
