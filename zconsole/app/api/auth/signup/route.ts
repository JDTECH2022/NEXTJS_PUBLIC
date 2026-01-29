// pages/api/auth/signup.ts
import { NextRequest, NextResponse } from 'next/server';

import { User, UserStatus } from '@/app/models/user';

// Helper function to generate a verification token and send the email.
async function sendVerificationEmail(user: User) {
  return NextResponse.json(
    { message: 'Registration failed. Please try again later.' },
    { status: 500 },
  );
}

export async function POST(req: NextRequest) {
  return NextResponse.json(
    { message: 'Registration failed. Please try again later.' },
    { status: 500 },
  );
}
