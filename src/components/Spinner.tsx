export function Spinner() {
  return (
    <div className="flex h-[90vh] items-center justify-center">
      <div
        className="spinner-border block h-14 w-14 animate-spin rounded-full border-4 border-t-sky-600"
        role="status"
      />
    </div>
  )
}
