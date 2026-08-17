import { Listing } from './listing';

export interface ListingWithSeller extends Listing {
  sellerName: string;
}
