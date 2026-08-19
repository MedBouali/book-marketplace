import { POST } from './route';
import { createUser, getUserByEmail } from '@/lib/api/mock-api/users';

vi.mock('@/lib/api/mock-api/users', () => ({
  createUser: vi.fn(),
  getUserByEmail: vi.fn(),
}));

vi.mock('@/lib/api/mock-api/client', () => ({
  mockApiRequest: vi.fn(),
}));

vi.mock('@/lib/auth/password', () => ({
  hashPassword: vi.fn().mockResolvedValue('hashed-password'),
}));

describe('POST /api/auth/register', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('rejects a duplicate email', async () => {
    vi.mocked(getUserByEmail).mockResolvedValue({
      id: 'user-1',
      name: 'Existing User',
      email: 'med@example.com',
      passwordHash: 'existing-hash',
      createdAt: '2026-08-19T10:00:00.000Z',
    });

    const request = new Request('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Med B',
        email: 'med@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      }),
    });

    const response = await POST(request);

    expect(response.status).toBe(409);

    expect(createUser).not.toHaveBeenCalled();

    await expect(response.json()).resolves.toEqual({
      message: 'An account with this email already exists.',
      field: 'email',
    });
  });

  it('creates a user with a hashed password', async () => {
    vi.mocked(getUserByEmail).mockResolvedValue(null);

    vi.mocked(createUser).mockResolvedValue({
      id: 'user-1',
      name: 'Med B',
      email: 'med@example.com',
      passwordHash: 'hashed-password',
      createdAt: '2026-08-19T10:00:00.000Z',
    });

    const request = new Request('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Med B',
        email: 'med@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      }),
    });

    const response = await POST(request);

    expect(response.status).toBe(201);

    expect(createUser).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Med B',
        email: 'med@example.com',
        passwordHash: 'hashed-password',
      }),
    );

    const body = await response.json();

    expect(body.user).toEqual({
      id: 'user-1',
      name: 'Med B',
      email: 'med@example.com',
      avatar: undefined,
    });
  });
});
