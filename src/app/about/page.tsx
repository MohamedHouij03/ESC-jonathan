'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight text-[#E43636] sm:text-5xl mb-4">
            About Me
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#000000]">
            Your dedicated fitness and wellness partner
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Profile Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className=""
          >
            <h2 className="text-2xl font-semibold text-[#E43636] mb-6">Jonathan N.</h2>
            <div className="prose prose-lg mx-auto text-[#000000]">
              <p>
              In November 2021, I made a pivotal decision: I traded my medical career for teaching the evolution of modern Pilates, inspired by someone I love who encouraged me to chase true happiness. Letting go of what was comfortable, I said goodbye to the corporate world and fully immersed myself into becoming a certified fitness instructor. I am truly happier and committed to never reverting to my former self.              </p>
              <p className="mt-4">
              As an instructor, my mission is to craft each session to challenge clients, offering adaptable variations and intensifications while providing knowledge and unforgettable experiences. I want to empower clients with the tools to navigate their fitness journey, recognizing their inherent strength and limitless potential.              </p>
            </div>
            <Link href="/book-now" className="mt-4 text-[#E43636] hover:text-[#b82a2a] font-medium transition-colors duration-200 cursor-pointer">
              Join me in exploring the path to empowerment and self-discovery
            </Link>
          </motion.div>

          {/* Certifications Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className=""
          >
            <h2 className="text-2xl font-semibold text-[#E43636] mb-6">Certifications</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-[#E43636]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-[#000000]">Xformer Certification</h3>
                  <p className="mt-1 text-sm text-[#000000]">with Piper Michelle (November 2021)</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-[#E43636]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-[#000000]">In-House Lagree Certification</h3>
                  <p className="mt-1 text-sm text-[#000000]">with Lagree Dungeon in Orange, Ca (October 2023)</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-[#E43636]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-[#000000]">Observation of Level 1 Lagree Certification</h3>
                  <p className="mt-1 text-sm text-[#000000]">with Sharnee Lee Scott (October 2023)</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-[#E43636]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-[#000000]">Level 1 Lagree Certification</h3>
                  <p className="mt-1 text-sm text-[#000000]">with Sharnee Lee Scott (January 2024)</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-[#E43636]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-[#000000]">Inferno Hot Pilates Certification</h3>
                  <p className="mt-1 text-sm text-[#000000]">(November 2024)</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Experience Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className=""
          >
            <h2 className="text-2xl font-semibold text-[#E43636] mb-6">Experience</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-[#000000]">Teaching Statistics</h3>
                <p className="text-sm text-[#E43636]">Average classes taught: 30 per week</p>
                <ul className="mt-2 space-y-2 text-[#000000]">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-5 w-5 text-[#E43636]">•</span>
                    <span className="ml-2">Consistent high-volume teaching schedule</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-5 w-5 text-[#E43636]">•</span>
                    <span className="ml-2">Diverse client base across multiple fitness levels</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-5 w-5 text-[#E43636]">•</span>
                    <span className="ml-2">Proven track record of client retention and satisfaction</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium text-[#000000]">Reformer Experience</h3>
                <p className="text-sm text-[#E43636]">Comprehensive expertise across multiple platforms</p>
                <ul className="mt-2 space-y-2 text-[#000000]">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-5 w-5 text-[#E43636]">•</span>
                    <span className="ml-2">Xformer</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-5 w-5 text-[#E43636]">•</span>
                    <span className="ml-2">Megacore Reformer</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-5 w-5 text-[#E43636]">•</span>
                    <span className="ml-2">Lagree Megaformer M3 and MK3+</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-5 w-5 text-[#E43636]">•</span>
                    <span className="ml-2">Lagree Microformer</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-5 w-5 text-[#E43636]">•</span>
                    <span className="ml-2">Allegro 2</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-5 w-5 text-[#E43636]">•</span>
                    <span className="ml-2">Balanced Body Project X (customized reformer)</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Teaching Philosophy */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className=""
          >
            <h2 className="text-2xl font-semibold text-[#E43636] mb-6">Teaching Philosophy</h2>
            <div className="prose prose-lg mx-auto text-[#000000]">
              <p>
                I believe in creating a supportive and motivating environment where clients can achieve their fitness goals. My approach combines:
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 text-[#E43636]">•</span>
                  <span className="ml-2">Personalized attention and customized programs</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 text-[#E43636]">•</span>
                  <span className="ml-2">Evidence-based training methods</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 text-[#E43636]">•</span>
                  <span className="ml-2">Focus on proper form and injury prevention</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 text-[#E43636]">•</span>
                  <span className="ml-2">Continuous support and motivation</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}