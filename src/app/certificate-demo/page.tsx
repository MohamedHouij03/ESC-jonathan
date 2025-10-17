'use client';

import { useState, useEffect } from 'react';
import Certificate from '../../components/Certificate';

export default function CertificateDemo() {
  const [user, setUser] = useState<any>(null);
  const [course, setCourse] = useState<any>(null);

  useEffect(() => {
    // Get user data from localStorage (similar to your existing profile page)
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }

    // If no user is logged in, use a demo user for testing
    if (!userData) {
      setUser({
        _id: 'demo-user-123',
        name: 'John Doe',
        email: 'john.doe@example.com',
        studioName: 'Demo Studio'
      });
    }

    // Mock course data - replace with your actual course data
    setCourse({
      id: 'course-1',
      title: 'Level 1 Training - Megacore',
      description: 'Complete fitness training course'
    });
  }, []);

  if (!user || !course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-300">Loading certificate...</p>
        </div>
      </div>
    );
  }

  const completionDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Course Completion Certificate
          </h1>
          <p className="text-gray-300 text-lg">
            Congratulations on completing your course! Download your certificate below.
          </p>
          {!localStorage.getItem('user') && (
            <p className="text-yellow-400 text-sm mt-2">
              Demo mode - Using sample user data
            </p>
          )}
        </div>
        
        <Certificate
          userName={user.name}
          courseName={course.title}
          completionDate={completionDate}
          userId={user._id}
          courseId={course.id}
          saveToBackend={true}
        />
        
        <div className="mt-12 text-center">
          <p className="text-gray-400 text-sm">
            This certificate is automatically generated and can be downloaded as a PDF.
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Certificate records are saved to the database for future reference.
          </p>
        </div>
      </div>
    </div>
  );
} 