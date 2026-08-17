import { Listing } from '@/types/listing';
import { mockApiFetch } from './client';

export async function getListingById(listingId: string): Promise<Listing> {
  return mockApiFetch<Listing>(`/listings/${encodeURIComponent(listingId)}`);
}

export async function getListingsByBookId(bookId: string): Promise<Listing[]> {
  return mockApiFetch<Listing[]>('/listings', {
    params: {
      bookId,
      available: true,
    },
  });
}

export async function getListingsBySellerId(sellerId: string): Promise<Listing[]> {
  return mockApiFetch<Listing[]>('/listings', {
    params: {
      sellerId,
    },
  });
}

export async function createListings(listing: Omit<Listing, 'id'>): Promise<Listing> {
  return mockApiFetch<Listing>('/listings', {
    method: 'POST',
    body: JSON.stringify(listing),
  });
}

export async function updateListing(listingId: string, data: Partial<Listing>): Promise<Listing> {
  return mockApiFetch<Listing>(`/listings/${encodeURIComponent(listingId)}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function deleteListing(listingId: string): Promise<void> {
  await mockApiFetch(`/listings/${encodeURIComponent(listingId)}`, {
    method: 'DELETE',
  });
}
