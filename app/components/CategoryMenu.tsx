'use client'

import { useState, useEffect } from 'react'

interface Category {
  name: string
  id: string
}

interface CategoryGroup {
  [group: string]: Category[]
}

export default function CategoryMenu({
  selected,
  onChange,
  onSortChange,
  onFilterChange,
}: {
  selected: string
  onChange: (cat: string) => void
  onSortChange: (sort: string) => void
  onFilterChange: (filter: string) => void
}) {
  const [categories, setCategories] = useState<CategoryGroup>({})
  const [isOpen, setIsOpen] = useState(false)
  const [sort, setSort] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    const ENGINE_URL = process.env.NEXT_PUBLIC_ENGINE_URL || ''
    fetch(`${ENGINE_URL}/api/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(() => {
        // Fallback categories
        setCategories({
          'Tonton JAV': [
            { name: 'Recent update', id: 'new' },
            { name: 'Keluaran terbaru', id: 'release' },
            { name: 'Kebocoran tanpa sensor', id: 'uncensored-leak' },
            { name: 'Subtitle Inggris', id: 'english-subtitle' },
          ],
          Amatir: [
            { name: 'SIRO', id: 'siro' },
            { name: 'LUXU', id: 'luxu' },
            { name: 'GANA', id: 'gana' },
          ],
          'Tanpa sensor': [
            { name: 'FC2', id: 'fc2' },
            { name: 'HEYZO', id: 'heyzo' },
            { name: '1pondo', id: '1pondo' },
          ],
        })
      })
  }, [])

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value
    setSort(val)
    onSortChange(val)
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value
    setFilter(val)
    onFilterChange(val)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-card text-white px-4 py-2 rounded-lg border border-gray-700 hover:border-accent transition flex items-center gap-2 text-sm"
      >
        📂 Kategori
        <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-card rounded-lg shadow-xl border border-gray-700 z-50 max-h-96 overflow-y-auto">
          <div className="p-2">
            {/* Sort */}
            <div className="mb-2">
              <label className="text-xs text-gray-400">Sortir</label>
              <select
                value={sort}
                onChange={handleSortChange}
                className="w-full bg-dark text-white text-sm px-2 py-1 rounded border border-gray-700 mt-1"
              >
                <option value="">Default</option>
                <option value="released_at">Tanggal rilis</option>
                <option value="published_at">Recent update</option>
                <option value="today_views">Tampilan hari ini</option>
                <option value="weekly_views">Tampilan mingguan</option>
                <option value="monthly_views">Tampilan bulanan</option>
                <option value="views">Total views</option>
              </select>
            </div>

            {/* Filter */}
            <div className="mb-2">
              <label className="text-xs text-gray-400">Filter</label>
              <select
                value={filter}
                onChange={handleFilterChange}
                className="w-full bg-dark text-white text-sm px-2 py-1 rounded border border-gray-700 mt-1"
              >
                <option value="">Semua</option>
                <option value="individual">Aktris lajang</option>
                <option value="multiple">Banyak aktris</option>
                <option value="english-subtitle">Subtitle Inggris</option>
              </select>
            </div>

            <hr className="border-gray-700 my-2" />

            {/* Categories */}
            {Object.entries(categories).map(([group, items]) => (
              <div key={group} className="mb-2">
                <p className="text-xs text-gray-400 font-semibold">{group}</p>
                {items.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      onChange(cat.id)
                      setIsOpen(false)
                    }}
                    className={`w-full text-left px-2 py-1 text-sm rounded hover:bg-accent/20 transition ${
                      selected === cat.id ? 'text-accent' : 'text-gray-300'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
