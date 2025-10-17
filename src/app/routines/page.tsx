'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Routine {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'pregnancy';
}

const routines: Routine[] = [
  {
    id: 'beginner-friendly',
    title: 'Beginner Friendly Routine 1',
    description: 'A perfect starting point for those new to fitness or returning after a break. Focuses on foundational movements and safe modifications.',
    level: 'beginner'
  },
  {
    id: 'beginner-friendly-routine2',
    title: 'Beginner Friendly Routine 2',
    description: 'A perfect starting point for those new to fitness or returning after a break. Focuses on foundational movements and safe modifications.',
    level: 'beginner'
  },
  {
    id: 'beginner-friendly-routine3',
    title: 'Beginner Friendly Routine 3',
    description: 'A perfect starting point for those new to fitness or returning after a break. Focuses on foundational movements and safe modifications.',
    level: 'beginner'
  },
  {
    id: 'beginner-friendly-routine4',
    title: 'Beginner Friendly Routine 4',
    description: 'A perfect starting point for those new to fitness or returning after a break. Focuses on foundational movements and safe modifications.',
    level: 'beginner'
  },
  {
    id: 'beginner-friendly-routine5',
    title: 'Beginner Friendly Routine 5',
    description: 'A perfect starting point for those new to fitness or returning after a break. Focuses on foundational movements and safe modifications.',
    level: 'beginner'
  },
  {
    id: 'intermediate',
    title: 'Intermediate Routine 1',
    description: 'For those ready to build on the basics with more challenging exercises and longer sequences.',
    level: 'intermediate'
  },
  {
    id: 'intermediate-routine2',
    title: 'Intermediate Routine 2',
    description: 'For those ready to build on the basics with more challenging exercises and longer sequences.',
    level: 'intermediate'
  },
  {
    id: 'advanced',
    title: 'Advanced',
    description: 'High-intensity routines for experienced individuals looking to push their limits and master complex movements.',
    level: 'advanced'
  },
  {
    id: 'pregnant-friendly',
    title: 'Pregnant Friendly',
    description: 'Safe, low-impact routines designed for expectant mothers, focusing on gentle strength and mobility.',
    level: 'pregnancy'
  }
];

export default function RoutinesPage() {
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  const filteredRoutines = routines.filter(routine => {
    const levelMatch = selectedLevel === 'all' || routine.level === selectedLevel;
    return levelMatch;
  });

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight text-[#E43636] sm:text-5xl mb-4">
            Workout Routines
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#000000]">
            Choose from our carefully curated routines designed for every fitness level and need.
          </p>
        </motion.div>

        {/* Level Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-8 flex flex-wrap justify-center gap-4"
        >
          <button
            onClick={() => setSelectedLevel('all')}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
              selectedLevel === 'all'
                ? 'bg-[#E43636] text-[#F6EFD2]'
                : 'bg-white text-[#000000] border border-[#E43636] hover:bg-[#E43636] hover:text-[#F6EFD2]'
            }`}
          >
            All Routines
          </button>
          <button
            onClick={() => setSelectedLevel('beginner')}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
              selectedLevel === 'beginner'
                ? 'bg-[#E43636] text-[#F6EFD2]'
                : 'bg-white text-[#000000] border border-[#E43636] hover:bg-[#E43636] hover:text-[#F6EFD2]'
            }`}
          >
            Beginner
          </button>
          <button
            onClick={() => setSelectedLevel('intermediate')}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
              selectedLevel === 'intermediate'
                ? 'bg-[#E43636] text-[#F6EFD2]'
                : 'bg-white text-[#000000] border border-[#E43636] hover:bg-[#E43636] hover:text-[#F6EFD2]'
            }`}
          >
            Intermediate
          </button>
          <button
            onClick={() => setSelectedLevel('advanced')}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
              selectedLevel === 'advanced'
                ? 'bg-[#E43636] text-[#F6EFD2]'
                : 'bg-white text-[#000000] border border-[#E43636] hover:bg-[#E43636] hover:text-[#F6EFD2]'
            }`}
          >
            Advanced
          </button>
          <button
            onClick={() => setSelectedLevel('pregnancy')}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
              selectedLevel === 'pregnancy'
                ? 'bg-[#E43636] text-[#F6EFD2]'
                : 'bg-white text-[#000000] border border-[#E43636] hover:bg-[#E43636] hover:text-[#F6EFD2]'
            }`}
          >
            Pregnancy Friendly
          </button>
        </motion.div>

        {/* Routines Grid */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredRoutines.map((routine, index) => (
            <motion.div
              key={routine.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative flex flex-col bg-white rounded-2xl shadow-md border border-[#E2DDB4] overflow-hidden h-full"
            >
              <div className="p-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-[#000000]">
                    {routine.title}
                  </h3>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold bg-white text-[#E43636]`}>
                    {routine.level.charAt(0).toUpperCase() + routine.level.slice(1)}
                  </span>
                </div>
                <p className="mt-4 text-[#000000] flex-grow mb-8">{routine.description}</p>
                <div className="mt-auto">
                  <Link
                    href={`/routines/${routine.id}`}
                    className="inline-flex w-full items-center justify-center rounded-lg bg-[#E43636] px-4 py-3 text-sm font-semibold text-[#F6EFD2] shadow-none hover:bg-[#000000] hover:text-[#E43636] border border-[#E43636] transition-all duration-200"
                  >
                    Start Workout
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 