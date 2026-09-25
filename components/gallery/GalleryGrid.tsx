"use client";
import { motion, AnimatePresence } from "framer-motion";
import { ImageOff } from "lucide-react";
import { GalleryImage } from "@/lib/hooks/data/gallery";
import GalleryCard from "./GalleryCard";

interface GalleryGridProps {
  images: GalleryImage[];
  onImageClick: (index: number) => void;
}

export default function GalleryGrid({ images, onImageClick }: GalleryGridProps) {
  if (images.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-32 text-center"
      >
        <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center mb-6">
          <ImageOff className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-xl font-black text-slate-700 dark:text-slate-300 mb-2">No Images Found</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          No gallery items match this category yet.
        </p>
      </motion.div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={images.map((i) => i.id).join(",")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="columns-1 sm:columns-2 lg:columns-3 gap-4"
      >
        {images.map((image, index) => (
          <GalleryCard
            key={image.id}
            image={image}
            index={index}
            onClick={() => onImageClick(index)}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
