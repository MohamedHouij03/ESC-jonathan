import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { email, source = 'newsletter_page', userId } = await req.json();

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingSubscription = await prisma.newsletterSubscription.findUnique({
      where: { email }
    });

    if (existingSubscription) {
      if (existingSubscription.isActive) {
        return NextResponse.json(
          { error: 'This email is already subscribed to our newsletter' },
          { status: 400 }
        );
      } else {
        // Reactivate subscription
        const reactivatedSubscription = await prisma.newsletterSubscription.update({
          where: { email },
          data: {
            isActive: true,
            unsubscribedAt: null,
            source: source,
            userId: userId || null
          }
        });

        return NextResponse.json({
          message: 'Welcome back! Your newsletter subscription has been reactivated.',
          subscription: {
            id: reactivatedSubscription.id,
            email: reactivatedSubscription.email,
            isActive: reactivatedSubscription.isActive
          }
        });
      }
    }

    // Create new subscription
    const subscription = await prisma.newsletterSubscription.create({
      data: {
        email,
        source,
        userId: userId || null,
        isActive: true
      }
    });

    return NextResponse.json({
      message: 'Thank you for subscribing! You will receive our latest fitness tips and updates.',
      subscription: {
        id: subscription.id,
        email: subscription.email,
        isActive: subscription.isActive
      }
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe to newsletter. Please try again.' },
      { status: 500 }
    );
  }
}
