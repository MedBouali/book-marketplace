import type { Book } from '@/types/book';

interface GoogleBooksVolume {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    publisher?: string;
    publishedDate?: string;
    description?: string;
    industryIdentifiers?: {
      type: string;
      identifier: string;
    }[];
    pageCount?: number;
    categories?: string[];
    imageLinks?: {
      thumbnail?: string;
      smallThumbnail?: string;
    };
    language?: string;
  };
}

export function transformGoogleBook(volume: GoogleBooksVolume): Book {
  const isbn10 = volume.volumeInfo.industryIdentifiers?.find(
    (identifier) => identifier.type === 'ISBN_10',
  )?.identifier;

  const isbn13 = volume.volumeInfo.industryIdentifiers?.find(
    (identifier) => identifier.type === 'ISBN_13',
  )?.identifier;

  return {
    id: volume.id,
    title: volume.volumeInfo.title,
    authors: volume.volumeInfo.authors ?? [],
    description: volume.volumeInfo.description,
    thumbnail: volume.volumeInfo.imageLinks?.thumbnail,
    publishedDate: volume.volumeInfo.publishedDate,
    publisher: volume.volumeInfo.publisher,
    isbn10,
    isbn13,
    pageCount: volume.volumeInfo.pageCount,
    categories: volume.volumeInfo.categories ?? [],
    language: volume.volumeInfo.language,
  };
}
