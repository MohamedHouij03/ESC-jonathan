'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CourseNavigation from "@/components/CourseNavigation";
import LessonComments from "@/components/LessonComments";
import { useUserProgress } from '@/hooks/useUserProgress';

export default function Lesson617() {
  const [activeTab, setActiveTab] = useState('description');
  const { progress } = useUserProgress('level1-megacore');
  const [isClient, setIsClient] = useState(false);

  const lessonGoals = [
    'Master Bungee Kick form and technique',
    'Learn Bungee Hamstring Curl execution',
    'Understand Bungee Lateral Leg Raise positioning',
    'Practice proper bungee tension and control'
  ];

  const resources = [
    { name: 'Bungee Exercises Guide PDF', type: 'pdf', size: '2.4 MB' },
    { name: 'Spring Tension Reference', type: 'pdf', size: '1.7 MB' },
    { name: 'Bungee Safety Tips', type: 'pdf', size: '1.2 MB' },
    { name: 'Form Checklist', type: 'pdf', size: '1.5 MB' }
  ];

  // Comments are now handled by the LessonComments component

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#E43636]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Course Title and Progress Bar */}
      <div className="bg-[#E43636] text-[#F6EFD2] py-6 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">Level 1 Megacore</h1>
              <p className="text-[#E2DDB4]">Chapter 6: Heavy Leg Exercises</p>
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
          <CourseNavigation 
            currentLessonPath="/courses/level1-megacore/content/chapter-6/6-17"
          />
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
                  src="https://www.youtube.com/embed/0_0vjjtfLTw"
                  title="Bungee Exercises Tutorial"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full"
                ></iframe>
              </div>
            </motion.div>
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-[#E43636]">
              {/* Tab Navigation */}
              <div className="bg-white rounded-2xl p-1 mb-8 shadow-lg">
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
                          : 'text-[#E43636] hover:bg-white'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
              {activeTab === 'description' && (
                <div>
                  <h2 className="text-3xl font-bold text-[#E43636] mb-6">Bungee Exercises</h2>
                  <p className="text-[#000000] mb-6">Bungee Kick, Bungee Hamstring Curl, and Laying Lateral Bungee Raise</p>
                  
                  {/* Lesson Goals */}
                  <div className="bg-white rounded-xl p-6 mb-8 border border-[#E43636]">
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

                  {/* Exercise 1: Bungee Kick */}
                  <div className="space-y-8">
                    <section>
                      <h3 className="text-2xl font-bold text-[#E43636] mb-4">Bungee Kick (Left Leg)</h3>
                      <p className="text-[#000000] mb-4">On the carriage, facing the back platform</p>
                      <div className="bg-white p-4 rounded-xl border border-[#E43636] mb-6">
                        <p className="text-sm text-[#E43636] font-semibold">Standard</p>
                        <p className="text-lg font-bold text-[#000000]">Heavy springs attached so the carriage doesn't move</p>
                      </div>
                      
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-xl font-bold text-[#E43636] mb-3">Setup</h4>
                          <ul className="list-disc pl-6 text-[#000000] space-y-2">
                            <li>Start by standing in front of the front platform, facing the carriage</li>
                            <li>Place your right knee onto the front platform and pick up the bungee to place it around your left foot against the arch/heel</li>
                            <li>Crawl onto the carriage kneeling over the front carriage strap, lowering down onto your forearms</li>
                            <li>Forearms and knees are hip-width apart</li>
                            <li>Left forearm stays down and right hand holds the right side of the carriage</li>
                            <li>Lift your face away from the carriage, lift your chest, and engage your core</li>
                            <li>Bring your left leg up to a 90-degree angle with your foot flat like the ceiling</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-xl font-bold text-[#E43636] mb-3">Execution</h4>
                          <ul className="list-disc pl-6 text-[#000000] space-y-2">
                            <li><b>Exhale:</b> As you stamp the ceiling with foot without arching your back</li>
                            <li><b>Inhale:</b> As you lower the left knee, keeping the 90-degree angle, without going so low that you lose tension</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-xl font-bold text-[#E43636] mb-3">DO NOT</h4>
                          <ul className="list-disc pl-6 text-[#E43636] space-y-2">
                            <li>DO NOT let one hip of the anchored knee lean outwards away from the midline</li>
                            <li>DO NOT arch your back or tuck your chin into your chest</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-xl font-bold text-[#E43636] mb-3">Modifications</h4>
                          <ul className="list-disc pl-6 text-[#000000] space-y-2">
                            <li>Move your knees onto the front platform instead of being on the carriage</li>
                            <li>This shortens the tension or tightness of the bungee to make it easier</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-xl font-bold text-[#E43636] mb-3">Intensifications</h4>
                          <ul className="list-disc pl-6 text-[#000000] space-y-2">
                            <li>Go slower or move towards the back of the carriage to increase the tension of the bungee</li>
                            <li>Point your toes upward instead of keeping your foot flat to activate more glutes</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-xl font-bold text-[#E43636] mb-3">Challenges</h4>
                          <div className="bg-white p-4 rounded-xl border border-[#E43636]">
                            <p className="text-[#000000] font-semibold mb-2">Holds/pulses:</p>
                            <p className="text-[#000000]">Lift your left knee as high as you can</p>
                            <p className="text-[#000000]">Pulse down 2 inches and up 2 inches</p>
                          </div>
                        </div>
                        
                        <div className="bg-white p-4 rounded-xl border border-[#E43636]">
                          <p className="text-[#E43636]"><b>Note:</b> In my opinion, you can perform this on light springs, but it will be harder because you'll have to control the carriage from moving more</p>
                        </div>
                      </div>
                    </section>

                    {/* Exercise 2: Bungee Hamstring Curl */}
                    <section>
                      <h3 className="text-2xl font-bold text-[#E43636] mb-4">Bungee Hamstring Curl (Left Leg)</h3>
                      <p className="text-[#000000] mb-4">On the carriage, facing the back platform</p>
                      <div className="bg-white p-4 rounded-xl border border-[#E43636] mb-6">
                        <p className="text-sm text-[#E43636] font-semibold">Standard</p>
                        <p className="text-lg font-bold text-[#000000]">Heavy springs attached so the carriage doesn't move</p>
                      </div>
                      
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-xl font-bold text-[#E43636] mb-3">Setup</h4>
                          <ul className="list-disc pl-6 text-[#000000] space-y-2">
                            <li>Start by standing in front of the front platform, facing the carriage</li>
                            <li>Place your right knee onto the front platform and pick up the bungee to place it around your left foot against the arch/heel</li>
                            <li>Crawl onto the carriage kneeling over the front carriage strap, lowering down onto your forearms</li>
                            <li>Forearms and knees are hip-width apart</li>
                            <li>Left forearm stays down and right hand holds the right side of the carriage</li>
                            <li>Lift your face away from the carriage, lift your chest, and engage your core</li>
                            <li>Bring your left leg up to a 90-degree angle with your foot flat like the ceiling as high as you can hold</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-xl font-bold text-[#E43636] mb-3">Execution</h4>
                          <ul className="list-disc pl-6 text-[#000000] space-y-2">
                            <li>(without lowering your left knee)</li>
                            <li><b>Inhale:</b> As you lengthen your leg back without losing tension in the bungee</li>
                            <li><b>Exhale:</b> As you bend your left knee to bring your left heel towards your butt</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-xl font-bold text-[#E43636] mb-3">DO NOT</h4>
                          <ul className="list-disc pl-6 text-[#E43636] space-y-2">
                            <li>DO NOT let one hip of the anchored knee lean outwards away from the midline</li>
                            <li>DO NOT arch your back or tuck your chin into your chest</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-xl font-bold text-[#E43636] mb-3">Modifications</h4>
                          <ul className="list-disc pl-6 text-[#000000] space-y-2">
                            <li>Move your knees onto the front platform instead of being on the carriage</li>
                            <li>This shortens the tension or tightness of the bungee to make it easier</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-xl font-bold text-[#E43636] mb-3">Intensifications</h4>
                          <ul className="list-disc pl-6 text-[#000000] space-y-2">
                            <li>Go slower or move towards the back of the carriage to increase the tension of the bungee</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-xl font-bold text-[#E43636] mb-3">Challenges</h4>
                          <div className="bg-white p-4 rounded-xl border border-[#E43636]">
                            <p className="text-[#000000] font-semibold mb-2">Holds/pulses in a Bungee Kick:</p>
                            <p className="text-[#000000]">Bend your left knee to bring your left heel towards your butt at a 90 degree angle</p>
                            <p className="text-[#000000]">Pulse down 2 inches and up 2 inches (easier)</p>
                            <p className="text-[#000000]">Pulse up 2 inches and down 2 inches (harder)</p>
                          </div>
                        </div>
                        
                        <div className="bg-white p-4 rounded-xl border border-[#E43636]">
                          <p className="text-[#E43636]"><b>Note:</b> In my opinion, you can perform this on light springs, but it will be harder because you'll have to control the carriage from moving more</p>
                        </div>
                      </div>
                    </section>

                    {/* Exercise 3: Bungee Lateral Leg Raise */}
                    <section>
                      <h3 className="text-2xl font-bold text-[#E43636] mb-4">Bungee Lateral Leg Raise (Left Leg)</h3>
                      <p className="text-[#000000] mb-4">On the carriage, facing sideways</p>
                      <div className="bg-white p-4 rounded-xl border border-[#E43636] mb-6">
                        <p className="text-sm text-[#E43636] font-semibold">Standard</p>
                        <p className="text-lg font-bold text-[#000000]">Heavy springs attached so the carriage doesn't move</p>
                      </div>
                      
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-xl font-bold text-[#E43636] mb-3">Setup</h4>
                          <ul className="list-disc pl-6 text-[#000000] space-y-2">
                            <li>Start by standing in front of the front platform, facing the carriage</li>
                            <li>Place your right knee onto the front platform and pick up the bungee to place it around your left foot against the arch/heel</li>
                            <li>Crawl onto the carriage and lay down on your right side</li>
                            <li>Bend your right forearm under the right side of your head to act as a pillow (or use the Pilates ball)</li>
                            <li>Left hand presses down into the carriage in front of your chest for support</li>
                            <li>Bend your bottom knee and lift your left leg up keeping it straight and toes pointed</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-xl font-bold text-[#E43636] mb-3">Execution</h4>
                          <ul className="list-disc pl-6 text-[#000000] space-y-2">
                            <li><b>Exhale:</b> As you lift your left leg up</li>
                            <li><b>Inhale:</b> As you lower the left leg down</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-xl font-bold text-[#E43636] mb-3">DO NOT</h4>
                          <ul className="list-disc pl-6 text-[#E43636] space-y-2">
                            <li>DO NOT go up so high that it bothers your hip or outer thighs</li>
                            <li>This exercise has a short range of motion (less is more)</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-xl font-bold text-[#E43636] mb-3">Modifications</h4>
                          <ul className="list-disc pl-6 text-[#000000] space-y-2">
                            <li>Scoot down closer to the front platform to decrease the tension of the bungee</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-xl font-bold text-[#E43636] mb-3">Intensifications</h4>
                          <ul className="list-disc pl-6 text-[#000000] space-y-2">
                            <li>Go slower or move towards the back of the carriage to increase the tension of the bungee</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-xl font-bold text-[#E43636] mb-3">Challenges</h4>
                          <div className="bg-white p-4 rounded-xl border border-[#E43636]">
                            <p className="text-[#000000] font-semibold mb-2">Holds/pulses:</p>
                            <p className="text-[#000000]">Lift your upper leg up until there is tension in the bungee</p>
                            <p className="text-[#000000]">Pulse down 2 inches and up 2 inches (easier)</p>
                          </div>
                        </div>
                        
                        <div className="bg-white p-4 rounded-xl border border-[#E43636]">
                          <p className="text-[#E43636]"><b>Note:</b> I do not teach this exercise because most people complain of hip and outer thigh discomfort</p>
                        </div>
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
                      <div key={index} className="bg-white p-4 rounded-xl border border-[#E43636] hover:bg-[#E43636] hover:text-[#F6EFD2] transition-colors cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-black">{resource.name}</p>
                            <p className="text-sm opacity-75 text-black">{resource.size}</p>
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
                    lessonId="chapter-6/6-17" 
                    courseId="level1-megacore" 
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
