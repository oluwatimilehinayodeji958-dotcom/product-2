import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { findEventBySlug } from "@/lib/data/events";

export default function EventPage({ params }: { params: { slug: string } }) {
  const ev = findEventBySlug(params.slug);
  if (!ev) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center p-12">Event not found</main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="rounded-2xl overflow-hidden shadow-md">
            <img src={ev.bannerImage || "/images/events/default.jpg"} alt="" className="w-full h-64 object-cover" />
            <div className="p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{ev.title}</h1>
              <div className="mt-2 text-sm text-slate-500">{ev.category} • {ev.startDate}{ev.startTime ? ` • ${ev.startTime}` : ''}</div>

              <div className="mt-4 text-slate-700 dark:text-slate-300">
                <p>{ev.description}</p>

                {ev.speakers && ev.speakers.length > 0 && (
                  <section className="mt-6">
                    <h3 className="text-xl font-semibold">Speakers</h3>
                    <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {ev.speakers.map((s) => (
                        <li key={s.id} className="flex items-center gap-3">
                          {s.profileImage ? (
                            <img src={s.profileImage} alt={s.name} className="w-12 h-12 rounded-full object-cover" />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-slate-100" />
                          )}
                          <div>
                            <div className="font-semibold">{s.name}</div>
                            <div className="text-xs text-slate-500">{s.title} {s.institution ? `• ${s.institution}` : ''}</div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {ev.gallery && ev.gallery.length > 0 && (
                  <section id="gallery" className="mt-6">
                    <h3 className="text-xl font-semibold">Gallery</h3>
                    <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-3">
                      {ev.gallery.map((g) => (
                        <img key={g.id} src={g.imageUrl} alt={g.caption} className="w-full h-36 object-cover rounded-lg" />
                      ))}
                    </div>
                  </section>
                )}

                <div className="mt-6 flex gap-3">
                  {ev.registrationLink ? (
                    <a href={ev.registrationLink} target="_blank" rel="noreferrer" className="px-4 py-2 bg-indigo-600 text-white rounded-xl">Register</a>
                  ) : (
                    <span className="px-4 py-2 rounded-xl bg-slate-100">Registration Closed</span>
                  )}

                  {ev.attachments && ev.attachments.length > 0 && (
                    <a href={ev.attachments[0].url} target="_blank" rel="noreferrer" className="px-4 py-2 bg-slate-200 rounded-xl">Download Resources</a>
                  )}
                </div>

              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
