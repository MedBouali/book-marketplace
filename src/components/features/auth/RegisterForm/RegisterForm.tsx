'use client';

import { Button } from '@/components/ui/Button/Button';
import { FormField } from '@/components/ui/FormField/FormField';
import { Input } from '@/components/ui/Input/Input';
import { registerSchema, type RegisterInput } from '@/lib/validations/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

interface RegistrationErrorResponse {
  message: string;
  field?: keyof RegisterInput;
  errors?: Partial<Record<keyof RegisterInput, string[] | undefined>>;
}

export function RegisterForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(data: RegisterInput) {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = (await response.json()) as RegistrationErrorResponse;

    if (!response.ok) {
      if (result.field) {
        setError(result.field, {
          type: 'server',
          message: result.message,
        });
      }

      if (result.errors) {
        Object.entries(result.errors).forEach(([field, messages]) => {
          const message = messages?.[0];

          if (message) {
            setError(field as keyof RegisterInput, {
              type: 'server',
              message,
            });
          }
        });
      }

      if (!result.field && !result.errors) {
        setError('root.serverError', {
          type: 'server',
          message: result.message,
        });
      }

      return;
    }

    router.push('/login?registered=true');
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5 bg-white p-6">
      <div>
        <FormField label="Name" htmlFor="name">
          <Input
            id="name"
            type="text"
            autoComplete="name"
            {...register('name')}
            required
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
        </FormField>

        {errors.name && (
          <p id="name-error" className="mt-1 text-sm text-red-600">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <FormField label="Email" htmlFor="email">
          <Input
            id="email"
            type="email"
            autoComplete="email"
            {...register('email')}
            required
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
        </FormField>

        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-red-600">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <FormField label="Password" htmlFor="password">
          <Input
            id="password"
            type="password"
            autoComplete="new-password"
            {...register('password')}
            required
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? 'password-error' : undefined}
          />
        </FormField>

        {errors.password && (
          <p id="password-error" className="mt-1 text-sm text-red-600">
            {errors.password.message}
          </p>
        )}
      </div>

      <div>
        <FormField label="Confirm Password" htmlFor="confirmPassword">
          <Input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            {...register('confirmPassword')}
            required
            aria-invalid={!!errors.confirmPassword}
            aria-describedby={errors.confirmPassword ? 'confirm-password-error' : undefined}
          />
        </FormField>

        {errors.confirmPassword && (
          <p id="confirm-password-error" className="mt-1 text-sm text-red-600">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {errors.root?.serverError && (
        <p role="alert" className="text-sm text-red-600">
          {errors.root.serverError.message}
        </p>
      )}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Creating account...' : 'Create account'}
      </Button>

      <p className="text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link href="/login" className="font-medium text-emerald-900 hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}
