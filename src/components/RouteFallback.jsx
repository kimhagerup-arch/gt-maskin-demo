/** Enkel, stille fallback mens en rute lastes. */
export default function RouteFallback() {
  return (
    <div className="container-site section-pad min-h-[60vh]" aria-busy="true">
      <div className="h-3 w-40 bg-brand-primary-light" />
      <div className="mt-6 h-12 w-2/3 max-w-md bg-brand-primary-light" />
      <div className="mt-4 h-4 w-1/2 max-w-sm bg-brand-primary-light" />
    </div>
  );
}
