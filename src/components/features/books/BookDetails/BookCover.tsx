import Image from 'next/image';
import { Book } from '@/types/book';

interface BookCoverProps {
  book: Book;
}

export function BookCover({ book }: BookCoverProps) {
  return (
    <div className="flex items-start">
      <div className="flex h-full w-full items-center justify-center rounded-md border border-emerald-800/10 bg-emerald-800/5 p-10">
        <div className="relative h-fit w-32 overflow-hidden rounded-sm bg-gray-100 shadow-[0_4px_10px_rgba(0,0,0,0.18)] aspect-[2/3]">
          {book.thumbnail ? (
            <Image
              src={book.thumbnail}
              alt={`Cover of ${book.title}`}
              fill
              priority
              className="rounded-sm object-cover"
              sizes="128px"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-gray-500">
              No cover available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
