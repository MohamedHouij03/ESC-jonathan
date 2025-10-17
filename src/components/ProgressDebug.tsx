'use client';

import { useState, useEffect } from 'react';

interface ProgressDebugProps {
  courseId: string;
}

export default function ProgressDebug({ courseId }: ProgressDebugProps) {
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateDebugInfo = () => {
      const userData = localStorage.getItem('user');
      const localProgressData = localStorage.getItem('localProgress');
      
      const debug = {
        timestamp: new Date().toISOString(),
        courseId,
        userData: userData ? JSON.parse(userData) : null,
        localProgressData: localProgressData ? JSON.parse(localProgressData) : null,
        courseProgress: null as any
      };

      if (userData) {
        const parsed = JSON.parse(userData);
        debug.courseProgress = parsed.courseProgress?.find((cp: any) => cp.courseId === courseId);
      } else if (localProgressData) {
        const parsed = JSON.parse(localProgressData);
        debug.courseProgress = parsed.courseProgress?.find((cp: any) => cp.courseId === courseId);
      }

      setDebugInfo(debug);
    };

    updateDebugInfo();
    
    // Listen for progress updates
    const handleProgressUpdate = () => {
      updateDebugInfo();
    };

    window.addEventListener('progressUpdated', handleProgressUpdate);
    
    return () => {
      window.removeEventListener('progressUpdated', handleProgressUpdate);
    };
  }, [courseId]);

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 left-4 bg-gray-800 text-white px-3 py-1 rounded text-xs z-50"
      >
        Debug Progress
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 bg-gray-900 text-white p-4 rounded-lg text-xs max-w-md max-h-96 overflow-auto z-50">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold">Progress Debug</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>
      <pre className="whitespace-pre-wrap text-xs">
        {JSON.stringify(debugInfo, null, 2)}
      </pre>
    </div>
  );
}
