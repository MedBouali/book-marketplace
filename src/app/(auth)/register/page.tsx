import { RegisterForm } from '@/components/features/auth/RegisterForm/RegisterForm';

export const metadata = {
  title: 'Create an account',
};

export default function RegisterPage() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Create your account</h1>

          <p className="mt-2 text-gray-600">Join Book Marketplace to buy, rent, and list books.</p>
        </div>

        <RegisterForm />
      </div>
    </main>
  );
}
