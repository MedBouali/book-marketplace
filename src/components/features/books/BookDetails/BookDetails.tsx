import { Book } from '@/types/book';
import { BookCover } from './BookCover';
import { BookMetadata } from './BookMetadata';
import { BookActions } from './BookActions';
import { BookDescription } from './BookDescription';
import { BookCategories } from './BookCategories';

interface BookDetailsProps {
  book: Book;
}

export function BookDetails({ book }: BookDetailsProps) {
  return (
    <article className="grid gap-8 sm:grid-cols-[280px_minmax(0,1fr)]">
      <BookCover book={book} />

      <div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{book.title}</h1>

        {book.authors.length > 0 && (
          <p className="mt-2 text-gray-600">
            by <span className="font-medium text-emerald-900">{book.authors.join(', ')}</span>
          </p>
        )}

        <BookMetadata book={book} />
        <BookActions />
      </div>

      <BookDescription description={book.description} />
      <BookCategories categories={book.categories} />
    </article>
  );
}
