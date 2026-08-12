'use client'

import { useState, useEffect } from 'react'
import VideoCard from './components/VideoCard'
import VideoModal from './components/VideoModal'
import SearchBar from './components/SearchBar'
import GenreFilter from './components/GenreFilter'
import Pagination from './components/Pagination'

const ENGINE_URL = process.env.NEXT_PUBLIC_ENGINE_URL || 'https://missav-engine.trycloudflare.com'

interface Video {
  id: string
  code: string
  title: string
  thumbnail: string
  actress: string[]
}

// 🔥 PERBAIKAN: Tambahkan actresses
interface VideoDetail extends Video {
  poster: string
  description: string
  genres: string[]
  actresses: { name: string; slug: string }[]  // <-- DITAMBAHKAN
  m3u8_url: string
  release_date: string
  duration: string
}

export default function Home() {
  const [videos, setVideos] = useState<Video[]>([])
  const [genres, setGenres] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedVideo, setSelectedVideo] = useState<VideoDetail | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('')

  useEffect(() => {
    fetch(`${ENGINE_URL}/api/genres`)
      .then(res => res.json())
      .then(data => setGenres(data.genres || []))
      .catch(() => setGenres(['Mature', 'Anal', 'MILF', 'Slender', 'Youthful']))
  }, [])

  useEffect(() => {
    setLoading(true)
    const params = new URLSearchParams()
    params.set('page', String(currentPage))
    if (searchQuery) params.set('q', searchQuery)
    if (selectedGenre) params.set('genre', selectedGenre)

    fetch(`${ENGINE_URL}/api/videos?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        setVideos(data.videos || [])
        setTotalPages(data.totalPages || 1)
        setLoading(false)
      })
      .catch(() => {
        setVideos([])
        setLoading(false)
      })
  }, [currentPage, searchQuery, selectedGenre])

  const handleCardClick = async (code: string) => {
    try {
      const res = await fetch(`${ENGINE_URL}/api/video/${code}`)
      const data = await res.json()
      setSelectedVideo(data)
      setIsModalOpen(true)
    } catch (error) {
      console.error('Gagal mengambil detail:', error)
    }
  }

  const handleDownload = (code: string) => {
    fetch(`${ENGINE_URL}/api/download`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    })
      .then(res => res.json())
      .then(data => {
        if (data.link) {
          window.open(data.link, '_blank')
        }
      })
      .catch(err => console.error('Download gagal:', err))
  }

  return (
    <main className="container mx-auto px-4 py-6 max-w-7xl">
      <header className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-accent">🎬 MissAV Downloader</h1>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <SearchBar onSearch={setSearchQuery} />
          <GenreFilter genres={genres} selected={selectedGenre} onChange={setSelectedGenre} />
        </div>
      </header>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-card rounded-lg animate-pulse h-64" />
          ))}
        </div>
      ) : videos.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-xl">Tidak ada video ditemukan</p>
          <p className="text-sm">Coba kata kunci atau genre lain</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {videos.map((video) => (
              <VideoCard
                key={video.id}
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

      <VideoModal
        isOpen={isModalOpen}
        video={selectedVideo}
        onClose={() => setIsModalOpen(false)}
        onDownload={handleDownload}
        onGenreClick={(genre) => {
          setSelectedGenre(genre)
          setCurrentPage(1)
          setIsModalOpen(false)
        }}
        onActressClick={(actress) => {
          setSearchQuery(actress)
          setCurrentPage(1)
          setIsModalOpen(false)
        }}
      />
    </main>
  )
}
