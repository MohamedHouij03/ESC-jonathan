'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import CourseCompletionModal from './CourseCompletionModal';

interface Lesson {
  id: string;
  title: string;
  slug: string;
  index: number;
  completed: boolean;
  path: string;
}

interface Chapter {
  id: string;
  title: string;
  index: number;
  lessons: Lesson[];
}

interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  lessonCount: number;
}

interface CourseNavigationProps {
  currentLessonPath: string;
  nextLessonPath?: string;
}

// Mock data function for when API is not available
function getMockCourseData(courseType: string) {
  if (courseType === 'level1-megacore') {
    return {
      course: {
        id: 'megacore-1',
        title: 'Level 1 Megacore',
        slug: 'level1-megacore',
        description: 'Comprehensive training program for Level 1 Megacore certification',
        lessonCount: 20
      },
      chapters: [
        {
          id: 'ch4',
          title: 'Chapter 4: Light Leg Exercises',
          index: 4,
          lessons: [
            { id: '4-1', title: 'Platform Lunge', slug: '4-1', index: 1, completed: false, path: '/courses/level1-megacore/content/chapter-4/4-1' },
            { id: '4-2', title: 'Platform Lunge (another video)', slug: '4-2', index: 2, completed: false, path: '/courses/level1-megacore/content/chapter-4/4-2' },
            { id: '4-3', title: 'Single Leg Squat', slug: '4-3', index: 3, completed: false, path: '/courses/level1-megacore/content/chapter-4/4-3' },
            { id: '4-4', title: 'Carriage Lunge', slug: '4-4', index: 4, completed: false, path: '/courses/level1-megacore/content/chapter-4/4-4' },
            { id: '4-5', title: 'Side Lunge', slug: '4-5', index: 5, completed: false, path: '/courses/level1-megacore/content/chapter-4/4-5' },
            { id: '4-6', title: 'Light Squats', slug: '4-6', index: 6, completed: false, path: '/courses/level1-megacore/content/chapter-4/4-6' }
          ]
        },
        {
          id: 'ch6',
          title: 'Chapter 6: Heavy Leg Exercises',
          index: 6,
          lessons: [
            { id: '6-1', title: 'Standing Outer Thighs', slug: '6-1', index: 1, completed: false, path: '/courses/level1-megacore/content/chapter-6/6-1' }
          ]
        },
        {
          id: 'ch7',
          title: 'Chapter 7: Core & Obliques',
          index: 7,
          lessons: [
            { id: '7-1', title: 'Bicycle Kicks', slug: '7-1', index: 1, completed: false, path: '/courses/level1-megacore/content/chapter-7/7-1' },
            { id: '7-2', title: 'Bicycle Kicks (Another Video)', slug: '7-2', index: 2, completed: false, path: '/courses/level1-megacore/content/chapter-7/7-2' },
            { id: '7-3', title: 'Bicycle Kicks (Another Video 2)', slug: '7-3', index: 3, completed: false, path: '/courses/level1-megacore/content/chapter-7/7-3' },
            { id: '7-4', title: 'Bicycle Kicks (Another Video 3)', slug: '7-4', index: 4, completed: false, path: '/courses/level1-megacore/content/chapter-7/7-4' },
            { id: '7-5', title: 'Bicycle Kicks (Another Video 4)', slug: '7-5', index: 5, completed: false, path: '/courses/level1-megacore/content/chapter-7/7-5' },
            { id: '7-6', title: 'Bicycle Kicks (Another Video 5)', slug: '7-6', index: 6, completed: false, path: '/courses/level1-megacore/content/chapter-7/7-6' },
            { id: '7-7', title: 'Bicycle Kicks (Another Video 6)', slug: '7-7', index: 7, completed: false, path: '/courses/level1-megacore/content/chapter-7/7-7' },
            { id: '7-8', title: 'Bicycle Kicks (Another Video 7)', slug: '7-8', index: 8, completed: false, path: '/courses/level1-megacore/content/chapter-7/7-8' },
            { id: '7-9', title: 'Bicycle Kicks (Another Video 8)', slug: '7-9', index: 9, completed: false, path: '/courses/level1-megacore/content/chapter-7/7-9' },
            { id: '7-10', title: 'Bicycle Kicks (Another Video 9)', slug: '7-10', index: 10, completed: false, path: '/courses/level1-megacore/content/chapter-7/7-10' },
            { id: '7-11', title: 'Bicycle Kicks (Another Video 10)', slug: '7-11', index: 11, completed: false, path: '/courses/level1-megacore/content/chapter-7/7-11' },
            { id: '7-12', title: 'Bicycle Kicks (Another Video 11)', slug: '7-12', index: 12, completed: false, path: '/courses/level1-megacore/content/chapter-7/7-12' },
            { id: '7-13', title: 'Bicycle Kicks (Another Video 12)', slug: '7-13', index: 13, completed: false, path: '/courses/level1-megacore/content/chapter-7/7-13' },
            { id: '7-14', title: 'Bicycle Kicks (Another Video 13)', slug: '7-14', index: 14, completed: false, path: '/courses/level1-megacore/content/chapter-7/7-14' },
            { id: '7-15', title: 'Bicycle Kicks (Another Video 14)', slug: '7-15', index: 15, completed: false, path: '/courses/level1-megacore/content/chapter-7/7-15' },
            { id: '7-16', title: 'Bicycle Kicks (Another Video 15)', slug: '7-16', index: 16, completed: false, path: '/courses/level1-megacore/content/chapter-7/7-16' },
            { id: '7-17', title: 'Bow and Arrow', slug: '7-17', index: 17, completed: false, path: '/courses/level1-megacore/content/chapter-7/7-17' },
            { id: '7-18', title: 'Twisted Forearm Plank to Pike', slug: '7-18', index: 18, completed: false, path: '/courses/level1-megacore/content/chapter-7/7-18' },
            { id: '7-19', title: 'Bird Dog and Reverse Bird Dog', slug: '7-19', index: 19, completed: false, path: '/courses/level1-megacore/content/chapter-7/7-19' },
            { id: '7-20', title: 'Bird Dog and Variations', slug: '7-20', index: 20, completed: true, path: '/courses/level1-megacore/content/chapter-7/7-20' }
          ]
        }
      ]
    };
  } else {
    // Default to Level 1 Reformers mock data
    return {
      course: {
        id: 'reformers-1',
        title: 'Level 1 Reformers',
        slug: 'level1-reformers',
        description: 'Comprehensive training program for Level 1 Reformers certification',
        lessonCount: 196
      },
      chapters: [
        {
          id: 'ch1',
          title: 'Chapter 1: Introduction',
          index: 1,
          lessons: [
            { id: '1-1', title: 'The Anatomy of the Xformer', slug: '1-1', index: 1, completed: false, path: '/courses/level1-reformers/content/chapter-1/1-1' },
            { id: '1-2', title: 'Move Slow: High intensity and Low Impact', slug: '1-2', index: 2, completed: false, path: '/courses/level1-reformers/content/chapter-1/1-2' }
          ]
        },
        {
          id: 'ch2',
          title: 'Chapter 2: Abdominal Exercises',
          index: 2,
          lessons: [
            { id: '2-1', title: 'Anatomy of Rectus Abdominis', slug: '2-1', index: 1, completed: false, path: '/courses/level1-reformers/content/chapter-2/2-1' },
            { id: '2-2', title: 'Kneeling Crunch (rainbow crunch)', slug: '2-2', index: 2, completed: false, path: '/courses/level1-reformers/content/chapter-2/2-2' },
            { id: '2-3', title: 'Straight Arm Crunch', slug: '2-3', index: 3, completed: false, path: '/courses/level1-reformers/content/chapter-2/2-3' },
            { id: '2-4', title: 'Knee Strap Crunch', slug: '2-4', index: 4, completed: false, path: '/courses/level1-reformers/content/chapter-2/2-4' },
            { id: '2-5', title: 'Seated Crunch', slug: '2-5', index: 5, completed: false, path: '/courses/level1-reformers/content/chapter-2/2-5' }
          ]
        },
        {
          id: 'ch3',
          title: 'Chapter 3: Core Exercises',
          index: 3,
          lessons: [
            { id: '3-1', title: 'Anatomy of Transverse Abdominis', slug: '3-1', index: 1, completed: false, path: '/courses/level1-reformers/content/chapter-3/3-1' },
            { id: '3-2', title: 'Ab Wheel', slug: '3-2', index: 2, completed: false, path: '/courses/level1-reformers/content/chapter-3/3-2' },
            { id: '3-3', title: 'Saw', slug: '3-3', index: 3, completed: false, path: '/courses/level1-reformers/content/chapter-3/3-3' },
            { id: '3-4', title: 'Saw (another video)', slug: '3-4', index: 4, completed: false, path: '/courses/level1-reformers/content/chapter-3/3-4' },
            { id: '3-5', title: 'Plank to Pike & Forearm Plank to Pike', slug: '3-5', index: 5, completed: false, path: '/courses/level1-reformers/content/chapter-3/3-5' },
            { id: '3-6', title: 'Plank to Pike & Forearm Plank to Pike', slug: '3-6', index: 6, completed: false, path: '/courses/level1-reformers/content/chapter-3/3-6' },
            { id: '3-7', title: 'Panther', slug: '3-7', index: 7, completed: false, path: '/courses/level1-reformers/content/chapter-3/3-7' },
            { id: '3-8', title: 'Panther (another video)', slug: '3-8', index: 8, completed: false, path: '/courses/level1-reformers/content/chapter-3/3-8' },
            { id: '3-9', title: 'Hi Panther', slug: '3-9', index: 9, completed: false, path: '/courses/level1-reformers/content/chapter-3/3-9' },
            { id: '3-10', title: 'Back Reverse Hi Panther', slug: '3-10', index: 10, completed: false, path: '/courses/level1-reformers/content/chapter-3/3-10' },
            { id: '3-11', title: 'Heavy Panther', slug: '3-11', index: 11, completed: false, path: '/courses/level1-reformers/content/chapter-3/3-11' },
            { id: '3-12', title: 'Reverse Boomerang', slug: '3-12', index: 12, completed: false, path: '/courses/level1-reformers/content/chapter-3/3-12' },
            { id: '3-13', title: 'Seal', slug: '3-13', index: 13, completed: false, path: '/courses/level1-reformers/content/chapter-3/3-13' },
            { id: '3-14', title: 'Angel', slug: '3-14', index: 14, completed: false, path: '/courses/level1-reformers/content/chapter-3/3-14' },
            { id: '3-15', title: 'Core & Abdominal Block: different body positions & transitioning', slug: '3-15', index: 15, completed: false, path: '/courses/level1-reformers/content/chapter-3/3-15' },
            { id: '3-16', title: 'Core and Abdominal Block: Practicing Cues', slug: '3-16', index: 16, completed: false, path: '/courses/level1-reformers/content/chapter-3/3-16' }
          ]
        },
        {
          id: 'ch4',
          title: 'Chapter 4: Light Leg Exercises',
          index: 4,
          lessons: [
            { id: '4-1', title: 'Light, Medium, Heavy Legs', slug: '4-1', index: 1, completed: false, path: '/courses/level1-reformers/content/chapter-4/4-1' },
            { id: '4-2', title: 'Platform Lunge', slug: '4-2', index: 2, completed: false, path: '/courses/level1-reformers/content/chapter-4/4-3' },
            { id: '4-3', title: 'Single Leg Squat', slug: '4-3', index: 3, completed: false, path: '/courses/level1-reformers/content/chapter-4/4-4' },
            { id: '4-4', title: 'Floor Lunge', slug: '4-4', index: 4, completed: false, path: '/courses/level1-reformers/content/chapter-4/4-5' },
            { id: '4-5', title: 'Side Lunge', slug: '4-5', index: 5, completed: false, path: '/courses/level1-reformers/content/chapter-4/4-6' },
            { id: '4-6', title: 'Light Squats', slug: '4-6', index: 6, completed: false, path: '/courses/level1-reformers/content/chapter-4/4-7' },
            { id: '4-7', title: 'Curtsy Lunge', slug: '4-7', index: 7, completed: false, path: '/courses/level1-reformers/content/chapter-4/4-8' },
            { id: '4-8', title: 'Squatting Inner Thighs', slug: '4-8', index: 8, completed: false, path: '/courses/level1-reformers/content/chapter-4/4-9' },
            { id: '4-9', title: 'Kneeling Inner Thighs', slug: '4-9', index: 9, completed: false, path: '/courses/level1-reformers/content/chapter-4/4-10' },
            { id: '4-10', title: 'Standing Inner Thighs', slug: '4-10', index: 10, completed: false, path: '/courses/level1-reformers/content/chapter-4/4-11' },
            { id: '4-11', title: 'Inner Thighs (Another Video)', slug: '4-11', index: 11, completed: false, path: '/courses/level1-reformers/content/chapter-4/4-12' },
          ]
        },
        {
          id: 'ch5',
          title: 'Chapter 5: Medium Leg Exercises',
          index: 5,
          lessons: [
            { id: '5-1', title: 'Back Reverse Platform Lunge', slug: '5-1', index: 1, completed: false, path: '/courses/level1-reformers/content/chapter-5/5-1' },
            { id: '5-2', title: 'Back Kneeling Inner Thighs', slug: '5-2', index: 2, completed: false, path: '/courses/level1-reformers/content/chapter-5/5-2' },
            { id: '5-3', title: 'Back Carriage Lunge', slug: '5-3', index: 3, completed: false, path: '/courses/level1-reformers/content/chapter-5/5-3' },
            { id: '5-4', title: 'Back Single Leg Squat', slug: '5-4', index: 4, completed: false, path: '/courses/level1-reformers/content/chapter-5/5-4' },
            { id: '5-5', title: 'Back Light Squats', slug: '5-5', index: 5, completed: false, path: '/courses/level1-reformers/content/chapter-5/5-5' },
            { id: '5-6', title: 'Back Standing Inner Thigh', slug: '5-6', index: 6, completed: false, path: '/courses/level1-reformers/content/chapter-5/5-6' },
            { id: '5-7', title: 'Well Lunge', slug: '5-7', index: 7, completed: false, path: '/courses/level1-reformers/content/chapter-5/5-7' },
            { id: '5-8', title: 'Back Reverse Floor Lunge (over the back platform)', slug: '5-8', index: 8, completed: false, path: '/courses/level1-reformers/content/chapter-5/5-8' }
          ]
        },
        {
          id: 'ch6',
          title: 'Chapter 6: Heavy Leg Exercises',
          index: 6,
          lessons: [
            { id: '6-1', title: 'Standing Outer Thighs', slug: '6-1', index: 1, completed: false, path: '/courses/level1-reformers/content/chapter-6/6-1' },
            { id: '6-2', title: 'Heavy Squat', slug: '6-2', index: 2, completed: false, path: '/courses/level1-reformers/content/chapter-6/6-2' },
            { id: '6-3', title: 'Skater and Shifted Skater', slug: '6-3', index: 3, completed: false, path: '/courses/level1-reformers/content/chapter-6/6-3' },
            { id: '6-4', title: 'Sprinter\'s Lunge', slug: '6-4', index: 4, completed: false, path: '/courses/level1-reformers/content/chapter-6/6-4' },
            { id: '6-5', title: 'Side Kick', slug: '6-5', index: 5, completed: false, path: '/courses/level1-reformers/content/chapter-6/6-5' },
            { id: '6-6', title: 'Black Widow', slug: '6-6', index: 6, completed: false, path: '/courses/level1-reformers/content/chapter-6/6-6' },
            { id: '6-7', title: 'Praying Mantis', slug: '6-7', index: 7, completed: false, path: '/courses/level1-reformers/content/chapter-6/6-7' },
            { id: '6-8', title: 'Donkey Kick', slug: '6-8', index: 8, completed: false, path: '/courses/level1-reformers/content/chapter-6/6-8' },
            { id: '6-9', title: 'Side Laying Leg Press', slug: '6-9', index: 9, completed: false, path: '/courses/level1-reformers/content/chapter-6/6-9' },
            { id: '6-10', title: 'Heavy Single Leg Press (in Bridge Position)', slug: '6-10', index: 10, completed: false, path: '/courses/level1-reformers/content/chapter-6/6-10' },
            { id: '6-11', title: 'Scooter Kick', slug: '6-11', index: 11, completed: false, path: '/courses/level1-reformers/content/chapter-6/6-11' },
            { id: '6-12', title: 'Heavy Carriage Lunge W\\ ROW', slug: '6-12', index: 12, completed: false, path: '/courses/level1-reformers/content/chapter-6/6-12' },
            { id: '6-13', title: 'Bungee Kick', slug: '6-13', index: 13, completed: false, path: '/courses/level1-reformers/content/chapter-6/6-13' },
            { id: '6-14', title: 'Bungee Straight Leg', slug: '6-14', index: 14, completed: false, path: '/courses/level1-reformers/content/chapter-6/6-14' },
            { id: '6-15', title: 'Leg Block — different body positions & transitioning', slug: '6-15', index: 15, completed: false, path: '/courses/level1-reformers/content/chapter-6/6-15' },
            { id: '6-16', title: 'Leg Block — Practicing Cues', slug: '6-16', index: 16, completed: false, path: '/courses/level1-reformers/content/chapter-6/6-16' }
          ]
        },
        {
          id: 'ch7',
          title: 'Chapter 7: Oblique Exercises',
          index: 7,
          lessons: [
            { id: '7-1', title: 'Torse Twist 1.0 & 2.0', slug: '7-1', index: 1, completed: false, path: '/courses/level1-reformers/content/chapter-7/7-1' },
            { id: '7-2', title: 'Oblique Sweep', slug: '7-2', index: 2, completed: false, path: '/courses/level1-reformers/content/chapter-7/7-2' },
            { id: '7-3', title: 'Oblique Kickback', slug: '7-3', index: 3, completed: false, path: '/courses/level1-reformers/content/chapter-7/7-3' },
            { id: '7-4', title: 'Oblique Glute Kickback', slug: '7-4', index: 4, completed: false, path: '/courses/level1-reformers/content/chapter-7/7-4' },
            { id: '7-5', title: 'Back Reverse Side Kneeling Crunch', slug: '7-5', index: 5, completed: false, path: '/courses/level1-reformers/content/chapter-7/7-5' },
            { id: '7-6', title: 'Twister', slug: '7-6', index: 6, completed: false, path: '/courses/level1-reformers/content/chapter-7/7-6' },
            { id: '7-7', title: 'Bicycle Kicks', slug: '7-7', index: 7, completed: false, path: '/courses/level1-reformers/content/chapter-7/7-7' },
            { id: '7-8', title: 'Side Plank', slug: '7-8', index: 8, completed: false, path: '/courses/level1-reformers/content/chapter-7/7-8' },
            { id: '7-9', title: 'Nighthawk', slug: '7-9', index: 9, completed: false, path: '/courses/level1-reformers/content/chapter-7/7-9' },
            { id: '7-10', title: 'Twisted Plank to Pike', slug: '7-10', index: 10, completed: false, path: '/courses/level1-reformers/content/chapter-7/7-10' },
            { id: '7-11', title: 'Twisted Ab Wheel', slug: '7-11', index: 11, completed: false, path: '/courses/level1-reformers/content/chapter-7/7-11' },
            { id: '7-12', title: 'Twisted Saw', slug: '7-12', index: 12, completed: false, path: '/courses/level1-reformers/content/chapter-7/7-12' },
            { id: '7-13', title: 'Dancing Panther', slug: '7-13', index: 13, completed: false, path: '/courses/level1-reformers/content/chapter-7/7-13' },
            { id: '7-14', title: 'Mermaid Crunch', slug: '7-14', index: 14, completed: false, path: '/courses/level1-reformers/content/chapter-7/7-14' },
            { id: '7-15', title: 'Bow and Arrow', slug: '7-15', index: 15, completed: false, path: '/courses/level1-reformers/content/chapter-7/7-15' },
            { id: '7-16', title: 'Twisted Forearm Plank to Pike', slug: '7-16', index: 16, completed: false, path: '/courses/level1-reformers/content/chapter-7/7-16' },
            { id: '7-17', title: 'Bird Dog and Reverse Bird Dog', slug: '7-17', index: 17, completed: false, path: '/courses/level1-reformers/content/chapter-7/7-17' },
            { id: '7-18', title: 'Oblique Block: different body positions', slug: '7-18', index: 18, completed: false, path: '/courses/level1-reformers/content/chapter-7/7-18' },
            { id: '7-19', title: 'Oblique Block: Practicing Cues', slug: '7-19', index: 19, completed: false, path: '/courses/level1-reformers/content/chapter-7/7-19' }
          ]
        },
        {
          id: 'ch8',
          title: 'Chapter 8: Upper Body Exercises',
          index: 8,
          lessons: [
            { id: '8-1', title: 'Bicep Curl', slug: '8-1', index: 1, completed: false, path: '/courses/level1-reformers/content/chapter-8/8-1' },
            { id: '8-2', title: 'Alligator Jaw', slug: '8-2', index: 2, completed: false, path: '/courses/level1-reformers/content/chapter-8/8-2' },
            { id: '8-3', title: 'Chest Expansion', slug: '8-3', index: 3, completed: false, path: '/courses/level1-reformers/content/chapter-8/8-3' },
            { id: '8-4', title: 'Tricep KickBack', slug: '8-4', index: 4, completed: false, path: '/courses/level1-reformers/content/chapter-8/8-4' },
            { id: '8-5', title: 'Newspaper', slug: '8-5', index: 5, completed: false, path: '/courses/level1-reformers/content/chapter-8/8-5' },
            { id: '8-6', title: 'Serve the Platter & Serve the Party Platter', slug: '8-6', index: 6, completed: false, path: '/courses/level1-reformers/content/chapter-8/8-6' },
            { id: '8-7', title: 'Shoulder Press', slug: '8-7', index: 7, completed: false, path: '/courses/level1-reformers/content/chapter-8/8-7' },
            { id: '8-8', title: 'Tricep Extension', slug: '8-8', index: 8, completed: false, path: '/courses/level1-reformers/content/chapter-8/8-8' },
            { id: '8-9', title: 'Hug a Tree & Chest Press', slug: '8-9', index: 9, completed: false, path: '/courses/level1-reformers/content/chapter-8/8-9' },
            { id: '8-10', title: 'Forward Facing Bicep Curl', slug: '8-10', index: 10, completed: false, path: '/courses/level1-reformers/content/chapter-8/8-10' },
            { id: '8-11', title: 'Carriage Seated Row', slug: '8-11', index: 11, completed: false, path: '/courses/level1-reformers/content/chapter-8/8-11' },
            { id: '8-12', title: 'Carriage Seated Heavy Bicep Curl', slug: '8-12', index: 12, completed: false, path: '/courses/level1-reformers/content/chapter-8/8-12' },
            { id: '8-13', title: 'Back Seated Serve the Platter', slug: '8-13', index: 13, completed: false, path: '/courses/level1-reformers/content/chapter-8/8-13' },
            { id: '8-14', title: 'Back Seated Shoulder Press 1.0 & 2.0', slug: '8-14', index: 14, completed: false, path: '/courses/level1-reformers/content/chapter-8/8-14' },
            { id: '8-15', title: 'Back Seated Tricep Extension', slug: '8-15', index: 15, completed: false, path: '/courses/level1-reformers/content/chapter-8/8-15' },
            { id: '8-16', title: 'Back Kneeling Bicep Curl', slug: '8-16', index: 16, completed: false, path: '/courses/level1-reformers/content/chapter-8/8-16' },
            { id: '8-17', title: 'Back Kneeling Chest Expansion', slug: '8-17', index: 17, completed: false, path: '/courses/level1-reformers/content/chapter-8/8-17' },
            { id: '8-18', title: 'Handlebar Lat Pull, Bicep Curl, and Side Lat Pull (Obliques and Upper Body)', slug: '8-18', index: 18, completed: false, path: '/courses/level1-reformers/content/chapter-8/8-18' },
            { id: '8-19', title: 'Lat Pushdown', slug: '8-19', index: 19, completed: false, path: '/courses/level1-reformers/content/chapter-8/8-19' },
            { id: '8-20', title: 'Upper Body Block: different body positions', slug: '8-20', index: 20, completed: false, path: '/courses/level1-reformers/content/chapter-8/8-20' },
            { id: '8-21', title: 'Upper Body Block: Practicing Cues', slug: '8-21', index: 21, completed: false, path: '/courses/level1-reformers/content/chapter-8/8-21' }
          ]
        },
        {
          id: 'ch9',
          title: 'Chapter 9: Clients and Pregnancy',
          index: 9,
          lessons: [
            { id: '9-1', title: 'A Conversation about Pregnancy 01', slug: '9-1', index: 1, completed: false, path: '/courses/level1-reformers/content/chapter-9/9-1' },
            { id: '9-2', title: 'A Conversation about Pregnancy 02', slug: '9-2', index: 2, completed: false, path: '/courses/level1-reformers/content/chapter-9/9-2' },
            { id: '9-3', title: 'Pregnant Clients: guidelines and information', slug: '9-3', index: 3, completed: false, path: '/courses/level1-reformers/content/chapter-9/9-3' },
            { id: '9-4', title: 'Pregnant Friendly Routine', slug: '9-4', index: 4, completed: false, path: '/courses/level1-reformers/content/chapter-9/9-4' }
          ]
        },
        {
          id: 'ch10',
          title: 'Chapter 10: It\'s Practice Time!!',
          index: 10,
          lessons: [
            { id: '10-1', title: 'How to Cue Variations (aka Challenges) & Variations for Exercises', slug: '10-1', index: 1, completed: false, path: '/courses/level1-reformers/content/chapter-10/10-1' },
            { id: '10-2', title: 'How to Cue', slug: '10-2', index: 2, completed: false, path: '/courses/level1-reformers/content/chapter-10/10-2' },
            { id: '10-3', title: 'Cues and Communication', slug: '10-3', index: 3, completed: false, path: '/courses/level1-reformers/content/chapter-10/10-3' },
            { id: '10-4', title: 'How to Formulate a Full Routine (45 min & 50 Min)', slug: '10-4', index: 4, completed: false, path: '/courses/level1-reformers/content/chapter-10/10-4' },
            { id: '10-5', title: 'how to formulate leg routines (light, heavy, progression, regression)', slug: '10-5', index: 5, completed: false, path: '/courses/level1-reformers/content/chapter-10/10-5' },
            { id: '10-6', title: 'When to Modify with Springs, Add Spring, and Use the Stabilization Bar', slug: '10-6', index: 6, completed: false, path: '/courses/level1-reformers/content/chapter-10/10-6' },
            { id: '10-7', title: 'My Review of a Workout Routine Created by a New Instructor (part 1)', slug: '10-7', index: 7, completed: false, path: '/courses/level1-reformers/content/chapter-10/10-7' },
            { id: '10-8', title: 'My Review of a Workout Routine Created by a New Instructor (part 2)', slug: '10-8', index: 8, completed: false, path: '/courses/level1-reformers/content/chapter-10/10-8' },
            { id: '10-9', title: 'My Review of a Workout Routine Created by a New Instructor (part 3)', slug: '10-9', index: 9, completed: false, path: '/courses/level1-reformers/content/chapter-10/10-9' },
            { id: '10-10', title: 'Mock Class In Portugal', slug: '10-10', index: 10, completed: false, path: '/courses/level1-reformers/content/chapter-10/10-10' },
            { id: '10-11', title: 'Ari Teaching a Mock Class', slug: '10-11', index: 11, completed: false, path: '/courses/level1-reformers/content/chapter-10/10-11' },
            { id: '10-12', title: 'Kenza Mock Class', slug: '10-12', index: 12, completed: false, path: '/courses/level1-reformers/content/chapter-10/10-12' },
            { id: '10-13', title: 'Erina teaching her mock class', slug: '10-13', index: 13, completed: false, path: '/courses/level1-reformers/content/chapter-10/10-13' },
            { id: '10-14', title: 'Overall Tips and What to Expect', slug: '10-14', index: 14, completed: false, path: '/courses/level1-reformers/content/chapter-10/10-14' }
          ]
        },
        {
          id: 'ch11',
          title: 'Extra Exercise Tutorials',
          index: 11,
          lessons: [
            { id: '11-1', title: 'Stretches for after class', slug: '11-1', index: 1, completed: false, path: '/courses/level1-reformers/content/chapter-11/11-1' },
            { id: '11-2', title: 'The different variations (aka challenges) for exercises in each muscle group block', slug: '11-2', index: 2, completed: false, path: '/courses/level1-reformers/content/chapter-11/11-2' },
            { id: '11-3', title: 'Ab Wheel (Aka Wheelbarrow)', slug: '11-3', index: 3, completed: false, path: '/courses/level1-reformers/content/chapter-11/11-3' },
            { id: '11-4', title: 'Additional Upper Body: Seated, Kneeling, & Standing Exercises at the Back', slug: '11-4', index: 4, completed: false, path: '/courses/level1-reformers/content/chapter-11/11-4' },
            { id: '11-5', title: 'Back Plank to Pike', slug: '11-5', index: 5, completed: false, path: '/courses/level1-reformers/content/chapter-11/11-5' },
            { id: '11-6', title: 'Back Kneeling Crunch', slug: '11-6', index: 6, completed: false, path: '/courses/level1-reformers/content/chapter-11/11-6' },
            { id: '11-7', title: 'Back Reverse Twister (aka French Twist)', slug: '11-7', index: 7, completed: false, path: '/courses/level1-reformers/content/chapter-11/11-7' },
            { id: '11-8', title: 'Back Single Leg Squat', slug: '11-8', index: 8, completed: false, path: '/courses/level1-reformers/content/chapter-11/11-8' },
            { id: '11-9', title: 'Back Reverse Floor Lunge (on the side of the carriage) (another video)', slug: '11-9', index: 9, completed: false, path: '/courses/level1-reformers/content/chapter-11/11-9' },
            { id: '11-10', title: 'Back Floor Lunge (over the back platform) (another video)', slug: '11-10', index: 10, completed: false, path: '/courses/level1-reformers/content/chapter-11/11-10' },
            { id: '11-11', title: 'Black Widow (aka spider kick)', slug: '11-11', index: 11, completed: false, path: '/courses/level1-reformers/content/chapter-11/11-11' },
            { id: '11-12', title: 'Dancing Panther', slug: '11-12', index: 12, completed: false, path: '/courses/level1-reformers/content/chapter-11/11-12' },
            { id: '11-13', title: 'Forward Facing Bicep Curl (another video)', slug: '11-13', index: 13, completed: false, path: '/courses/level1-reformers/content/chapter-11/11-13' },
            { id: '11-14', title: 'Glute Kickback', slug: '11-14', index: 14, completed: false, path: '/courses/level1-reformers/content/chapter-11/11-14' },
            { id: '11-15', title: 'Praying Mantis (aka Spider Lunge)', slug: '11-15', index: 15, completed: false, path: '/courses/level1-reformers/content/chapter-11/11-15' },
            { id: '11-16', title: 'Reverse Plank to Pike', slug: '11-16', index: 16, completed: false, path: '/courses/level1-reformers/content/chapter-11/11-16' },
            { id: '11-17', title: 'Reverse Saw', slug: '11-17', index: 17, completed: false, path: '/courses/level1-reformers/content/chapter-11/11-17' },
            { id: '11-18', title: 'Reverse Twisted Plank to Pike', slug: '11-18', index: 18, completed: false, path: '/courses/level1-reformers/content/chapter-11/11-18' },
            { id: '11-19', title: 'Teaching Service the Platter to Lillian', slug: '11-19', index: 19, completed: false, path: '/courses/level1-reformers/content/chapter-11/11-19' },
            { id: '11-20', title: 'Super Lunge (aka fifth lunge)', slug: '11-20', index: 20, completed: false, path: '/courses/level1-reformers/content/chapter-11/11-20' },
            { id: '11-21', title: 'X-Lunge Variations', slug: '11-21', index: 21, completed: false, path: '/courses/level1-reformers/content/chapter-11/11-21' },
            { id: '11-22', title: 'Lat Pushdown, Handlebar Exercises, Exercises at the back using the short hard handles, Curtsy Single Leg Step Up', slug: '11-22', index: 22, completed: false, path: '/courses/level1-reformers/content/chapter-11/11-22' },
            { id: '11-23', title: '3 bird dog upper body oblique variations', slug: '11-23', index: 23, completed: false, path: '/courses/level1-reformers/content/chapter-11/11-23' },
            { id: '11-24', title: 'Spring Conversion from the Xformer to the Megacore', slug: '11-24', index: 24, completed: false, path: '/courses/level1-reformers/content/chapter-11/11-24' },
            { id: '11-25', title: 'New instructors practicing to cue upper body', slug: '11-25', index: 25, completed: false, path: '/courses/level1-reformers/content/chapter-11/11-25' },
            { id: '11-26', title: 'Learning form correction for platform lunge', slug: '11-26', index: 26, completed: false, path: '/courses/level1-reformers/content/chapter-11/11-26' },
            { id: '11-27', title: 'Form correction for Well Luge, X-lunge, and Back Single Leg squat', slug: '11-27', index: 27, completed: false, path: '/courses/level1-reformers/content/chapter-11/11-27' },
            { id: '11-28', title: 'How to correct Well Lunge and X-Lunge and Single legs Squat (Eleni)', slug: '11-28', index: 28, completed: false, path: '/courses/level1-reformers/content/chapter-11/11-28' }
          ]
        },
        {
          id: 'ch12',
          title: 'Full Workout Videos',
          index: 12,
          lessons: [
            { id: '12-1', title: '40 minute Xformer Workout Video', slug: '12-1', index: 1, completed: false, path: '/courses/level1-reformers/content/chapter-12/12-1' },
            { id: '12-2', title: '45 minute Xformer Workout Video', slug: '12-2', index: 2, completed: false, path: '/courses/level1-reformers/content/chapter-12/12-2' },
            { id: '12-3', title: '12 minute Xformer Workout Video', slug: '12-3', index: 3, completed: false, path: '/courses/level1-reformers/content/chapter-12/12-3' },
            { id: '12-4', title: '45 minute Xformer Workout Video (2)', slug: '12-4', index: 4, completed: false, path: '/courses/level1-reformers/content/chapter-12/12-4' },
            { id: '12-5', title: '40 minute Xformer Workout Video (2)', slug: '12-5', index: 5, completed: false, path: '/courses/level1-reformers/content/chapter-12/12-5' },
            { id: '12-6', title: '40 minute Xformer Workout Video (3)', slug: '12-6', index: 6, completed: false, path: '/courses/level1-reformers/content/chapter-12/12-6' },
            { id: '12-7', title: '45 minute Xformer Workout Video (3)', slug: '12-7', index: 7, completed: false, path: '/courses/level1-reformers/content/chapter-12/12-7' },
            { id: '12-8', title: '44 minute Workout Video', slug: '12-8', index: 8, completed: false, path: '/courses/level1-reformers/content/chapter-12/12-8' },
            { id: '12-9', title: '45 minute Workout Video (4)', slug: '12-9', index: 9, completed: false, path: '/courses/level1-reformers/content/chapter-12/12-9' },
            { id: '12-10', title: '9-minute Workout at the Back', slug: '12-10', index: 10, completed: false, path: '/courses/level1-reformers/content/chapter-12/12-10' }
          ]
        }
      ]
    };
  }
}

export default function CourseNavigation({ currentLessonPath, nextLessonPath }: CourseNavigationProps) {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [expandedChapters, setExpandedChapters] = useState<string[]>(['1']);
  const [allChapters, setAllChapters] = useState<Chapter[]>([]);
  const [courseData, setCourseData] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isUpdatingProgress, setIsUpdatingProgress] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [completedCourse, setCompletedCourse] = useState<any>(null);
  
  // Helper function to normalize lesson IDs for comparison
  const normalizeLessonId = (lessonId: string) => {
    // Remove any prefixes/suffixes and normalize format
    return lessonId.replace(/^lesson-?/i, '').replace(/-/g, '-').toLowerCase();
  };

  // Check if lesson is already completed when lesson path or user changes
  useEffect(() => {
    if (user && currentLessonPath) {
      const pathParts = currentLessonPath.split('/');
      const lessonIndex = pathParts[pathParts.length - 1];
      const courseType = currentLessonPath.includes('level1-megacore') ? 'level1-megacore' : 'level1-reformers';
      
      const courseProgress = user.courseProgress?.find((cp: any) => cp.courseId === courseType);
      
      // Try multiple matching strategies
      const normalizedCurrentLesson = normalizeLessonId(lessonIndex);
      const isAlreadyCompleted = courseProgress?.completedLessons?.some((lesson: any) => {
        const normalizedStoredLesson = normalizeLessonId(lesson.lessonId);
        
        // Exact match
        if (lesson.lessonId === lessonIndex) return true;
        
        // Normalized match
        if (normalizedStoredLesson === normalizedCurrentLesson) return true;
        
        // Check if current lesson ID is contained in stored lesson ID or vice versa
        if (lesson.lessonId.includes(lessonIndex) || lessonIndex.includes(lesson.lessonId)) return true;
        
        return false;
      });
      
      console.log('Checking lesson completion:', {
        lessonIndex,
        normalizedCurrentLesson,
        courseType,
        completedLessons: courseProgress?.completedLessons?.map((l: any) => ({
          original: l.lessonId,
          normalized: normalizeLessonId(l.lessonId)
        })),
        isAlreadyCompleted
      });
      
      setIsCompleted(isAlreadyCompleted || false);
    } else {
      setIsCompleted(false);
    }
  }, [currentLessonPath, user]);
  const router = useRouter();

  // Prevent hydration errors
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Get user data and fetch progress from Supabase
  useEffect(() => {
    if (!isClient) return;
    
    const userData = localStorage.getItem('user');
    const localProgressData = localStorage.getItem('localProgress');
    
    
    if (userData) {
      const parsedUser = JSON.parse(userData);
      console.log('Parsed user data:', parsedUser);
      setUser(parsedUser);
      
      // If user has progress data, calculate it immediately
      if (parsedUser.courseProgress && parsedUser.courseProgress.length > 0) {
        const courseType = currentLessonPath.includes('level1-megacore') ? 'level1-megacore' : 'level1-reformers';
        const courseProgress = parsedUser.courseProgress.find((cp: any) => cp.courseId === courseType);
        
        if (courseProgress) {
          const completedLessons = courseProgress.completedLessons || [];
          
          // Check if current lesson is already completed
          const pathParts = currentLessonPath.split('/');
          const lessonIndex = pathParts[pathParts.length - 1];
          const normalizedCurrentLesson = normalizeLessonId(lessonIndex);
          const isAlreadyCompleted = completedLessons.some((lesson: any) => {
            const normalizedStoredLesson = normalizeLessonId(lesson.lessonId);
            return lesson.lessonId === lessonIndex || 
                   normalizedStoredLesson === normalizedCurrentLesson ||
                   lesson.lessonId.includes(lessonIndex) || 
                   lessonIndex.includes(lesson.lessonId);
          });
          
          console.log('Immediate lesson completion check:', {
            lessonIndex,
            normalizedCurrentLesson,
            completedLessons: completedLessons.map((l: any) => ({
              original: l.lessonId,
              normalized: normalizeLessonId(l.lessonId)
            })),
            isAlreadyCompleted
          });
          
          setIsCompleted(isAlreadyCompleted);
        }
      }
      
      // Fetch progress from Supabase if user is logged in
      if (parsedUser._id && parsedUser._id !== 'local-user') {
        fetchProgressFromSupabase(parsedUser._id);
      }
    } else if (localProgressData) {
      // Handle local progress for anonymous users
      const parsedLocalProgress = JSON.parse(localProgressData);
      console.log('Parsed local progress data:', parsedLocalProgress);
      
      const localUser = {
        _id: 'local-user',
        name: 'Local User',
        email: 'local@example.com',
        courseProgress: parsedLocalProgress.courseProgress || []
      };
      
      setUser(localUser);
      
      // Calculate progress for local user
      const courseType = currentLessonPath.includes('level1-megacore') ? 'level1-megacore' : 'level1-reformers';
      const courseProgress = localUser.courseProgress.find((cp: any) => cp.courseId === courseType);
      
      if (courseProgress) {
        const completedLessons = courseProgress.completedLessons || [];
        
        // Check if current lesson is already completed
        const pathParts = currentLessonPath.split('/');
        const lessonIndex = pathParts[pathParts.length - 1];
        const normalizedCurrentLesson = normalizeLessonId(lessonIndex);
        const isAlreadyCompleted = completedLessons.some((lesson: any) => {
          const normalizedStoredLesson = normalizeLessonId(lesson.lessonId);
          return lesson.lessonId === lessonIndex || 
                 normalizedStoredLesson === normalizedCurrentLesson ||
                 lesson.lessonId.includes(lessonIndex) || 
                 lessonIndex.includes(lesson.lessonId);
        });
        
        console.log('Local progress lesson completion check:', {
          lessonIndex,
          normalizedCurrentLesson,
          completedLessons: completedLessons.map((l: any) => ({
            original: l.lessonId,
            normalized: normalizeLessonId(l.lessonId)
          })),
          isAlreadyCompleted
        });
        
        setIsCompleted(isAlreadyCompleted);
      }
    } else {
      console.log('No user data found in localStorage');
    }
  }, [isClient, currentLessonPath]);

  // Fetch progress from Supabase
  const fetchProgressFromSupabase = async (userId: string) => {
    try {
      const courseType = currentLessonPath.includes('level1-megacore') ? 'level1-megacore' : 'level1-reformers';
      const response = await fetch(`/api/user/progress?userId=${userId}&courseId=${courseType}`);
      
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.courseProgress) {
          // Update user with progress data from Supabase
          const updatedUser = {
            ...user,
            courseProgress: [data.courseProgress]
          };
          setUser(updatedUser);
          console.log('Progress loaded from Supabase:', data.courseProgress);
          
          // Check if current lesson is already completed
          const completedLessons = data.courseProgress.completedLessons || [];
          const pathParts = currentLessonPath.split('/');
          const lessonIndex = pathParts[pathParts.length - 1];
          const normalizedCurrentLesson = normalizeLessonId(lessonIndex);
          const isAlreadyCompleted = completedLessons.some((lesson: any) => {
            const normalizedStoredLesson = normalizeLessonId(lesson.lessonId);
            return lesson.lessonId === lessonIndex || 
                   normalizedStoredLesson === normalizedCurrentLesson ||
                   lesson.lessonId.includes(lessonIndex) || 
                   lessonIndex.includes(lesson.lessonId);
          });
          
          console.log('Supabase lesson completion check:', {
            lessonIndex,
            normalizedCurrentLesson,
            completedLessons: completedLessons.map((l: any) => ({
              original: l.lessonId,
              normalized: normalizeLessonId(l.lessonId)
            })),
            isAlreadyCompleted
          });
          
          setIsCompleted(isAlreadyCompleted);
        }
      }
    } catch (error) {
      console.error('Error fetching progress from Supabase:', error);
    }
  };


  // Listen for progress updates from other components
  useEffect(() => {
    const handleProgressUpdate = () => {
      // Refresh user data from localStorage
      const userData = localStorage.getItem('user');
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      }
    };

    window.addEventListener('progressUpdated', handleProgressUpdate);
    return () => window.removeEventListener('progressUpdated', handleProgressUpdate);
  }, []);

  // Fetch course data on component mount
  useEffect(() => {
    if (!isClient) return;
    
    const fetchCourseData = async () => {
      try {
        // Determine course type from current lesson path
        const courseType = currentLessonPath.includes('level1-megacore') ? 'level1-megacore' : 'level1-reformers';
        console.log('Fetching course data for:', courseType);
        
        // Try to fetch from API first
        try {
          const response = await fetch(`/api/courses/${courseType}/chapters`);
          console.log('API response status:', response.status);
          if (response.ok) {
            const data = await response.json();
            console.log('API response data:', data);
            if (data.success) {
              setAllChapters(data.chapters);
              setCourseData(data.course);
              setError(null);
              setIsLoading(false);
              return;
            }
          }
        } catch (apiError) {
          console.log('API call failed, using mock data:', apiError);
        }
        
        // Fallback to mock data if API fails
        const mockData = getMockCourseData(courseType);
        setAllChapters(mockData.chapters);
        setCourseData(mockData.course);
        setError(null);
        
      } catch (error) {
        console.error('Error fetching course data:', error);
        setError(error instanceof Error ? error.message : 'Unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourseData();
  }, [isClient, currentLessonPath]);

  const handleLessonClick = (lessonPath: string) => {
    router.push(lessonPath);
  };

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters(prev => 
      prev.includes(chapterId) 
        ? prev.filter(id => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  const isLessonCompleted = (lessonId: string) => {
    if (!user) return false;
    const courseType = currentLessonPath.includes('level1-megacore') ? 'level1-megacore' : 'level1-reformers';
    const courseProgress = user.courseProgress?.find((cp: any) => cp.courseId === courseType);
    
    if (courseProgress && courseProgress.completedLessons) {
      const isCompleted = courseProgress.completedLessons.some((lesson: any) => lesson.lessonId === lessonId);
      
      // Debug logging for lesson 3-10 specifically
      if (lessonId === '3-10') {
        console.log('🔍 CourseNavigation - Debugging lesson 3-10:');
        console.log('- user:', user);
        console.log('- courseType:', courseType);
        console.log('- courseProgress:', courseProgress);
        console.log('- completedLessons:', courseProgress.completedLessons);
        console.log('- isCompleted:', isCompleted);
      }
      
      return isCompleted;
    }
    
    return false;
  };

  // Global function to mark lesson 3-10 as completed for debugging
  const markLesson310AsCompleted = () => {
    console.log('🔧 Manually marking lesson 3-10 as completed in CourseNavigation...');
    
    const userData = localStorage.getItem('user');
    const localProgressData = localStorage.getItem('localProgress');
    
    let userToUpdate = null;
    let isLocalUser = false;
    
    if (userData) {
      userToUpdate = JSON.parse(userData);
    } else if (localProgressData) {
      userToUpdate = JSON.parse(localProgressData);
      isLocalUser = true;
    } else {
      // Create a local user for testing
      userToUpdate = {
        _id: 'local-user',
        name: 'Test User',
        email: 'test@example.com',
        courseProgress: []
      };
      isLocalUser = true;
    }
    
    // Find or create course progress
    let courseProgress = userToUpdate.courseProgress?.find((cp: any) => cp.courseId === 'level1-reformers');
    if (!courseProgress) {
      courseProgress = {
        courseId: 'level1-reformers',
        courseName: 'Level 1 Reformers',
        progress: 0,
        completedChapters: [],
        completedLessons: [],
        lastAccessed: new Date(),
        startedAt: new Date(),
      };
      if (!userToUpdate.courseProgress) userToUpdate.courseProgress = [];
      userToUpdate.courseProgress.push(courseProgress);
    }
    
    // Check if lesson is already completed
    const existingLesson = courseProgress.completedLessons?.find(
      (lesson: any) => lesson.lessonId === '3-10'
    );
    
    if (existingLesson) {
      console.log('ℹ️  Lesson 3-10 is already completed.');
      return;
    }
    
    // Add completed lesson
    if (!courseProgress.completedLessons) courseProgress.completedLessons = [];
    courseProgress.completedLessons.push({
      lessonId: '3-10',
      lessonTitle: 'Core and Abdominal Block: Practicing Cues',
      chapterId: '3',
      chapterName: 'Chapter 3',
      completedAt: new Date(),
    });
    
    // Calculate progress percentage
    const totalLessons = 147; // Total lessons in level1-reformers
    courseProgress.progress = Math.round((courseProgress.completedLessons.length / totalLessons) * 100);
    
    // Save to localStorage
    if (isLocalUser) {
      localStorage.setItem('localProgress', JSON.stringify(userToUpdate));
    } else {
      localStorage.setItem('user', JSON.stringify(userToUpdate));
    }
    
    console.log('✅ Lesson 3-10 marked as completed!');
    console.log(`📊 New progress: ${courseProgress.progress}% (${courseProgress.completedLessons.length}/147 lessons)`);
    
    // Update the user state in this component
    setUser(userToUpdate);
    
    // Trigger progress update event
    window.dispatchEvent(new CustomEvent('progressUpdated', { 
      detail: { courseId: 'level1-reformers', progress: courseProgress.progress } 
    }));
    
    console.log('🔄 Progress update event triggered. Checkmarks should appear in navigation.');
  };

  // Make the function available globally for debugging
  if (typeof window !== 'undefined') {
    (window as any).markLesson310AsCompleted = markLesson310AsCompleted;
  }

  const markAsCompleted = async () => {
    console.log('Mark as completed clicked!');
    console.log('User data:', user);
    console.log('Current completion state:', isCompleted);
    
    // Check if lesson is already completed
    if (isCompleted) {
      console.log('Lesson is already completed, skipping...');
      return;
    }
    
    // Set completion state
    setIsCompleted(true);
    setIsUpdatingProgress(true);
    
    try {
      const pathParts = currentLessonPath.split('/');
      const chapterIndex = pathParts[pathParts.length - 2]?.replace('chapter-', '');
      const lessonIndex = pathParts[pathParts.length - 1];
      const courseType = currentLessonPath.includes('level1-megacore') ? 'level1-megacore' : 'level1-reformers';
      
      // If user is logged in, try to save to Supabase database first
      if (user && user._id && user._id !== 'local-user') {
        console.log('User logged in, attempting to save to Supabase database');
        try {
          const response = await fetch('/api/user/complete-lesson', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: user._id,
              courseId: courseType,
              courseName: courseType === 'level1-megacore' ? 'Level 1 Megacore' : 'Level 1 Reformers',
              chapterId: chapterIndex,
              chapterName: `Chapter ${chapterIndex}`,
              lessonId: lessonIndex,
              lessonTitle: `Lesson ${lessonIndex}`,
            }),
          });
          
          const data = await response.json();
          
          if (data.success && data.courseProgress) {
            // Update local storage with new progress from Supabase
            const updatedUser = { ...user } as any;
            if (!updatedUser.courseProgress) updatedUser.courseProgress = [];
            const courseProgressIndex = updatedUser.courseProgress.findIndex((cp: any) => cp.courseId === courseType);
            if (courseProgressIndex !== -1) {
              updatedUser.courseProgress[courseProgressIndex] = data.courseProgress;
            } else {
              updatedUser.courseProgress.push(data.courseProgress);
            }
            localStorage.setItem('user', JSON.stringify(updatedUser));
            
            // Update the user state to trigger progress recalculation
            setUser(updatedUser);
            
            // Trigger a custom event to notify other components of progress update
            window.dispatchEvent(new CustomEvent('progressUpdated', { 
              detail: { courseId: courseType, progress: data.courseProgress.progress } 
            }));
            
            if (data.alreadyCompleted) {
              console.log('Lesson was already completed - no duplicate tracking:', data.message);
            } else {
              console.log('Lesson completed and saved to Supabase:', data.courseProgress);
            }
            
            // Check if course is completed and show certificate modal
            if (data.isCourseCompleted && data.certificateCreated) {
              console.log('🎉 Course completed! Showing certificate modal...');
              setCompletedCourse({
                id: courseType,
                title: courseType === 'level1-megacore' ? 'Level 1 Megacore' : 'Level 1 Reformers'
              });
              setShowCompletionModal(true);
            }
            
            // Success - exit early
            setIsUpdatingProgress(false);
            // Note: Navigation is now handled by the "Next Lesson" button
            return;
          } else {
            console.error('Failed to save lesson completion to Supabase:', data.error);
            console.log('Falling back to local storage...');
          }
        } catch (error) {
          console.error('Network error saving to Supabase:', error);
          console.log('Falling back to local storage...');
        }
      }
      
      // Fallback to local storage (for anonymous users or when database fails)
      {
        console.log('No user logged in, saving progress locally only');
        // Create a local user object for progress tracking
        const localUser: any = {
          _id: 'local-user',
          name: 'Local User',
          email: 'local@example.com',
          courseProgress: []
        };
        
        // Get existing local progress or create new
        const existingUserData = localStorage.getItem('localProgress');
        if (existingUserData) {
          const parsed = JSON.parse(existingUserData);
          localUser.courseProgress = parsed.courseProgress || [];
        }
        
        // Find or create course progress
        let courseProgress: any = localUser.courseProgress.find((cp: any) => cp.courseId === courseType);
        if (!courseProgress) {
          courseProgress = {
            courseId: courseType,
            courseName: courseType === 'level1-megacore' ? 'Level 1 Megacore' : 'Level 1 Reformers',
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
          (lesson: any) => lesson.lessonId === lessonIndex
        );
        if (!existingLesson) {
          courseProgress.completedLessons.push({
            lessonId: lessonIndex,
            lessonTitle: `Lesson ${lessonIndex}`,
            chapterId: chapterIndex || '',
            chapterName: chapterIndex ? `Chapter ${chapterIndex}` : '',
            completedAt: new Date(),
          });
        }
        
        // Calculate progress percentage using proper lesson counts
        const totalLessons = courseType === 'level1-megacore' ? 147 : 149;
        courseProgress.progress = Math.round((courseProgress.completedLessons.length / totalLessons) * 100);
        
        
        // Save to localStorage
        localStorage.setItem('localProgress', JSON.stringify(localUser));
        
        // Update the user state to trigger progress recalculation
        setUser(localUser);
        
        // Trigger a custom event to notify other components of progress update
        window.dispatchEvent(new CustomEvent('progressUpdated', { 
          detail: { courseId: courseType, progress: courseProgress.progress } 
        }));
      }
      
      setIsUpdatingProgress(false);
      // Note: Navigation is now handled by the "Next Lesson" button
    } catch (error) {
      console.error('Error saving lesson completion:', error);
      setIsUpdatingProgress(false);
    }
  };

  if (!isClient || isLoading) {
    return (
      <div className="w-80">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-80 p-4">
        <div className="bg-red-50  rounded-lg p-4">
          <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Course Navigation</h3>
          <p className="text-red-600 text-sm mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (allChapters.length === 0) {
    return (
      <div className="w-80 p-4">
        <div className="bg-yellow-50  rounded-lg p-4">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">No Course Data Available</h3>
          <p className="text-yellow-600 text-sm mb-4">The course navigation data is not available. This might be because the database needs to be seeded.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Mobile Navigation Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarExpanded(!sidebarExpanded)}
          className="bg-[#E43636] text-[#F6EFD2] p-3 rounded-full shadow-lg hover:bg-[#b82a2a] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Overlay */}
      {sidebarExpanded && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarExpanded(false)}
        />
      )}

      {/* Mobile Navigation Sidebar */}
      <div className={`lg:hidden fixed top-0 left-0 h-full w-full max-w-xs bg-white transform transition-transform duration-300 z-50 ${sidebarExpanded ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full overflow-x-hidden p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-[#E43636]">Course Navigation</h3>
            <button
              onClick={() => setSidebarExpanded(false)}
              className="text-[#E43636] hover:text-[#b82a2a] transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Course Chapters */}
          <div className="space-y-6 overflow-x-hidden">
            {allChapters.map((chapter) => (
              <div key={chapter.id} className=" rounded-lg overflow-hidden">
                <div 
                  className="flex items-center justify-between cursor-pointer p-4 bg-[#F6EFD2] hover:bg-[#E2DDB4] transition-colors"
                  onClick={() => toggleChapter(chapter.id)}
                >
                  <h4 className="font-bold text-[#E43636] text-base">{chapter.title}</h4>
                  <svg 
                    className={`w-5 h-5 text-[#E43636] transition-transform ${expandedChapters.includes(chapter.id) ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                
                {expandedChapters.includes(chapter.id) && (
                  <div className="bg-white ">
                            <div className="space-y-2 p-3 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-[#E43636] scrollbar-track-[#F6EFD2]">
                              {chapter.lessons.map((lesson) => (
                                <div
                                  key={lesson.id}
                                  onClick={() => {
                                    handleLessonClick(lesson.path);
                                    setSidebarExpanded(false); // Close mobile nav after selection
                                  }}
                                  className={`p-3 rounded cursor-pointer transition-colors text-sm ${
                                    lesson.path === currentLessonPath
                                      ? 'bg-[#F6EFD2] text-[#E43636] font-semibold '
                                      : 'text-[#000000] hover:bg-[#F6EFD2] hover:text-[#E43636]'
                                  }`}
                                >
                                  <div className="flex justify-between items-center min-w-0">
                                    <span className="truncate flex-1 mr-2 overflow-hidden">{lesson.title}</span>
                                    {isLessonCompleted(lesson.id) && (
                                      <div className="flex items-center justify-center w-5 h-5 bg-green-100 rounded-full flex-shrink-0">
                                        <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Desktop Navigation Sidebar */}
      <div className={`hidden lg:block transition-all duration-300 ${sidebarExpanded ? 'w-80' : 'w-20'} bg-white relative z-30 flex-shrink-0`}>
        <div className="overflow-x-hidden">
           {/* Toggle Button */}
           <button
             onClick={() => setSidebarExpanded(!sidebarExpanded)}
            className="absolute -right-3 top-6 bg-[#E43636] text-[#F6EFD2] p-2 rounded-full shadow-lg hover:bg-[#b82a2a] transition-colors z-40"
           >
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
             </svg>
           </button>
           
          <div className={`transition-all duration-300 p-4 ${sidebarExpanded ? 'opacity-100' : 'opacity-0'}`}>
          <h3 className="text-xl font-bold text-[#E43636] mb-4">Course Navigation</h3>
        
                     {/* Course Chapters */}
            <div className="space-y-6 overflow-x-hidden">
             {allChapters.map((chapter) => (
                <div key={chapter.id} className=" rounded-lg overflow-hidden">
                                   <div 
                    className="flex items-center justify-between cursor-pointer p-4 bg-[#F6EFD2] hover:bg-[#E2DDB4] transition-colors"
                    onClick={() => toggleChapter(chapter.id)}
                  >
                    <h4 className="font-bold text-[#E43636] text-base">{chapter.title}</h4>
                                        <svg 
                       className={`w-5 h-5 text-[#E43636] transition-transform ${expandedChapters.includes(chapter.id) ? 'rotate-180' : ''}`}
                       fill="none" 
                       stroke="currentColor" 
                       viewBox="0 0 24 24"
                     >
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                   </svg>
                 </div>
                 
                 {expandedChapters.includes(chapter.id) && (
                   <div className="bg-white ">
                              <div className="space-y-2 p-3 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-[#E43636] scrollbar-track-[#F6EFD2]">
                                {chapter.lessons.map((lesson) => (
                                  <div
                                    key={lesson.id}
                                    onClick={() => handleLessonClick(lesson.path)}
                                    className={`p-3 rounded cursor-pointer transition-colors text-sm ${
                                      lesson.path === currentLessonPath
                                        ? 'bg-[#F6EFD2] text-[#E43636] font-semibold '
                                        : 'text-[#000000] hover:bg-[#F6EFD2] hover:text-[#E43636]'
                                    }`}
                                  >
                                    <div className="flex justify-between items-center min-w-0">
                                      <span className="truncate flex-1 mr-2 overflow-hidden">{lesson.title}</span>
                                      {isLessonCompleted(lesson.id) && (
                                        <div className="flex items-center justify-center w-5 h-5 bg-green-100 rounded-full flex-shrink-0">
                                          <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                          </svg>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                   </div>
                 )}
               </div>
             ))}
           </div>

          </div>
        </div>
                   </div>

               {/* Mark as Completed / Next Lesson Button - Fixed at Bottom */}
        <div className="fixed bottom-8 right-8 z-50">
         {!isCompleted ? (
           <motion.button
             onClick={markAsCompleted}
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             disabled={isUpdatingProgress}
             className={`px-6 py-3 rounded-full font-bold shadow-lg transition-colors text-sm flex items-center ${
               isUpdatingProgress 
                 ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                 : 'bg-[#E43636] text-[#F6EFD2] hover:bg-[#b82a2a]'
             }`}
           >
             {isUpdatingProgress ? (
               <>
                 <svg className="w-4 h-4 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                 </svg>
                 Updating Progress...
               </>
             ) : (
               <>
                 <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                 </svg>
                 Mark as Completed
               </>
             )}
           </motion.button>
         ) : (
           <motion.button
             onClick={() => {
               if (nextLessonPath) {
                 window.location.href = nextLessonPath;
               }
             }}
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             disabled={!nextLessonPath}
             className={`px-6 py-3 rounded-full font-bold shadow-lg transition-colors text-sm flex items-center ${
               !nextLessonPath
                 ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                 : 'bg-green-600 text-white hover:bg-green-700'
             }`}
           >
             <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
             </svg>
             {nextLessonPath ? 'Next Lesson' : 'Course Complete!'}
           </motion.button>
         )}
       </div>

       {/* Course Completion Modal */}
       {showCompletionModal && completedCourse && user && (
         <CourseCompletionModal
           isOpen={showCompletionModal}
           onClose={() => setShowCompletionModal(false)}
           user={user}
           course={completedCourse}
           onCourseComplete={() => {
             console.log('Course completion callback triggered');
             // You can add additional logic here if needed
           }}
         />
       )}
     </>
   );
 }