import { Button } from '@/components/ui/Button/Button';

export function BookActions() {
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <Button variant="primary">Buy this book</Button>

      <Button variant="secondary">Rent this book</Button>
    </div>
  );
}
