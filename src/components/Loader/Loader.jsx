export default function Loader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-surface dark:bg-night" role="status" aria-label="Loading page">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
    </div>
  );
}
