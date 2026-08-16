interface BookCategoriesProps {
  categories?: string[];
}

export function BookCategories({ categories }: BookCategoriesProps) {
  if (!categories?.length) {
    return null;
  }

  return (
    <div className="sm:col-span-2">
      <p className="mb-4 text-lg font-semibold text-emerald-900">Categories</p>

      <p className="text-sm text-zinc-950">
        {categories.map((category, index) => (
          <span key={category}>
            {index > 0 && <span className="mx-3 font-semibold text-emerald-900">•</span>}
            {category}
          </span>
        ))}
      </p>
    </div>
  );
}
