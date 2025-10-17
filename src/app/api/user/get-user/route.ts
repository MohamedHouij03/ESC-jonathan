import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        studioName: true,
        profilePhoto: true,
        currentLocation: true,
        comments: true,
        lastLogin: true,
        createdAt: true,
        courseProgress: {
          include: {
            completedLessons: true,
            completedChapters: true
          }
        },
        loginHistory: {
          orderBy: { timestamp: 'desc' },
          take: 5
        }
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Format response to match frontend expectations
    const userResponse = {
      _id: user.id,
      name: user.name,
      email: user.email,
      studioName: user.studioName,
      profilePhoto: user.profilePhoto,
      currentLocation: user.currentLocation,
      comments: user.comments,
      lastLogin: user.lastLogin,
      createdAt: user.createdAt,
      courseProgress: user.courseProgress,
      loginHistory: user.loginHistory,
    };

    return NextResponse.json({
      success: true,
      user: userResponse
    });

  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { error: 'Failed to get user data' },
      { status: 500 }
    );
  }
}
