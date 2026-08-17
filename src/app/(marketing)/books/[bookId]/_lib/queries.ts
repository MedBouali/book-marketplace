import { notFound } from 'next/navigation';
import { getBookById } from '@/lib/api/google-books/queries';
import { getListingsByBookId } from '@/lib/api/mock-api/listings';
import { getUserById } from '@/lib/api/mock-api/users';
import type { ListingWithSeller } from '@/types/marketplace';

export async function getBookPageData(bookId: string) {
  const [bookResult, listingsResult] = await Promise.allSettled([
    getBookById(bookId),
    getListingsByBookId(bookId),
  ]);

  if (bookResult.status === 'rejected') {
    notFound();
  }

  const book = bookResult.value;

  const listings = listingsResult.status === 'fulfilled' ? listingsResult.value : [];

  const sellerIds = [...new Set(listings.map((listing) => listing.sellerId))];

  const sellers = await Promise.all(sellerIds.map((sellerId) => getUserById(sellerId)));

  const sellersById = new Map(sellers.map((seller) => [seller.id, seller]));

  const listingsWithSellers: ListingWithSeller[] = listings.map((listing) => ({
    ...listing,
    sellerName: sellersById.get(listing.sellerId)?.name ?? 'Unknown seller',
  }));

  return {
    book,
    listings: listingsWithSellers,
  };
}
