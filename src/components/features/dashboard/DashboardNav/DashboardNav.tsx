import Link from 'next/link';

const navigation = [
  {
    label: 'Overview',
    href: '/dashboard',
  },
  {
    label: 'My Listings',
    href: '/dashboard/listings',
  },
];

export function DashboardNav() {
  return (
    <nav className="border-b border-gray-200">
      <div className="mx-auto flex max-w-7xl px-6 gap-6">
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="py-3 px-1 text-sm text-gray-600 border-b-2 border-transparent hover:border-emerald-900 hover:text-emerald-900"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
