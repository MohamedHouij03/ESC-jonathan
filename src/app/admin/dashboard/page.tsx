'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Course {
  id: string;
  title: string;
  description: string;
  totalChapters: number;
  totalLessons: number;
  createdAt: string;
  status: 'draft' | 'published' | 'archived';
}

interface Chapter {
  id: string;
  courseId: string;
  title: string;
  order: number;
  totalLessons: number;
  createdAt: string;
}

interface Lesson {
  id: string;
  chapterId: string;
  title: string;
  order: number;
  type: 'video' | 'image' | 'mixed';
  createdAt: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('courses');
  const [courses, setCourses] = useState<Course[]>([
    {
      id: '1',
      title: 'Level 1 Reformers',
      description: 'Introduction to Reformer Pilates exercises',
      totalChapters: 5,
      totalLessons: 25,
      createdAt: '2024-01-15',
      status: 'published'
    },
    {
      id: '2',
      title: 'Level 2 Advanced',
      description: 'Advanced Reformer techniques',
      totalChapters: 3,
      totalLessons: 18,
      createdAt: '2024-02-01',
      status: 'draft'
    }
  ]);

  const [chapters, setChapters] = useState<Chapter[]>([
    {
      id: '1',
      courseId: '1',
      title: 'Introduction',
      order: 1,
      totalLessons: 4,
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      courseId: '1',
      title: 'Abdominal Exercises',
      order: 2,
      totalLessons: 5,
      createdAt: '2024-01-16'
    },
    {
      id: '3',
      courseId: '1',
      title: 'Core Fundamentals',
      order: 3,
      totalLessons: 6,
      createdAt: '2024-01-17'
    }
  ]);

  const [lessons, setLessons] = useState<Lesson[]>([
    {
      id: '1',
      chapterId: '1',
      title: 'Welcome to Level 1',
      order: 1,
      type: 'video',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      chapterId: '2',
      title: 'Basic Crunch',
      order: 1,
      type: 'mixed',
      createdAt: '2024-01-16'
    },
    {
      id: '3',
      chapterId: '3',
      title: 'Transverse Abdominis',
      order: 1,
      type: 'image',
      createdAt: '2024-01-17'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'bg-blue-100 text-blue-800';
      case 'image': return 'bg-purple-100 text-purple-800';
      case 'mixed': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Manage courses, chapters, and lessons</p>
            </div>
            <div className="flex space-x-4">
              <Link 
                href="/admin/courses/new"
                className="bg-[#E43636] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#b82a2a] transition-colors"
              >
                + New Course
              </Link>
              <Link 
                href="/admin/chapters/new"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                + New Chapter
              </Link>
              <Link 
                href="/admin/lessons/new"
                className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                + New Lesson
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-[#E43636] rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
                <p className="text-gray-600">Total Courses</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-600 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{chapters.length}</p>
                <p className="text-gray-600">Total Chapters</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-600 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{lessons.length}</p>
                <p className="text-gray-600">Total Lessons</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-600 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">1,234</p>
                <p className="text-gray-600">Active Users</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg p-1 mb-8 shadow">
          <div className="flex space-x-1">
            {[
              { id: 'courses', label: 'Courses', icon: '📚' },
              { id: 'chapters', label: 'Chapters', icon: '📋' },
              { id: 'lessons', label: 'Lessons', icon: '📝' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-[#E43636] text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Based on Active Tab */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'courses' && (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Courses Management</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chapters</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lessons</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {courses.map((course) => (
                      <tr key={course.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{course.title}</div>
                            <div className="text-sm text-gray-500">{course.description}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{course.totalChapters}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{course.totalLessons}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(course.status)}`}>
                            {course.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.createdAt}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <Link href={`/admin/courses/${course.id}/edit`} className="text-indigo-600 hover:text-indigo-900">Edit</Link>
                            <button className="text-red-600 hover:text-red-900">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'chapters' && (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Chapters Management</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chapter</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lessons</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {chapters.map((chapter) => {
                      const course = courses.find(c => c.id === chapter.courseId);
                      return (
                        <tr key={chapter.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{chapter.title}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course?.title}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{chapter.order}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{chapter.totalLessons}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{chapter.createdAt}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <Link href={`/admin/chapters/${chapter.id}/edit`} className="text-indigo-600 hover:text-indigo-900">Edit</Link>
                              <button className="text-red-600 hover:text-red-900">Delete</button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'lessons' && (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Lessons Management</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lesson</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chapter</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {lessons.map((lesson) => {
                      const chapter = chapters.find(c => c.id === lesson.chapterId);
                      return (
                        <tr key={lesson.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{lesson.title}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{chapter?.title}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lesson.order}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(lesson.type)}`}>
                              {lesson.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lesson.createdAt}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <Link href={`/admin/lessons/${lesson.id}/edit`} className="text-indigo-600 hover:text-indigo-900">Edit</Link>
                              <button className="text-red-600 hover:text-red-900">Delete</button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
