'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const AdvancedRoutinePage = () => {
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
              Advanced Routine
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-[#F6EFD2] opacity-90 mb-8"
            >
              High-intensity routines for experienced individuals
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg text-[#F6EFD2] opacity-90 mb-8"
            >
              (2 white springs instead of 1 white spring to modify for any exercises at the front of the machine)
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
            <li>Long black strap: the long black strap is lighter and the short hard handle is heavier</li>
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
              <li>Reverse Bird Dog (warm up)</li>
              <li>Reverse Bird Dog (warm up)</li>
              <li>Reverse Ab Wheel (up onto toes for challenge takers)</li>
              <li>Reverse Saw (up onto toes for challenge takers)</li>
              <li>Reverse Forearm Plank to Pike (full arm plank as an option versus on forearms)</li>
            </ul>
          </motion.div>

          {/* Legs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white rounded-lg shadow-lg p-8 border border-[#E43636]/20"
          >
            <h2 className="text-2xl font-bold text-[#E43636] mb-4">Legs [10 min x 2 = 20 min] - Legs back to back</h2>
            <ul className="list-disc list-inside text-[#000000] space-y-2">
              <li>Well Lunge / Back floor lunge (harder)</li>
              <li>Kneeling inner thigh at the front (zero springs or go slower for stronger clients)</li>
              <li>Single leg squat</li>
              <li>Platform lunge</li>
              <li>Light Squats (watch out for knees collapsing inward)</li>
            </ul>
          </motion.div>

          {/* Oblique + Upper Body */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white rounded-lg shadow-lg p-8 border border-[#E43636]/20"
          >
            <h2 className="text-2xl font-bold text-[#E43636] mb-4">Oblique + Upper Body [11 min]</h2>
            <ul className="list-disc list-inside text-[#000000] space-y-2">
              <li>Torso Twist</li>
              <li>Serve the Platter</li>
              <li>Shoulder Press</li>
              <li>Tricep Extension</li>
              <li>Arm Circles (arms out in front of you like you're pushing someone away - circles up, out, down, up the center…then reverse)</li>
              <li className="ml-4">[1 min total - 30 seconds one way, 30 seconds the other way]</li>
              <li>Torso Twist</li>
            </ul>
          </motion.div>
        </div>

        {/* Back to Routines Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Link href="/routines">
            <button className="bg-[#E43636] hover:bg-[#E43636]/90 text-[#F6EFD2] font-bold py-3 px-6 rounded-lg transition-colors duration-200">
              Back to Routines
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default AdvancedRoutinePage; 