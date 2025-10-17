import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Get user comments
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

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        comments: true,
        createdAt: true,
        lastLogin: true
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        comments: user.comments || '',
        createdAt: user.createdAt,
        lastLogin: user.lastLogin
      }
    });

  } catch (error) {
    console.error('Get user comments error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user comments' },
      { status: 500 }
    );
  }
}

// PUT - Update user comments
export async function PUT(req: Request) {
  try {
    const { userId, comments } = await req.json();

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

    // Update user comments
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        comments: comments || null
      },
      select: {
        id: true,
        name: true,
        email: true,
        comments: true,
      }
    });

    return NextResponse.json({
      success: true,
      message: 'User comments updated successfully',
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        comments: updatedUser.comments,
      }
    });

  } catch (error) {
    console.error('Update user comments error:', error);
    return NextResponse.json(
      { error: 'Failed to update user comments' },
      { status: 500 }
    );
  }
}

// POST - Add comment to user (append to existing comments)
export async function POST(req: Request) {
  try {
    const { userId, newComment, adminName } = await req.json();

    if (!userId || !newComment) {
      return NextResponse.json(
        { error: 'User ID and comment are required' },
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

    // Create timestamp for the comment
    const timestamp = new Date().toLocaleString();
    const commentEntry = `[${timestamp}] ${adminName ? `(${adminName}) ` : ''}${newComment}`;
    
    // Append to existing comments or create new
    const updatedComments = existingUser.comments 
      ? `${existingUser.comments}\n${commentEntry}`
      : commentEntry;

    // Update user comments
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        comments: updatedComments
      },
      select: {
        id: true,
        name: true,
        email: true,
        comments: true,
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Comment added successfully',
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        comments: updatedUser.comments,
      }
    });

  } catch (error) {
    console.error('Add user comment error:', error);
    return NextResponse.json(
      { error: 'Failed to add user comment' },
      { status: 500 }
    );
  }
}
