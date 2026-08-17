import { User } from '@/types/user';
import { mockApiFetch } from './client';

export async function getUserById(userId: string): Promise<User> {
  return mockApiFetch<User>(`/users/${encodeURIComponent(userId)}`);
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const users = await mockApiFetch<User[]>('/users', {
    params: {
      email,
    },
  });

  return users[0] ?? null;
}

export async function createUser(user: Omit<User, 'id'>): Promise<User> {
  return mockApiFetch<User>('/users', {
    method: 'POST',
    body: JSON.stringify(user),
  });
}
