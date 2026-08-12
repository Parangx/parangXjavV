'use client'

import { useEffect } from 'react'

interface VideoModalProps {
  isOpen: boolean
  video: {
    code: string
    title: string
    poster: string
    description: string
    actresses: { name: string; slug: string }[]
    genres: string[]
    m3u8_url: string
    release_date: string
    duration: string
  } | null
  onClose: () => void
  onDownload: (code: string) => void
  onGenreClick: (genre: string) => void
  onActressClick: (actress: string) => void
}

export default function VideoModal({
  isOpen,
  video,
  onClose,
  onDownload,
  onGenreClick,
  onActressClick,
}: VideoModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen || !video) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-card rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tombol Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl z-10"
        >
          ✕
        </button>

        {/* Konten */}
        <div className="flex flex-col md:flex-row p-6 gap-6">
          {/* Poster */}
          <div className="md:w-2/5 flex-shrink-0">
            <img
              src={video.poster || video.thumbnail}
              alt={video.title}
              className="w-full rounded-lg shadow-lg object-cover aspect-[2/3]"
            />
          </div>

          {/* Detail */}
          <div className="md:w-3/5 space-y-3">
            <h2 className="text-xl font-bold text-accent">{video.code}</h2>
            <h3 className="text-lg font-semibold">{video.title}</h3>

            {/* Aktris */}
            {video.actresses && video.actresses.length > 0 && (
              <div>
                <p className="text-sm text-gray-400">🎭 Aktris</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {video.actresses.map((a) => (
                    <span
                      key={a.slug}
                      onClick={() => onActressClick(a.name)}
                      className="text-xs bg-dark px-3 py-1 rounded-full cursor-pointer hover:bg-accent/20 transition"
                    >
                      {a.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Genre */}
            {video.genres && video.genres.length > 0 && (
              <div>
                <p className="text-sm text-gray-400">🏷️ Genre</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {video.genres.map((g) => (
                    <span
                      key={g}
                      onClick={() => onGenreClick(g)}
                      className="text-xs bg-dark px-3 py-1 rounded-full cursor-pointer hover:bg-accent/20 transition"
                    >
                      #{g}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Deskripsi */}
            {video.description && (
              <div>
                <p className="text-sm text-gray-400">📝 Deskripsi</p>
                <p className="text-sm text-gray-300 line-clamp-4">
                  {video.description}
                </p>
              </div>
            )}

            {/* Metadata */}
            <div className="flex gap-4 text-xs text-gray-400">
              {video.release_date && <span>📅 {video.release_date}</span>}
              {video.duration && <span>⏱️ {video.duration}</span>}
            </div>

            {/* Tombol Download */}
            <button
              onClick={() => onDownload(video.code)}
              className="w-full bg-accent hover:bg-accent/80 text-white font-bold py-2 px-4 rounded-lg transition mt-2"
            >
              🎬 Download Video
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
