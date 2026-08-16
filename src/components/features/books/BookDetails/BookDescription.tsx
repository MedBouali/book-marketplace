interface BookDescriptionProps {
  description?: string;
}

export function BookDescription({ description }: BookDescriptionProps) {
  if (!description) {
    return null;
  }

  return (
    <div className="sm:col-span-2">
      <p className="mb-4 text-lg font-semibold text-emerald-900">Description</p>

      <div
        className="prose prose-gray max-w-none text-sm"
        dangerouslySetInnerHTML={{
          __html: description,
        }}
      />
    </div>
  );
}
