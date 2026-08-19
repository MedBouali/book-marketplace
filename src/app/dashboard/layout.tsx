import { DashboardNav } from '@/components/features/dashboard/DashboardNav/DashboardNav';
import { requireAuth } from '@/lib/auth/require-auth';

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await requireAuth();

  return (
    <>
      <DashboardNav />
      {children}
    </>
  );
}
