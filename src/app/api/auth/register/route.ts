import { MockApiError } from '@/lib/api/mock-api/client';
import { createUser, getUserByEmail } from '@/lib/api/mock-api/users';
import { hashPassword } from '@/lib/auth/password';
import { registerSchema } from '@/lib/validations/auth';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

    const result = registerSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          message: 'Please correct the highlighted fields.',
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { name, email, password } = result.data;

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return NextResponse.json(
        {
          message: 'An account with this email already exists.',
          field: 'email',
        },
        { status: 409 },
      );
    }

    const passwordHash = await hashPassword(password);

    const user = await createUser({
      name,
      email,
      passwordHash,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof MockApiError && error.status === 409) {
      return NextResponse.json(
        {
          message: 'An account with this email already exists.',
          field: 'email',
        },
        { status: 409 },
      );
    }

    console.error('Registration failed:', error);

    return NextResponse.json(
      {
        message: 'Something went wrong. Please try again.',
      },
      { status: 500 },
    );
  }
}
