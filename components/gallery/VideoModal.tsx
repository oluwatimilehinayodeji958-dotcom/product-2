"use client";
import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import { GalleryVideo } from "@/lib/hooks/data/gallery";

interface VideoModalProps {
  video: GalleryVideo;
  onClose: () => void;
}

function getEmbedUrl(video: GalleryVideo): string {
  if (video.video_type === "youtube") {
    // Accept both full URLs and embed URLs
    const match = video.video_url.match(
      /(?:youtube\.com\/(?:embed\/|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    const id = match?.[1] ?? video.video_url.split("/").pop();
    return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
  }
  if (video.video_type === "vimeo") {
    const match = video.video_url.match(/vimeo\.com\/(\d+)/);
    const id = match?.[1] ?? video.video_url.split("/").pop();
    return `https://player.vimeo.com/video/${id}?autoplay=1`;
  }
  // uploaded / self-hosted — return as-is (rendered as <video>)
  return video.video_url;
}

export default function VideoModal({ video, onClose }: VideoModalProps) {
  const embedUrl = getEmbedUrl(video);
  const isSelfHosted = video.video_type === "uploaded";

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/95 backdrop-blur-md p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-4xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1 pr-4">
              <h2 className="text-white font-black text-xl leading-tight">{video.title}</h2>
              {video.caption && (
                <p className="text-white/50 text-sm mt-1 line-clamp-2">{video.caption}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <a
                href={video.video_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
                title="Open original"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Player */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl">
            {isSelfHosted ? (
              <video
                src={embedUrl}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            ) : (
              <iframe
                src={embedUrl}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            )}
          </div>

          <p className="text-white/25 text-[10px] mt-3 text-center">Press Esc to close</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
