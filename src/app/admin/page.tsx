'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface User {
  _id: string;
  name: string;
  email: string;
  studioName?: string;
  lastLogin: string;
  createdAt: string;
  courseProgress: any[];
}

interface Course {
  id: string;
  title: string;
  description: string;
  enrolledUsers: number;
  averageProgress: number;
  status: 'active' | 'draft' | 'archived';
  price?: number;
  duration?: string;
  instructor?: string;
  level?: string;
  category?: string;
  thumbnail?: string;
}

interface Analytics {
  totalUsers: number;
  activeUsers: number;
  totalCourses: number;
  totalNewsletterSubscriptions: number;
  monthlyGrowth: number;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState<User[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [analytics, setAnalytics] = useState<Analytics>({
    totalUsers: 0,
    activeUsers: 0,
    totalCourses: 0,
    totalNewsletterSubscriptions: 0,
    monthlyGrowth: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [userSearchTerm, setUserSearchTerm] = useState('');

  useEffect(() => {
    // Check if user is admin/owner
    const userData = localStorage.getItem('user');
    if (!userData) {
      window.location.href = '/auth/signin';
      return;
    }

    const user = JSON.parse(userData);
    // Add admin check logic here
    if (user.email !== 'admin@esc.com') {
      window.location.href = '/';
      return;
    }

    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      // Fetch all data in parallel without authentication headers
      console.log('Fetching data from APIs...');
      
      const [usersResponse, coursesResponse, analyticsResponse] = await Promise.all([
        fetch('/api/admin/users'),
        fetch('/api/admin/courses'),
        fetch('/api/admin/analytics')
      ]);

      console.log('API Response Status:', {
        users: usersResponse.status,
        courses: coursesResponse.status,
        analytics: analyticsResponse.status
      });

      if (!usersResponse.ok) throw new Error(`Failed to fetch users: ${usersResponse.status}`);
      if (!coursesResponse.ok) throw new Error(`Failed to fetch courses: ${coursesResponse.status}`);
      if (!analyticsResponse.ok) throw new Error(`Failed to fetch analytics: ${analyticsResponse.status}`);

      const usersData = await usersResponse.json();
      const coursesData = await coursesResponse.json();
      const analyticsData = await analyticsResponse.json();

      console.log('API Responses:', { usersData, coursesData, analyticsData });

      if (usersData.success) {
        setUsers(usersData.users || []);
      } else {
        console.error('Users API error:', usersData.error);
        setUsers([]);
      }

      if (coursesData.success) {
        setCourses(coursesData.courses || []);
      } else {
        console.error('Courses API error:', coursesData.error);
        setCourses([]);
      }

      if (analyticsData.success) {
        setAnalytics({
          totalUsers: analyticsData.totalUsers || 0,
          activeUsers: analyticsData.activeUsers || 0,
          totalCourses: analyticsData.totalCourses || 0,
          totalNewsletterSubscriptions: analyticsData.totalNewsletterSubscriptions || 0,
          monthlyGrowth: analyticsData.monthlyGrowth || 0
        });
      } else {
        console.error('Analytics API error:', analyticsData.error);
        setAnalytics({
          totalUsers: 0,
          activeUsers: 0,
          totalCourses: 0,
          totalNewsletterSubscriptions: 0,
          monthlyGrowth: 0
        });
      }

    } catch (error) {
      console.error('Error loading dashboard data:', error);
      // Set empty data instead of mock data
      setUsers([]);
      setCourses([]);
      setAnalytics({
        totalUsers: 0,
        activeUsers: 0,
        totalCourses: 0,
        totalNewsletterSubscriptions: 0,
        monthlyGrowth: 0
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserAction = async (userId: string, action: string) => {
    try {
      const response = await fetch('/api/admin/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, action })
      });

      if (!response.ok) {
        throw new Error(`Failed to ${action} user`);
      }

      const result = await response.json();
      console.log(result.message);
      
      // Refresh data
      await loadDashboardData();
    } catch (error) {
      console.error('Error performing user action:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`Error: ${errorMessage}`);
    }
  };

  const handleCourseAction = async (courseId: string, action: string) => {
    try {
      const response = await fetch('/api/admin/courses', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId, action })
      });

      if (!response.ok) {
        throw new Error(`Failed to ${action} course`);
      }

      const result = await response.json();
      console.log(result.message);
      
      // Refresh data
      await loadDashboardData();
    } catch (error) {
      console.error('Error performing course action:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`Error: ${errorMessage}`);
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(userSearchTerm.toLowerCase())
  );

  const handleCreateCourse = async () => {
    try {
      // Create a sample course with more realistic data
      const newCourse = {
        title: 'New Course',
        description: 'Course description',
        price: 299,
        duration: '8 weeks',
        instructor: 'Jonathan',
        level: 'beginner',
        category: 'General',
        thumbnail: '/images/CSB_8883-Enhanced-NR (1).jpg'
      };

      const response = await fetch('/api/admin/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCourse)
      });

      if (!response.ok) {
        throw new Error('Failed to create course');
      }

      const result = await response.json();
      alert(result.message);
      
      // Refresh data
      await loadDashboardData();
    } catch (error) {
      console.error('Error creating course:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`Error: ${errorMessage}`);
    }
  };

  const handleSeedDatabase = async () => {
    console.log('Seed Database button clicked!');
    try {
      const response = await fetch('/api/admin/seed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        throw new Error('Failed to seed database');
      }

      const result = await response.json();
      alert(result.message);
      
      // Refresh data
      await loadDashboardData();
    } catch (error) {
      console.error('Error seeding database:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`Error: ${errorMessage}`);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E43636]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                 {/* Header */}
        <div className="mb-8">
           <div className="flex justify-between items-center">
             <div>
               <h1 className="text-3xl font-extrabold text-[#000000] mb-2">Admin Dashboard</h1>
               <p className="text-[#000000]/60">Manage your fitness platform</p>
             </div>
             <button 
               onClick={handleSeedDatabase}
               className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-base font-semibold shadow-lg hover:shadow-xl"
             >
               🌱 Seed Database
             </button>
           </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-white rounded-2xl p-1 mb-8 shadow-lg border border-[#000000]/10">
          {[
            { id: 'overview', label: 'Overview', icon: '📊' },
            { id: 'users', label: 'Users', icon: '👥' },
            { id: 'courses', label: 'Courses', icon: '📚' },
            { id: 'content', label: 'Content', icon: '📝' },
            { id: 'analytics', label: 'Analytics', icon: '📈' },
            { id: 'settings', label: 'Settings', icon: '⚙️' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-4 px-6 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-[#E43636] text-white shadow-lg transform scale-105'
                  : 'text-[#000000]/60 hover:text-[#000000] hover:bg-[#F6EFD2] hover:scale-102'
              }`}
            >
              <span className="mr-2 text-base">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
          </div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl shadow-xl border border-[#000000]/10 p-8">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-[#000000] mb-6">Platform Overview</h2>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-br from-[#E43636] to-[#b82a2a] text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/80 text-sm font-medium">Total Users</p>
                      <p className="text-4xl font-extrabold">{analytics.totalUsers}</p>
                    </div>
                    <div className="text-5xl">👥</div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#1DB954] to-[#1ed760] text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/80 text-sm font-medium">Active Users</p>
                      <p className="text-4xl font-extrabold">{analytics.activeUsers}</p>
                    </div>
                    <div className="text-5xl">✅</div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/80 text-sm font-medium">Total Courses</p>
                      <p className="text-4xl font-extrabold">{analytics.totalCourses}</p>
                    </div>
                    <div className="text-5xl">📚</div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#FF6B35] to-[#F7931E] text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/80 text-sm font-medium">Newsletter Subscribers</p>
                      <p className="text-4xl font-extrabold">{analytics.totalNewsletterSubscriptions}</p>
                    </div>
                    <div className="text-5xl">📧</div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <button className="p-6 bg-white rounded-2xl border-2 border-[#000000]/10 hover:border-[#E43636] transition-all duration-300 hover:shadow-lg hover:scale-105 group">
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">➕</div>
                  <h3 className="font-bold text-[#000000] text-lg mb-2">Add New Course</h3>
                  <p className="text-sm text-[#000000]/60">Create a new training program</p>
                </button>
                
                <button className="p-6 bg-white rounded-2xl border-2 border-[#000000]/10 hover:border-[#E43636] transition-all duration-300 hover:shadow-lg hover:scale-105 group">
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">👤</div>
                  <h3 className="font-bold text-[#000000] text-lg mb-2">Manage Users</h3>
                  <p className="text-sm text-[#000000]/60">View and edit user accounts</p>
                </button>
                
                <button className="p-6 bg-white rounded-2xl border-2 border-[#000000]/10 hover:border-[#E43636] transition-all duration-300 hover:shadow-lg hover:scale-105 group">
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">📊</div>
                  <h3 className="font-bold text-[#000000] text-lg mb-2">View Analytics</h3>
                  <p className="text-sm text-[#000000]/60">Detailed performance metrics</p>
                </button>
              </div>
            </motion.div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#000000]">User Management</h2>
                <div className="flex space-x-4">
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={userSearchTerm}
                    onChange={(e) => setUserSearchTerm(e.target.value)}
                    className="px-4 py-3 border-2 border-[#000000]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E43636] focus:border-[#E43636] transition-colors"
                  />
                  <button className="px-6 py-3 bg-[#E43636] text-white rounded-xl hover:bg-[#000000] transition-all duration-200 font-semibold shadow-lg hover:shadow-xl">
                    Export Users
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#000000]/10">
                      <th className="text-left py-3 px-4 font-semibold text-[#000000]">Name</th>
                      <th className="text-left py-3 px-4 font-semibold text-[#000000]">Email</th>
                      <th className="text-left py-3 px-4 font-semibold text-[#000000]">Studio</th>
                      <th className="text-left py-3 px-4 font-semibold text-[#000000]">Last Login</th>
                      <th className="text-left py-3 px-4 font-semibold text-[#000000]">Joined</th>
                      <th className="text-left py-3 px-4 font-semibold text-[#000000]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user._id} className="border-b border-[#000000]/5 hover:bg-[#F6EFD2]/50">
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-[#E43636] rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3">
                              {user.name.charAt(0)}
                            </div>
                            {user.name}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-[#000000]/70">{user.email}</td>
                        <td className="py-3 px-4 text-[#000000]/70">{user.studioName || '-'}</td>
                        <td className="py-3 px-4 text-[#000000]/70">
                          {new Date(user.lastLogin).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 text-[#000000]/70">
                          {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleUserAction(user._id, 'edit')}
                              className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleUserAction(user._id, 'suspend')}
                              className="px-3 py-1 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600 transition-colors"
                            >
                              Suspend
                            </button>
                      <button
                              onClick={() => handleUserAction(user._id, 'delete')}
                              className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
                            >
                              Delete
                      </button>
                          </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
            </motion.div>
          )}

          {/* Courses Tab */}
          {activeTab === 'courses' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#000000]">Course Management</h2>
                <button 
                  onClick={handleCreateCourse}
                  className="px-6 py-3 bg-[#E43636] text-white rounded-xl hover:bg-[#000000] transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
                >
                  Create New Course
                </button>
              </div>

              <div className="grid gap-6">
                {courses.map((course) => (
                  <div key={course.id} className="border-2 border-[#000000]/10 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-102 bg-white">
                    <div className="flex justify-between items-start mb-4">
                                             <div>
                         <h3 className="text-xl font-semibold text-[#000000] mb-2">{course.title}</h3>
                         <p className="text-[#000000]/60 mb-2">{course.description}</p>
                         <div className="flex flex-wrap gap-2 mb-3">
                           <span className="text-[#000000]/70 text-sm">Enrolled: {course.enrolledUsers}</span>
                           <span className="text-[#000000]/70 text-sm">Avg Progress: {course.averageProgress}%</span>
                           <span className="text-[#000000]/70 text-sm">Duration: {course.duration}</span>
                           <span className="text-[#000000]/70 text-sm">Price: ${course.price}</span>
                         </div>
                         <div className="flex flex-wrap gap-2">
                           <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                             course.status === 'active' ? 'bg-green-100 text-green-800 border border-green-200' :
                             course.status === 'draft' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                             'bg-gray-100 text-gray-800 border border-gray-200'
                           }`}>
                             {course.status}
                           </span>
                           {course.level && (
                             <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
                               {course.level}
                             </span>
                           )}
                           {course.category && (
                             <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 border border-purple-200">
                               {course.category}
                             </span>
                           )}
                         </div>
                       </div>
                      <div className="flex space-x-2">
                                                 <button
                           onClick={() => handleCourseAction(course.id, 'edit')}
                           className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
                         >
                           Edit
                         </button>
                         <button
                           onClick={() => handleCourseAction(course.id, 'duplicate')}
                           className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
                         >
                           Duplicate
                         </button>
                         <button
                           onClick={() => handleCourseAction(course.id, 'archive')}
                           className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
                         >
                           Archive
                         </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Content Tab */}
          {activeTab === 'content' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-[#000000] mb-6">Content Management</h2>
              
                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 <div className="border-2 border-[#000000]/10 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 bg-white group">
                   <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">📹</div>
                   <h3 className="text-lg font-bold text-[#000000] mb-2">Video Management</h3>
                   <p className="text-[#000000]/60 mb-4">Upload and manage course videos</p>
                   <button className="w-full px-4 py-3 bg-[#E43636] text-white rounded-xl hover:bg-[#000000] transition-all duration-200 font-semibold shadow-lg hover:shadow-xl">
                     Manage Videos
                   </button>
                 </div>

                <div className="border border-[#000000]/10 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-4">📝</div>
                  <h3 className="text-lg font-semibold text-[#000000] mb-2">Blog Posts</h3>
                  <p className="text-[#000000]/60 mb-4">Create and edit blog content</p>
                  <button className="w-full px-4 py-2 bg-[#E43636] text-white rounded-lg hover:bg-[#000000] transition-colors">
                    Manage Blog
                  </button>
                </div>

                <div className="border border-[#000000]/10 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-4">🎵</div>
                  <h3 className="text-lg font-semibold text-[#000000] mb-2">Music Playlists</h3>
                  <p className="text-[#000000]/60 mb-4">Update workout playlists</p>
                  <button className="w-full px-4 py-2 bg-[#E43636] text-white rounded-lg hover:bg-[#000000] transition-colors">
                    Manage Music
                  </button>
                </div>

                <div className="border border-[#000000]/10 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-4">🏋️</div>
                  <h3 className="text-lg font-semibold text-[#000000] mb-2">Exercise Library</h3>
                  <p className="text-[#000000]/60 mb-4">Manage exercise database</p>
                  <button className="w-full px-4 py-2 bg-[#E43636] text-white rounded-lg hover:bg-[#000000] transition-colors">
                    Manage Exercises
                  </button>
                </div>

                <div className="border border-[#000000]/10 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-4">📊</div>
                  <h3 className="text-lg font-semibold text-[#000000] mb-2">Certificates</h3>
                  <p className="text-[#000000]/60 mb-4">Manage course certificates</p>
                  <button className="w-full px-4 py-2 bg-[#E43636] text-white rounded-lg hover:bg-[#000000] transition-colors">
                    Manage Certificates
                  </button>
                </div>

                <div className="border border-[#000000]/10 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-4">🎯</div>
                  <h3 className="text-lg font-semibold text-[#000000] mb-2">Routines</h3>
                  <p className="text-[#000000]/60 mb-4">Manage workout routines</p>
                  <button className="w-full px-4 py-2 bg-[#E43636] text-white rounded-lg hover:bg-[#000000] transition-colors">
                    Manage Routines
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-[#000000] mb-6">Analytics & Reports</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="border border-[#000000]/10 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-[#000000] mb-4">User Growth</h3>
                  <div className="h-64 bg-[#F6EFD2] rounded-lg flex items-center justify-center">
                    <p className="text-[#000000]/60">Chart placeholder</p>
                  </div>
                </div>

                <div className="border border-[#000000]/10 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-[#000000] mb-4">Course Performance</h3>
                  <div className="h-64 bg-[#F6EFD2] rounded-lg flex items-center justify-center">
                    <p className="text-[#000000]/60">Chart placeholder</p>
                  </div>
                </div>

                <div className="border border-[#000000]/10 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-[#000000] mb-4">Revenue Analytics</h3>
                  <div className="h-64 bg-[#F6EFD2] rounded-lg flex items-center justify-center">
                    <p className="text-[#000000]/60">Chart placeholder</p>
                  </div>
                </div>

                <div className="border border-[#000000]/10 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-[#000000] mb-4">Engagement Metrics</h3>
                  <div className="h-64 bg-[#F6EFD2] rounded-lg flex items-center justify-center">
                    <p className="text-[#000000]/60">Chart placeholder</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button className="px-4 py-2 bg-[#E43636] text-white rounded-lg hover:bg-[#000000] transition-colors">
                  Export Report
                </button>
                <button className="px-4 py-2 bg-[#000000] text-white rounded-lg hover:bg-[#E43636] transition-colors">
                  Generate Insights
                </button>
              </div>
            </motion.div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-[#000000] mb-6">Website Settings</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="border border-[#000000]/10 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-[#000000] mb-4">General Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#000000] mb-2">Website Name</label>
                      <input
                        type="text"
                        defaultValue="ESC - Exercise Strength Core"
                        className="w-full px-3 py-2 border border-[#000000]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E43636]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#000000] mb-2">Contact Email</label>
                      <input
                        type="email"
                        defaultValue="admin@esc.com"
                        className="w-full px-3 py-2 border border-[#000000]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E43636]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#000000] mb-2">Maintenance Mode</label>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="mr-2"
                        />
                        <span className="text-sm text-[#000000]/60">Enable maintenance mode</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border border-[#000000]/10 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-[#000000] mb-4">Security Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#000000] mb-2">Session Timeout (minutes)</label>
                      <input
                        type="number"
                        defaultValue="30"
                        className="w-full px-3 py-2 border border-[#000000]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E43636]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#000000] mb-2">Password Policy</label>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input type="checkbox" defaultChecked className="mr-2" />
                          <span className="text-sm text-[#000000]/60">Require uppercase letters</span>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" defaultChecked className="mr-2" />
                          <span className="text-sm text-[#000000]/60">Require numbers</span>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span className="text-sm text-[#000000]/60">Require special characters</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border border-[#000000]/10 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-[#000000] mb-4">Email Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#000000] mb-2">SMTP Server</label>
                      <input
                        type="text"
                        defaultValue="smtp.gmail.com"
                        className="w-full px-3 py-2 border border-[#000000]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E43636]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#000000] mb-2">SMTP Port</label>
                      <input
                        type="number"
                        defaultValue="587"
                        className="w-full px-3 py-2 border border-[#000000]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E43636]"
                      />
                    </div>
                    <button className="w-full px-4 py-2 bg-[#E43636] text-white rounded-lg hover:bg-[#000000] transition-colors">
                      Test Email Configuration
                    </button>
                  </div>
                </div>

                <div className="border border-[#000000]/10 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-[#000000] mb-4">Backup & Restore</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#000000] mb-2">Auto Backup</label>
                      <div className="flex items-center">
                        <input type="checkbox" defaultChecked className="mr-2" />
                        <span className="text-sm text-[#000000]/60">Enable automatic backups</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#000000] mb-2">Backup Frequency</label>
                      <select className="w-full px-3 py-2 border border-[#000000]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E43636]">
                        <option>Daily</option>
                        <option>Weekly</option>
                        <option>Monthly</option>
                      </select>
                    </div>
                    <div className="flex space-x-2">
                      <button className="flex-1 px-4 py-2 bg-[#E43636] text-white rounded-lg hover:bg-[#000000] transition-colors">
                        Create Backup
                      </button>
                      <button className="flex-1 px-4 py-2 bg-[#000000] text-white rounded-lg hover:bg-[#E43636] transition-colors">
                        Restore
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button className="px-6 py-2 border border-[#000000]/20 text-[#000000] rounded-lg hover:bg-[#F6EFD2] transition-colors">
                  Cancel
                </button>
                <button className="px-6 py-2 bg-[#E43636] text-white rounded-lg hover:bg-[#000000] transition-colors">
                  Save Settings
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
} 