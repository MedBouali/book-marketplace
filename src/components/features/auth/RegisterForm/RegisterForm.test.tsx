import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RegisterForm } from './RegisterForm';

const pushMock = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

describe('RegisterForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all registration fields', () => {
    render(<RegisterForm />);

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
  });

  it('shows validation errors for invalid data', async () => {
    const user = userEvent.setup();

    render(<RegisterForm />);

    await user.click(
      screen.getByRole('button', {
        name: 'Create account',
      }),
    );

    expect(await screen.findByText('Name must be at least 2 characters.')).toBeInTheDocument();

    expect(await screen.findByText('Please enter a valid email address.')).toBeInTheDocument();
  });

  it('shows password mismatch validation', async () => {
    const user = userEvent.setup();

    render(<RegisterForm />);

    await user.type(screen.getByLabelText('Name'), 'Med B');

    await user.type(screen.getByLabelText('Email'), 'med@example.com');

    await user.type(screen.getByLabelText('Password'), 'password123');

    await user.type(screen.getByLabelText('Confirm Password'), 'different123');

    await user.click(
      screen.getByRole('button', {
        name: 'Create account',
      }),
    );

    expect(await screen.findByText('Passwords do not match.')).toBeInTheDocument();
  });

  it('submits valid registration data', async () => {
    const user = userEvent.setup();

    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(
        JSON.stringify({
          user: {
            id: 'user-1',
            name: 'Med B',
            email: 'med@example.com',
          },
        }),
        {
          status: 201,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      ),
    );

    render(<RegisterForm />);

    await user.type(screen.getByLabelText('Name'), 'Med B');

    await user.type(screen.getByLabelText('Email'), 'med@example.com');

    await user.type(screen.getByLabelText('Password'), 'password123');

    await user.type(screen.getByLabelText('Confirm Password'), 'password123');

    await user.click(
      screen.getByRole('button', {
        name: 'Create account',
      }),
    );

    expect(fetchMock).toHaveBeenCalledWith(
      '/api/auth/register',
      expect.objectContaining({
        method: 'POST',
      }),
    );

    expect(pushMock).toHaveBeenCalledWith('/login?registered=true');

    fetchMock.mockRestore();
  });
});
