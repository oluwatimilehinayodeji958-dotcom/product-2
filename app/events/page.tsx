"use client";
import React, { useMemo, useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { getAllEvents, SupabaseEvent } from "@/lib/supabase/events";

export default function Events() {
  const [activeCategory, setActiveCategory] = useState<string>("All Events");
  const [query, setQuery] = useState("");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [events, setEvents] = useState<SupabaseEvent[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Scroll-based filter visibility
  const [isFilterVisible, setIsFilterVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    async function loadEvents() {
      const eventData = await getAllEvents();
      setEvents(eventData);
      setLoading(false);
    }
    loadEvents();
  }, []);

  const EVENT_CATEGORIES = ["All Events", ...Array.from(new Set(events.map(e => e.category || "General"))).filter(Boolean)];

  const filtered = useMemo(() => {
    return events.filter((ev) => {
      if (activeCategory !== "All Events" && ev.category !== activeCategory) return false;
      if (query) {
        const q = query.toLowerCase();
        return (
          ev.title.toLowerCase().includes(q) ||
          (ev.description || "").toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [activeCategory, query, events]);

  const upcoming = filtered.filter((e) => e.status === "Upcoming" || e.status === "Ongoing");
  const past = filtered.filter((e) => e.status === "Completed" || e.status === "Cancelled");

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

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-6 py-16">
          {/* Hero */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">Events</h1>
              <p className="mt-4 text-slate-600 dark:text-slate-300 max-w-2xl">
                Stay informed about our conferences, seminars, workshops, outreach programs, scientific
                meetings, and training opportunities.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 h-56 flex items-center justify-center">
              <img src="/images/events/hero-research.jpg" alt="Events hero" className="object-cover w-full h-full" />
            </div>
          </section>

          {/* Filter bar - scroll-based hide/show */}
          <div className={`sticky top-0 z-40 bg-slate-50 dark:bg-slate-900 transition-transform duration-300 ${
            isFilterVisible ? 'translate-y-0' : '-translate-y-full'
          }`}>
            <div className="py-4 border-b border-slate-200 dark:border-slate-700">
              <div className="relative max-w-2xl">
                <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-2xl bg-white dark:bg-slate-800 overflow-hidden">
                  <button
                    onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                    className="flex items-center gap-2 px-4 py-3 border-r border-slate-200 dark:border-slate-700 text-sm font-semibold bg-transparent"
                  >
                    {activeCategory}
                    <svg className="w-3 h-3 ml-1 text-slate-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                  </button>

                  <input
                    aria-label="Search events"
                    placeholder="Search events"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="px-4 py-3 flex-1 bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
                  />

                  <button
                    onClick={() => setQuery("")}
                    className="px-4 py-3 bg-indigo-600 text-white rounded-r-2xl"
                  >
                    Clear
                  </button>
                </div>

                {showCategoryDropdown && (
                  <div className="absolute left-0 top-full mt-2 w-full bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg z-50">
                    {EVENT_CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => { setActiveCategory(cat); setShowCategoryDropdown(false); }}
                        className={`w-full text-left px-4 py-3 text-sm transition-colors ${activeCategory === cat ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900'}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>


          {/* Upcoming Events */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Upcoming Events</h2>
              <span className="text-sm text-slate-500">{upcoming.length} results</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {loading ? (
                <div className="col-span-full text-center text-slate-500 py-20">Loading events...</div>
              ) : upcoming.length === 0 ? (
                <div className="col-span-full text-center text-slate-500 py-20">No upcoming events found.</div>
              ) : (
                upcoming.map((ev) => (
                <article key={ev.id} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                  <div className="h-40 md:h-48 relative">
                    <img src={ev.banner_image || ev.image_url || "/images/events/default.jpg"} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">{ev.title}</h3>
                        <div className="text-xs text-slate-500 mt-1">{ev.category || "General"}</div>
                      </div>
                      {(ev.featured || ev.is_featured) && <span className="text-xs font-semibold bg-amber-100 text-amber-700 px-2 py-1 rounded-full">Featured</span>}
                    </div>

                    <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 line-clamp-2">{ev.short_description || ev.description || ""}</p>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-sm text-slate-600 dark:text-slate-300">
                        <div>{ev.event_date} {ev.event_time ? `• ${ev.event_time}` : ""}</div>
                        <div className="text-xs">{ev.venue || ev.location || ""}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link href={`/events/${ev.slug}`} className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-sm font-semibold">View Details</Link>
                        {(ev.registration_url || ev.registration_link) && (
                          <a href={ev.registration_url || ev.registration_link} target="_blank" rel="noreferrer" className="px-3 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold">Register</a>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              ))
              )}
            </div>
          </section>

          {/* Past Events */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Past Events</h2>
              <span className="text-sm text-slate-500">{past.length} results</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {loading ? (
                <div className="col-span-full text-center text-slate-500 py-20">Loading events...</div>
              ) : past.length === 0 ? (
                <div className="col-span-full text-center text-slate-500 py-20">No past events found.</div>
              ) : (
                past.map((ev) => (
                <article key={ev.id} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                  <div className="h-36 overflow-hidden">
                    <img src={ev.banner_image || ev.image_url || "/images/events/default.jpg"} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{ev.title}</h3>
                    <div className="text-xs text-slate-500 mt-1">{ev.event_date} • {ev.venue || ev.location || ""}</div>
                    <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 line-clamp-3">{ev.short_description || ev.description || ""}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <Link href={`/events/${ev.slug}`} className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-sm font-semibold">View Details</Link>
                      <Link href={`/events/${ev.slug}#gallery`} className="px-3 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold">View Gallery</Link>
                    </div>
                  </div>
                </article>
              ))
              )}
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
