import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Test database connection
    await prisma.$connect();
    
    // Get newsletter subscription count
    const subscriptionCount = await prisma.newsletterSubscription.count();
    
    return NextResponse.json({
      status: 'success',
      message: 'Newsletter database connection successful',
      subscriptionCount: subscriptionCount
    });
  } catch (error) {
    console.error('Newsletter test error:', error);
    return NextResponse.json(
      { 
        status: 'error',
        message: 'Database connection failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
