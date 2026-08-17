import { Book } from '@/types/book';

interface BookMetadataProps {
  book: Book;
}

export function BookMetadata({ book }: BookMetadataProps) {
  return (
    <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-xs">
      {book.publisher && <MetadataItem label="Publisher" value={book.publisher} />}

      {book.publishedDate && (
        <MetadataItem
          label="Published"
          value={new Date(book.publishedDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        />
      )}

      {book.pageCount && <MetadataItem label="Pages" value={book.pageCount} />}

      {book.language && <MetadataItem label="Language" value={book.language} />}

      {book.isbn13 && <MetadataItem label="ISBN-13" value={book.isbn13} />}

      {book.isbn10 && <MetadataItem label="ISBN-10" value={book.isbn10} />}

      {(book.categories?.length ?? 0) > 0 && (
        <>
          <dt className="font-medium text-emerald-900">Categories</dt>
          <dd className="text-zinc-950">
            {book.categories?.map((category, index) => (
              <span key={category}>
                {index > 0 && <span className="mx-2 text-emerald-900">•</span>}
                {category}
              </span>
            ))}
          </dd>
        </>
      )}
    </dl>
  );
}

interface MetadataItemProps {
  label: string;
  value: string | number;
}

function MetadataItem({ label, value }: MetadataItemProps) {
  return (
    <>
      <dt className="font-medium text-emerald-900">{label}</dt>
      <dd className="text-zinc-950">{value}</dd>
    </>
  );
}
