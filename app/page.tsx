'use client'

import { useState, useEffect, useCallback } from 'react'
import VideoCard from './components/VideoCard'
import VideoModal from './components/VideoModal'
import SearchBar from './components/SearchBar'
import CategoryMenu from './components/CategoryMenu'
import Pagination from './components/Pagination'
import LoadingSkeleton from './components/LoadingSkeleton'

const ENGINE_URL = process.env.NEXT_PUBLIC_ENGINE_URL || ''

interface Video {
  code: string
  title: string
  thumbnail: string
  duration: string
  badges: string[]
  url: string
}

interface VideoDetail extends Video {
  poster: string
  description: string
  actors: string[]
  genres: string[]
  release_date: string
  maker: string
  m3u8_urls: {
    master: string
    '720p': string
    '1080p': string
  }
}

export default function Home() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [category, setCategory] = useState('new')
  const [searchQuery, setSearchQuery] = useState('')
  const [sort, setSort] = useState('')
  const [filterType, setFilterType] = useState('')

  // Modal state
  const [selectedVideo, setSelectedVideo] = useState<VideoDetail | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [detailLoading, setDetailLoading] = useState(false)

  // Fetch videos
  const fetchVideos = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      params.set('category', category)
      params.set('page', String(currentPage))
      if (searchQuery) params.set('q', searchQuery)
      if (sort) params.set('sort', sort)
      if (filterType) params.set('filter', filterType)

      const url = `${ENGINE_URL}/api/videos?${params.toString()}`
      const res = await fetch(url)
      const data = await res.json()

      if (data.videos) {
        setVideos(data.videos)
        setTotalPages(data.totalPages || 1)
      } else {
        setVideos([])
        setTotalPages(1)
      }
    } catch (error) {
      console.error('Fetch videos error:', error)
      setVideos([])
      setTotalPages(1)
    }
    setLoading(false)
  }, [category, currentPage, searchQuery, sort, filterType])

  useEffect(() => {
    fetchVideos()
  }, [fetchVideos])

  // Handle card click - fetch detail
  const handleCardClick = async (code: string) => {
    setDetailLoading(true)
    setIsModalOpen(true)
    try {
      const res = await fetch(`${ENGUE_URL}/api/video/${code}`)
      const data = await res.json()
      if (data.code) {
        setSelectedVideo(data)
      } else {
        setSelectedVideo(null)
      }
    } catch (error) {
      console.error('Fetch detail error:', error)
      setSelectedVideo(null)
    }
    setDetailLoading(false)
  }

  // Handle download
  const handleDownload = async (code: string, resolution: string) => {
    try {
      const res = await fetch(`${ENGINE_URL}/api/download`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, resolution })
      })
      const data = await res.json()
      if (data.link) {
        window.open(data.link, '_blank')
      } else {
        alert('Gagal download: ' + (data.error || 'Unknown error'))
      }
    } catch (error) {
      console.error('Download error:', error)
      alert('Gagal download')
    }
  }

  // Handle category change
  const handleCategoryChange = (cat: string) => {
    setCategory(cat)
    setCurrentPage(1)
    setSearchQuery('')
  }

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
    setCategory('search')
  }

  return (
    <main className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-accent">🎬 MissAV Downloader</h1>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-center">
          <SearchBar onSearch={handleSearch} />
          <CategoryMenu
            selected={category}
            onChange={handleCategoryChange}
            onSortChange={setSort}
            onFilterChange={setFilterType}
          />
        </div>
      </header>

      {/* Video Grid */}
      {loading ? (
        <LoadingSkeleton count={12} />
      ) : videos.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-xl">Tidak ada video ditemukan</p>
          <p className="text-sm mt-2">Coba kata kunci atau kategori lain</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {videos.map((video) => (
              <VideoCard
                key={video.code}
                video={video}
                onClick={() => handleCardClick(video.code)}
              />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}

      {/* Modal Detail Video */}
      <VideoModal
        isOpen={isModalOpen}
        video={selectedVideo}
        loading={detailLoading}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedVideo(null)
        }}
        onDownload={handleDownload}
        onGenreClick={(genre) => {
          setSearchQuery(genre)
          setCategory('search')
          setCurrentPage(1)
          setIsModalOpen(false)
        }}
        onActressClick={(actress) => {
          setSearchQuery(actress)
          setCategory('search')
          setCurrentPage(1)
          setIsModalOpen(false)
        }}
      />
    </main>
  )
}
