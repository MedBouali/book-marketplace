import { Book } from '@/types/book';
import Image from 'next/image';
import Link from 'next/link';

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <article className="w-45 overflow-hidden">
      <Link href={`/books/${book.id}`} className="block">
        <div className="rounded-md border border-emerald-800/10 bg-emerald-800/5 hover:bg-emerald-800/10 transition-all p-4">
          <div className="relative mx-auto aspect-2/3 w-24 overflow-hidden rounded-sm bg-gray-100 shadow-[0_4px_10px_rgba(0,0,0,0.18)]">
            {book.thumbnail ? (
              <Image
                src={book.thumbnail}
                alt={`cover of ${book.title}`}
                fill
                className="rounded-sm object-cover"
                quality={90}
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-gray-500">
                No cover
              </div>
            )}
          </div>
        </div>

        <div className="p-2 text-emerald-800">
          <h2 className="line-clamp-2 font-semibold text-xs">{book.title}</h2>

          {book.authors.length > 0 && (
            <p className="mt-1 line-clamp-1 text-xs text-gray-500">{book.authors.join(', ')}</p>
          )}
        </div>
      </Link>
    </article>
  );
}
