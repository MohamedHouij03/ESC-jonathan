import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';
import { prisma } from '@/lib/prisma';
import { COURSE_LESSON_COUNTS } from '@/utils/progressCalculator';

// Helper function to get all lesson IDs for a specific chapter
function getChapterLessons(courseId: string, chapterId: string): string[] {
  // For now, return a simple mapping based on the chapter structure
  // This should match the actual lesson structure in your course
  const chapterLessonsMap: { [key: string]: { [key: string]: string[] } } = {
    'level1-reformers': {
      '1': ['1-1', '1-2'],
      '2': ['2-1', '2-2', '2-3', '2-4', '2-5'],
      '3': ['3-1', '3-2', '3-3', '3-4', '3-5', '3-6', '3-7', '3-8', '3-9', '3-10'],
      '4': ['4-1', '4-2', '4-3', '4-4', '4-5', '4-6', '4-7', '4-8', '4-9', '4-10', '4-11'],
      '5': ['5-1', '5-2', '5-3', '5-4', '5-5', '5-6', '5-7', '5-8'],
      '6': ['6-1', '6-2', '6-3', '6-4', '6-5', '6-6', '6-7', '6-8', '6-9', '6-10', '6-11', '6-12', '6-13', '6-14', '6-15', '6-16'],
      '7': ['7-1', '7-2', '7-3', '7-4', '7-5', '7-6', '7-7', '7-8', '7-9', '7-10', '7-11', '7-12', '7-13', '7-14', '7-15', '7-16', '7-17', '7-18', '7-19'],
      '8': ['8-1', '8-2', '8-3', '8-4', '8-5', '8-6', '8-7', '8-8', '8-9', '8-10', '8-11', '8-12', '8-13', '8-14', '8-15', '8-16', '8-17', '8-18', '8-19', '8-20', '8-21'],
      '9': ['9-1', '9-2', '9-3', '9-4'],
      '10': ['10-1', '10-2', '10-3', '10-4', '10-5', '10-6', '10-7', '10-8', '10-9', '10-10', '10-11', '10-12', '10-13'],
      '11': ['11-1', '11-2', '11-3', '11-4', '11-5', '11-6', '11-7', '11-8', '11-9', '11-10', '11-11', '11-12', '11-13', '11-14', '11-15', '11-16', '11-17', '11-18', '11-19', '11-20', '11-21', '11-22', '11-23', '11-24', '11-25', '11-26', '11-27', '11-28'],
      '12': ['12-1', '12-2', '12-3', '12-4', '12-5', '12-6', '12-7', '12-8', '12-9', '12-10']
    },
    'level1-megacore': {
      // Add megacore chapters here if needed
    }
  };

  return chapterLessonsMap[courseId]?.[chapterId] || [];
}

// POST - Mark a lesson as completed
export async function POST(req: Request) {
  try {
    const { 
      userId, 
      courseId, 
      courseName, 
      chapterId, 
      chapterName, 
      lessonId, 
      lessonTitle 
    } = await req.json();

    // Validate required fields
    if (!userId || !courseId || !lessonId) {
      return NextResponse.json(
        { error: 'User ID, Course ID, and Lesson ID are required' },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Find or create course progress
    let courseProgress = await prisma.courseProgress.findUnique({
      where: {
        userId_courseId: {
          userId: userId,
          courseId: courseId
        }
      },
      include: {
        completedLessons: true,
        completedChapters: true
      }
    });

    if (!courseProgress) {
      // Create new course progress
      courseProgress = await prisma.courseProgress.create({
        data: {
          userId: userId,
          courseId: courseId,
          courseName: courseName || courseId,
          progress: 0,
          startedAt: new Date(),
          lastAccessed: new Date()
        },
        include: {
          completedLessons: true,
          completedChapters: true
        }
      });
    }

    // Check if lesson is already completed
    const existingLesson = courseProgress.completedLessons.find(
      lesson => lesson.lessonId === lessonId
    );

    if (existingLesson) {
      return NextResponse.json({
        success: true,
        message: 'Lesson already completed - no duplicate tracking',
        alreadyCompleted: true,
        courseProgress: {
          ...courseProgress,
          progress: courseProgress.progress
        }
      });
    }

    // Add completed lesson
    await prisma.completedLesson.create({
      data: {
        progressId: courseProgress.id,
        lessonId: lessonId,
        lessonName: lessonTitle || `Lesson ${lessonId}`
      }
    });

    // Check if chapter should be marked as completed
    if (chapterId && chapterName) {
      const existingChapter = courseProgress.completedChapters.find(
        chapter => chapter.chapterId === chapterId
      );

      if (!existingChapter) {
        // Get all lessons in this chapter to check if chapter is fully completed
        const chapterLessons = getChapterLessons(courseId, chapterId);
        const completedLessonsInChapter = courseProgress.completedLessons.filter(
          lesson => chapterLessons.includes(lesson.lessonId)
        );
        
        // Only mark chapter as completed if ALL lessons in the chapter are completed
        if (completedLessonsInChapter.length >= chapterLessons.length) {
          await prisma.completedChapter.create({
            data: {
              progressId: courseProgress.id,
              chapterId: chapterId,
              chapterName: chapterName
            }
          });
        }
      }
    }

    // Calculate new progress percentage using proper lesson counts
    const totalLessons = COURSE_LESSON_COUNTS[courseId as keyof typeof COURSE_LESSON_COUNTS] || 0;
    const completedLessonsCount = courseProgress.completedLessons.length + 1; // +1 for the lesson we just added
    const newProgress = totalLessons > 0 ? Math.round((completedLessonsCount / totalLessons) * 100) : 0;

    // Update course progress
    const updatedCourseProgress = await prisma.courseProgress.update({
      where: { id: courseProgress.id },
      data: {
        progress: newProgress,
        lastAccessed: new Date()
      },
      include: {
        completedLessons: true,
        completedChapters: true
      }
    });

    // Check if course is completed (100% progress)
    const isCourseCompleted = newProgress >= 100;
    let certificateCreated = false;

    if (isCourseCompleted) {
      try {
        // Check if certificate already exists
        const existingCertificate = await prisma.certificate.findFirst({
          where: {
            userId: userId,
            courseId: courseId
          }
        });

        if (!existingCertificate) {
          // Create certificate record
          await prisma.certificate.create({
            data: {
              userId: userId,
              courseId: courseId,
              courseName: courseName || courseId,
              completionDate: new Date(),
              issuedAt: new Date()
            }
          });
          certificateCreated = true;
        }
      } catch (certError) {
        console.error('Error creating certificate:', certError);
        // Don't fail the lesson completion if certificate creation fails
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Lesson marked as completed successfully',
      courseProgress: {
        id: updatedCourseProgress.id,
        courseId: updatedCourseProgress.courseId,
        courseName: updatedCourseProgress.courseName,
        progress: updatedCourseProgress.progress,
        completedLessons: updatedCourseProgress.completedLessons,
        completedChapters: updatedCourseProgress.completedChapters,
        lastAccessed: updatedCourseProgress.lastAccessed
      },
      isCourseCompleted: isCourseCompleted,
      certificateCreated: certificateCreated
    });

  } catch (error) {
    console.error('Complete lesson error:', error);
    return NextResponse.json(
      { error: 'Failed to mark lesson as completed' },
      { status: 500 }
    );
  }
}

// GET - Get user's course progress
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const userId = searchParams.get('userId');
    const courseId = searchParams.get('courseId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const whereClause: any = { userId };
    if (courseId) {
      whereClause.courseId = courseId;
    }

    const courseProgress = await prisma.courseProgress.findMany({
      where: whereClause,
      include: {
        completedLessons: true,
        completedChapters: true
      },
      orderBy: {
        lastAccessed: 'desc'
      }
    });

    return NextResponse.json({
      success: true,
      courseProgress: courseProgress
    });

  } catch (error) {
    console.error('Get course progress error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch course progress' },
      { status: 500 }
    );
  }
}
