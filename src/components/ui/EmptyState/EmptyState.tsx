interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="p-10 text-center">
      <h3 className="font-semibold text-emerald-900">{title}</h3>

      {description && <p className="mt-2 text-sm text-gray-600">{description}</p>}

      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
