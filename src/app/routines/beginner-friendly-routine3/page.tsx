'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const BeginnerFriendlyRoutine3Page = () => {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.replace('/auth/signin');
    } else {
      setCheckingAuth(false);
    }
  }, [router]);

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E43636]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-[#E43636]">
        <div className="absolute inset-0 bg-[#000000] opacity-30"></div>
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-4xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-[#F6EFD2] mb-6"
            >
              Beginner Friendly Routine 03
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-[#F6EFD2] opacity-90 mb-8"
            >
              A comprehensive workout designed for beginners
            </motion.p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Important Notes */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-8 border border-[#E43636]/20"
        >
          <h2 className="text-3xl font-bold text-[#E43636] mb-4">Top 3 to inform the class before starting:</h2>
          <ul className="list-disc list-inside text-[#000000] space-y-2">
            <li>2 white springs at the front of the machine will be your modification</li>
            <li>There are stabilization poles if you ever need to use them</li>
            <li>Side Plank - rest or hold if the shoulders start to be irritable</li>
          </ul>
        </motion.div>

        {/* Exercises Sections */}
        <div className="space-y-8">
          {/* Abs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-8 border border-[#E43636]/20"
          >
            <h2 className="text-2xl font-bold text-[#E43636] mb-4">Abs [10 min]</h2>
            <ul className="list-disc list-inside text-[#000000] space-y-2">
              <li>Ab Wheel</li>
              <li>Saw</li>
              <li>Plank to Pike</li>
              <li>Hi Panther (handle bars turned towards the front)</li>
              <li>Super Reverse Kneeling Crunch</li>
            </ul>
          </motion.div>

          {/* Legs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white rounded-lg shadow-lg p-8 border border-[#E43636]/20"
          >
            <h2 className="text-2xl font-bold text-[#E43636] mb-4">Legs [9 min x 2 = 18 min] - Legs back to back</h2>
            <ul className="list-disc list-inside text-[#000000] space-y-2">
              <li>1 min - Single Kneeling Leg Saw (use back straps for assistance)</li>
              <li>Well Lunge</li>
              <li>Single Leg Squat</li>
              <li>Platform Lunge</li>
              <li>Standing Inner Thighs or Carriage Lunge or Light Squats</li>
            </ul>
          </motion.div>

          {/* Oblique */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white rounded-lg shadow-lg p-8 border border-[#E43636]/20"
          >
            <h2 className="text-2xl font-bold text-[#E43636] mb-4">Oblique [8 min]</h2>
            <ul className="list-disc list-inside text-[#000000] space-y-2">
              <li>1-minute Reverse Side Plank, then 1 minute Reverse Nighthawk (thread the needle to modify) (left oblique)</li>
              <li>Reverse Twisted Saw (left oblique)</li>
              <li>1-minute Reverse Side Plank, then 1 minute Reverse Nighthawk (thread the needle to modify) (right oblique)</li>
              <li>Reverse Twisted Saw (left oblique)</li>
            </ul>
          </motion.div>

          {/* Upper Body */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="bg-white rounded-lg shadow-lg p-8 border border-[#E43636]/20"
          >
            <h2 className="text-2xl font-bold text-[#E43636] mb-4">Upper Body [6 min]</h2>
            <p className="text-[#000000] mb-4">(2-3 white springs)</p>
            <p className="text-[#000000] mb-4">(handle bars at the back of the machine turned inwards to face one another)</p>
            <ul className="list-disc list-inside text-[#000000] space-y-2">
              <li>Handle bar Lat Push Down</li>
              <li>Lat Pull</li>
              <li>Bicep Curl Pull</li>
            </ul>
          </motion.div>

          {/* Core Finisher */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-white rounded-lg shadow-lg p-8 border border-[#E43636]/20"
          >
            <h2 className="text-2xl font-bold text-[#E43636] mb-4">Core Finisher</h2>
            <ul className="list-disc list-inside text-[#000000] space-y-2">
              <li>1-minute Plank Freestyle</li>
            </ul>
          </motion.div>
        </div>

        {/* Back to Routines Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-12 text-center"
        >
          <Link href="/routines">
            <button className="bg-[#E43636] hover:bg-[#d02f2f] text-[#F6EFD2] font-bold py-3 px-6 rounded-lg transition-colors duration-200">
              Back to Routines
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default BeginnerFriendlyRoutine3Page; 