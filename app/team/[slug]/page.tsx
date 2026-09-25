import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { teamMembers } from "@/lib/data/team";

export function generateStaticParams() {
  return teamMembers.map((member) => ({ slug: member.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const member = teamMembers.find((item) => item.slug === params.slug);

  if (!member) {
    return {
      title: "Team Member | Eagle Research Lab",
      description: "Discover our Eagle Research Lab team member profile.",
    };
  }

  return {
    title: `${member.name} | Eagle Research Lab`,
    description: `Profile of ${member.name}, ${member.title} at Eagle Research Lab.`,
  };
}

export default function TeamMemberPage({ params }: { params: { slug: string } }) {
  const member = teamMembers.find((item) => item.slug === params.slug);

  if (!member) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50 text-slate-900">
        <section className="relative overflow-hidden bg-white">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-950 opacity-90" />
          <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[380px_minmax(0,1fr)] lg:items-center">
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl">
                <Image
                  src={member.profileImage}
                  alt={member.name}
                  width={700}
                  height={900}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="relative z-10 text-white">
                <p className="text-sm uppercase tracking-[0.4em] text-teal-300">Team Profile</p>
                <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">
                  {member.name}
                </h1>
                <p className="mt-4 text-lg text-slate-200 max-w-3xl leading-relaxed">
                  {member.title} • {member.department}
                </p>

                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <div className="rounded-3xl bg-slate-800/70 border border-white/10 p-6">
                    <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Email</p>
                    <a href={`mailto:${member.email}`} className="mt-2 block text-lg font-semibold text-white hover:text-teal-300">
                      {member.email}
                    </a>
                    {member.phone ? (
                      <p className="mt-3 text-sm text-slate-300">{member.phone}</p>
                    ) : null}
                  </div>
                  <div className="rounded-3xl bg-slate-800/70 border border-white/10 p-6">
                    <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Office</p>
                    <p className="mt-2 text-lg font-semibold text-white">{member.officeLocation ?? "Office details available upon request"}</p>
                    <p className="mt-3 text-sm text-slate-300">{member.department}</p>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  {member.socialLinks.linkedin ? (
                    <Link href={member.socialLinks.linkedin} target="_blank" className="inline-flex rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white transition hover:bg-teal-500/20">
                      LinkedIn
                    </Link>
                  ) : null}
                  {member.socialLinks.googleScholar ? (
                    <Link href={member.socialLinks.googleScholar} target="_blank" className="inline-flex rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white transition hover:bg-teal-500/20">
                      Google Scholar
                    </Link>
                  ) : null}
                  {member.socialLinks.researchGate ? (
                    <Link href={member.socialLinks.researchGate} target="_blank" className="inline-flex rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white transition hover:bg-teal-500/20">
                      ResearchGate
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl space-y-16">
            <div className="grid gap-12 lg:grid-cols-[2fr_1fr] lg:items-start">
              <div className="space-y-8">
                <div className="rounded-[2rem] bg-white p-8 shadow-lg shadow-slate-200/40">
                  <h2 className="text-3xl font-black text-slate-950">Biography</h2>
                  <p className="mt-4 leading-relaxed text-slate-600">{member.bio}</p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="rounded-[2rem] bg-white p-8 shadow-lg shadow-slate-200/40">
                    <h3 className="text-xl font-bold text-slate-950">Research Interests</h3>
                    <ul className="mt-4 space-y-3 text-slate-600">
                      {member.researchInterests.map((interest) => (
                        <li key={interest} className="flex items-start gap-3">
                          <span className="mt-1 h-2.5 w-2.5 rounded-full bg-teal-500" />
                          <span>{interest}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-[2rem] bg-white p-8 shadow-lg shadow-slate-200/40">
                    <h3 className="text-xl font-bold text-slate-950">Qualifications</h3>
                    <ul className="mt-4 space-y-3 text-slate-600">
                      {member.qualifications.map((qualification) => (
                        <li key={qualification} className="flex items-start gap-3">
                          <span className="mt-1 h-2.5 w-2.5 rounded-full bg-indigo-500" />
                          <span>{qualification}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <aside className="space-y-6">
                <div className="rounded-[2rem] bg-white p-8 shadow-lg shadow-slate-200/40">
                  <h3 className="text-xl font-bold text-slate-950">Quick Facts</h3>
                  <dl className="mt-6 grid gap-4 text-slate-600">
                    <div className="flex items-center justify-between rounded-3xl bg-slate-50 p-4">
                      <dt className="text-sm uppercase tracking-[0.2em] text-slate-400">Publications</dt>
                      <dd className="text-lg font-semibold text-slate-950">{member.publications}</dd>
                    </div>
                    <div className="flex items-center justify-between rounded-3xl bg-slate-50 p-4">
                      <dt className="text-sm uppercase tracking-[0.2em] text-slate-400">H-index</dt>
                      <dd className="text-lg font-semibold text-slate-950">{member.hIndex}</dd>
                    </div>
                    <div className="flex items-center justify-between rounded-3xl bg-slate-50 p-4">
                      <dt className="text-sm uppercase tracking-[0.2em] text-slate-400">Joined</dt>
                      <dd className="text-lg font-semibold text-slate-950">{member.joinDate}</dd>
                    </div>
                  </dl>
                </div>

                {member.cvUrl ? (
                  <div className="rounded-[2rem] bg-white p-8 shadow-lg shadow-slate-200/40">
                    <h3 className="text-xl font-bold text-slate-950">Curriculum Vitae</h3>
                    <p className="mt-4 text-slate-600">Download the full CV for an overview of academic achievements and research contributions.</p>
                    <Link href={member.cvUrl} target="_blank" className="mt-6 inline-flex w-full items-center justify-center rounded-3xl bg-slate-900 px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white transition hover:bg-slate-800">
                      Download CV
                    </Link>
                  </div>
                ) : null}
              </aside>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <div className="rounded-[2rem] bg-white p-8 shadow-lg shadow-slate-200/40">
                <h3 className="text-2xl font-black text-slate-950">Highlighted Publications</h3>
                <div className="mt-6 space-y-5 text-slate-600">
                  {member.publicationsList?.map((publication) => (
                    <div key={publication.title} className="rounded-3xl border border-slate-200 p-5">
                      <p className="font-semibold text-slate-900">{publication.title}</p>
                      <p className="mt-2 text-sm text-slate-500">{publication.venue} · {publication.year}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] bg-white p-8 shadow-lg shadow-slate-200/40">
                <h3 className="text-2xl font-black text-slate-950">Featured Projects</h3>
                <div className="mt-6 space-y-5 text-slate-600">
                  {member.projects?.map((project) => (
                    <div key={project.title} className="rounded-3xl border border-slate-200 p-5">
                      <p className="font-semibold text-slate-900">{project.title}</p>
                      <p className="mt-2 text-sm text-slate-500">{project.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
