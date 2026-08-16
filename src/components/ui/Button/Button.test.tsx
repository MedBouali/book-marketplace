import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders its children', () => {
    render(<Button>Buy this book</Button>);

    expect(screen.getByRole('button', { name: 'Buy this book' })).toBeInTheDocument();
  });

  it('uses the primary variant by default', () => {
    render(<Button>Buy</Button>);

    expect(screen.getByRole('button')).toHaveClass('bg-emerald-800');
  });

  it('supports the outline variant', () => {
    render(<Button variant="outline">Rent</Button>);

    expect(screen.getByRole('button')).toHaveClass('border');
  });

  it('forwards button attributes', () => {
    render(
      <Button type="submit" disabled>
        Submit
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Submit' });

    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toBeDisabled();
  });
});
