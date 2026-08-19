import { User } from '@/types/user';
import { MockApiError, mockApiFetch } from './client';

export async function getUserById(userId: string): Promise<User> {
  return mockApiFetch<User>(`/users/${encodeURIComponent(userId)}`);
}

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const users = await mockApiFetch<User[]>('/users', {
      params: {
        email,
      },
    });

    return users[0] ?? null;
  } catch (error) {
    if (error instanceof MockApiError && error.status === 404) {
      return null;
    }

    throw error;
  }
}

export async function createUser(user: Omit<User, 'id'>): Promise<User> {
  return mockApiFetch<User>('/users', {
    method: 'POST',
    body: JSON.stringify(user),
  });
}
