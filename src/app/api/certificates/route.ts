import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST - Create a new certificate record
export async function POST(req: Request) {
  try {
    const { 
      userId, 
      courseId, 
      courseName, 
      completionDate,
      certificateUrl 
    } = await req.json();

    // Validate required fields
    if (!userId || !courseId || !courseName || !completionDate) {
      return NextResponse.json(
        { error: 'User ID, Course ID, Course Name, and Completion Date are required' },
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

    // Check if certificate already exists for this user and course
    const existingCertificate = await prisma.certificate.findFirst({
      where: {
        userId: userId,
        courseId: courseId
      }
    });

    if (existingCertificate) {
      return NextResponse.json({
        success: true,
        message: 'Certificate already exists for this course',
        certificate: existingCertificate
      });
    }

    // Create new certificate record
    const certificate = await prisma.certificate.create({
      data: {
        userId: userId,
        courseId: courseId,
        courseName: courseName,
        completionDate: new Date(completionDate),
        certificateUrl: certificateUrl || null,
        issuedAt: new Date()
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Certificate created successfully',
      certificate: certificate
    });

  } catch (error) {
    console.error('Create certificate error:', error);
    return NextResponse.json(
      { error: 'Failed to create certificate' },
      { status: 500 }
    );
  }
}

// GET - Get user's certificates
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Get all certificates for the user
    const certificates = await prisma.certificate.findMany({
      where: { userId: userId },
      orderBy: { issuedAt: 'desc' }
    });

    return NextResponse.json({
      success: true,
      certificates: certificates
    });

  } catch (error) {
    console.error('Get certificates error:', error);
    return NextResponse.json(
      { error: 'Failed to get certificates' },
      { status: 500 }
    );
  }
}






