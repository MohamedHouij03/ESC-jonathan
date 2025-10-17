import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { name, studioName, email, password } = await req.json();

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        studioName: studioName || null,
        email,
        password: hashedPassword,
        lastLogin: new Date(),
        loginHistory: {
          create: {
            timestamp: new Date(),
            ipAddress: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown',
            location: 'Unknown',
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
      _id: user.id,
      name: user.name,
      studioName: user.studioName,
      email: user.email,
      profilePhoto: user.profilePhoto,
      currentLocation: user.currentLocation,
      comments: user.comments,
      lastLogin: user.lastLogin,
      createdAt: user.createdAt,
      courseProgress: user.courseProgress,
      loginHistory: user.loginHistory,
    };

    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Error during registration' },
      { status: 500 }
    );
  }
}
