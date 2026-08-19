import { getListingsBySellerId } from '@/lib/api/mock-api/listings';
import { requireAuth } from '@/lib/auth/require-auth';
import { EmptyState } from '@/components/ui/EmptyState/EmptyState';

export const metadata = {
  title: 'My Listings',
};

export default async function MyListingsPage() {
  const session = await requireAuth();

  const listings = await getListingsBySellerId(session.user.id);

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Listings</h1>

          <p className="mt-2 text-gray-600">Manage the books you are selling or renting.</p>
        </div>
      </div>

      {listings.length === 0 ? (
        <EmptyState
          title="You don't have any listings yet."
          description="Create your first listing to start selling or renting books."
        />
      ) : (
        <div className="mt-8">
          {/* Listing management UI */}
          <p>test</p>
        </div>
      )}
    </main>
  );
}
