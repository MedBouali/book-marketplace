import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Input } from './Input';

describe('Input', () => {
  it('renders correctly', () => {
    render(<Input aria-label="Email" />);

    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Input aria-label="Email" className="custom-class" />);

    expect(screen.getByLabelText('Email')).toHaveClass('custom-class');
  });

  it('applies error styles when error is true', () => {
    render(<Input aria-label="Email" error />);

    expect(screen.getByLabelText('Email')).toHaveClass('border-red-500');
  });

  it('passes input props correctly', () => {
    render(
      <Input
        aria-label="Email"
        id="email"
        name="email"
        type="email"
        placeholder="Enter your email"
      />,
    );

    const input = screen.getByLabelText('Email');

    expect(input).toHaveAttribute('id', 'email');
    expect(input).toHaveAttribute('name', 'email');
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveAttribute('placeholder', 'Enter your email');
  });
});
