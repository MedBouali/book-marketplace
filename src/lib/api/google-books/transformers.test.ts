import { transformGoogleBook } from './transformers';

describe('transformGoogleBook', () => {
  it('transforms a Google Books volume into a Book', () => {
    const googleBook = {
      id: 'abc123',
      volumeInfo: {
        title: 'The Great Gatsby',
        authors: ['F. Scott Fitzgerald'],
        publisher: 'Scribner',
        publishedDate: '1925',
        description: 'A classic novel.',
        industryIdentifiers: [
          {
            type: 'ISBN_10',
            identifier: '0743273567',
          },
          {
            type: 'ISBN_13',
            identifier: '9780743273565',
          },
        ],
        pageCount: 180,
        categories: ['Fiction'],
        imageLinks: {
          thumbnail: 'https://example.com/book.jpg',
        },
        language: 'en',
      },
    };

    expect(transformGoogleBook(googleBook)).toEqual({
      id: 'abc123',
      title: 'The Great Gatsby',
      authors: ['F. Scott Fitzgerald'],
      publisher: 'Scribner',
      publishedDate: '1925',
      description: 'A classic novel.',
      isbn10: '0743273567',
      isbn13: '9780743273565',
      pageCount: 180,
      categories: ['Fiction'],
      thumbnail: 'https://example.com/book.jpg',
      language: 'en',
    });
  });

  it('handles optional Google Books fields', () => {
    const googleBook = {
      id: 'abc123',
      volumeInfo: {
        title: 'Unknown Book',
      },
    };

    expect(transformGoogleBook(googleBook)).toEqual({
      id: 'abc123',
      title: 'Unknown Book',
      authors: [],
      publisher: undefined,
      publishedDate: undefined,
      description: undefined,
      isbn10: undefined,
      isbn13: undefined,
      pageCount: undefined,
      categories: [],
      thumbnail: undefined,
      language: undefined,
    });
  });
});
