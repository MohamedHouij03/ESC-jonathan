'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const IntermediateRoutine2Page = () => {
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
              Intermediate Routine 02
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-[#E2DDB4] mb-8"
            >
              For those ready to build on the basics with more challenging exercises
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
          className="bg-[#E2DDB4] rounded-lg shadow-lg p-8 mb-8 border border-[#E43636]/20"
        >
          <h2 className="text-3xl font-bold text-[#E43636] mb-4">Top 3 to inform the class before starting:</h2>
          <ul className="list-disc list-inside text-[#000000] space-y-2">
            <li>That you'll be turning in their back handlebars for the last part of class</li>
            <li>Super Plank to Pike - modification is feet down into the well or go to the front, facing front</li>
            <li>Floor Lunge - Explain where to anchor the non-target foot on the carriage (behind the back carriage strap or around it)</li>
            <li>If the shoulders become irritably, take a break</li>
          </ul>
        </motion.div>

        {/* Exercises Sections */}
        <div className="space-y-8">
          {/* Abs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-[#E2DDB4] rounded-lg shadow-lg p-8 border border-[#E43636]/20"
          >
            <h2 className="text-2xl font-bold text-[#E43636] mb-4">Abs [10 min]</h2>
            <p className="text-[#000000] mb-4">(go to the front to modify if too difficult for the last 2 exercises "because we're going there soon")</p>
            <ul className="list-disc list-inside text-[#000000] space-y-2">
              <li>Super Seated Crunch</li>
              <li>Super Flying Ab Wheel</li>
              <li>Super Kneeling Crunch</li>
              <li>Super Saw</li>
              <li>Super Plank to Pike</li>
            </ul>
          </motion.div>

          {/* Legs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-[#E2DDB4] rounded-lg shadow-lg p-8 border border-[#E43636]/20"
          >
            <h2 className="text-2xl font-bold text-[#E43636] mb-4">Legs [10 min x 2 = 20 min] - Legs back to back</h2>
            <ul className="list-disc list-inside text-[#000000] space-y-2">
              <li>Floor Lunge</li>
              <li>Single Leg Squat</li>
              <li>Carriage Lunge</li>
            </ul>
            <p className="text-[#000000] mt-4">(spring change: 5 whites springs, 1 black spring, or 1 black spring + whites)</p>
            <ul className="list-disc list-inside text-[#000000] space-y-2 mt-2">
              <li>Bungee Kick (hold at highest point, down 1 or 2 inches, up 1 or 2 inches)</li>
              <li>Heavy Skater or Donkey Kick</li>
            </ul>
          </motion.div>

          {/* Oblique */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-[#E2DDB4] rounded-lg shadow-lg p-8 border border-[#E43636]/20"
          >
            <h2 className="text-2xl font-bold text-[#E43636] mb-4">Oblique [6 min x 2 = 12 min] - obliques back to back</h2>
            <p className="text-[#000000] mb-4">(spring change: 2-3 white springs)</p>
            <ul className="list-disc list-inside text-[#000000] space-y-2">
              <li>Torso Twist</li>
              <li>Oblique Sweep</li>
              <li>Clamshell 2.0 or Clamshell 3.0</li>
            </ul>
          </motion.div>

          {/* Upper Body */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="bg-[#E2DDB4] rounded-lg shadow-lg p-8 border border-[#E43636]/20"
          >
            <h2 className="text-2xl font-bold text-[#E43636] mb-4">Upper Body [remainder of class]</h2>
            <ul className="list-disc list-inside text-[#000000] space-y-2">
              <li>Back Handle Bar Exercises at the back</li>
            </ul>
          </motion.div>

          {/* Core Finisher */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-[#E2DDB4] rounded-lg shadow-lg p-8 border border-[#E43636]/20"
          >
            <h2 className="text-2xl font-bold text-[#E43636] mb-4">Core Finisher</h2>
            <ul className="list-disc list-inside text-[#000000] space-y-2">
              <li>Push-Up challenge or 1-Minute Plank Freestyle</li>
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
            <button className="bg-[#E43636] hover:bg-[#000000] text-[#F6EFD2] font-bold py-3 px-6 rounded-lg transition-colors duration-200">
              Back to Routines
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default IntermediateRoutine2Page; 