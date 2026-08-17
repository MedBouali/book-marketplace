import { ListingCard } from '../ListingCard/ListingCard';
import { ListingWithSeller } from '@/types/marketplace';

interface ListingGridProps {
  listings: ListingWithSeller[];
}

export function ListingGrid({ listings }: ListingGridProps) {
  return (
    <div className="grid md:grid-cols-3">
      {listings.map((listing, index) => (
        <div
          key={listing.id}
          className={`
                        p-2
                        border-gray-300
                        ${index > 0 ? 'border-t md:border-t-0' : ''}
                        ${index % 3 !== 0 ? 'md:border-l' : ''}
                    `}
        >
          <ListingCard listing={listing} />
        </div>
      ))}
    </div>
  );
}
