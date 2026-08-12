'use client'

export default function GenreFilter({
  genres,
  selected,
  onChange,
}: {
  genres: string[]
  selected: string
  onChange: (genre: string) => void
}) {
  return (
    <select
      value={selected}
      onChange={(e) => onChange(e.target.value)}
      className="bg-card text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-accent w-full sm:w-auto"
    >
      <option value="">Semua Genre</option>
      {genres.map((g) => (
        <option key={g} value={g}>
          {g}
        </option>
      ))}
    </select>
  )
}
