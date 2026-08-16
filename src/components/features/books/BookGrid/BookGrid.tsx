import { Book } from '@/types/book';
import BookCard from '../BookCard/BookCard';

interface BookGridProps {
  books: Book[];
}

export default function BookGrid({ books }: BookGridProps) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,180px)] justify-center gap-3 gap-y-6">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}
