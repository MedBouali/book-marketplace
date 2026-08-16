import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BookDetails } from '@/components/features/books/BookDetails/BookDetails';
import { getBookById } from '@/lib/api/google-books/queries';
import { siteConfig } from '@/lib/constants/site';

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

async function getBookOrNotFound(bookId: string) {
  try {
    return await getBookById(bookId);
  } catch {
    notFound();
  }
}

export default async function BookPage({ params }: BookPageProps) {
  const { bookId } = await params;
  const book = await getBookOrNotFound(bookId);

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <BookDetails book={book} />
    </main>
  );
}
