'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Certificate from './Certificate';

interface CourseCompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  course: any;
  onCourseComplete?: () => void;
}

const CourseCompletionModal: React.FC<CourseCompletionModalProps> = ({
  isOpen,
  onClose,
  user,
  course,
  onCourseComplete
}) => {
  const [showCertificate, setShowCertificate] = useState(false);
  const [completionDate] = useState(new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }));

  useEffect(() => {
    if (isOpen) {
      // Call the completion callback if provided
      onCourseComplete?.();
    }
  }, [isOpen, onCourseComplete]);

  const handleDownloadCertificate = () => {
    setShowCertificate(true);
  };

  const handleCloseCertificate = () => {
    setShowCertificate(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
        >
          {!showCertificate ? (
            <div className="p-8 text-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Congratulations!
                </h2>
                <p className="text-xl text-gray-600 mb-6">
                  You've successfully completed
                </p>
                <h3 className="text-2xl font-semibold text-red-600 mb-8">
                  {course.title}
                </h3>
              </div>

              <div className="space-y-4">
                <p className="text-gray-600">
                  You've earned a certificate of completion for your hard work and dedication.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                  <button
                    onClick={handleDownloadCertificate}
                    className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-semibold text-lg shadow-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 transform hover:scale-105"
                  >
                    Download Certificate
                  </button>
                  
                  <button
                    onClick={onClose}
                    className="px-8 py-4 bg-gray-200 text-gray-800 rounded-lg font-semibold text-lg hover:bg-gray-300 transition-all duration-200"
                  >
                    Continue Learning
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  Your Certificate
                </h3>
                <button
                  onClick={handleCloseCertificate}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <Certificate
                userName={user.name}
                courseName={course.title}
                completionDate={completionDate}
                userId={user._id}
                courseId={course.id}
                saveToBackend={true}
              />
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CourseCompletionModal; 