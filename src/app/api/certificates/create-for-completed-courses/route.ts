import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST - Create certificates for users who have completed courses but don't have certificates
export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        courseProgress: true,
        certificates: true
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const createdCertificates = [];

    // Check each course progress
    for (const courseProgress of user.courseProgress) {
      // If course is 100% complete
      if (courseProgress.progress >= 100) {
        // Check if certificate already exists
        const existingCertificate = user.certificates.find(
          cert => cert.courseId === courseProgress.courseId
        );

        if (!existingCertificate) {
          // Create certificate
          const certificate = await prisma.certificate.create({
            data: {
              userId: userId,
              courseId: courseProgress.courseId,
              courseName: courseProgress.courseName,
              completionDate: new Date(), // Use current date as completion date
              issuedAt: new Date()
            }
          });

          createdCertificates.push(certificate);
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: `Created ${createdCertificates.length} certificates`,
      certificates: createdCertificates
    });

  } catch (error) {
    console.error('Create certificates for completed courses error:', error);
    return NextResponse.json(
      { error: 'Failed to create certificates' },
      { status: 500 }
    );
  }
}






