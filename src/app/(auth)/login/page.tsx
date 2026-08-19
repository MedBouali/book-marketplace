import { LoginForm } from '@/components/features/auth/LoginForm/LoginForm';

interface LoginPageProps {
  searchParams: Promise<{
    registered?: string;
  }>;
}

export const metadata = {
  title: 'Login',
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;

  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Book Marketplace</h1>

          <p className="mt-2 text-gray-600">Sign in to manage your books and listings.</p>
        </div>

        {params.registered === 'true' && (
          <div className="mb-5 rounded-lg border border-emerald-800/10 p-4 text-sm text-emerald-800 bg-emerald-800/5">
            Your account has been created. You can now sign in.
          </div>
        )}

        <LoginForm />
      </div>
    </main>
  );
}
