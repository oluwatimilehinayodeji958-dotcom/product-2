"use client";
import { motion } from "framer-motion";
import { galleryCategories, getImageCountByCategory } from "@/lib/hooks/data/gallery";

interface GalleryFiltersProps {
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
}

export default function GalleryFilters({ activeCategory, onCategoryChange }: GalleryFiltersProps) {
  const counts = getImageCountByCategory();

  return (
    <div className="sticky top-20 z-40 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/5 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-hide no-scrollbar">
          {galleryCategories.map((cat) => {
            const isActive = activeCategory === cat;
            const count = counts[cat] ?? 0;
            return (
              <motion.button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                whileTap={{ scale: 0.95 }}
                className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-black uppercase tracking-[0.15em] transition-all duration-200 border ${
                  isActive
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-500/25"
                    : "bg-transparent text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/10 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                }`}
              >
                {cat}
                {count > 0 && (
                  <span
                    className={`inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-black ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    {count}
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
