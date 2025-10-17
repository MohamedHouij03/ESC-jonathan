'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Lesson315() {
  const [activeTab, setActiveTab] = useState('description');
  const { progress } = useUserProgress('level1-megacore');
  const [completedLessons, setCompletedLessons] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]); // Track completed lessons

  const chapterLessons = [
    { id: 1, title: 'Ab Wheel', duration: '15 min', completed: true },
    { id: 2, title: 'Chapter 3 - Lesson 2', duration: '12 min', completed: true },
    { id: 3, title: 'Flying Ab Wheel', duration: '14 min', completed: true },
    { id: 4, title: 'Saw', duration: '16 min', completed: true },
    { id: 5, title: 'Back Saw', duration: '13 min', completed: true },
    { id: 6, title: 'Plank to Pike', duration: '18 min', completed: true },
    { id: 7, title: 'Panther', duration: '15 min', completed: true },
    { id: 8, title: 'Hi Panther', duration: '12 min', completed: true },
    { id: 9, title: 'Hi Panther (Front)', duration: '14 min', completed: true },
    { id: 10, title: 'Back Reverse Hi Panther', duration: '16 min', completed: true },
    { id: 11, title: 'Heavy Panther', duration: '18 min', completed: true },
    { id: 12, title: 'Reverse Boomerang', duration: '15 min', completed: true },
    { id: 13, title: 'Seal', duration: '16 min', completed: true },
    { id: 14, title: 'Chapter 3 - Lesson 14', duration: '12 min', completed: true },
    { id: 15, title: 'Angel', duration: '18 min', completed: true },
    { id: 16, title: 'Chapter 3 - Lesson 16', duration: '14 min', completed: false },
    { id: 17, title: 'Reverse Angel', duration: '16 min', completed: false },
  ];

  const lessonGoals = [
    'Master Angel exercise form and technique',
    'Understand proper arm movement and control',
    'Learn proper breathing and execution',
    'Practice holds and pulses for progression'
  ];

  const resources = [
    { name: 'Angel Exercise Guide PDF', type: 'pdf', size: '2.3 MB' },
    { name: 'Core Strength Progression', type: 'pdf', size: '1.9 MB' },
    { name: 'Spring Load Reference', type: 'pdf', size: '0.9 MB' },
    { name: 'Form Checklist', type: 'pdf', size: '1.3 MB' }
  ];

  // Comments are now handled by the LessonComments component

  return (
    <div className="min-h-screen bg-[#F6EFD2]">
      {/* Header with Course Title and Progress Bar */}
      <div className="bg-[#E43636] text-[#F6EFD2] py-6 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">Level 1 Megacore</h1>
              <p className="text-[#E2DDB4]">Chapter 3: Advanced Core Exercises</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-[#E2DDB4]">Progress</p>
              <p className="text-lg font-bold">{progress}% Complete</p>
            </div>
          </div>
          <div className="w-full bg-[#F6EFD2]/20 rounded-full h-3">
            <div className="bg-[#F6EFD2] h-3 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content Area */}
          <div className="flex-1">
            {/* Video Player - Main Focus */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="bg-black rounded-2xl overflow-hidden shadow-2xl">
                <iframe
                  width="100%"
                  height="500"
                  src="https://www.youtube.com/embed/yuKQug3vQvI"
                  title="Angel Exercise Tutorial"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full"
                ></iframe>
              </div>
            </motion.div>

            {/* Tab Navigation */}
            <div className="bg-[#E2DDB4] rounded-2xl p-1 mb-8 shadow-lg">
              <div className="flex space-x-1">
                {[
                  { id: 'description', label: 'Description' },
                  { id: 'resources', label: 'Resources' },
                  { id: 'comments', label: 'Q&A' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-[#E43636] text-[#F6EFD2] shadow-lg'
                        : 'text-[#E43636] hover:bg-[#F6EFD2]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-[#E2DDB4] rounded-2xl p-8 shadow-lg border-2 border-[#E43636]"
            >
              {activeTab === 'description' && (
                <div>
                  <h2 className="text-3xl font-bold text-[#E43636] mb-6">Angel</h2>
                  
                  {/* Lesson Goals */}
                  <div className="bg-[#F6EFD2] rounded-xl p-6 mb-8 border border-[#E43636]">
                    <h3 className="text-xl font-bold text-[#E43636] mb-4">Lesson Goals</h3>
                    <ul className="space-y-2">
                      {lessonGoals.map((goal, index) => (
                        <li key={index} className="flex items-center text-[#000000]">
                          <span className="w-2 h-2 bg-[#E43636] rounded-full mr-3"></span>
                          {goal}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Exercise Details */}
                  <div className="space-y-8">
                    <section>
                      <h3 className="text-2xl font-bold text-[#E43636] mb-4">Angel</h3>
                      <p className="text-[#000000] mb-4">On the carriage, facing the front platform</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-[#F6EFD2] p-4 rounded-xl border border-[#E43636]">
                          <p className="text-sm text-[#E43636] font-semibold">Standard</p>
                          <p className="text-lg font-bold text-[#000000]">1 black + 1 gray spring</p>
                        </div>
                        <div className="bg-[#F6EFD2] p-4 rounded-xl border border-[#E43636]">
                          <p className="text-sm text-[#E43636] font-semibold">Modification</p>
                          <p className="text-lg font-bold text-[#000000]">1 black + 2 gray springs</p>
                        </div>
                        <div className="bg-[#F6EFD2] p-4 rounded-xl border border-[#E43636]">
                          <p className="text-sm text-[#E43636] font-semibold">Intensification</p>
                          <p className="text-lg font-bold text-[#000000]">1 black spring</p>
                        </div>
                      </div>
                      <div className="bg-[#F6EFD2] p-4 rounded-xl border border-[#E43636] mb-6">
                        <p className="text-[#000000] font-semibold">Note: the more springs, the more supportive</p>
                      </div>
                    </section>

                    <section>
                      <h3 className="text-2xl font-bold text-[#E43636] mb-4">Setup</h3>
                      <ul className="list-disc pl-6 text-[#000000] space-y-2">
                        <li>Sit in the middle of the carriage facing the front platform</li>
                        <li>Pick up the long black straps hanging on the side of the carriage & hold them by the short hard handles</li>
                        <li>Lean back to a 45° angle, engage your core, and bring both arms forward in front of the chest like you're hugging someone</li>
                        <li>Lift one leg up at a time into tabletop position, keeping knees and legs together</li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-2xl font-bold text-[#E43636] mb-4">Execution</h3>
                      <ul className="list-disc pl-6 text-[#000000] space-y-2">
                        <li><b>Inhale:</b> Open your arms out (stopping before you're about to lose sight of your hands in your peripheral view)</li>
                        <li><b>Exhale:</b> Pull the cables forward as if you are hugging someone in front of you</li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-2xl font-bold text-[#E43636] mb-4">DO NOT</h3>
                      <ul className="list-disc pl-6 text-[#E43636] space-y-2">
                        <li>DO NOT round your back and tuck your chin in towards your chest</li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-2xl font-bold text-[#E43636] mb-4">Modifications</h3>
                      <ul className="list-disc pl-6 text-[#000000] space-y-2">
                        <li>Set both feet down underneath the front carriage strap</li>
                        <li>Keep one leg up in a tabletop position and the other foot down under the front carriage strap</li>
                        <li>1 black spring + 2 gray springs</li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-2xl font-bold text-[#E43636] mb-4">Intensifications</h3>
                      <ul className="list-disc pl-6 text-[#000000] space-y-2">
                        <li>1 black spring</li>
                        <li>Keep both legs together and straight up, holding your body position in the letter "V"</li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-2xl font-bold text-[#E43636] mb-4">Challenges</h3>
                      <div className="bg-[#F6EFD2] p-6 rounded-xl border border-[#E43636]">
                        <p className="text-[#000000] font-semibold mb-2">Holds and pulses:</p>
                        <p className="text-[#000000]">Bring your arms forward halfway</p>
                        <p className="text-[#000000]">Pulses back 2 inches and forward 2 inches (easier)</p>
                        <p className="text-[#000000]">Pulses forward 2 inches and back 2 inches (harder)</p>
                      </div>
                    </section>

                    {/* Key Features */}
                    <section>
                      <h3 className="text-2xl font-bold text-[#E43636] mb-4">Key Features</h3>
                      <div className="bg-[#F6EFD2] p-6 rounded-xl border border-[#E43636]">
                        <ul className="list-disc pl-6 text-[#000000] space-y-2">
                          <li>Performed on the carriage facing the front platform</li>
                          <li>Uses long black straps for arm movement</li>
                          <li>45° angle position with core engagement</li>
                          <li>Hugging motion with arms</li>
                          <li>Tabletop position with legs</li>
                          <li>Advanced exercise focusing on arm strength and core stability</li>
                        </ul>
                      </div>
                    </section>
                  </div>
                </div>
              )}

              {activeTab === 'resources' && (
                <div>
                  <h2 className="text-3xl font-bold text-[#E43636] mb-6">Resources</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {resources.map((resource, index) => (
                      <div key={index} className="bg-[#F6EFD2] p-4 rounded-xl border border-[#E43636] hover:bg-[#E43636] hover:text-[#F6EFD2] transition-colors cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold">{resource.name}</p>
                            <p className="text-sm opacity-75">{resource.size}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'comments' && (
                <div>
                  <h2 className="text-3xl font-bold text-[#E43636] mb-6">Q&A Discussion</h2>
                  <LessonComments 
                    lessonId="chapter-3/3-15" 
                    courseId="level1-megacore" 
                  />
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-80">
            <div className="bg-[#E2DDB4] rounded-2xl p-6 shadow-lg border-2 border-[#E43636] sticky top-8">
              <h3 className="text-xl font-bold text-[#E43636] mb-4">Chapter Lessons</h3>
              
              <div className="space-y-3">
                {chapterLessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className={`p-3 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                      lesson.id === 15
                        ? 'bg-[#E43636] text-[#F6EFD2] border-[#E43636]'
                        : lesson.completed
                        ? 'bg-[#F6EFD2] text-[#000000] border-[#E43636]'
                        : 'bg-[#F6EFD2] text-[#000000] border-[#E2DDB4] hover:border-[#E43636]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div>
                          <p className="font-semibold">{lesson.title}</p>
                          <p className="text-sm opacity-75">{lesson.duration}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Course Progress */}
              <div className="mt-6 pt-6 border-t border-[#E43636]">
                <h4 className="font-semibold text-[#E43636] mb-2">Chapter Progress</h4>
                <div className="w-full bg-[#F6EFD2] rounded-full h-2 mb-2">
                  <div className="bg-[#E43636] h-2 rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
                <p className="text-sm text-[#E43636]">15 of 17 lessons completed</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Next Lesson Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <motion.a
          href="/courses/level1-megacore/content/chapter-3/3-16"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#E43636] text-[#F6EFD2] px-8 py-4 rounded-full font-bold shadow-2xl hover:bg-[#b82a2a] transition-colors text-lg flex items-center"
        >
          Next Lesson
          <span className="ml-2">→</span>
        </motion.a>
      </div>
    </div>
  );
} 