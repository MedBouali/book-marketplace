export const siteConfig = {
  name: 'Book Marketplace',
  description: 'Buy and rent books from a community of readers and book lovers.',
  url: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
} as const;
