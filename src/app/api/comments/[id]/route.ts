import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// PUT /api/comments/[id] - Update a comment
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { content, userId } = await request.json();

    if (!content?.trim() || !userId) {
      return NextResponse.json(
        { error: 'content and userId are required' },
        { status: 400 }
      );
    }

    // Check if the comment exists and belongs to the user
    const existingComment = await prisma.lessonComment.findUnique({
      where: { id: params.id },
    });

    if (!existingComment) {
      return NextResponse.json(
        { error: 'Comment not found' },
        { status: 404 }
      );
    }

    if (existingComment.userId !== userId) {
      return NextResponse.json(
        { error: 'Unauthorized to edit this comment' },
        { status: 403 }
      );
    }

    const updatedComment = await prisma.lessonComment.update({
      where: { id: params.id },
      data: {
        content: content.trim(),
        isEdited: true,
        updatedAt: new Date(),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(updatedComment);
  } catch (error) {
    console.error('Error updating comment:', error);
    return NextResponse.json(
      { error: 'Failed to update comment' },
      { status: 500 }
    );
  }
}

// DELETE /api/comments/[id] - Delete a comment
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      );
    }

    // Check if the comment exists and belongs to the user
    const existingComment = await prisma.lessonComment.findUnique({
      where: { id: params.id },
    });

    if (!existingComment) {
      return NextResponse.json(
        { error: 'Comment not found' },
        { status: 404 }
      );
    }

    if (existingComment.userId !== userId) {
      return NextResponse.json(
        { error: 'Unauthorized to delete this comment' },
        { status: 403 }
      );
    }

    await prisma.lessonComment.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    return NextResponse.json(
      { error: 'Failed to delete comment' },
      { status: 500 }
    );
  }
}
