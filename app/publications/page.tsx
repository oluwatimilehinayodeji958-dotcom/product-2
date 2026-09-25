"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Search, BookOpen, FileText, Calendar, User, Menu, ChevronDown } from "lucide-react";
import { getPublications, SupabasePublication } from "@/lib/supabase/publications";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function clampText(text: string, maxLen: number) {
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen - 1).trimEnd() + "…";
}

const PUBLICATION_FILTERS = [
  "All Publications",
  "Journal Articles",
  "Conference Papers",
  "Research Reports",
  "Book Chapters",
  "Theses & Dissertations",
];

function mapFilterToType(filter: string) {
  switch (filter) {
    case "Journal Articles":
      return "journal";
    case "Conference Papers":
      return "conference";
    case "Book Chapters":
      return "book";
    case "Theses & Dissertations":
      return "preprint";
    default:
      return null;
  }
}

export default function PublicationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Publications");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [publications, setPublications] = useState<SupabasePublication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPublications() {
      const pubs = await getPublications();
      setPublications(pubs);
      setLoading(false);
    }

    loadPublications();
  }, []);

  const filteredPublications = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    const typeFilter = mapFilterToType(activeFilter);

    return publications.filter((pub) => {
      const matchesType = typeFilter ? pub.publication_type === typeFilter : true;
      const searchableText = [
        pub.title,
        pub.journal,
        pub.research_area,
        pub.abstract,
        pub.slug,
        pub.category,
        ...(pub.authors ?? []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesQuery = !normalizedQuery || searchableText.includes(normalizedQuery);
      return matchesType && matchesQuery;
    });
  }, [publications, searchQuery, activeFilter]);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center min-h-screen">
        <section className="w-full relative py-24 pb-16 px-6 z-10">
          <div className="absolute inset-0 -z-10">
            <img
              src="/publication.png"
              alt="Publications Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 to-indigo-900/80 dark:from-slate-950/90 dark:to-indigo-950/90" />
          </div>

          <div className="max-w-7xl mx-auto text-center space-y-8 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/20 backdrop-blur-sm rounded-full text-indigo-200 dark:text-indigo-300 text-sm font-semibold border border-indigo-500/30">
              <BookOpen size={16} />
              <span>Academic Repository</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white">
              Publications
            </h1>
            <p className="text-xl text-slate-200 max-w-2xl mx-auto">
              Explore our comprehensive collection of research publications, journal articles, conference papers, and scholarly works.
            </p>

            <div className="max-w-2xl mx-auto">
              <div className="relative z-50">
                {showFilterDropdown && (
                  <div className="absolute left-0 top-full mt-2 w-56 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xl max-h-96 overflow-y-auto">
                    {PUBLICATION_FILTERS.map((type) => (
                      <button
                        key={type}
                        onClick={() => {
                          setActiveFilter(type);
                          setShowFilterDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors ${
                          activeFilter === type
                            ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400"
                            : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                )}

                <div className="flex items-center border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 shadow-lg overflow-hidden">
                  <button
                    onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                    className="flex items-center gap-2 px-4 py-4 border-r border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <Menu size={20} className="text-slate-500" />
                    <ChevronDown size={16} className={`text-slate-400 transition-transform ${showFilterDropdown ? "rotate-180" : ""}`} />
                  </button>

                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search publications by title, author, or keyword..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full max-w-7xl px-4 sm:px-6 pb-20 pt-6 relative z-0">
          {/* Mobile: stacked list | Desktop: grid */}
          <div className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6">
            {loading ? (
              <div className="col-span-full text-center text-slate-500 py-20">Loading publications...</div>
            ) : filteredPublications.length === 0 ? (
              <div className="col-span-full text-center text-slate-500 py-20">No publications found.</div>
            ) : (
              filteredPublications.map((pub) => (
                <Link key={pub.id} href={`/publications/${pub.id}`}>

                  {/* ── MOBILE CARD (hidden on md+) ─────────────────────────── */}
                  <div className="md:hidden flex items-stretch bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800/70 rounded-xl overflow-hidden shadow-sm active:scale-[0.98] transition-transform duration-150 cursor-pointer">
                    {/* Accent left bar */}
                    <div className="w-1 shrink-0 bg-gradient-to-b from-indigo-500 to-teal-500" />

                    {/* Thumbnail */}
                    {pub.image ? (
                      <div className="w-24 h-full shrink-0 overflow-hidden bg-slate-100 dark:bg-slate-800">
                        <img
                          src={pub.image}
                          alt={pub.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-24 shrink-0 bg-gradient-to-br from-indigo-500/10 to-teal-500/10 flex items-center justify-center py-6">
                        <FileText className="w-8 h-8 text-indigo-400/60" />
                      </div>
                    )}

                    {/* Text */}
                    <div className="flex flex-col justify-between p-3 flex-1 min-w-0 gap-1">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-500 dark:text-indigo-400">
                          {pub.publication_type === "journal"
                            ? "Journal Article"
                            : pub.publication_type === "conference"
                            ? "Conference Paper"
                            : pub.publication_type === "book"
                            ? "Book Chapter"
                            : "Preprint"}
                        </span>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug line-clamp-2 mt-0.5">
                          {pub.title}
                        </h3>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 flex-1 mr-2">
                          {pub.authors?.[0] ?? "Various Authors"}
                          {pub.authors && pub.authors.length > 1 ? ` +${pub.authors.length - 1}` : ""}
                        </span>
                        <span className="text-[11px] text-slate-400 dark:text-slate-500 shrink-0">
                          {new Date(pub.published_at || new Date().toISOString()).getFullYear()}
                        </span>
                      </div>
                      <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold">
                        Read Article →
                      </span>
                    </div>
                  </div>

                  {/* ── DESKTOP CARD (hidden on mobile) ─────────────────────── */}
                  <div className="hidden md:block glass rounded-3xl border-white/10 overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl cursor-pointer group">
                    {pub.image ? (
                      <div className="w-full h-56 overflow-hidden">
                        <img
                          src={pub.image}
                          alt={pub.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-56 bg-gradient-to-br from-indigo-500/10 to-teal-500/10 flex items-center justify-center">
                        <FileText className="w-16 h-16 text-indigo-500/50" />
                      </div>
                    )}

                    <div className="p-6 space-y-3">
                      <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider rounded-full inline-block">
                        {pub.publication_type === "journal"
                          ? "Journal Article"
                          : pub.publication_type === "conference"
                          ? "Conference Paper"
                          : pub.publication_type === "book"
                          ? "Book Chapter"
                          : "Preprint"}
                      </span>

                      <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-snug line-clamp-2">
                        {pub.title}
                      </h3>

                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm">
                        <User size={14} />
                        <span className="line-clamp-1">{pub.authors?.join(", ") ?? "Various Authors"}</span>
                      </div>

                      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-500 text-sm">
                        <Calendar size={14} />
                        <span>{new Date(pub.published_at || new Date().toISOString()).getFullYear()}</span>
                      </div>

                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3 text-sm">
                        {clampText(pub.abstract ?? "", 150)}
                      </p>

                      <div className="pt-1">
                        <span className="text-xs text-slate-500 dark:text-slate-500 font-medium">
                          {pub.journal ?? pub.research_area ?? "Research Publication"}
                        </span>
                      </div>

                      <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold text-sm transition-colors">
                        Read More
                      </button>
                    </div>
                  </div>

                </Link>
              ))
            )}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
