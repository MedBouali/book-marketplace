import { render, screen } from '@testing-library/react';
import { LogoutButton } from './LogoutButton';

vi.mock('next-auth/react', () => ({
  signOut: vi.fn(),
}));

describe('LogoutButton', () => {
  it('renders the sign out button', () => {
    render(<LogoutButton />);

    expect(screen.getByRole('button', { name: 'Sign out' })).toBeInTheDocument();
  });
});
