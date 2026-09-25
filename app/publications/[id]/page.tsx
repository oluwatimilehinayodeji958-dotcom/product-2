import { notFound } from "next/navigation";
import { 
  Calendar, 
  User, 
  BookOpen, 
  Download, 
  Share2, 
  FileText, 
  Tag, 
  Database, 
  Code, 
  FileCode, 
  Award, 
  ExternalLink,
  Users
} from "lucide-react";
import { getPublicationById, getRecentPublications } from "@/lib/supabase/publications";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export default async function ArticlePage({ params }: { params: { id: string } }) {
  const article = await getPublicationById(params.id);

  if (!article) {
    notFound();
  }

  const relatedPubs = (await getRecentPublications(3)).filter((pub) => pub.id !== params.id).slice(0, 2);

  // Helper to format authors list nicely
  const formattedAuthors = article.authors?.join(", ") ?? "Various Researchers";

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center min-h-screen bg-slate-50/50 dark:bg-slate-950">
        {/* Header Hero Section */}
        <section className="w-full bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white py-16 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent" />
          
          <div className="max-w-6xl mx-auto relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-indigo-200 text-xs font-semibold uppercase tracking-wider">
              <BookOpen size={14} />
              {article.publication_type === "journal"
                ? "Journal Article"
                : article.publication_type === "conference"
                ? "Conference Paper"
                : article.publication_type === "book"
                ? "Book Chapter"
                : "Preprint"}
            </div>

            <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight max-w-4xl text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-indigo-100">
              {article.title}
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-slate-300 text-sm md:text-base pt-2">
              <div className="flex items-center gap-2">
                <Users size={18} className="text-indigo-400 shrink-0" />
                <span className="font-medium text-slate-200">{formattedAuthors}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-6 text-xs md:text-sm text-slate-400 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-indigo-400" />
                <span>{article.published_at ? new Date(article.published_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : "Publication date unavailable"}</span>
              </div>
              {article.journal && (
                <div className="flex items-center gap-2">
                  <BookOpen size={16} className="text-indigo-400" />
                  <span className="font-semibold text-slate-300">{article.journal}</span>
                </div>
              )}
              {article.category && (
                <div className="flex items-center gap-2">
                  <Tag size={16} className="text-indigo-400" />
                  <span>{article.category}</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Main Content Layout */}
        <section className="w-full max-w-6xl px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left/Main Column: Abstract, Content */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Hero Banner Image */}
            {article.image && (
              <div className="w-full h-[280px] md:h-[400px] overflow-hidden bg-slate-100 dark:bg-slate-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            )}

            {/* Abstract */}
            {article.abstract && (
              <div className="space-y-3 pb-6 border-b border-slate-200/60 dark:border-slate-800/60">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <FileText className="text-indigo-500" size={20} />
                  Abstract
                </h2>
                <p className="text-base text-slate-700 dark:text-slate-300 leading-normal font-normal">
                  {article.abstract}
                </p>
              </div>
            )}

            {/* Full Content */}
            {article.content && (
              <div className="space-y-4 pb-6 border-b border-slate-200/60 dark:border-slate-800/60">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white pb-2">
                  Full Article
                </h2>
                <div
                  className="
                    prose prose-slate dark:prose-invert max-w-none
                    prose-headings:font-bold prose-headings:text-slate-900 dark:prose-headings:text-white prose-headings:mb-2 prose-headings:mt-4
                    prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-p:leading-normal prose-p:text-base prose-p:mt-0 prose-p:mb-2
                    prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-a:underline prose-a:font-semibold
                    prose-strong:text-slate-900 dark:prose-strong:text-white
                    prose-ul:text-slate-700 dark:prose-ul:text-slate-300 prose-ul:my-2 prose-li:my-0
                    prose-ol:text-slate-700 dark:prose-ol:text-slate-300 prose-ol:my-2
                    prose-blockquote:border-indigo-500 prose-blockquote:bg-slate-50 dark:prose-blockquote:bg-slate-800/30 prose-blockquote:p-4 prose-blockquote:rounded-r-xl prose-blockquote:text-slate-600 dark:prose-blockquote:text-slate-400 prose-blockquote:my-3
                    prose-img:shadow-md prose-img:max-w-full prose-img:mx-auto
                    [&_img]:max-w-full [&_img]:my-4 [&_img]:block [&_img]:mx-auto
                    [&_p+p]:mt-0
                    [&_figure]:my-4 [&_figcaption]:text-center [&_figcaption]:text-sm [&_figcaption]:text-slate-500
                  "
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              </div>
            )}

            {/* Keywords */}
            {article.keywords?.length ? (
              <div className="space-y-3 pb-8">
                <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Keywords</span>
                <div className="flex flex-wrap gap-2">
                  {article.keywords.map((keyword) => (
                    <span key={keyword} className="px-3.5 py-1.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 text-sm font-medium rounded-full border border-indigo-100/50 dark:border-indigo-900/30">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          {/* Right Column: Metadata Sidebar Card */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Quick Actions & Download Details Card */}
            <div className="p-4 lg:p-6 bg-white dark:bg-slate-900 rounded-2xl lg:rounded-3xl border border-slate-200/60 dark:border-slate-800/60 shadow-sm space-y-4 lg:space-y-6 lg:sticky lg:top-24">
              
              {/* Title + subtitle — hidden on mobile */}
              <div className="hidden lg:block space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Publication Assets</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Access original files, supplementary data, and replication code.</p>
              </div>

              {/* Mobile: compact label */}
              <h3 className="lg:hidden text-sm font-bold text-slate-900 dark:text-white">Publication Assets</h3>

              {/* PDF buttons: side-by-side on mobile, stacked on desktop */}
              <div className="grid grid-cols-2 gap-2 lg:flex lg:flex-col lg:gap-3">
                {article.pdf_url ? (
                  <>
                    <a
                      href={article.pdf_url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-1.5 w-full px-3 py-2.5 lg:px-5 lg:py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl lg:rounded-2xl font-bold transition-all text-xs lg:text-sm shadow-md shadow-indigo-600/10"
                    >
                      <FileText size={15} />
                      <span className="truncate">View PDF</span>
                    </a>
                    
                    <a
                      href={article.pdf_url}
                      download
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-1.5 w-full px-3 py-2.5 lg:px-5 lg:py-3.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-xl lg:rounded-2xl font-semibold transition-all border border-slate-200/40 dark:border-slate-700/40 text-xs lg:text-sm"
                    >
                      <Download size={15} />
                      <span className="truncate">Download</span>
                    </a>
                  </>
                ) : (
                  <div className="col-span-2 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200/40 dark:border-amber-900/30 text-amber-700 dark:text-amber-400 text-xs text-center">
                    PDF unavailable.
                  </div>
                )}

                {/* Supplementary, Data, Code — stacked below on mobile too but compact */}
                {article.supplementary_url && (
                  <a
                    href={article.supplementary_url}
                    target="_blank"
                    rel="noreferrer"
                    className="col-span-2 lg:col-span-1 flex items-center justify-center gap-1.5 w-full px-3 py-2 lg:px-5 lg:py-3.5 bg-emerald-50 dark:bg-emerald-950/20 hover:bg-emerald-100 dark:hover:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-900/40 rounded-xl lg:rounded-2xl font-semibold transition-all text-xs lg:text-sm"
                  >
                    <FileCode size={15} />
                    <span>Supplementary Material</span>
                    <ExternalLink size={12} className="opacity-65" />
                  </a>
                )}

                {article.data_url && (
                  <a
                    href={article.data_url}
                    target="_blank"
                    rel="noreferrer"
                    className="col-span-2 lg:col-span-1 flex items-center justify-center gap-1.5 w-full px-3 py-2 lg:px-5 lg:py-3.5 bg-blue-50 dark:bg-blue-950/20 hover:bg-blue-100 dark:hover:bg-blue-950/40 text-blue-700 dark:text-blue-400 border border-blue-200/50 dark:border-blue-900/40 rounded-xl lg:rounded-2xl font-semibold transition-all text-xs lg:text-sm"
                  >
                    <Database size={15} />
                    <span>Research Dataset</span>
                    <ExternalLink size={12} className="opacity-65" />
                  </a>
                )}

                {article.code_url && (
                  <a
                    href={article.code_url}
                    target="_blank"
                    rel="noreferrer"
                    className="col-span-2 lg:col-span-1 flex items-center justify-center gap-1.5 w-full px-3 py-2 lg:px-5 lg:py-3.5 bg-violet-50 dark:bg-violet-950/20 hover:bg-violet-100 dark:hover:bg-violet-950/40 text-violet-700 dark:text-violet-400 border border-violet-200/50 dark:border-violet-900/40 rounded-xl lg:rounded-2xl font-semibold transition-all text-xs lg:text-sm"
                  >
                    <Code size={15} />
                    <span>Code Repository</span>
                    <ExternalLink size={12} className="opacity-65" />
                  </a>
                )}
              </div>

              {/* Bibliographic Metadata — hidden on mobile */}
              <div className="hidden lg:block pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Bibliographic Details</span>
                
                <div className="grid grid-cols-1 gap-3.5 text-sm">
                  {article.journal && (
                    <div className="flex justify-between items-start gap-4">
                      <span className="text-slate-500 dark:text-slate-400">Journal:</span>
                      <span className="font-semibold text-right text-slate-800 dark:text-slate-200">{article.journal}</span>
                    </div>
                  )}
                  {article.doi && (
                    <div className="flex justify-between items-center gap-4">
                      <span className="text-slate-500 dark:text-slate-400">DOI:</span>
                      <a href={`https://doi.org/${article.doi}`} className="font-semibold text-right text-indigo-600 dark:text-indigo-400 hover:underline truncate max-w-[200px]">
                        {article.doi}
                      </a>
                    </div>
                  )}
                  {(article.volume || article.issue) && (
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 dark:text-slate-400">Volume / Issue:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {article.volume ?? "N/A"} / {article.issue ?? "N/A"}
                      </span>
                    </div>
                  )}
                  {article.pages && (
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 dark:text-slate-400">Pages:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{article.pages}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Citations & Stats — hidden on mobile */}
              {((article.citations !== undefined && article.citations > 0) || (article.impactFactor !== undefined && article.impactFactor > 0)) && (
                <div className="hidden lg:grid pt-6 border-t border-slate-100 dark:border-slate-800 grid-cols-2 gap-4">
                  {article.citations !== undefined && article.citations > 0 && (
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800/50 text-center">
                      <span className="block text-2xl font-black text-slate-900 dark:text-white">{article.citations}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Citations</span>
                    </div>
                  )}
                  {article.impactFactor !== undefined && article.impactFactor > 0 && (
                    <div className="p-3 bg-indigo-50/30 dark:bg-indigo-950/20 rounded-2xl border border-indigo-100/30 dark:border-indigo-900/20 text-center">
                      <span className="block text-2xl font-black text-indigo-600 dark:text-indigo-400">{article.impactFactor}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Impact Factor</span>
                    </div>
                  )}
                </div>
              )}

              {/* Share — hidden on mobile */}
              <div className="hidden lg:block pt-6 border-t border-slate-100 dark:border-slate-800">
                <button className="flex items-center justify-center gap-2 w-full px-5 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300 rounded-2xl font-semibold transition-all border border-slate-200/40 dark:border-slate-700/40 text-sm">
                  <Share2 size={16} />
                  <span>Share Publication</span>
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* Related Publications Section */}
        {relatedPubs.length > 0 && (
          <section className="w-full max-w-6xl px-6 pb-20 pt-12 border-t border-slate-200/60 dark:border-slate-800/60">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-2">
              <Award className="text-indigo-500" size={24} />
              Related Publications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPubs.map((related) => (
                <a
                  key={related.id}
                  href={`/publications/${related.id}`}
                  className="group flex flex-col md:flex-row gap-4 p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all shadow-sm hover:shadow-md"
                >
                  {related.image ? (
                    <div className="w-full md:w-36 h-28 overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={related.image}
                        alt={related.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        crossOrigin="anonymous"
                      />
                    </div>
                  ) : (
                    <div className="w-full md:w-36 h-28 bg-gradient-to-br from-indigo-50/50 to-teal-50/50 dark:from-indigo-950/20 dark:to-teal-950/20 flex items-center justify-center shrink-0">
                      <FileText size={32} className="text-indigo-500/40 dark:text-indigo-400/30" />
                    </div>
                  )}
                  <div className="space-y-2 flex-1 min-w-0">
                    <h3 className="font-bold text-slate-900 dark:text-white line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {related.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{related.journal ?? related.research_area ?? "Research Publication"}</p>
                    <span className="inline-block text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                      Read Article &rarr;
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}
      </div>
      <Footer />
    </>
  );
}
