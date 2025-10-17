'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Level1Page = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-4xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              ESCP Level 1 Training
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-white mb-8"
            >
              Comprehensive Reformer Training Program
            </motion.p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Course Overview */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Course Overview</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Course Structure</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>12 comprehensive modules</li>
                <li>Practical and theoretical components</li>
                <li>Hands-on training sessions</li>
                <li>Assessment and certification</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Modules Section */}
        <div className="space-y-8">
          {/* Module 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Module 1: Introduction to Pilates</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>History and principles of Pilates</li>
              <li>Basic anatomy and movement patterns</li>
              <li>Introduction to the Reformer</li>
              <li>Safety guidelines and equipment setup</li>
            </ul>
          </motion.div>

          {/* Module 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Module 2: Fundamental Exercises</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Footwork series</li>
              <li>Hundred preparation</li>
              <li>Basic arm work</li>
              <li>Leg circles and single leg work</li>
            </ul>
          </motion.div>

          {/* Module 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Module 3: Core Work</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Abdominal series</li>
              <li>Spine articulation</li>
              <li>Basic back extension</li>
              <li>Core stabilization exercises</li>
            </ul>
          </motion.div>

          {/* Module 4 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Module 4: Upper Body</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Arm work series</li>
              <li>Shoulder stabilization</li>
              <li>Upper back exercises</li>
              <li>Posture correction</li>
            </ul>
          </motion.div>

          {/* Module 5 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Module 5: Lower Body</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Leg work series</li>
              <li>Hip mobility exercises</li>
              <li>Glute activation</li>
              <li>Lower body alignment</li>
            </ul>
          </motion.div>

          {/* Module 6 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Module 6: Full Body Integration</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Combining upper and lower body movements</li>
              <li>Flow sequences</li>
              <li>Balance exercises</li>
              <li>Coordination drills</li>
            </ul>
          </motion.div>

          {/* Module 7 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Module 7: Teaching Methodology</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Class planning and structure</li>
              <li>Exercise progression</li>
              <li>Modification techniques</li>
              <li>Client communication</li>
            </ul>
          </motion.div>

          {/* Module 8 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Module 8: Assessment and Certification</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Practical assessment</li>
              <li>Written examination</li>
              <li>Teaching evaluation</li>
              <li>Certification process</li>
            </ul>
          </motion.div>
        </div>

        {/* Additional Information */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="bg-white rounded-lg shadow-lg p-8 mt-8"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Additional Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Prerequisites</h3>
              <ul className="list-disc list-inside text-gray-600">
                <li>Basic understanding of anatomy</li>
                <li>Fitness industry experience</li>
                <li>First aid certification</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Course Duration</h3>
              <ul className="list-disc list-inside text-gray-600">
                <li>12 weeks total</li>
                <li>Weekly practical sessions</li>
                <li>Online theory modules</li>
                <li>Self-paced learning</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Level1Page; 