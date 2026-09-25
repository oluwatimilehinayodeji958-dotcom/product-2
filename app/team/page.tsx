"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getTeamMembers, SupabaseTeamMember } from "@/lib/supabase/team";

export default function Team() {
  const [teamMembers, setTeamMembers] = useState<SupabaseTeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        setLoading(true);
        const members = await getTeamMembers();
        if (members && members.length > 0) {
          // Sort to ensure founder comes first (by display_order)
          const sortedMembers = members.sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
          setTeamMembers(sortedMembers);
        }
      } catch (error) {
        console.error("Error fetching team members:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeamData();
  }, []);

  // Separate founder from other team members
  const founder = teamMembers.find(m => m.role === "Founder & Editor-in-Chief" || m.role === "Principal Investigator");
  const otherMembers = teamMembers.filter(m => m.role !== "Founder & Editor-in-Chief" && m.role !== "Principal Investigator");

  // Group other members by category
  const groupedByCategory = otherMembers.reduce((acc, member) => {
    const category = member.role || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(member);
    return acc;
  }, {} as Record<string, SupabaseTeamMember[]>);

  return (
    <>
      <Navbar />
      <main className="bg-slate-50 text-slate-900">
        <section className="relative overflow-hidden bg-slate-950 text-white">
          <div className="absolute inset-0 opacity-70">
            <Image
              src="/teampage.jpg"
              alt="Laboratory team working together"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-900/70 to-slate-950/90" />
          </div>
          <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.4em] text-teal-300">Our Team</p>
              <h1 className="mt-6 text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">
                Our Team
              </h1>
              <p className="mt-8 text-lg leading-8 text-slate-200 sm:text-xl">
                Meet the dedicated researchers, faculty members, students, and professionals driving innovation at Eagle Research Lab. Through collaboration, scientific excellence, and mentorship, our multidisciplinary team is committed to advancing neuroscience research and improving human health.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-slate-600 dark:text-slate-400">Loading team members...</p>
            </div>
          ) : (
            <>
              {/* Founder Section - Large Solo Display */}
              {founder && (
                <section className="mb-20">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="relative aspect-[3/4] w-full max-w-lg mx-auto lg:mx-0 overflow-hidden">
                      <Image
                        src={founder.image_url || "/founder.jpg"}
                        alt={founder.full_name}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                      <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
                        <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-teal-300 mb-2">{founder.role}</p>
                        <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-1">{founder.full_name}</h3>
                        <p className="text-white/80 text-base sm:text-lg">{founder.title}</p>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">{founder.full_name}</h2>
                      <p className="text-lg sm:text-xl text-teal-600 dark:text-teal-400 font-semibold">{founder.title}</p>
                      <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">{founder.bio || ''}</p>
                      <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                        {founder.linkedin_url && founder.linkedin_url.trim() !== "" && (
                          <a
                            href={founder.linkedin_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            aria-label="LinkedIn"
                          >
                            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                          </a>
                        )}
                        {founder.x_url && founder.x_url.trim() !== "" && (
                          <a
                            href={founder.x_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors"
                            aria-label="X (Twitter)"
                          >
                            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                            </svg>
                          </a>
                        )}
                        {founder.instagram_url && founder.instagram_url.trim() !== "" && (
                          <a
                            href={founder.instagram_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-600 dark:text-slate-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
                            aria-label="Instagram"
                          >
                            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                          </a>
                        )}
                        {founder.facebook_url && founder.facebook_url.trim() !== "" && (
                          <a
                            href={founder.facebook_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            aria-label="Facebook"
                          >
                            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* Other Team Members Grouped by Category */}
              {Object.entries(groupedByCategory).map(([category, members]) => (
                members.length > 0 && (
                  <section key={category} className="mb-16">
                    <div className="mb-8">
                      <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase">{category}</h2>
                      <div className="w-24 h-1 bg-teal-500 mt-4"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {members.map((member) => (
                        <div key={member.id} className="group cursor-pointer">
                          <div className="relative aspect-[3/4] overflow-hidden">
                            <Image
                              src={member.image_url || "/eagle2.png"}
                              alt={member.full_name}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                            <div className="absolute inset-0 flex flex-col justify-end p-6 transition-transform duration-300 translate-y-12 group-hover:translate-y-0">
                              <p className="text-sm uppercase tracking-[0.2em] text-teal-300 mb-2">{member.role}</p>
                              <h3 className="text-2xl font-black text-white tracking-tight mb-1">{member.full_name}</h3>
                              <p className="text-white/80 text-sm mb-4">{member.title}</p>
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <p className="text-white/90 text-sm leading-relaxed">{member.bio || ''}</p>
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 flex items-center gap-3">
                            {member.linkedin_url && member.linkedin_url.trim() !== "" && (
                              <a
                                href={member.linkedin_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                aria-label="LinkedIn"
                              >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                              </a>
                            )}
                            {member.x_url && member.x_url.trim() !== "" && (
                              <a
                                href={member.x_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors"
                                aria-label="X (Twitter)"
                              >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                </svg>
                              </a>
                            )}
                            {member.instagram_url && member.instagram_url.trim() !== "" && (
                              <a
                                href={member.instagram_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-600 dark:text-slate-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
                                aria-label="Instagram"
                              >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                              </a>
                            )}
                            {member.facebook_url && member.facebook_url.trim() !== "" && (
                              <a
                                href={member.facebook_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                aria-label="Facebook"
                              >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )
              ))}

              {otherMembers.length === 0 && !founder && (
                <div className="text-center py-12">
                  <p className="text-slate-600 dark:text-slate-400">No team members to display.</p>
                </div>
              )}
            </>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
