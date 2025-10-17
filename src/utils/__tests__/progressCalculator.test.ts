import { calculateCourseProgress, getCourseProgress, COURSE_LESSON_COUNTS } from '../progressCalculator';

describe('Progress Calculator', () => {
  describe('calculateCourseProgress', () => {
    it('should calculate progress correctly', () => {
      expect(calculateCourseProgress(0, 100)).toBe(0);
      expect(calculateCourseProgress(25, 100)).toBe(25);
      expect(calculateCourseProgress(50, 100)).toBe(50);
      expect(calculateCourseProgress(100, 100)).toBe(100);
      expect(calculateCourseProgress(1, 147)).toBe(1); // Level 1 Megacore first lesson
    });

    it('should handle edge cases', () => {
      expect(calculateCourseProgress(0, 0)).toBe(0);
      expect(calculateCourseProgress(1, 0)).toBe(0);
    });

    it('should round to nearest integer', () => {
      expect(calculateCourseProgress(1, 3)).toBe(33); // 33.33... rounded to 33
      expect(calculateCourseProgress(2, 3)).toBe(67); // 66.66... rounded to 67
    });
  });

  describe('getCourseProgress', () => {
    it('should return correct progress for Level 1 Megacore', () => {
      expect(getCourseProgress('level1-megacore', 0)).toBe(0);
      expect(getCourseProgress('level1-megacore', 1)).toBe(1);
      expect(getCourseProgress('level1-megacore', 74)).toBe(50); // Half of 147
      expect(getCourseProgress('level1-megacore', 147)).toBe(100);
    });

    it('should return correct progress for Level 1 Reformers', () => {
      expect(getCourseProgress('level1-reformers', 0)).toBe(0);
      expect(getCourseProgress('level1-reformers', 1)).toBe(1);
      expect(getCourseProgress('level1-reformers', 98)).toBe(50); // Half of 196
      expect(getCourseProgress('level1-reformers', 196)).toBe(100);
    });

    it('should return 0 for courses with no lessons', () => {
      expect(getCourseProgress('level2', 10)).toBe(0);
      expect(getCourseProgress('anatomy-xformer', 5)).toBe(0);
    });

    it('should return 0 for unknown courses', () => {
      expect(getCourseProgress('unknown-course', 10)).toBe(0);
    });
  });

  describe('COURSE_LESSON_COUNTS', () => {
    it('should have correct lesson counts', () => {
      expect(COURSE_LESSON_COUNTS['level1-megacore']).toBe(147);
      expect(COURSE_LESSON_COUNTS['level1-reformers']).toBe(196);
      expect(COURSE_LESSON_COUNTS['level2']).toBe(0);
      expect(COURSE_LESSON_COUNTS['anatomy-xformer']).toBe(0);
    });
  });
});
