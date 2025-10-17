import { useState, useEffect } from 'react';

interface User {
  _id: string;
  email: string;
  name: string;
}

interface CourseProgress {
  id: string;
  courseId: string;
  courseName: string;
  progress: number;
  completedLessons: Array<{
    id: string;
    lessonId: string;
    lessonName: string;
    completedAt: string;
  }>;
  completedChapters: Array<{
    id: string;
    chapterId: string;
    chapterName: string;
    completedAt: string;
  }>;
  lastAccessed: string;
}

export function useUserProgress(courseId: string) {
  const [user, setUser] = useState<User | null>(null);
  const [progress, setProgress] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [completedChapters, setCompletedChapters] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch progress from database only
  const fetchProgressFromDatabase = async (userId: string) => {
    try {
      const response = await fetch(`/api/user/progress?userId=${userId}&courseId=${courseId}`);
      const data = await response.json();
      
      if (data.success && data.courseProgress && data.courseProgress.length > 0) {
        const courseProgress = data.courseProgress[0];
        setProgress(courseProgress.progress);
        setCompletedLessons(courseProgress.completedLessons?.map((l: any) => l.lessonId) || []);
        setCompletedChapters(courseProgress.completedChapters?.map((c: any) => c.chapterId) || []);
        console.log(`✅ Fetched progress from database: ${courseProgress.completedLessons?.length || 0} lessons completed`);
      } else {
        // No progress data found in database
        setProgress(0);
        setCompletedLessons([]);
        setCompletedChapters([]);
        console.log('📊 No database progress found, starting fresh');
      }
    } catch (error) {
      console.error('Failed to fetch progress from database:', error);
      setError('Failed to load progress from database');
    }
  };

  useEffect(() => {
    const loadProgress = async () => {
      setLoading(true);
      setError(null);
  
      try {
        // Get user from localStorage (for authentication only)
        const userData = localStorage.getItem('user');
        if (userData) {
          const parsed = JSON.parse(userData) as User;
          setUser(parsed);
          
          // Always fetch fresh data from database
          if (parsed._id && parsed._id !== 'local-user') {
            await fetchProgressFromDatabase(parsed._id);
          } else {
            // Local user - no database progress
            setProgress(0);
            setCompletedLessons([]);
            setCompletedChapters([]);
          }
        } else {
          // No user logged in
          setUser(null);
          setProgress(0);
          setCompletedLessons([]);
          setCompletedChapters([]);
        }
      } catch (error) {
        console.error('Error loading progress:', error);
        setError('Failed to load progress');
      } finally {
        setLoading(false);
      }
    };

    loadProgress();

    // Listen for progress updates from database
    const handleProgressUpdate = (event: CustomEvent) => {
      if (event.detail.courseId === courseId) {
        console.log('Progress update received:', event.detail);
        
        // Refresh from database when progress is updated
        if (user?._id && user._id !== 'local-user') {
          fetchProgressFromDatabase(user._id);
        }
      }
    };

    window.addEventListener('progressUpdated', handleProgressUpdate as EventListener);
    
    return () => {
      window.removeEventListener('progressUpdated', handleProgressUpdate as EventListener);
    };
  }, [courseId, user?._id]);
  

  return {
    user,
    progress,
    completedLessons,
    completedChapters,
    loading,
    error,
    isLessonCompleted: (lessonId: string) => {
      return completedLessons.includes(lessonId);
    },
    isChapterCompleted: (chapterId: string) => {
      return completedChapters.includes(chapterId);
    },
    refreshProgress: () => {
      if (user?._id) {
        fetchProgressFromDatabase(user._id);
      }
    }
  };
}
