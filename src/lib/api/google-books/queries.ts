import type { Book } from '@/types/book';
import { googleBooksFetch } from './client';
import { transformGoogleBook } from './transformers';

interface GoogleBooksVolumeInfo {
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
    small?: string;
    medium?: string;
    large?: string;
    extraLarge?: string;
  };
  language?: string;
}

interface GoogleBooksVolume {
  id: string;
  volumeInfo: GoogleBooksVolumeInfo;
}

interface GoogleBooksVolumesResponse {
  totalItems: number;
  items?: GoogleBooksVolume[];
}

export async function searchBooks(query: string): Promise<{
  books: Book[];
  totalItems: number;
}> {
  const params = new URLSearchParams({
    q: query,
    maxResults: '20',
    printType: 'books',
  });

  const data = await googleBooksFetch<GoogleBooksVolumesResponse>(`/volumes?${params.toString()}`);

  return {
    books: (data.items ?? []).map(transformGoogleBook),
    totalItems: data.totalItems,
  };
}

export async function getBookById(bookId: string): Promise<Book> {
  const data = await googleBooksFetch<GoogleBooksVolume>(`/volumes/${encodeURIComponent(bookId)}`);

  return transformGoogleBook(data);
}
