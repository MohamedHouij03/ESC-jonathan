'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CourseNavigation from "@/components/CourseNavigation";
import LessonComments from "@/components/LessonComments";
import { useUserProgress } from '@/hooks/useUserProgress';

export default function Lesson84() {
  const [isClient, setIsClient] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const { progress } = useUserProgress('level1-megacore');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const lessonGoals = [
    "Master proper tricep kickback technique on the reformer",
    "Develop tricep strength and endurance",
    "Learn proper breathing patterns for tricep exercises",
    "Understand spring configurations for different difficulty levels"
  ];

  const resources = [
    {
      name: "Tricep Kickback Exercise Guide",
      type: "PDF",
      size: "2.1 MB",
      url: "#"
    },
    {
      name: "Upper Body Strength Progression Chart",
      type: "PDF", 
      size: "1.8 MB",
      url: "#"
    }
  ];

  // Comments are now handled by the LessonComments component

  if (!isClient) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <CourseNavigation currentLessonPath="/courses/level1-megacore/content/chapter-8/8-4" />
      
      <div className="ml-64 p-8">
        {/* Header */}
        <div className="bg-red-600 text-white p-6 rounded-lg mb-6">
          <h1 className="text-3xl font-bold mb-2">Chapter 8: Upper Body Strength</h1>
          <p className="text-red-100">Lesson 8-4: Tricep Kickback</p>
          <div className="mt-4">
            <div className="bg-red-700 rounded-full h-2">
              <div className="bg-white h-2 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="text-sm text-red-100 mt-2">100% Complete</p>
          </div>
        </div>

        {/* Video Player */}
        <div className="mb-6 w-full flex justify-center">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/qoh8F-7BPY8"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="rounded-xl w-full max-w-xl h-64"
          ></iframe>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('description')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'description'
                ? 'bg-white text-red-600 shadow-sm'
                : 'text-gray-600 hover:text-red-600'
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab('resources')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'resources'
                ? 'bg-white text-red-600 shadow-sm'
                : 'text-gray-600 hover:text-red-600'
            }`}
          >
            Resources
          </button>
          <button
            onClick={() => setActiveTab('qa')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'qa'
                ? 'bg-white text-red-600 shadow-sm'
                : 'text-gray-600 hover:text-red-600'
            }`}
          >
            Q&A
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg">
          {activeTab === 'description' && (
            <div className="p-6">
              {/* Lesson Goals */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-red-600 mb-4">Lesson Goals</h2>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <ul className="space-y-2">
                    {lessonGoals.map((goal, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-red-600 mr-2">•</span>
                        <span className="text-gray-800">{goal}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Exercise Details */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-red-600 mb-4">Exercise Details</h2>
                
                {/* Spring Configuration */}
                <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
                  <h3 className="text-lg font-semibold text-red-600 mb-2">Spring Configuration</h3>
                  <p className="text-gray-800 mb-2">Kneeling on the carriage, facing the back platform</p>
                  <ul className="list-disc pl-6 text-gray-800">
                    <li><b>Standard:</b> 1 black spring</li>
                    <li><b>Modification:</b> Use the long black straps; or 2 gray springs</li>
                    <li><b>Intensification:</b> 1 black spring + 1 gray springs</li>
                  </ul>
                </div>

                {/* Setup */}
                <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
                  <h3 className="text-lg font-semibold text-red-600 mb-2">Setup</h3>
                  <p className="text-gray-600 mb-2">How to get into position</p>
                  <ul className="list-disc pl-6 text-gray-800">
                    <li>Start by kneeling on the carriage facing the back platform</li>
                    <li>Grab the long black straps located on the sides of the carriage</li>
                    <li>Bring your arms and hands by your sides</li>
                    <li>Sit halfway down and chest halfway forward (butt above the heels, chest above the thighs)</li>
                    <li>Lift your elbows high and squeeze your shoulder blades together to open your chest</li>
                    <li>Engage your core</li>
                  </ul>
                </div>

                {/* Execution */}
                <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
                  <h3 className="text-lg font-semibold text-red-600 mb-2">Execution</h3>
                  <p className="text-gray-600 mb-2">How to perform the exercise</p>
                  <ul className="list-disc pl-6 text-gray-800">
                    <li><b>Exhale:</b> As you lengthen your arms back and press through your palms against the handles</li>
                    <li><b>Inhale:</b> As you bring you bend your elbows to lower your forearms (fingers face the floor)</li>
                  </ul>
                </div>

                {/* DO NOT */}
                <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
                  <h3 className="text-lg font-semibold text-red-600 mb-2">DO NOT</h3>
                  <ul className="list-disc pl-6 text-red-600">
                    <li>DO NOT keep your arms long and press back the handles (that's a "Chest Expansion")</li>
                    <li>DO NOT tuck your chin into your chest</li>
                    <li>DO NOT round your shoulders forward</li>
                  </ul>
                </div>

                {/* Modifications */}
                <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
                  <h3 className="text-lg font-semibold text-red-600 mb-2">Modifications</h3>
                  <p className="text-gray-600 mb-2">Easier variations</p>
                  <ul className="list-disc pl-6 text-gray-800">
                    <li>Move on the carriage towards the back platform</li>
                    <li>Use the long black strap instead of the short hard handles</li>
                    <li>Sit on your heels</li>
                  </ul>
                </div>

                {/* Intensifications */}
                <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
                  <h3 className="text-lg font-semibold text-red-600 mb-2">Intensifications</h3>
                  <p className="text-gray-600 mb-2">Harder variations</p>
                  <ul className="list-disc pl-6 text-gray-800">
                    <li>Move back on the carriage towards the front platform for more resistance</li>
                    <li>Turn your palms to face forward and your knuckles to face back</li>
                  </ul>
                </div>

                {/* Challenges */}
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-red-600 mb-2">Challenges</h3>
                  <ul className="list-disc pl-6 text-gray-800">
                    <li><b>Holds and pulses:</b></li>
                    <li>Extend your arms and hands back halfway</li>
                    <li>pulse by lowering 2 inches and pulling back 2 inches (easier)</li>
                    <li>pulse by pulling back 2 inches and lowering 2 inches (harder)</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'resources' && (
            <div className="p-6">
              <h2 className="text-2xl font-bold text-red-600 mb-4">Resources</h2>
              <div className="space-y-4">
                {resources.map((resource, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-black">{resource.name}</h3>
                        <p className="text-gray-600 text-sm">{resource.type} • {resource.size}</p>
                      </div>
                      <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'qa' && (
            <div className="p-6">
              <h2 className="text-2xl font-bold text-red-600 mb-4">Questions & Answers</h2>
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-800">{comment.author}</h3>
                      <span className="text-gray-500 text-sm">{comment.timestamp}</span>
                    </div>
                    <p className="text-gray-700">{comment.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
