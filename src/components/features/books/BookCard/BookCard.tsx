import { Book } from '@/types/book';
import Image from 'next/image';
import Link from 'next/link';

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <article className="w-45 overflow-hidden bg-white">
      <Link href={`/books/${book.id}`} className="block">
        <div className="relative mx-auto aspect-2/3 bg-gray-100">
          {book.thumbnail ? (
            <Image
              src={book.thumbnail}
              alt={`cover of ${book.title}`}
              fill
              className="object-cover rounded-sm border border-gray-200"
              sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-gray-500">
              No cover
            </div>
          )}
        </div>

        <div className="pt-4">
          <h2 className="line-clamp-2 font-semibold text-sm">{book.title}</h2>

          {book.authors.length > 0 && (
            <p className="mt-1 line-clamp-1 text-sm text-gray-500">{book.authors.join(', ')}</p>
          )}
        </div>
      </Link>
    </article>
  );
}
