import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';
import { prisma } from '@/lib/prisma';

// GET - Get all users with their comments (admin only)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const search = searchParams.get('search') || '';
    const hasComments = searchParams.get('hasComments'); // 'true', 'false', or 'all'
    
    const skip = (page - 1) * limit;

    // Build where clause
    let whereClause: any = {};
    
    if (search) {
      whereClause.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { studioName: { contains: search, mode: 'insensitive' } }
      ];
    }

    if (hasComments === 'true') {
      whereClause.comments = { not: null };
    } else if (hasComments === 'false') {
      whereClause.comments = null;
    }

    // Get users with pagination
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          email: true,
          studioName: true,
          comments: true,
          createdAt: true,
          lastLogin: true,
          _count: {
            select: {
              courseProgress: true,
              loginHistory: true
            }
          }
        }
      }),
      prisma.user.count({ where: whereClause })
    ]);

    // Get statistics
    const stats = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { comments: { not: null } } }),
      prisma.user.count({ where: { comments: null } })
    ]);

    return NextResponse.json({
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      stats: {
        totalUsers: stats[0],
        usersWithComments: stats[1],
        usersWithoutComments: stats[2]
      }
    });

  } catch (error) {
    console.error('Get user comments admin error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user comments' },
      { status: 500 }
    );
  }
}

// DELETE - Clear all comments for a user (admin only)
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Clear user comments
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        comments: null
      },
      select: {
        id: true,
        name: true,
        email: true,
        comments: true
      }
    });

    return NextResponse.json({
      success: true,
      message: 'User comments cleared successfully',
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        comments: updatedUser.comments
      }
    });

  } catch (error) {
    console.error('Clear user comments error:', error);
    return NextResponse.json(
      { error: 'Failed to clear user comments' },
      { status: 500 }
    );
  }
}
