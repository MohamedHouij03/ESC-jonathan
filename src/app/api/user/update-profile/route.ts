import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(req: Request) {
  try {
    const { userId, name, studioName, profilePhoto } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Update user profile
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name: name || existingUser.name,
        studioName: studioName || existingUser.studioName,
        profilePhoto: profilePhoto || existingUser.profilePhoto
      },
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

    // Format response to match frontend expectations
    const userResponse = {
      _id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      studioName: updatedUser.studioName,
      profilePhoto: updatedUser.profilePhoto,
      currentLocation: updatedUser.currentLocation,
      comments: updatedUser.comments,
      lastLogin: updatedUser.lastLogin,
      createdAt: updatedUser.createdAt,
      courseProgress: updatedUser.courseProgress,
      loginHistory: updatedUser.loginHistory,
    };

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
      user: userResponse
    });

  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}
