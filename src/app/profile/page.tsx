"use client";

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface CourseProgress {
  courseId: string;
  courseName: string;
  progress: number;
  completedChapters: Array<{
    chapterId: string;
    chapterName: string;
    completedAt: string;
  }>;
  lastAccessed: string;
  startedAt: string;
}

interface Certificate {
  id: string;
  userId: string;
  courseId: string;
  courseName: string;
  completionDate: string;
  certificateUrl?: string;
  issuedAt: string;
}

interface User {
  _id: string;
  name: string;
  studioName: string;
  email: string;
  profilePhoto?: string;
  courseProgress?: CourseProgress[];
  lastLogin: string;
  loginHistory?: Array<{
    timestamp: string;
    ipAddress: string;
    location: string;
  }>;
  createdAt: string;
}

// Modern Profile Page Redesign
export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loadingCertificates, setLoadingCertificates] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/auth/signin');
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      // Fetch certificates for the user
      fetchCertificates(parsedUser._id);
    } catch (error) {
      console.error('Error parsing user data:', error);
      localStorage.removeItem('user');
      router.push('/auth/signin');
      return;
    }
  }, [router]);

  const fetchCertificates = async (userId: string) => {
    setLoadingCertificates(true);
    try {
      const response = await fetch(`/api/certificates?userId=${userId}`);
      const data = await response.json();
      if (data.success) {
        setCertificates(data.certificates);
      }
    } catch (error) {
      console.error('Error fetching certificates:', error);
    } finally {
      setLoadingCertificates(false);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('user');
    router.push('/auth/signin');
  };

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    setIsUploading(true);
    setUploadError('');

    try {
      const formData = new FormData();
      formData.append('photo', file);
      formData.append('userId', user._id);

      const response = await fetch('/api/user/upload-photo', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setUser(prev => prev ? { ...prev, profilePhoto: data.profilePhoto } : null);
        
        // Update localStorage
        const updatedUserData = { ...user, profilePhoto: data.profilePhoto };
        localStorage.setItem('user', JSON.stringify(updatedUserData));
      } else {
        const error = await response.json();
        setUploadError(error.error || 'Failed to upload photo');
      }
    } catch (error) {
      setUploadError('Error uploading photo');
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'from-green-500 to-green-600';
    if (progress >= 60) return 'from-blue-500 to-blue-600';
    if (progress >= 40) return 'from-yellow-500 to-yellow-600';
    return 'from-red-500 to-red-600';
  };


  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div className="relative bg-white py-8 md:py-12">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 ml-8 md:ml-16">
            {/* Profile Avatar */}
            <div className="relative group flex-shrink-0">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-2xl ring-4 ring-[#F6EFD2] transition-all duration-300 bg-white">
                {user.profilePhoto ? (
                  <img
                    src={user.profilePhoto}
                    alt={user.name || 'User'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-[#F6EFD2] flex items-center justify-center text-[#000000] text-4xl md:text-6xl font-bold">
                    {user.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                )}
              </div>
              <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center cursor-pointer">
                <button
                  onClick={triggerFileUpload}
                  disabled={isUploading}
                  className="text-[#F6EFD2] text-xs font-medium px-3 py-1 bg-[#000000] rounded-full shadow"
                >
                  {isUploading ? 'Uploading...' : 'Edit Photo'}
                </button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </div>
            
            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#000000] mb-2 drop-shadow">{user.name || 'User'}</h1>
              <p className="text-[#000000] text-lg mb-1">{user.studioName}</p>
              <p className="text-[#000000] mb-2">{user.email}</p>
              <p className="italic text-sm text-[#000000]/60 mb-4">"Every day is a chance to get stronger."</p>
              {uploadError && (
                <p className="text-[#000000] text-sm mb-4">{uploadError}</p>
              )}
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2 bg-[#E43636] text-white rounded-lg hover:bg-[#b82a2a] transition-all duration-200 font-medium shadow-lg border border-[#E43636]"
                  onClick={() => router.push('/profile/edit')}
                >
                  Edit Profile
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2 bg-white text-[#E43636] rounded-lg hover:bg-[#F6EFD2] transition-all duration-200 font-medium shadow-lg border border-[#E43636]"
                  onClick={handleSignOut}
                >
                  Sign Out
                </motion.button>
              </div>
            </div>
        </div>
      </div>

      <div className="w-full pb-12">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10 ml-8 md:ml-16">
          <div className="bg-white rounded-xl shadow border border-[#000000]/10 flex flex-col items-center py-8 px-4 transition-all duration-200">
            <span className="text-xs text-[#000000] mb-1">Member Since</span>
            <span className="text-2xl font-bold text-[#000000]">
              {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
            </span>
          </div>
          <div className="bg-white rounded-xl shadow border border-[#000000]/10 flex flex-col items-center py-8 px-4 transition-all duration-200">
            <span className="text-xs text-[#000000] mb-1">Last Login</span>
            <span className="text-2xl font-bold text-[#000000]">
              {new Date(user.lastLogin).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
          </div>
          <div className="bg-white rounded-xl shadow border border-[#000000]/10 flex flex-col items-center py-8 px-4 transition-all duration-200">
            <span className="text-xs text-[#000000] mb-1">Studio</span>
            <span className="text-2xl font-bold text-[#000000]">{user.studioName}</span>
          </div>
          <div className="bg-white rounded-xl shadow border border-[#000000]/10 flex flex-col items-center py-8 px-4 transition-all duration-200">
            <span className="text-xs text-[#000000] mb-1">Courses</span>
            <span className="text-2xl font-bold text-[#000000]">{user.courseProgress ? user.courseProgress.length : 0}</span>
          </div>
        </div>

        {/* Course Progress Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#000000]/10 mb-10 ml-8 md:ml-16">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
            <h2 className="text-2xl font-bold text-[#000000]">Course Progress</h2>
            <Link href="/courses">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-[#E43636] text-white rounded-lg hover:bg-[#b82a2a] transition-all duration-200 font-medium"
              >
                Browse Courses
              </motion.button>
            </Link>
          </div>
          {user.courseProgress && user.courseProgress.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {user.courseProgress.map((course, index) => (
                <motion.div
                  key={course.courseId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="bg-white rounded-xl p-6 transition-colors duration-200 cursor-pointer shadow border border-[#000000]/10"
                >
                  <Link href={`/courses/${course.courseId}`} className="block group">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-[#000000] transition-colors">{course.courseName}</h3>
                        <p className="text-sm text-[#000000]/60">
                          Started {new Date(course.startedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-[#000000]">
                          {course.progress}%
                        </p>
                        <p className="text-sm text-[#000000]/60">
                          {course.completedChapters.length} chapters completed
                        </p>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-[#000000]/60 mb-1">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 border border-[#000000]/10">
                        <div
                          className="h-2 rounded-full bg-[#E43636] transition-all duration-300"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    {course.completedChapters.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-[#000000] mb-2">Completed Chapters:</p>
                        <div className="flex flex-wrap gap-2">
                          {course.completedChapters.map((chapter) => (
                            <span
                              key={chapter.chapterId}
                              className="px-3 py-1 bg-[#E43636] text-white text-xs rounded-full"
                            >
                              {chapter.chapterName}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-[#F6EFD2] rounded-full border border-[#000000]/10 flex items-center justify-center mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-[#000000] mb-2">No courses started yet</h3>
              <p className="text-[#000000] mb-6">Start your fitness journey by enrolling in our courses</p>
              <Link href="/courses">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-[#E43636] text-white rounded-lg hover:bg-[#b82a2a] transition-all duration-200 font-medium shadow-lg"
                >
                  Explore Courses
                </motion.button>
              </Link>
            </div>
          )}
        </div>

        {/* Achievements / Certifications */}
        <AchievementsBlock userId={user._id} userName={user.name || 'User'} />

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#000000]/10 mt-10 ml-8 md:ml-16">
          <h2 className="text-2xl font-bold text-[#000000] mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/courses" className="group flex flex-col items-center justify-center bg-white border border-[#000000]/10 rounded-xl p-6 shadow transition-all duration-200 hover:border-[#000000] hover:shadow-lg cursor-pointer">
              <span className="font-semibold text-[#000000] transition-colors">Browse Courses</span>
            </Link>
            <Link href="/profile/edit" className="group flex flex-col items-center justify-center bg-white border border-[#000000]/10 rounded-xl p-6 shadow transition-all duration-200 hover:border-[#000000] hover:shadow-lg cursor-pointer">
              <span className="font-semibold text-[#000000] transition-colors">Edit Profile</span>
            </Link>
            <Link href="/book" className="group flex flex-col items-center justify-center bg-white border border-[#000000]/10 rounded-xl p-6 shadow transition-all duration-200 hover:border-[#000000] hover:shadow-lg cursor-pointer">
              <span className="font-semibold text-[#000000] transition-colors">Book Now</span>
            </Link>
            <button
              onClick={handleSignOut}
              className="group flex flex-col items-center justify-center bg-white border border-[#000000]/10 rounded-xl p-6 shadow transition-all duration-200 hover:border-[#000000] hover:shadow-lg cursor-pointer"
            >
              <span className="font-semibold text-[#000000] transition-colors">Sign Out</span>
            </button>
          </div>
        </div>

        {/* Delete Account Section */}
        <DeleteAccountSection user={user} onAccountDeleted={handleSignOut} />
      </div>
    </div>
  );
} 

function AchievementsBlock({ userId, userName }: { userId: string; userName: string }) {
  const router = useRouter();
  const [certificates, setCertificates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCertificates() {
      setLoading(true);
      try {
        const res = await fetch(`/api/certificates?userId=${userId}`);
        const data = await res.json();
        if (data.success) {
          setCertificates(data.certificates);
        }
      } catch (e) {
        setCertificates([]);
      } finally {
        setLoading(false);
      }
    }
    fetchCertificates();
  }, [userId]);


  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#000000]/10 mb-10 mt-10 ml-8 md:ml-16">
      <h2 className="text-2xl font-bold text-[#000000] mb-6">Achievements & Certifications</h2>
      {certificates.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8">
          <p className="text-[#000000]">No achievements or certificates yet. Complete courses to earn them!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map(cert => (
            <div key={cert.certificateId} className="bg-white rounded-xl p-6 flex flex-col items-center shadow border border-[#000000]/10">
              <span className="text-2xl text-yellow-400 mb-2">🏅</span>
              <h3 className="text-lg font-semibold text-[#000000] mb-1 text-center">{cert.courseName}</h3>
              <p className="text-[#000000] text-sm mb-2">Completed: {new Date(cert.completionDate).toLocaleDateString()}</p>
              <button
                className="mt-2 px-4 py-2 bg-[#E43636] text-white rounded-lg font-medium shadow hover:bg-[#b82a2a] transition-all duration-200"
                onClick={() => router.push(`/certificate/${cert.certificateId}`)}
              >
                View Certificate
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function DeleteAccountSection({ user, onAccountDeleted }: { user: User; onAccountDeleted: () => void }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  const handleDeleteAccount = async () => {
    if (!password.trim()) {
      setDeleteError('Please enter your password to confirm account deletion');
      return;
    }

    setIsDeleting(true);
    setDeleteError('');

    try {
      const response = await fetch('/api/auth/delete-account', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user._id,
          password: password
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Clear localStorage and redirect
        localStorage.removeItem('user');
        onAccountDeleted();
      } else {
        setDeleteError(data.error || 'Failed to delete account');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      setDeleteError('Network error. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      {/* Delete Account Section */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-red-200 mt-10 ml-8 md:ml-16">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-red-600">Delete Account</h2>
        </div>
        
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-800 text-sm mb-2">
            <strong>Warning:</strong> This action cannot be undone. Deleting your account will permanently remove:
          </p>
          <ul className="text-red-700 text-sm list-disc list-inside space-y-1">
            <li>Your profile and personal information</li>
            <li>All course progress and achievements</li>
            <li>All certificates and completed lessons</li>
            <li>All comments and interactions</li>
            <li>Your login history</li>
          </ul>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsDeleteModalOpen(true)}
          className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 font-medium shadow-lg border border-red-600"
        >
          Delete My Account
        </motion.button>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-red-600">Confirm Account Deletion</h3>
            </div>

            <p className="text-gray-700 mb-4">
              Are you sure you want to delete your account? This action cannot be undone and will permanently remove all your data.
            </p>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter your password to confirm:
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Your password"
                disabled={isDeleting}
              />
            </div>

            {deleteError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{deleteError}</p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setPassword('');
                  setDeleteError('');
                }}
                disabled={isDeleting}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={isDeleting || !password.trim()}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Deleting...
                  </>
                ) : (
                  'Delete Account'
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
} 