import { hashPassword, verifyPassword } from './password';

describe('password utilities', () => {
  it('hashes a password', async () => {
    const password = 'password123';

    const hash = await hashPassword(password);

    expect(hash).not.toBe(password);
    expect(hash).toMatch(/^\$2[aby]\$/);
  });

  it('verifies the correct password', async () => {
    const password = 'password123';
    const hash = await hashPassword(password);

    await expect(verifyPassword(password, hash)).resolves.toBe(true);
  });

  it('rejects an incorrect password', async () => {
    const hash = await hashPassword('password123');

    await expect(verifyPassword('wrong-password', hash)).resolves.toBe(false);
  });
});
