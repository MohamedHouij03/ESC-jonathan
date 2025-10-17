import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { certificateId: string } }
) {
  try {
    const { certificateId } = params;

    if (!certificateId) {
      return NextResponse.json(
        { success: false, error: 'Certificate ID is required' },
        { status: 400 }
      );
    }

    // Fetch the certificate
    const certificate = await prisma.certificate.findUnique({
      where: {
        certificateId: certificateId
      }
    });

    if (!certificate) {
      return NextResponse.json(
        { success: false, error: 'Certificate not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      certificate: {
        certificateId: certificate.certificateId,
        courseName: certificate.courseName,
        completionDate: certificate.completionDate,
        issuedAt: certificate.issuedAt
      }
    });

  } catch (error) {
    console.error('Error fetching certificate:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
