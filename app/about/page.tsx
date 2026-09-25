import { Brain, Target, ShieldCheck, Microscope } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <>
    <Navbar />
    <div className="flex flex-col items-center">
      <section className="w-full max-w-7xl px-6 py-24 mt-20">
        <div className="max-w-4xl space-y-8">
          <h1 className="text-6xl md:text-7xl font-black tracking-tight">What Eagle's Lab Is</h1>
          <p className="text-2xl text-slate-500 dark:text-slate-400 leading-relaxed">
            Eagle's Lab is a modern neuroscience and biomedical research laboratory focused on advancing scientific discovery, innovation, student development, and community impact through research, education, and collaboration.
          </p>
        </div>
      </section>

      {/* Lab Roles */}
      <section className="w-full max-w-7xl px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          { title: "Neuroscience Research Hub", desc: "Conducting cutting-edge studies on brain health and neurological functions." },
          { title: "Student Training Center", desc: "A dedicated space for mentorship and hands-on laboratory experience." },
          { title: "Academic Innovation Community", desc: "Fostering interdisciplinary collaboration between students and professionals." },
          { title: "Platform for Outreach", desc: "Bridging the gap between scientific research and real-world health awareness." },
        ].map((role, i) => (
          <div key={i} className="glass p-10 rounded-[2.5rem] border-white/10">
            <h3 className="text-2xl font-bold mb-4 text-indigo-500">{role.title}</h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{role.desc}</p>
          </div>
        ))}
      </section>

      {/* Vision & Mission */}
      <section className="w-full py-32 bg-indigo-600 text-white px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-8">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
              <Target size={32} />
            </div>
            <h2 className="text-4xl font-bold">Our Vision</h2>
            <p className="text-2xl text-indigo-100 leading-relaxed italic">
              "Eagle’s Lab is committed to advancing neuroscience and biomedical innovation through research excellence, mentorship, scientific collaboration, and community engagement."
            </p>
          </div>
          <div className="space-y-8">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
              <ShieldCheck size={32} />
            </div>
            <h2 className="text-4xl font-bold">Our Mission</h2>
            <p className="text-2xl text-indigo-100 leading-relaxed">
              "To train the next generation of neuroscientists and biomedical innovators while contributing meaningful scientific solutions to health and neurological challenges."
            </p>
          </div>
        </div>
      </section>

      {/* Connection Section */}
      <section className="w-full max-w-7xl px-6 py-32 flex flex-col items-center text-center">
        <div className="max-w-3xl space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Our Academic Roots</h2>
          <p className="text-lg text-slate-500 dark:text-slate-400">
            Closely connected to the **LAUTECH Neuroscience Group**, Eagle's Lab leverages the academic excellence and research heritage of the Ladoke Akintola University of Technology to promote neuroscience education and mentorship.
          </p>
          <div className="pt-10 flex justify-center gap-6">
             <div className="px-6 py-4 glass rounded-2xl border-white/10 font-bold text-indigo-500">Mentorship</div>
             <div className="px-6 py-4 glass rounded-2xl border-white/10 font-bold text-indigo-500">Innovation</div>
             <div className="px-6 py-4 glass rounded-2xl border-white/10 font-bold text-indigo-500">Impact</div>
          </div>
        </div>
      </section>
    </div>
    <Footer />
    </>
  );
}
