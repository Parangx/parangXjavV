interface VideoCardProps {
  video: {
    id: string
    code: string
    title: string
    thumbnail: string
    actress: string[]
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
        <div className="absolute top-2 right-2 bg-accent text-white text-xs px-2 py-1 rounded">
          {video.code}
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-sm line-clamp-1">{video.title}</h3>
        <p className="text-gray-400 text-xs mt-1 line-clamp-1">
          {video.actress.slice(0, 3).join(', ')}
          {video.actress.length > 3 && ` +${video.actress.length - 3}`}
        </p>
      </div>
    </div>
  )
}
