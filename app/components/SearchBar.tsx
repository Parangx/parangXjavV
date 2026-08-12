'use client'

import { useState } from 'react'

export default function SearchBar({ onSearch }: { onSearch: (q: string) => void }) {
  const [value, setValue] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(value)
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full sm:w-64">
      <input
        type="text"
        placeholder="🔍 Cari video..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full bg-card text-white px-4 py-2 rounded-l-lg border border-gray-700 focus:outline-none focus:border-accent"
      />
      <button
        type="submit"
        className="bg-accent text-white px-4 py-2 rounded-r-lg hover:bg-accent/80 transition"
      >
        Cari
      </button>
    </form>
  )
}
