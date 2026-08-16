import { Book } from '@/types/book';

interface BookMetadataProps {
  book: Book;
}

export function BookMetadata({ book }: BookMetadataProps) {
  return (
    <div className="mt-5 flex gap-20 text-sm">
      <div className="flex flex-col gap-2">
        {book.publisher && <MetadataItem label="Publisher" value={book.publisher} />}

        {book.publishedDate && (
          <MetadataItem
            label="Publish Date"
            value={new Date(book.publishedDate).toLocaleDateString('en-US')}
          />
        )}

        {book.isbn13 && <MetadataItem label="ISBN-13" value={book.isbn13} />}
      </div>

      <div className="flex flex-col gap-2">
        {book.isbn10 && <MetadataItem label="ISBN-10" value={book.isbn10} />}

        {book.pageCount && <MetadataItem label="Pages" value={book.pageCount} />}

        {book.language && <MetadataItem label="Language" value={book.language} />}
      </div>
    </div>
  );
}

interface MetadataItemProps {
  label: string;
  value: string | number;
}

function MetadataItem({ label, value }: MetadataItemProps) {
  return (
    <div className="text-xs">
      <div className="font-medium text-emerald-900">{label}</div>
      {value}
    </div>
  );
}
