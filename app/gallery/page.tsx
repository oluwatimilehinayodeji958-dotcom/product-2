"use client";
import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GalleryHero from "@/components/gallery/GalleryHero";
import GalleryFilters from "@/components/gallery/GalleryFilters";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import GalleryLightbox from "@/components/gallery/GalleryLightbox";
import FeaturedGallery from "@/components/gallery/FeaturedGallery";
import VideoGallery from "@/components/gallery/VideoGallery";
import { 
  galleryImages as seedImages, 
  galleryVideos as seedVideos,
  GalleryImage,
  GalleryVideo
} from "@/lib/hooks/data/gallery";
import { getGalleryItems, SupabaseGalleryItem } from "@/lib/supabase/gallery";

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  
  // Dynamic client states loaded from localStorage
  const [allImages, setAllImages] = useState<GalleryImage[]>([]);
  const [allVideos, setAllVideos] = useState<GalleryVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Scroll-based filter visibility
  const [isFilterVisible, setIsFilterVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const loadGallery = async () => {
      try {
        const items = await getGalleryItems();
        if (items.length === 0) {
          setAllImages(seedImages);
          setAllVideos(seedVideos);
          return;
        }

        const images = items
          .filter((item) => !item.video_type)
          .map((item) => ({
            id: item.id,
            title: item.title || "Untitled",
            caption: item.caption || item.description || "",
            category: item.category || "Laboratory",
            image_url: item.image_url || item.src || "",
            featured: !!item.featured,
            display_order: item.display_order || 0,
            event_date: item.event_date || "",
            created_at: item.created_at,
            src: item.src,
            alt: item.alt,
            description: item.description,
          })) as GalleryImage[];

        const videos = items
          .filter((item) => !!item.video_type)
          .map((item) => ({
            id: item.id,
            title: item.title || "Untitled Video",
            caption: item.caption || "",
            category: item.category || "Laboratory",
            video_type: (item.video_type as GalleryVideo["video_type"]) || "youtube",
            video_url: item.video_url || "",
            thumbnail_url: item.thumbnail_url || "",
            featured: !!item.featured,
            display_order: item.display_order || 0,
            event_date: item.event_date || "",
            created_at: item.created_at,
            duration: item.duration,
          })) as GalleryVideo[];

        setAllImages(images);
        setAllVideos(videos);
      } catch (error) {
        console.error("Gallery fetch failed:", error);
        setAllImages(seedImages);
        setAllVideos(seedVideos);
      } finally {
        setIsLoading(false);
      }
    };

    loadGallery();
  }, []);

  // Scroll-based filter visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide filter
        setIsFilterVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show filter
        setIsFilterVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Filtered lists based on active category
  const filteredImages = allImages
    .filter((img) => activeCategory === "All" || img.category === activeCategory)
    .sort((a, b) => a.display_order - b.display_order);

  const filteredVideos = allVideos
    .filter((v) => activeCategory === "All" || v.category === activeCategory)
    .sort((a, b) => a.display_order - b.display_order);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setLightboxIndex(null);
  };

  const handleImageClick = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const handlePrev = useCallback(() => {
    setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i));
  }, []);

  const handleNext = useCallback(() => {
    setLightboxIndex((i) => (i !== null && i < filteredImages.length - 1 ? i + 1 : i));
  }, [filteredImages.length]);

  return (
    <>
      <Navbar />

      {/* Hero */}
      <GalleryHero />

      {/* Featured Section (pass full list to find featured ones) */}
      <FeaturedGallery images={allImages} />

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="border-t border-slate-200 dark:border-white/5" />
      </div>

      {/* Filter bar */}
      <div className={`sticky top-0 z-40 bg-white dark:bg-slate-950 transition-transform duration-300 ${
        isFilterVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <GalleryFilters
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      {/* Main gallery grid */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Results count */}
        <div className="flex items-center justify-between mb-8">
          <div className="text-sm text-slate-500 dark:text-slate-400">
            Showing{" "}
            <span className="font-black text-slate-900 dark:text-white">{filteredImages.length}</span>{" "}
            {filteredImages.length === 1 ? "image" : "images"}
            {activeCategory !== "All" && (
              <span> in <span className="text-indigo-600 font-bold">{activeCategory}</span></span>
            )}
          </div>
          <button
            onClick={() => handleCategoryChange("All")}
            className={`text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors ${
              activeCategory === "All" ? "invisible" : "visible"
            }`}
          >
            Clear filter ×
          </button>
        </div>

        <GalleryGrid images={filteredImages} onImageClick={handleImageClick} />
      </main>

      {/* Video Section (pass filtered list) */}
      <VideoGallery videos={filteredVideos} />

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <GalleryLightbox
          images={filteredImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}

      <Footer />
    </>
  );
}
