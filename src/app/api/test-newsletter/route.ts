import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'success',
    message: 'Newsletter test endpoint is working'
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    return NextResponse.json({
      status: 'success',
      message: 'Newsletter test data received',
      data: body
    });
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'error',
        message: 'Invalid request data'
      },
      { status: 400 }
    );
  }
}
