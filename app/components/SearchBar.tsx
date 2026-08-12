'use client'

import { useState } from 'react'

export default function SearchBar({ onSearch }: { onSearch: (q: string) => void }) {
  const [value, setValue] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value.trim()) {
      onSearch(value.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full sm:w-64">
      <input
        type="text"
        placeholder="🔍 Cari kode / judul..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full bg-card text-white px-4 py-2 rounded-l-lg border border-gray-700 focus:outline-none focus:border-accent text-sm"
      />
      <button
        type="submit"
        className="bg-accent text-white px-4 py-2 rounded-r-lg hover:bg-accent/80 transition text-sm"
      >
        Cari
      </button>
    </form>
  )
}
