import { Listing } from '@/types/listing';
import { ListingCard } from '../ListingCard/ListingCard';

interface ListingGridProps {
  listings: Listing[];
}

export function ListingGrid({ listings }: ListingGridProps) {
  return (
    <div className="grid gap-0 md:grid-cols-3">
      {listings.map((listing, index) => (
        <div
          key={listing.id}
          className={`
                        p-4
                        ${index % 3 !== 2 ? 'md:border-r' : ''}
                        border-gray-300
                    `}
        >
          <ListingCard listing={listing} />
        </div>
      ))}
    </div>
  );
}
