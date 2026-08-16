import { cn } from './cn';

describe('cn', () => {
  it('combines class names', () => {
    expect(cn('text-sm', 'font-bold')).toBe('text-sm font-bold');
  });

  it('handles conditional classes', () => {
    expect(cn('text-sm', false && 'hidden', 'block')).toBe('text-sm block');
  });

  it('merges conflicting Tailwind classes', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
  });
});
