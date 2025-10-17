import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';
import { prisma } from '@/lib/prisma';

// POST - Create or update course progress (enrollment)
export async function POST(req: NextRequest) {
  try {
    const { 
      userId, 
      courseId, 
      courseName, 
      progress = 0 
    } = await req.json();

    // Validate required fields
    if (!userId || !courseId) {
      return NextResponse.json(
        { error: 'User ID and Course ID are required' },
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

    // Check if course progress already exists
    const existingProgress = await prisma.courseProgress.findUnique({
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

    if (existingProgress) {
      // Update existing progress
      const updatedProgress = await prisma.courseProgress.update({
        where: { id: existingProgress.id },
        data: {
          progress: progress,
          lastAccessed: new Date()
        },
        include: {
          completedLessons: true,
          completedChapters: true
        }
      });

      return NextResponse.json({
        success: true,
        message: 'Course progress updated successfully',
        courseProgress: updatedProgress
      });
    } else {
      // Create new course progress (enrollment)
      const newProgress = await prisma.courseProgress.create({
        data: {
          userId: userId,
          courseId: courseId,
          courseName: courseName || courseId,
          progress: progress,
          startedAt: new Date(),
          lastAccessed: new Date()
        },
        include: {
          completedLessons: true,
          completedChapters: true
        }
      });

      return NextResponse.json({
        success: true,
        message: 'Successfully enrolled in course',
        courseProgress: newProgress
      });
    }

  } catch (error) {
    console.error('Update course progress error:', error);
    return NextResponse.json(
      { error: 'Failed to update course progress' },
      { status: 500 }
    );
  }
}

// GET - Get course progress for a user
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
        completedLessons: {
          orderBy: { completedAt: 'desc' }
        },
        completedChapters: {
          orderBy: { completedAt: 'desc' }
        }
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
