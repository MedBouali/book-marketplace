import { render, screen } from '@testing-library/react';
import { ListingCard } from './ListingCard';

describe('ListingCard', () => {
  it('renders a sale listing', () => {
    render(
      <ListingCard
        listing={{
          id: 'listing-1',
          bookId: 'book-1',
          sellerId: 'user-1',
          type: 'sale',
          price: 12,
          condition: 'good',
          description: 'Very good condition.',
          available: true,
          createdAt: '2026-08-16T10:00:00.000Z',
          sellerName: 'user-name-1',
        }}
      />,
    );

    expect(screen.getByText('sale')).toBeInTheDocument();
    expect(screen.getByText('$12.00')).toBeInTheDocument();
    expect(screen.getByText('Buy this book')).toBeInTheDocument();
    expect(screen.getByText('user-name-1')).toBeInTheDocument();
  });

  it('renders a rental listing', () => {
    render(
      <ListingCard
        listing={{
          id: 'listing-2',
          bookId: 'book-1',
          sellerId: 'user-2',
          type: 'rent',
          rentalPrice: 4,
          condition: 'fair',
          description: 'Good condition.',
          available: true,
          createdAt: '2026-08-16T10:00:00.000Z',
          sellerName: 'user-name-2',
        }}
      />,
    );

    expect(screen.getByText('rent')).toBeInTheDocument();
    expect(screen.getByText('$4.00 / month')).toBeInTheDocument();
    expect(screen.getByText('Rent this book')).toBeInTheDocument();
    expect(screen.getByText('user-name-2')).toBeInTheDocument();
  });
});
