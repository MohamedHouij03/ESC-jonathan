"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CourseNavigation from "@/components/CourseNavigation";
import LessonComments from "@/components/LessonComments";
import { useUserProgress } from "@/hooks/useUserProgress";

export default function Chapter93() {
  const { progress } = useUserProgress('level1-reformers');
  const [activeTab, setActiveTab] = useState<'description' | 'resources' | 'comments'>('description');
  const [isClient, setIsClient] = useState(false);

  const resources = [
    // No PDF resources for this lesson
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-white">
        <div className="bg-[#E43636] text-[#F6EFD2] py-6 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold">Level 1 All Reformers</h1>
                <p className="text-[#E2DDB4]">Chapter 9: Clients and Pregnancy</p>
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
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E43636]"></div>
        </div>
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
              <h1 className="text-2xl font-bold">Level 1 All Reformers</h1>
              <p className="text-[#E2DDB4]">Chapter 9: Clients and Pregnancy</p>
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

      <div className="flex">
        {/* Course Navigation */}
        <div className="pl-4 pt-4">
          <CourseNavigation 
            currentLessonPath="/courses/level1-reformers/content/chapter-9/9-3"
            nextLessonPath="/courses/level1-reformers/content/chapter-9/9-4"
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 px-4 sm:px-6 lg:px-8 py-8 lg:pl-20 lg:pt-16">
          <div className="max-w-7xl mx-auto">
            {/* Lesson Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <h1 className="text-4xl font-bold text-[#E43636] mb-2">Exercise Guidelines for Each Trimester</h1>
              <p className="text-lg text-gray-600">Chapter 9 - Lesson 3</p>
            </motion.div>

            {/* Content Card with Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-lg border-2 border-[#E43636] space-y-8 mt-8"
            >
              {/* Tabs */}
              <div className="bg-white rounded-2xl p-1 shadow-lg">
                <div className="flex space-x-1">
                  {[
                    { id: 'description', label: 'Description' },
                    { id: 'resources', label: 'Resources' },
                    { id: 'comments', label: 'Q&A' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as typeof activeTab)}
                      className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                        activeTab === (tab.id as typeof activeTab)
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
                className="p-0"
              >
                {activeTab === 'description' && (
                  <div>
                    <h2 className="text-2xl font-bold text-[#E43636] mb-4">Exercise Guidelines for Each Trimester</h2>

                    <section className="space-y-6">
                      <h3 className="text-xl font-semibold text-[#E43636] mb-2">First Trimester (0 - 12 weeks)</h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>Most exercises are fine to perform during the first trimester, however, the mother should be mindful of taking breaks to not overexert the body</li>
                        <li>Neutral spine exercises are the best option</li>
                        <li>Keep range of motion small to moderate</li>
                        <li>Do not hold stretches and breath</li>
                        <li>Minimize stretching the hamstring and inner thighs (adductor)</li>
                      </ul>
                    </section>
                    <section className="space-y-6 mt-8">
                      <h3 className="text-xl font-semibold text-[#E43636] mb-2">Second Trimester (13 - 26 weeks) and Third Trimester (27 - 40 weeks)</h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>No twisting or crunching ("torso twist should okay" and performed at the discretion of the mother) <span className="italic">[have ready another exercise to substitute like a side plank or upper body exercises]</span></li>
                        <li>Squatting exercises are a good exercise to prepare the pelvis for delivery</li>
                        <li>No lifting of over 15 pounds</li>
                        <li>Avoid laying on the back because it will decrease the supply of oxygen to the baby</li>
                        <li>Do not allow the heart rate to pass 140 bpm</li>
                        <li>It is recommended to utilize the stabilization pole</li>
                        <li>2 white springs for 1 spring exercises is recommended (performing exercises on 1 white spring is at the discretion of the mother)</li>
                        <li>5 white springs for heavy exercises is recommended rather than going too heavy (spring choice is at the discretion of the mother)</li>
                        <li>Pelvic stability changes the most during week 20-27</li>
                        <li>Take time when transitioning from exercise to exercise</li>
                      </ul>
                    </section>
                    <section className="space-y-4 mt-8">
                      <h3 className="text-lg font-bold text-[#E43636]">Note</h3>
                      <p className="text-gray-700">
                        These are my own subjective opinions on what a pregnant client can and cannot perform during class through my own training and working with a Physical Therapist. We should always explain to pregnant clients that we are not doctors or healthcare professionals. We can refer clients to their primary care physician or OBGYN for further guidance with videos through YouTube or Instagram to show what Xformer Pilates is. This is important because most people do not know the difference between Pilates, Lagree, and Xformer Pilates.
                      </p>
                    </section>
                    <section className="space-y-6 mt-8">
                      <h3 className="text-xl font-semibold text-[#E43636] mb-2">Anatomic and Physiologic Changes of Pregnancy</h3>
                      <h4 className="text-lg font-semibold text-gray-900 mt-4">Lungs and Respiration</h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>Changes in rib cage placement elevates the diaphragm</li>
                        <li>The respiratory rate / oxygen intake increases to supply both mother and baby</li>
                        <li>Endurance and energy can lower due to the body working harder to supply adequate</li>
                      </ul>
                      <h4 className="text-lg font-semibold text-gray-900 mt-4">Joints</h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>The stability of joints and the action of muscles change</li>
                        <li>The ligaments and cartilage soften and relax causing less stability in joints which can lead to an increase in injury</li>
                        <li>The ligaments of the lower back and sacral area (S1 - S5) are greatly affected</li>
                        <li>Incontinence (the lack of voluntary control over urination and/or elimination): The weight of the baby over time will increase pressure or stress on the bladder. Strengthening the pelvic floor can reduce this risk</li>
                      </ul>
                      <h4 className="text-lg font-semibold text-gray-900 mt-4">Body Temperature</h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>An increase in blood flow to the baby can increase core body temperature, which may cause feelings of dizziness and feeling light-headed</li>
                      </ul>
                      <h4 className="text-lg font-semibold text-gray-900 mt-4">Balance and Postural Changes</h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>The hip flexors will get short, sore, and tight from the weight of the stomach shifting the pelvis forward</li>
                        <li>The center of gravity transfers upward and forward because of the weight increase of the front body</li>
                        <li>The following can occur:</li>
                        <ul className="list-disc list-inside ml-6 text-gray-700 space-y-1">
                          <li>Lumbar Lordosis: An excessive arch in the lumbar portion of the back / spine</li>
                          <li>Thoracic Kyphosis: An increased roundness of the upper back</li>
                          <li>Balance will be more difficult to maintain during exercise</li>
                        </ul>
                      </ul>
                    </section>
                    <section className="space-y-6 mt-8">
                      <h3 className="text-xl font-semibold text-[#E43636] mb-2">Pregnancy Induced Conditions</h3>
                      <h4 className="text-lg font-semibold text-gray-900 mt-4">Diastasis Recti</h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>This occurrence is in the later stages of pregnancy</li>
                        <li>An increase in stretch and hormonal changes will cause the separation of the rectus abdominis muscles at the linea alba</li>
                        <li>Avoid flexion, extension, and rotation</li>
                      </ul>
                      <h4 className="text-lg font-semibold text-gray-900 mt-4">Symphysis Pubis Dysfunction</h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>Stiffness of your pelvic joints or the joints moving unevenly at either the back or front of your pelvis</li>
                        <li>Can be very painful</li>
                        <li>The separation of the symphysis pubis due to hormonal changes and joint laxity (joint in the front of the pelvis)</li>
                        <li>This is caused by hormonal change and joint laxity</li>
                        <li>Keep range of motion medium to small and limit exercises of the abductors (outer thigh) and adductors (inner thigh)</li>
                      </ul>
                    </section>
                  </div>
                )}
                {activeTab === 'resources' && (
                  <div>
                    <h3 className="text-2xl font-bold text-[#E43636] mb-4">Resources</h3>
                    <p className="text-gray-700">No PDF resources for this lesson.</p>
                  </div>
                )}
                {activeTab === 'comments' && (
                  <div>
                    <LessonComments 
                      lessonId="chapter-9/9-3" 
                      courseId="level1-reformers" 
                    />
                  </div>
                )}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Add spacing for navigation */}
      <div className="h-24"></div>
    </div>
  );
}