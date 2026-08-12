'use client'

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}) {
  if (totalPages <= 1) return null

  const pages = []
  for (let i = 1; i <= Math.min(totalPages, 5); i++) {
    pages.push(i)
  }

  return (
    <div className="flex justify-center gap-2 mt-8">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-4 py-2 bg-card rounded-lg disabled:opacity-50 hover:bg-accent/20 transition"
      >
        ◀
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`px-4 py-2 rounded-lg transition ${
            p === currentPage
              ? 'bg-accent text-white'
              : 'bg-card hover:bg-accent/20'
          }`}
        >
          {p}
        </button>
      ))}
      {totalPages > 5 && <span className="px-4 py-2 text-gray-400">...</span>}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-4 py-2 bg-card rounded-lg disabled:opacity-50 hover:bg-accent/20 transition"
      >
        ▶
      </button>
    </div>
  )
}
