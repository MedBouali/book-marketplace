import { Button } from '@/components/ui/Button/Button';
import { ListingWithSeller } from '@/types/marketplace';

interface ListingCardProps {
  listing: ListingWithSeller;
}

export function ListingCard({ listing }: ListingCardProps) {
  return (
    <article className="rounded-md p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="text-xs font-medium uppercase text-gray-500">{listing.type}</span>

          <h3 className="mt-1 text-lg font-semibold text-emerald-900">
            {listing.type === 'sale'
              ? `$${listing.price?.toFixed(2)}`
              : `$${listing.rentalPrice?.toFixed(2)} / month`}
          </h3>
        </div>

        <span className="rounded-md bg-emerald-500/10 py-1 px-3 text-emerald-900 text-xs capitalize">
          {listing.condition}
        </span>
      </div>

      <p className="mt-4 text-sm text-gray-600">{listing.description}</p>

      <p className="mt-4 text-sm">
        Listed by <span className="text-emerald-900">{listing.sellerName}</span>
      </p>

      <Button className="mt-5" variant={listing.type === 'sale' ? 'primary' : 'secondary'}>
        {listing.type === 'sale' ? 'Buy this book' : 'Rent this book'}
      </Button>
    </article>
  );
}
