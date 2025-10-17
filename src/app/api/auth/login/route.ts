import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Find user
    const user = await prisma.user.findUnique({ 
      where: { email },
      include: {
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
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Check password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Update last login and add to login history
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        lastLogin: new Date(),
        loginHistory: {
          create: {
            timestamp: new Date(),
            ipAddress: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown',
            location: 'Unknown', // You can use a geolocation service to get this
          }
        }
      },
      include: {
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

    // Remove password from response
    const userWithoutPassword = {
      _id: updatedUser.id,
      name: updatedUser.name,
      studioName: updatedUser.studioName,
      email: updatedUser.email,
      profilePhoto: updatedUser.profilePhoto,
      currentLocation: updatedUser.currentLocation,
      comments: updatedUser.comments,
      lastLogin: updatedUser.lastLogin,
      createdAt: updatedUser.createdAt,
      courseProgress: updatedUser.courseProgress,
      loginHistory: updatedUser.loginHistory,
    };

    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Error during login' },
      { status: 500 }
    );
  }
}
