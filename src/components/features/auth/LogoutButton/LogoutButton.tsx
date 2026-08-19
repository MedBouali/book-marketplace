'use client';

import { Button } from '@/components/ui/Button/Button';
import { signOut } from 'next-auth/react';

export function LogoutButton() {
  return (
    <Button type="button" variant="outline" onClick={() => signOut({ callbackUrl: '/' })}>
      Sign out
    </Button>
  );
}
