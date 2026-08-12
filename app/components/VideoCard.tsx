interface VideoCardProps {
  video: {
    code: string
    title: string
    thumbnail: string
    duration: string
    badges: string[]
  }
  onClick: () => void
}

export default function VideoCard({ video, onClick }: VideoCardProps) {
  return (
    <div
      className="bg-card rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-accent/20"
      onClick={onClick}
    >
      <div className="relative aspect-[2/3] bg-gray-800">
        {video.thumbnail ? (
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}
        {/* Kode video */}
        <div className="absolute top-2 right-2 bg-accent text-white text-xs px-2 py-1 rounded">
          {video.code}
        </div>
        {/* Durasi */}
        {video.duration && (
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
            {video.duration}
          </div>
        )}
        {/* Badges */}
        {video.badges && video.badges.length > 0 && (
          <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
            {video.badges.slice(0, 2).map((badge, i) => (
              <span key={i} className="bg-red-800/80 text-white text-[10px] px-2 py-0.5 rounded">
                {badge}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-sm line-clamp-1">{video.title}</h3>
        <p className="text-gray-400 text-xs mt-1 line-clamp-1">
          {video.code}
        </p>
      </div>
    </div>
  )
}
