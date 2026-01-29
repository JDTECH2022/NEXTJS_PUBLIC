// /api/auth/verify-reset-token.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  return NextResponse.json(
    { message: 'Token verification failed.' },
    { status: 500 },
  );
}
