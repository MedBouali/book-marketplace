const GOOGLE_BOOKS_API_URL = 'https://www.googleapis.com/books/v1';

export async function googleBooksFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;

  const url = new URL(`${GOOGLE_BOOKS_API_URL}${path}`);

  if (apiKey) {
    url.searchParams.set('key', apiKey);
  }

  const response = await fetch(url, {
    ...options,
    next: {
      revalidate: 3600,
      ...options?.next,
    },
  });

  if (!response.ok) {
    throw new Error(`Google Books API request failed: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}
