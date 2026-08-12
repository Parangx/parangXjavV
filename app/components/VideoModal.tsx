'use client'

import { useState, useEffect } from 'react'

interface VideoModalProps {
  isOpen: boolean
  video: {
    code: string
    title: string
    poster: string
    thumbnail?: string
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
  } | null
  loading: boolean
  onClose: () => void
  onDownload: (code: string, resolution: string) => void
  onGenreClick: (genre: string) => void
  onActressClick: (actress: string) => void
}

export default function VideoModal({
  isOpen,
  video,
  loading,
  onClose,
  onDownload,
  onGenreClick,
  onActressClick,
}: VideoModalProps) {
  const [resolution, setResolution] = useState('1080p')

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

  if (!isOpen) return null

  const resolutions = video?.m3u8_urls
    ? Object.keys(video.m3u8_urls).filter(
        (key) => video.m3u8_urls[key as keyof typeof video.m3u8_urls]
      )
    : []

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay"
      onClick={onClose}
    >
      <div
        className="bg-card rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl z-10"
        >
          ✕
        </button>

        {loading ? (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="animate-spin h-8 w-8 border-4 border-accent border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-gray-400">Memuat detail...</p>
            </div>
          </div>
        ) : video ? (
          <div className="flex flex-col md:flex-row p-6 gap-6">
            <div className="md:w-2/5 flex-shrink-0">
              <img
                src={video.poster || video.thumbnail || ''}
                alt={video.title}
                className="w-full rounded-lg shadow-lg object-cover aspect-[2/3]"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src =
                    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="450" viewBox="0 0 300 450"%3E%3Crect width="300" height="450" fill="%2316213e"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23666" font-family="sans-serif"%3ENo Image%3C/text%3E%3C/svg%3E'
                }}
              />
            </div>

            <div className="md:w-3/5 space-y-3">
              <h2 className="text-xl font-bold text-accent">{video.code}</h2>
              <h3 className="text-lg font-semibold">{video.title}</h3>

              {video.actors && video.actors.length > 0 && (
                <div>
                  <p className="text-sm text-gray-400">🎭 Aktris</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {video.actors.map((a) => (
                      <span
                        key={a}
                        onClick={() => onActressClick(a)}
                        className="text-xs bg-dark px-3 py-1 rounded-full cursor-pointer hover:bg-accent/20 transition"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              )}

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

              {video.description && (
                <div>
                  <p className="text-sm text-gray-400">📝 Deskripsi</p>
                  <p className="text-sm text-gray-300 line-clamp-4">
                    {video.description}
                  </p>
                </div>
              )}

              <div className="flex flex-wrap gap-4 text-xs text-gray-400">
                {video.release_date && <span>📅 {video.release_date}</span>}
                {video.maker && <span>🏢 {video.maker}</span>}
              </div>

              <div className="space-y-2">
                <select
                  value={resolution}
                  onChange={(e) => setResolution(e.target.value)}
                  className="w-full bg-dark text-white px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-accent text-sm"
                >
                  {resolutions.includes('1080p') && (
                    <option value="1080p">1080p (Full HD)</option>
                  )}
                  {resolutions.includes('720p') && (
                    <option value="720p">720p (HD)</option>
                  )}
                  {resolutions.includes('master') && (
                    <option value="master">Master (Auto)</option>
                  )}
                </select>
                <button
                  onClick={() => onDownload(video.code, resolution)}
                  className="w-full bg-accent hover:bg-accent/80 text-white font-bold py-2 px-4 rounded-lg transition"
                >
                  🎬 Download Video
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-400">
            <p>Gagal memuat detail video</p>
          </div>
        )}
      </div>
    </div>
  )
}
