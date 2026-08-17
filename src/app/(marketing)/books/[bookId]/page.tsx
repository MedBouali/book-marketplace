import { Metadata } from 'next';
import { BookDetails } from '@/components/features/books/BookDetails/BookDetails';
import { getBookById } from '@/lib/api/google-books/queries';
import { siteConfig } from '@/lib/constants/site';
import { ListingGrid } from '@/components/features/marketplace/ListingGrid/ListingGrid';
import { getBookPageData } from './_lib/queries';

interface BookPageProps {
  params: Promise<{
    bookId: string;
  }>;
}

export async function generateMetadata({ params }: BookPageProps): Promise<Metadata> {
  const { bookId } = await params;

  try {
    const book = await getBookById(bookId);

    return {
      title: book.title,
      description:
        book.description?.replace(/<[^>]*>/g, '').slice(0, 160) ??
        `Discover ${book.title} on ${siteConfig.name}.`,
      openGraph: {
        title: book.title,
        description:
          book.description?.replace(/<[^>]*>/g, '').slice(0, 160) ??
          `Discover ${book.title} on ${siteConfig.name}.`,
        type: 'book',
        ...(book.thumbnail && {
          images: [
            {
              url: book.thumbnail,
              alt: `Cover of ${book.title}`,
            },
          ],
        }),
      },
    };
  } catch {
    return {
      title: 'Book not found',
    };
  }
}

export default async function BookPage({ params }: BookPageProps) {
  const { bookId } = await params;
  const { book, listings } = await getBookPageData(bookId);

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <BookDetails book={book} />

      <section className="mt-8">
        <p className="mb-4 text-lg font-semibold text-emerald-900 capitalize">
          Buy or rent this book
        </p>

        <p className="mt-2 text-sm">Choose from available marketplace listings.</p>

        <div className="mt-6">
          {listings.length === 0 ? (
            <div className="p-10 text-center text-emerald-900">
              <h3 className="font-semibold">No listings available</h3>

              <p className="mt-2 text-sm text-gray-600">
                There are currently no listings for this book.
              </p>
            </div>
          ) : (
            <ListingGrid listings={listings} />
          )}
        </div>
      </section>
    </main>
  );
}
