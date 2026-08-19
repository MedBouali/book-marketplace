import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { EmptyState } from './EmptyState';

describe('EmptyState', () => {
  it('renders title', () => {
    render(<EmptyState title="You don't have any listings yet." />);

    expect(
      screen.getByRole('heading', {
        name: "You don't have any listings yet.",
      }),
    ).toBeInTheDocument();
  });

  it('renders description', () => {
    render(
      <EmptyState
        title="You don't have any listings yet."
        description="Create your first listing to start selling or renting books."
      />,
    );

    expect(
      screen.getByText('Create your first listing to start selling or renting books.'),
    ).toBeInTheDocument();
  });

  it('does not render description when there is no description', () => {
    render(<EmptyState title="You don't have any listings yet." />);

    expect(
      screen.queryByText('Create your first listing to start selling or renting books.'),
    ).not.toBeInTheDocument();
  });

  it('renders action when provided', () => {
    render(
      <EmptyState
        title="You don't have any listings yet."
        action={<button>Create a listing</button>}
      />,
    );

    expect(
      screen.getByRole('button', {
        name: 'Create a listing',
      }),
    ).toBeInTheDocument();
  });

  it('does not render action when it is not provided', () => {
    render(<EmptyState title="You don't have any listings yet." />);

    expect(
      screen.queryByRole('button', {
        name: 'Create a listing',
      }),
    ).not.toBeInTheDocument();
  });
});
