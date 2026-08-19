import { LoginForm } from '@/components/features/auth/LoginForm/LoginForm';

export const metadata = {
  title: 'Login',
};

export default function LoginPage() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Book Marketplace</h1>

          <p className="mt-2 text-gray-600">Sign in to manage your books and listings.</p>
        </div>

        <LoginForm />
      </div>
    </main>
  );
}
