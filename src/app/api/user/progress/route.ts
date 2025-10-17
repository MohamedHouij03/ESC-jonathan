import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Get user's course progress
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
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