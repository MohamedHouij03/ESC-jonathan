'use client';

import { useState } from 'react';
import { CheckCircleIcon, PlayCircleIcon } from '@heroicons/react/24/solid';

interface Chapter {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
}

interface CourseLayoutProps {
  title: string;
  description: string;
  chapters: Chapter[];
  onStartCourse: () => void;
  onChapterClick: (chapterId: number) => void;
}

export default function CourseLayout({ title, description, chapters, onStartCourse, onChapterClick }: CourseLayoutProps) {
  const [isStarted, setIsStarted] = useState(false);
  const completedChapters = chapters.filter(chapter => chapter.completed).length;
  const progress = (completedChapters / chapters.length) * 100;

  const handleStartCourse = () => {
    setIsStarted(true);
    onStartCourse();
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            {description}
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20">
          <div className="p-8 sm:p-10">
            {/* Progress Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">Course Progress</h3>
                <span className="text-sm text-gray-600">{completedChapters} of {chapters.length} chapters completed</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Chapters List */}
            <div className="space-y-4">
              {chapters.map((chapter) => (
                <button
                  key={chapter.id}
                  onClick={() => onChapterClick(chapter.id)}
                  className="w-full flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-indigo-500 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    {chapter.completed ? (
                      <CheckCircleIcon className="h-6 w-6 text-green-500" />
                    ) : (
                      <PlayCircleIcon className="h-6 w-6 text-gray-400" />
                    )}
                    <div className="text-left">
                      <h4 className="text-sm font-medium text-gray-900">{chapter.title}</h4>
                      <p className="text-sm text-gray-500">{chapter.duration}</p>
                    </div>
                  </div>
                  {chapter.completed ? (
                    <span className="text-sm text-green-600">Completed</span>
                  ) : (
                    <span className="text-sm text-indigo-600">Start</span>
                  )}
                </button>
              ))}
            </div>

            {/* Start Course Button */}
            {!isStarted && (
              <div className="mt-8 text-center">
                <button
                  onClick={handleStartCourse}
                  className="inline-flex items-center rounded-md bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Start Course
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 