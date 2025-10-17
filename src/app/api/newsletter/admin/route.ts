import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';
import { prisma } from '@/lib/prisma';

// GET - Get all newsletter subscriptions (admin only)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const status = searchParams.get('status'); // 'active', 'inactive', or 'all'
    
    const skip = (page - 1) * limit;

    // Build where clause based on status
    let whereClause = {};
    if (status === 'active') {
      whereClause = { isActive: true };
    } else if (status === 'inactive') {
      whereClause = { isActive: false };
    }

    // Get subscriptions with pagination
    const [subscriptions, total] = await Promise.all([
      prisma.newsletterSubscription.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: { subscribedAt: 'desc' },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      }),
      prisma.newsletterSubscription.count({ where: whereClause })
    ]);

    // Get statistics
    const stats = await Promise.all([
      prisma.newsletterSubscription.count({ where: { isActive: true } }),
      prisma.newsletterSubscription.count({ where: { isActive: false } }),
      prisma.newsletterSubscription.count()
    ]);

    return NextResponse.json({
      subscriptions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      stats: {
        active: stats[0],
        inactive: stats[1],
        total: stats[2]
      }
    });

  } catch (error) {
    console.error('Newsletter admin error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch newsletter data' },
      { status: 500 }
    );
  }
}

// DELETE - Remove a subscription (admin only)
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const id = searchParams.get('id');
    const email = searchParams.get('email');

    if (!id && !email) {
      return NextResponse.json(
        { error: 'Either id or email parameter is required' },
        { status: 400 }
      );
    }

    let whereClause;
    if (id) {
      whereClause = { id };
    } else if (email) {
      whereClause = { email };
    } else {
      return NextResponse.json(
        { error: 'Email is required when id is not provided' },
        { status: 400 }
      );
    }

    const deletedSubscription = await prisma.newsletterSubscription.delete({
      where: whereClause
    });

    return NextResponse.json({
      message: 'Newsletter subscription deleted successfully',
      subscription: {
        id: deletedSubscription.id,
        email: deletedSubscription.email
      }
    });

  } catch (error) {
    console.error('Newsletter delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete newsletter subscription' },
      { status: 500 }
    );
  }
}
