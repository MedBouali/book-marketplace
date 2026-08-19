import { registerSchema } from './auth';

describe('registerSchema', () => {
  const validInput = {
    name: 'Med B',
    email: 'med@example.com',
    password: 'password123',
    confirmPassword: 'password123',
  };

  it('accepts valid registration data', () => {
    const result = registerSchema.safeParse(validInput);

    expect(result.success).toBe(true);
  });

  it('normalizes the email', () => {
    const result = registerSchema.safeParse({
      ...validInput,
      email: ' MED@EXAMPLE.COM ',
    });

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.email).toBe('med@example.com');
    }
  });

  it('rejects an invalid email', () => {
    const result = registerSchema.safeParse({
      ...validInput,
      email: 'not-an-email',
    });

    expect(result.success).toBe(false);
  });

  it('rejects a short password', () => {
    const result = registerSchema.safeParse({
      ...validInput,
      password: '1234567',
      confirmPassword: '1234567',
    });

    expect(result.success).toBe(false);
  });

  it('rejects mismatched passwords', () => {
    const result = registerSchema.safeParse({
      ...validInput,
      confirmPassword: 'different123',
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.flatten().fieldErrors.confirmPassword).toContain(
        'Passwords do not match.',
      );
    }
  });

  it('rejects a name shorter than two characters', () => {
    const result = registerSchema.safeParse({
      ...validInput,
      name: 'J',
    });

    expect(result.success).toBe(false);
  });
});
