import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { uploadProfilePhoto, deleteProfilePhoto } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('photo') as File;
    const userId = formData.get('userId') as string;

    if (!file || !userId) {
      return NextResponse.json(
        { error: 'Photo file and user ID are required' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File must be an image' },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size must be less than 5MB' },
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

    // Delete old profile photo if it exists
    if (user.profilePhoto) {
      try {
        await deleteProfilePhoto(user.profilePhoto);
      } catch (error) {
        console.error('Failed to delete old profile photo:', error);
        // Continue with upload even if deletion fails
      }
    }

    // Upload new profile photo to Supabase Storage
    const photoUrl = await uploadProfilePhoto(userId, file);

    // Update user record in database
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { profilePhoto: photoUrl },
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
      message: 'Profile photo uploaded successfully',
      profilePhoto: photoUrl,
      user: userResponse
    });

  } catch (error) {
    console.error('Upload profile photo error:', error);
    return NextResponse.json(
      { error: 'Failed to upload profile photo' },
      { status: 500 }
    );
  }
}
