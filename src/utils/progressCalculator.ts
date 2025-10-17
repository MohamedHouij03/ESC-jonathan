// Utility function to calculate course progress
export function calculateCourseProgress(completedLessons: number, totalLessons: number): number {
  if (totalLessons === 0) return 0;
  return Math.round((completedLessons / totalLessons) * 100);
}

// Course lesson counts - these should match the actual lesson counts in the course pages
export const COURSE_LESSON_COUNTS = {
  'level1-megacore': 147, // This matches the actual lessons in the course
  'level1-reformers': 147, // Updated to match actual lesson count from course content
  'level2': 0, // Update when Level 2 lessons are added
  'anatomy-xformer': 0, // Update when Anatomy Xformer lessons are added
  'megacore': 147, // Alias for level1-megacore
  'reformers': 147 // Alias for level1-reformers
} as const;

// Helper function to get progress for a specific course
export function getCourseProgress(courseId: string, completedLessonsCount: number): number {
  const totalLessons = COURSE_LESSON_COUNTS[courseId as keyof typeof COURSE_LESSON_COUNTS] || 0;
  return calculateCourseProgress(completedLessonsCount, totalLessons);
}
