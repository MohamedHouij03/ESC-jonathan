import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function DELETE(req: Request) {
  try {
    const { userId, password } = await req.json();

    if (!userId || !password) {
      return NextResponse.json(
        { error: 'User ID and password are required' },
        { status: 400 }
      );
    }

    // Find user and verify password
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }

    // Delete user (cascade will handle related data)
    await prisma.user.delete({
      where: { id: userId }
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Account deleted successfully' 
    });

  } catch (error) {
    console.error('Delete account error:', error);
    return NextResponse.json(
      { error: 'Error deleting account' },
      { status: 500 }
    );
  }
}
