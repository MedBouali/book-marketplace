import BookGrid from '@/components/features/books/BookGrid/BookGrid';
import { searchBooks } from '@/lib/api/google-books/queries';

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q?.trim() ?? '';

  if (!query) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-12">
        <h1 className="text-3xl font-bold">Search books</h1>

        <p className="mt-4 text-gray-600">Search for a book by title, author, ISBN, or keyword.</p>
      </main>
    );
  }

  const { books, totalItems } = await searchBooks(query);

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Search results for &ldquo;{query}&rdquo;</h1>

        <p className="mt-2 text-sm text-gray-500">
          {totalItems} result{totalItems === 1 ? '' : 's'} found
        </p>
      </div>

      {books.length === 0 ? (
        <div className="rounded-xl border border-dashed p-12 text-center">
          <h2 className="text-lg font-semibold">No books found</h2>

          <p className="mt-2 text-gray-500">Try searching for a different title or author.</p>
        </div>
      ) : (
        <BookGrid books={books} />
      )}
    </main>
  );
}
