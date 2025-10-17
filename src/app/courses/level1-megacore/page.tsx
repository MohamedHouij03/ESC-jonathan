'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';

const COURSE_ID = 'level1-megacore';
const COURSE_NAME = 'Level 1 Megacore';

interface CourseProgress {
  courseId: string;
  courseName: string;
  progress: number;
  completedChapters: Array<{
    chapterId: string;
    chapterName: string;
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
  courseProgress?: CourseProgress[];
  lastLogin: string;
  loginHistory?: Array<{
    timestamp: string;
    ipAddress: string;
    location: string;
  }>;
  createdAt: string;
}

export default function Level1MegacorePage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const router = useRouter();

  const chapters = [
    {
      id: 1,
      title: 'Chapter 1: Introduction',
      duration: '20 min',
      completed: false,
      lessons: [
        {
          id: 1,
          title: 'The Anatomy of the X-Former',
          duration: '10 min',
          completed: false,
          description: 'Learn about the X-Former machine and its components'
        },
        {
          id: 2,
          title: 'Move Slow: High intensity and Low Impact',
          duration: '10 min',
          completed: false,
          description: 'Understanding the principles of slow, controlled movements'
        }
      ]
    },
    {
      id: 2,
      title: 'Chapter 2: Abdominal Exercises',
      duration: '45 min',
      completed: false,
      lessons: [
        {
          id: 3,
          title: 'Kneeling Crunch (rainbow crunch)',
          duration: '12 min',
          completed: false,
          description: 'Advanced abdominal exercise focusing on core strength'
        },
        {
          id: 4,
          title: 'Straight Arm Crunch',
          duration: '10 min',
          completed: false,
          description: 'Core exercise with extended arms for increased difficulty'
        },
        {
          id: 5,
          title: 'Knee Strap Crunch',
          duration: '12 min',
          completed: false,
          description: 'Abdominal exercise using knee straps for resistance'
        },
        {
          id: 6,
          title: 'Seated Crunch',
          duration: '11 min',
          completed: false,
          description: 'Seated position abdominal exercise'
        }
      ]
    },
    {
      id: 3,
      title: 'Chapter 3: Core Exercises',
      duration: '120 min',
      completed: false,
      lessons: [
        {
          id: 7,
          title: 'Ab Wheel',
          duration: '8 min',
          completed: false,
          description: 'Core exercise using the ab wheel for strength'
        },
        {
          id: 8,
          title: 'Ab Wheel (another video)',
          duration: '8 min',
          completed: false,
          description: 'Alternative demonstration of ab wheel exercise'
        },
        {
          id: 9,
          title: 'Flying Ab Wheel',
          duration: '8 min',
          completed: false,
          description: 'Advanced ab wheel variation'
        },
        {
          id: 10,
          title: 'Saw',
          duration: '8 min',
          completed: false,
          description: 'Core exercise focusing on rotation and stability'
        },
        {
          id: 11,
          title: 'Saw (another video)',
          duration: '8 min',
          completed: false,
          description: 'Alternative demonstration of saw exercise'
        },
        {
          id: 12,
          title: 'Plank to Pike & Forearm Plank to Pike',
          duration: '8 min',
          completed: false,
          description: 'Dynamic plank variations for core strength'
        },
        {
          id: 13,
          title: 'Panther',
          duration: '8 min',
          completed: false,
          description: 'Core exercise focusing on stability and control'
        },
        {
          id: 14,
          title: 'Panther (another video)',
          duration: '8 min',
          completed: false,
          description: 'Alternative demonstration of panther exercise'
        },
        {
          id: 15,
          title: 'Seal',
          duration: '8 min',
          completed: false,
          description: 'Core exercise with seal-like movement pattern'
        },
        {
          id: 16,
          title: 'Seal (another video)',
          duration: '8 min',
          completed: false,
          description: 'Alternative demonstration of seal exercise'
        },
        {
          id: 17,
          title: 'Angel',
          duration: '8 min',
          completed: false,
          description: 'Core exercise with angel-like movement pattern'
        },
        {
          id: 18,
          title: 'Angel (Another Video)',
          duration: '8 min',
          completed: false,
          description: 'Alternative demonstration of angel exercise'
        },
        {
          id: 19,
          title: 'Reverse Angel',
          duration: '8 min',
          completed: false,
          description: 'Reverse variation of the angel exercise'
        },
        {
          id: 20,
          title: 'Core & Abdominal Block: different body positions & transitioning',
          duration: '8 min',
          completed: false,
          description: 'Understanding different positions and transitions'
        },
        {
          id: 21,
          title: 'Core and Abdominal Block: Practicing Cues',
          duration: '8 min',
          completed: false,
          description: 'Practice session for core and abdominal exercises'
        }
      ]
    },
    {
      id: 4,
      title: 'Chapter 4: Light Leg Exercises',
      duration: '90 min',
      completed: false,
      lessons: [
        {
          id: 22,
          title: 'Platform Lunge',
          duration: '8 min',
          completed: false,
          description: 'Basic lunge exercise using platform'
        },
        {
          id: 23,
          title: 'Platform Lunge (another video)',
          duration: '8 min',
          completed: false,
          description: 'Alternative demonstration of platform lunge'
        },
        {
          id: 24,
          title: 'Single Leg Squat',
          duration: '8 min',
          completed: false,
          description: 'Unilateral squat exercise for leg strength'
        },
        {
          id: 25,
          title: 'Carriage Lunge',
          duration: '8 min',
          completed: false,
          description: 'Lunge exercise using carriage for resistance'
        },
        {
          id: 26,
          title: 'Side Lunge',
          duration: '8 min',
          completed: false,
          description: 'Lateral lunge exercise for leg strength'
        },
        {
          id: 27,
          title: 'Light Squats',
          duration: '8 min',
          completed: false,
          description: 'Basic squat exercise with light resistance'
        },
        {
          id: 28,
          title: 'Curtsy Lunge',
          duration: '8 min',
          completed: false,
          description: 'Curtsy-style lunge exercise'
        },
        {
          id: 29,
          title: 'Curtsy Lunge (another video)',
          duration: '8 min',
          completed: false,
          description: 'Alternative demonstration of curtsy lunge'
        },
        {
          id: 30,
          title: 'Standing Inner Thighs',
          duration: '8 min',
          completed: false,
          description: 'Inner thigh exercise in standing position'
        },
        {
          id: 31,
          title: 'Standing Inner Thighs (Another Video)',
          duration: '8 min',
          completed: false,
          description: 'Alternative demonstration of standing inner thighs'
        },
        {
          id: 32,
          title: 'Squatting Inner Thighs',
          duration: '8 min',
          completed: false,
          description: 'Inner thigh exercise in squatting position'
        },
        {
          id: 33,
          title: 'Kneeling Inner Thighs',
          duration: '8 min',
          completed: false,
          description: 'Inner thigh exercise in kneeling position'
        },
        {
          id: 34,
          title: 'Hamstring Curl (and Single Leg Hamstring Curl)',
          duration: '8 min',
          completed: false,
          description: 'Hamstring strengthening exercises'
        }
      ]
    },
    {
      id: 5,
      title: 'Chapter 5: Medium Leg Exercises',
      duration: '120 min',
      completed: false,
      lessons: [
        {
          id: 35,
          title: 'Back Reverse Platform Lunge',
          duration: '8 min',
          completed: false,
          description: 'Reverse lunge exercise using platform'
        },
        {
          id: 36,
          title: 'Back Reverse Platform Lunge (another video)',
          duration: '8 min',
          completed: false,
          description: 'Alternative demonstration of back reverse platform lunge'
        },
        {
          id: 37,
          title: 'Back Kneeling Inner Thighs',
          duration: '8 min',
          completed: false,
          description: 'Inner thigh exercise in back kneeling position'
        },
        {
          id: 38,
          title: 'Back Kneeling Inner Thighs (Another Video)',
          duration: '8 min',
          completed: false,
          description: 'Alternative demonstration of back kneeling inner thighs'
        },
        {
          id: 39,
          title: 'Back Carriage Lunge',
          duration: '8 min',
          completed: false,
          description: 'Carriage lunge exercise from back position'
        },
        {
          id: 40,
          title: 'Back Side Lunge',
          duration: '8 min',
          completed: false,
          description: 'Side lunge exercise from back position'
        },
        {
          id: 41,
          title: 'Back Medium Squats',
          duration: '8 min',
          completed: false,
          description: 'Medium resistance squats from back position'
        },
        {
          id: 42,
          title: 'Back Curtsy Lunge',
          duration: '8 min',
          completed: false,
          description: 'Curtsy lunge exercise from back position'
        },
        {
          id: 43,
          title: 'Back Standing Inner Thighs',
          duration: '8 min',
          completed: false,
          description: 'Standing inner thigh exercise from back position'
        },
        {
          id: 44,
          title: 'Back Squatting Inner Thighs',
          duration: '8 min',
          completed: false,
          description: 'Squatting inner thigh exercise from back position'
        },
        {
          id: 45,
          title: 'Back Kneeling Inner Thighs',
          duration: '8 min',
          completed: false,
          description: 'Kneeling inner thigh exercise from back position'
        },
        {
          id: 46,
          title: 'Back Hamstring Curl',
          duration: '8 min',
          completed: false,
          description: 'Hamstring curl exercise from back position'
        },
        {
          id: 47,
          title: 'Back Single Leg Hamstring Curl',
          duration: '8 min',
          completed: false,
          description: 'Single leg hamstring curl from back position'
        },
        {
          id: 48,
          title: 'Back Standing Outer Thighs',
          duration: '8 min',
          completed: false,
          description: 'Standing outer thigh exercise from back position'
        },
        {
          id: 49,
          title: 'Back Squatting Outer Thighs',
          duration: '8 min',
          completed: false,
          description: 'Squatting outer thigh exercise from back position'
        }
      ]
    },
    {
      id: 6,
      title: 'Chapter 6: Heavy Leg Exercises',
      duration: '135 min',
      completed: false,
      lessons: [
        {
          id: 50,
          title: 'Standing Outer Thighs',
          duration: '8 min',
          completed: false,
          description: 'Heavy resistance outer thigh exercise'
        },
        {
          id: 51,
          title: 'Heavy Squat',
          duration: '8 min',
          completed: false,
          description: 'High resistance squat exercise'
        },
        {
          id: 52,
          title: 'Skater and Shifted Skater',
          duration: '8 min',
          completed: false,
          description: 'Skater-style exercises for leg strength'
        },
        {
          id: 53,
          title: 'Staggered Skater',
          duration: '8 min',
          completed: false,
          description: 'Advanced skater exercise with staggered stance'
        },
        {
          id: 54,
          title: 'Sprinter\'s Lunge',
          duration: '8 min',
          completed: false,
          description: 'Dynamic lunge exercise mimicking sprinting'
        },
        {
          id: 55,
          title: 'Heavy Platform Lunge',
          duration: '8 min',
          completed: false,
          description: 'High resistance platform lunge'
        },
        {
          id: 56,
          title: 'Heavy Single Leg Squat',
          duration: '8 min',
          completed: false,
          description: 'High resistance single leg squat'
        },
        {
          id: 57,
          title: 'Heavy Carriage Lunge',
          duration: '8 min',
          completed: false,
          description: 'High resistance carriage lunge'
        },
        {
          id: 58,
          title: 'Heavy Side Lunge',
          duration: '8 min',
          completed: false,
          description: 'High resistance side lunge'
        },
        {
          id: 59,
          title: 'Heavy Curtsy Lunge',
          duration: '8 min',
          completed: false,
          description: 'High resistance curtsy lunge'
        },
        {
          id: 60,
          title: 'Heavy Standing Inner Thighs',
          duration: '8 min',
          completed: false,
          description: 'High resistance standing inner thigh exercise'
        },
        {
          id: 61,
          title: 'Heavy Squatting Inner Thighs',
          duration: '8 min',
          completed: false,
          description: 'High resistance squatting inner thigh exercise'
        },
        {
          id: 62,
          title: 'Heavy Kneeling Inner Thighs',
          duration: '8 min',
          completed: false,
          description: 'High resistance kneeling inner thigh exercise'
        },
        {
          id: 63,
          title: 'Heavy Hamstring Curl',
          duration: '8 min',
          completed: false,
          description: 'High resistance hamstring curl'
        },
        {
          id: 64,
          title: 'Heavy Single Leg Hamstring Curl',
          duration: '8 min',
          completed: false,
          description: 'High resistance single leg hamstring curl'
        },
        {
          id: 65,
          title: 'Heavy Standing Outer Thighs',
          duration: '8 min',
          completed: false,
          description: 'High resistance standing outer thigh exercise'
        },
        {
          id: 66,
          title: 'Heavy Squatting Outer Thighs',
          duration: '8 min',
          completed: false,
          description: 'High resistance squatting outer thigh exercise'
        }
      ]
    },
    {
      id: 7,
      title: 'Chapter 7: Oblique Exercises',
      duration: '180 min',
      completed: false,
      lessons: [
        {
          id: 67,
          title: 'Torso Twist 1.0 & 2.0',
          duration: '8 min',
          completed: false,
          description: 'Basic and advanced torso twist exercises'
        },
        {
          id: 68,
          title: 'Torso Twist 1.0 & 2.0 (Another Video)',
          duration: '8 min',
          completed: false,
          description: 'Alternative demonstration of torso twist exercises'
        },
        {
          id: 69,
          title: 'Oblique Sweep',
          duration: '8 min',
          completed: false,
          description: 'Oblique exercise with sweeping motion'
        },
        {
          id: 70,
          title: 'Oblique Kickback (start video at 2:27)',
          duration: '8 min',
          completed: false,
          description: 'Oblique exercise with kickback motion'
        },
        {
          id: 71,
          title: 'Oblique Glute Kickback',
          duration: '8 min',
          completed: false,
          description: 'Combined oblique and glute kickback exercise'
        },
        {
          id: 72,
          title: 'Side Bend',
          duration: '8 min',
          completed: false,
          description: 'Lateral bending exercise for obliques'
        },
        {
          id: 73,
          title: 'Side Bend (Another Video)',
          duration: '8 min',
          completed: false,
          description: 'Alternative demonstration of side bend'
        },
        {
          id: 74,
          title: 'Oblique Crunch',
          duration: '8 min',
          completed: false,
          description: 'Crunch exercise targeting obliques'
        },
        {
          id: 75,
          title: 'Oblique Crunch (Another Video)',
          duration: '8 min',
          completed: false,
          description: 'Alternative demonstration of oblique crunch'
        },
        {
          id: 76,
          title: 'Russian Twist',
          duration: '8 min',
          completed: false,
          description: 'Classic Russian twist exercise'
        },
        {
          id: 77,
          title: 'Russian Twist (Another Video)',
          duration: '8 min',
          completed: false,
          description: 'Alternative demonstration of Russian twist'
        },
        {
          id: 78,
          title: 'Oblique Roll Up',
          duration: '8 min',
          completed: false,
          description: 'Roll up exercise with oblique focus'
        },
        {
          id: 79,
          title: 'Oblique Roll Up (Another Video)',
          duration: '8 min',
          completed: false,
          description: 'Alternative demonstration of oblique roll up'
        },
        {
          id: 80,
          title: 'Side Plank',
          duration: '8 min',
          completed: false,
          description: 'Static side plank exercise'
        },
        {
          id: 81,
          title: 'Side Plank (Another Video)',
          duration: '8 min',
          completed: false,
          description: 'Alternative demonstration of side plank'
        },
        {
          id: 82,
          title: 'Side Plank with Leg Lift',
          duration: '8 min',
          completed: false,
          description: 'Dynamic side plank with leg movement'
        },
        {
          id: 83,
          title: 'Side Plank with Leg Lift (Another Video)',
          duration: '8 min',
          completed: false,
          description: 'Alternative demonstration of side plank with leg lift'
        },
        {
          id: 84,
          title: 'Oblique Bridge',
          duration: '8 min',
          completed: false,
          description: 'Bridge exercise with oblique engagement'
        },
        {
          id: 85,
          title: 'Oblique Bridge (Another Video)',
          duration: '8 min',
          completed: false,
          description: 'Alternative demonstration of oblique bridge'
        },
        {
          id: 86,
          title: 'Oblique March',
          duration: '8 min',
          completed: false,
          description: 'Marching exercise with oblique focus'
        },
        {
          id: 87,
          title: 'Oblique March (Another Video)',
          duration: '8 min',
          completed: false,
          description: 'Alternative demonstration of oblique march'
        },
        {
          id: 88,
          title: 'Oblique Circuit',
          duration: '8 min',
          completed: false,
          description: 'Circuit training for oblique muscles'
        },
        {
          id: 89,
          title: 'Bird Dog and Reverse Bird Dog',
          duration: '8 min',
          completed: false,
          description: 'Bird dog exercise with reverse variation'
        },
        {
          id: 90,
          title: 'Bird Dog and Variations',
          duration: '8 min',
          completed: false,
          description: 'Bird dog exercise with multiple variations'
        },
        {
          id: 91,
          title: 'Chapter 7 Final Lesson',
          duration: '8 min',
          completed: false,
          description: 'Final lesson for Chapter 7'
        }
      ]
    },
    {
      id: 8,
      title: 'Chapter 8: Upper Body Exercises',
      duration: '160 min',
      completed: false,
      lessons: [
        {
          id: 92,
          title: 'Bicep Curl',
          duration: '8 min',
          completed: false,
          description: 'Classic bicep curl exercise'
        },
        {
          id: 93,
          title: 'Alligator Jaw',
          duration: '8 min',
          completed: false,
          description: 'Upper body exercise with jaw-like motion'
        },
        {
          id: 94,
          title: 'Chest Expansion',
          duration: '8 min',
          completed: false,
          description: 'Chest expansion exercise for upper body'
        },
        {
          id: 95,
          title: 'Tricep Kickback',
          duration: '8 min',
          completed: false,
          description: 'Tricep exercise with kickback motion'
        },
        {
          id: 96,
          title: 'Newspaper (AKA: Rotator Cuff)',
          duration: '8 min',
          completed: false,
          description: 'Upper body exercise simulating newspaper handling'
        },
        {
          id: 97,
          title: 'Serve the Platter & Serve the Party Platter',
          duration: '8 min',
          completed: false,
          description: 'Upper body exercises with platter movements'
        },
        {
          id: 98,
          title: 'Shoulder Press',
          duration: '8 min',
          completed: false,
          description: 'Classic shoulder press exercise'
        },
        {
          id: 99,
          title: 'Tricep Extension',
          duration: '8 min',
          completed: false,
          description: 'Tricep extension exercise'
        },
        {
          id: 100,
          title: 'Hug a Tree & Chest Press',
          duration: '8 min',
          completed: false,
          description: 'Upper body exercises with hugging and pressing motions'
        },
        {
          id: 101,
          title: 'Single Arm Bicep Curl in bird dog (facing forward)',
          duration: '8 min',
          completed: false,
          description: 'Single arm bicep curl in bird dog position'
        },
        {
          id: 102,
          title: 'Carriage Seated Row',
          duration: '8 min',
          completed: false,
          description: 'Seated row exercise using carriage'
        },
        {
          id: 103,
          title: 'Carriage Seated Heavy Bicep Curl',
          duration: '8 min',
          completed: false,
          description: 'Heavy bicep curl in seated position'
        },
        {
          id: 104,
          title: 'Back Seated Serve the Platter',
          duration: '8 min',
          completed: false,
          description: 'Serve the platter exercise from back seated position'
        },
        {
          id: 105,
          title: 'Back Seated Shoulder Press 1.0 & 2.0',
          duration: '8 min',
          completed: false,
          description: 'Shoulder press variations from back seated position'
        },
        {
          id: 106,
          title: 'Back Seated Tricep Extension',
          duration: '8 min',
          completed: false,
          description: 'Tricep extension from back seated position'
        },
        {
          id: 107,
          title: 'Back Kneeling Bicep Curl',
          duration: '8 min',
          completed: false,
          description: 'Bicep curl from back kneeling position'
        },
        {
          id: 108,
          title: 'Back Kneeling Chest Expansion',
          duration: '8 min',
          completed: false,
          description: 'Chest expansion from back kneeling position'
        },
        {
          id: 109,
          title: 'Handlebar Exercises',
          duration: '8 min',
          completed: false,
          description: 'Various exercises using handlebars'
        },
        {
          id: 110,
          title: 'Lat Pushdown',
          duration: '8 min',
          completed: false,
          description: 'Lat pushdown exercise'
        }
      ]
    },
    {
      id: 9,
      title: 'Chapter 9: Pregnant Clients',
      duration: '30 min',
      completed: false,
      lessons: [
        {
          id: 111,
          title: 'Pregnant Clients: Guidelines and Information',
          duration: '15 min',
          completed: false,
          description: 'Guidelines and information for working with pregnant clients'
        },
        {
          id: 112,
          title: 'Pregnant Friendly Routine',
          duration: '15 min',
          completed: false,
          description: 'Exercise routine designed for pregnant clients'
        }
      ]
    },
    {
      id: 10,
      title: 'Chapter 10: Cueing and Communication',
      duration: '90 min',
      completed: false,
      lessons: [
        {
          id: 113,
          title: 'How to Cue Variations (aka Challenges) & Variations for Exercises',
          duration: '10 min',
          completed: false,
          description: 'Learning how to cue exercise variations and challenges'
        },
        {
          id: 114,
          title: 'How to Cue',
          duration: '10 min',
          completed: false,
          description: 'Mastering the art of exercise cueing'
        },
        {
          id: 115,
          title: 'Cues and Communication',
          duration: '10 min',
          completed: false,
          description: 'Effective communication techniques for instructors'
        },
        {
          id: 116,
          title: 'How to Formulate a Full Routine (45 min & 50 Min)',
          duration: '10 min',
          completed: false,
          description: 'Creating complete workout routines'
        },
        {
          id: 117,
          title: 'When to Modify with Springs, add Spring, and Use the Stabilization Bar',
          duration: '10 min',
          completed: false,
          description: 'Understanding spring modifications and stabilization'
        },
        {
          id: 118,
          title: 'Video Lesson 10-6',
          duration: '10 min',
          completed: false,
          description: 'Additional video content for Chapter 10'
        },
        {
          id: 119,
          title: 'Video Lesson 10-7',
          duration: '10 min',
          completed: false,
          description: 'Additional video content for Chapter 10'
        },
        {
          id: 120,
          title: 'Video Lesson 10-8',
          duration: '10 min',
          completed: false,
          description: 'Additional video content for Chapter 10'
        },
        {
          id: 121,
          title: 'Overall Tips and What to Expect',
          duration: '10 min',
          completed: false,
          description: 'Final tips and expectations for instructors'
        }
      ]
    },
    {
      id: 11,
      title: 'Extra Exercise Tutorials',
      duration: '160 min',
      completed: false,
      lessons: [
        {
          id: 122,
          title: 'Practice Video 11-1',
          duration: '8 min',
          completed: false,
          description: 'Practice session with spring configuration'
        },
        {
          id: 123,
          title: 'Practice Video 11-2',
          duration: '8 min',
          completed: false,
          description: 'Practice session with spring configuration'
        },
        {
          id: 124,
          title: 'Practice Video 11-3',
          duration: '8 min',
          completed: false,
          description: 'Practice session with spring configuration'
        },
        {
          id: 125,
          title: 'Practice Video 11-4',
          duration: '8 min',
          completed: false,
          description: 'Practice session with spring configuration'
        },
        {
          id: 126,
          title: 'Practice Video 11-5',
          duration: '8 min',
          completed: false,
          description: 'Practice session with spring configuration'
        },
        {
          id: 127,
          title: 'Practice Video 11-6',
          duration: '8 min',
          completed: false,
          description: 'Practice session with spring configuration'
        },
        {
          id: 128,
          title: 'Practice Video 11-7',
          duration: '8 min',
          completed: false,
          description: 'Practice session with spring configuration'
        },
        {
          id: 129,
          title: 'Practice Video 11-8',
          duration: '8 min',
          completed: false,
          description: 'Practice session with spring configuration'
        },
        {
          id: 130,
          title: 'Practice Video 11-9',
          duration: '8 min',
          completed: false,
          description: 'Practice session with spring configuration'
        },
        {
          id: 131,
          title: 'Practice Video 11-10',
          duration: '8 min',
          completed: false,
          description: 'Practice session video'
        },
        {
          id: 132,
          title: 'Practice Video 11-11',
          duration: '8 min',
          completed: false,
          description: 'Practice session video'
        },
        {
          id: 133,
          title: 'Practice Video 11-12',
          duration: '8 min',
          completed: false,
          description: 'Practice session with spring configuration'
        },
        {
          id: 134,
          title: 'Practice Video 11-13',
          duration: '8 min',
          completed: false,
          description: 'Practice session video'
        },
        {
          id: 135,
          title: 'Practice Video 11-14',
          duration: '8 min',
          completed: false,
          description: 'Practice session with spring configuration'
        },
        {
          id: 136,
          title: 'Practice Video 11-15',
          duration: '8 min',
          completed: false,
          description: 'Practice session with spring configuration'
        },
        {
          id: 137,
          title: 'Practice Video 11-16',
          duration: '8 min',
          completed: false,
          description: 'Practice session video'
        }
      ]
    },
    {
      id: 12,
      title: 'Full Workout Videos',
      duration: '100 min',
      completed: false,
      lessons: [
        {
          id: 138,
          title: 'Practice Video 12-1',
          duration: '8 min',
          completed: false,
          description: 'Additional practice session video'
        },
        {
          id: 139,
          title: 'Practice Video 12-2',
          duration: '8 min',
          completed: false,
          description: 'Additional practice session video'
        },
        {
          id: 140,
          title: 'Practice Video 12-3',
          duration: '8 min',
          completed: false,
          description: 'Additional practice session video'
        },
        {
          id: 141,
          title: 'Practice Video 12-4',
          duration: '8 min',
          completed: false,
          description: 'Additional practice session video'
        },
        {
          id: 142,
          title: 'Practice Video 12-5',
          duration: '8 min',
          completed: false,
          description: 'Additional practice session video'
        },
        {
          id: 143,
          title: 'Practice Video 12-6',
          duration: '8 min',
          completed: false,
          description: 'Additional practice session video'
        },
        {
          id: 144,
          title: 'Practice Video 12-7',
          duration: '8 min',
          completed: false,
          description: 'Additional practice session video'
        },
        {
          id: 145,
          title: 'Practice Video 12-8',
          duration: '8 min',
          completed: false,
          description: 'Additional practice session video'
        },
        {
          id: 146,
          title: 'Practice Video 12-9',
          duration: '8 min',
          completed: false,
          description: 'Additional practice session video'
        },
        {
          id: 147,
          title: 'Practice Video 12-10',
          duration: '8 min',
          completed: false,
          description: 'Additional practice session video'
        }
      ]
    }
  ];

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/auth/signin');
      return;
    }
    const parsed = JSON.parse(userData) as User;
    setUser(parsed);
    // Check if enrolled
    if (parsed.courseProgress && parsed.courseProgress.some(cp => cp.courseId === COURSE_ID)) {
      setIsEnrolled(true);
      const cp = parsed.courseProgress.find(cp => cp.courseId === COURSE_ID);
      setProgress(cp && cp.progress ? cp.progress : 0);
    }
    setIsLoading(false);
  }, [router]);

  // Listen for progress updates
  useEffect(() => {
    const handleProgressUpdate = (event: CustomEvent) => {
      if (event.detail.courseId === COURSE_ID) {
        setProgress(event.detail.progress);
      }
    };

    window.addEventListener('progressUpdated', handleProgressUpdate as EventListener);
    
    return () => {
      window.removeEventListener('progressUpdated', handleProgressUpdate as EventListener);
    };
  }, []);

  const handleChapterClick = (chapterId: string) => {
    setSelectedChapter(selectedChapter === chapterId ? null : chapterId);
  };

  const handleLessonComplete = (chapterId: string, lessonId: string) => {
    console.log(`Marking lesson ${lessonId} in chapter ${chapterId} as complete`);
  };

  const handleEnroll = async () => {
    if (!user) return;
    setEnrolling(true);
    try {
      const res = await fetch('/api/user/update-progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user._id,
          courseId: COURSE_ID,
          courseName: COURSE_NAME,
          progress: 0
        })
      });
      if (res.ok) {
        const data = await res.json();
        // Update localStorage user
        const updatedUser = { ...user } as User;
        if (!updatedUser.courseProgress) updatedUser.courseProgress = [];
        updatedUser.courseProgress.push(data.courseProgress);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        setIsEnrolled(true);
        setProgress(0);
      }
    } finally {
      setEnrolling(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F6EFD2]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E43636]"></div>
      </div>
    );
  }
  if (!user) return null;

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Header */}
              <div className="border-b border-[#000000]/10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-extrabold text-[#000000]">ESCP Level 1 Training</h1>
              <p className="text-[#000000]/60">Megacore Course</p>
            </div>
            <Link href="/courses" className="text-[#000000] hover:underline font-medium">
              Back to Courses
            </Link>
          </div>
        </div>
      </div>

      {!isEnrolled && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={handleEnroll}
            disabled={enrolling}
            className="w-full bg-[#000000] text-[#F6EFD2] py-3 px-4 rounded-lg font-medium hover:opacity-90 transition-all duration-200 shadow-md mb-6 border border-[#000000]"
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
          className="bg-white rounded-xl shadow p-6 mb-8 border border-[#000000]/10"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[#000000]">Course Progress</h2>
            <span className="text-2xl font-bold text-[#000000]">{progress}%</span>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between text-sm text-[#000000]/80 mb-2">
              <span>Overall Progress</span>
              <span>0 / {chapters.reduce((acc, chapter) => acc + chapter.lessons.length, 0)} lessons</span>
            </div>
            <div className="w-full bg-white rounded-full h-3 border border-[#000000]/10">
              <div
                className="h-3 rounded-full bg-[#000000] transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#000000]">0</div>
              <div className="text-sm text-[#000000]">Chapters Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#000000]">{chapters.length}</div>
              <div className="text-sm text-[#000000]">Chapters Remaining</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#000000]">{chapters.reduce((acc, chapter) => acc + chapter.lessons.length, 0)}</div>
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
              className="bg-white rounded-xl shadow overflow-hidden border border-[#000000]/10"
            >
              <div
                className="p-6 cursor-pointer hover:bg-white/40 transition-colors duration-200"
                onClick={() => handleChapterClick(chapter.id.toString())}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-[#000000] text-[#F6EFD2] flex items-center justify-center text-sm font-semibold">{index + 1}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#000000]">{chapter.title}</h3>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-[#000000]/60">
                        <span>Lessons: {chapter.lessons.length}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg
                      className={`w-5 h-5 text-[#000000] transition-transform duration-200 ${
                        selectedChapter === chapter.id.toString() ? 'rotate-180' : ''
                      }`}
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
              {selectedChapter === chapter.id.toString() && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-[#000000]/10"
                >
                  <div className="p-6 space-y-4">
                    {chapter.lessons.map((lesson, lessonIdx) => (
                      <div
                        key={lesson.id}
                        className="flex items-center justify-between p-4 bg-white rounded-lg hover:bg-white/40 transition-colors duration-200 border border-[#000000]/10"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-[#000000] text-[#F6EFD2] flex items-center justify-center text-sm font-semibold">{lessonIdx + 1}</div>
                          <div>
                            <h4 className="font-medium text-[#000000] text-sm">
                              <Link href={`/courses/level1-megacore/content/chapter-${chapter.id}/${chapter.id}-${lessonIdx + 1}`} className="no-underline">
                                {lesson.title}
                              </Link>
                            </h4>
                          </div>
                        </div>
                        <button
                          onClick={() => handleLessonComplete(chapter.id.toString(), lesson.id.toString())}
                          className="px-4 py-2 bg-[#000000] text-[#F6EFD2] rounded-lg text-sm font-medium hover:opacity-90 transition-colors duration-200 border border-[#000000]"
                        >
                          Mark Complete
                        </button>
                      </div>
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