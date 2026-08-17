export type ListingType = 'sale' | 'rent';

export type BookCondition = 'new' | 'good' | 'fair';

export interface Listing {
  id: string;
  bookId: string;
  sellerId: string;
  type: ListingType;
  price?: number;
  rentalPrice?: number;
  condition: BookCondition;
  description: string;
  available: boolean;
  createdAt: string;
}
