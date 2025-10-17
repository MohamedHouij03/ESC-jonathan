import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Find the subscription
    const subscription = await prisma.newsletterSubscription.findUnique({
      where: { email }
    });

    if (!subscription) {
      return NextResponse.json(
        { error: 'Email not found in our newsletter list' },
        { status: 404 }
      );
    }

    if (!subscription.isActive) {
      return NextResponse.json(
        { error: 'This email is already unsubscribed' },
        { status: 400 }
      );
    }

    // Unsubscribe
    const unsubscribedSubscription = await prisma.newsletterSubscription.update({
      where: { email },
      data: {
        isActive: false,
        unsubscribedAt: new Date()
      }
    });

    return NextResponse.json({
      message: 'You have been successfully unsubscribed from our newsletter.',
      subscription: {
        id: unsubscribedSubscription.id,
        email: unsubscribedSubscription.email,
        isActive: unsubscribedSubscription.isActive
      }
    });

  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    return NextResponse.json(
      { error: 'Failed to unsubscribe from newsletter. Please try again.' },
      { status: 500 }
    );
  }
}

// GET endpoint to handle unsubscribe links
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter is required' },
        { status: 400 }
      );
    }

    // Find and unsubscribe
    const subscription = await prisma.newsletterSubscription.findUnique({
      where: { email }
    });

    if (!subscription || !subscription.isActive) {
      return NextResponse.json(
        { error: 'Email not found or already unsubscribed' },
        { status: 404 }
      );
    }

    // Unsubscribe
    await prisma.newsletterSubscription.update({
      where: { email },
      data: {
        isActive: false,
        unsubscribedAt: new Date()
      }
    });

    return NextResponse.json({
      message: 'You have been successfully unsubscribed from our newsletter.',
      email: email
    });

  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    return NextResponse.json(
      { error: 'Failed to unsubscribe from newsletter. Please try again.' },
      { status: 500 }
    );
  }
}
