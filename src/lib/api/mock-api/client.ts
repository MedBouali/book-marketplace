const MOCK_API_URL = process.env.MOCK_API_URL;

if (!MOCK_API_URL) {
  throw new Error('MOCK_API_URL is not configured');
}

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

export async function mockApiFetch<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { params, ...fetchOptions } = options;

  const url = new URL(`${MOCK_API_URL}${path}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    });
  }

  const response = await fetch(url, {
    ...fetchOptions,
    headers: {
      'Content-Type': 'application/json',
      ...fetchOptions.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Mock API request failed: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}
