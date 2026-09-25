"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Microscope, Target, Lightbulb, ArrowRight, Users, Award, TrendingUp, GraduationCap, Building2, Mail, Brain, Activity, FlaskConical, Baby, HeartHandshake, TestTube, Eye } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getResearchProjects, SupabaseResearchProject } from "@/lib/supabase/research";
import {
  getResearchPhilosophy,
  ResearchPhilosophy
} from "@/lib/supabase/research-sections";
import {
  getResearchAreas,
  ResearchArea
} from "@/lib/supabase/research-sections";
import {
  getResearchMethodology,
  ResearchMethodology
} from "@/lib/supabase/research-sections";
import {
  getResearchCollaborations,
  ResearchCollaboration
} from "@/lib/supabase/research-sections";


const DEFAULT_PHILOSOPHY = [
  { id: "rp-1", title: "Mission", description: "To advance understanding of brain function and develop innovative treatments for neurological disorders through cutting-edge research.", image: "/eagle2.png" },
  { id: "rp-2", title: "Research Vision", description: "To become a global leader in neuroscience research, fostering discoveries that transform lives and shape the future of brain health.", image: "/eagle3.png" },
  { id: "rp-3", title: "Scientific Approach", description: "Combining rigorous experimental methods with interdisciplinary collaboration to tackle the most challenging questions in neuroscience.", image: "/eagle4.png" }
];

const DEFAULT_AREAS = [
  { id: "ra-1", title: "Cognitive Neuroscience", description: "Investigating neural mechanisms underlying perception, memory, decision-making, and consciousness.", image: "/eagle1.webp" },
  { id: "ra-2", title: "Neurodegenerative Diseases", description: "Studying Alzheimer's, Parkinson's, and other neurodegenerative conditions to develop treatments.", image: "/eagle2.png" },
  { id: "ra-3", title: "Neurotoxicology", description: "Examining the effects of environmental toxins on brain function and developing protective strategies.", image: "/eagle3.png" },
  { id: "ra-4", title: "Brain Development", description: "Understanding neural development from embryonic stages through adolescence and aging.", image: "/eagle4.png" },
  { id: "ra-5", title: "Behavioural Neuroscience", description: "Analyzing the neural basis of behavior, emotions, and social interactions.", image: "/eagle1.webp" },
  { id: "ra-6", title: "Experimental Neuroscience", description: "Conducting cutting-edge experiments to uncover fundamental principles of brain function.", image: "/eagle2.png" }
];

const DEFAULT_METHODOLOGY = [
  { id: "rm-1", title: "Laboratory Experiments", description: "State-of-the-art in vitro and in vivo experiments to study neural function at molecular and cellular levels.", image: "/eagle3.png" },
  { id: "rm-2", title: "Animal Models", description: "Ethically conducted animal studies to understand complex neural systems and disease mechanisms.", image: "/eagle4.png" },
  { id: "rm-3", title: "Histology", description: "Detailed tissue analysis to examine neural structures and pathological changes.", image: "/eagle1.webp" },
  { id: "rm-4", title: "Microscopy", description: "Advanced imaging techniques including confocal and electron microscopy for high-resolution neural visualization.", image: "/eagle2.png" },
  { id: "rm-5", title: "Data Analysis", description: "Computational analysis and machine learning approaches to extract insights from complex neural data.", image: "/eagle3.png" },
  { id: "rm-6", title: "Scientific Collaboration", description: "Interdisciplinary partnerships with leading institutions worldwide to accelerate discovery.", image: "/eagle4.png" }
];

const DEFAULT_COLLABORATIONS = [
  { id: "rc-1", name: "MIT Neuroscience", description: "Collaborative research on neural networks and brain-computer interfaces.", image: "/eagle2.png" },
  { id: "rc-2", name: "Stanford Medicine", description: "Joint studies on neurodegenerative diseases and therapeutic development.", image: "/eagle3.png" },
  { id: "rc-3", name: "Oxford Neuroscience", description: "International partnerships in cognitive neuroscience research.", image: "/eagle4.png" },
  { id: "rc-4", name: "Harvard Medical School", description: "Collaboration on brain development and plasticity studies.", image: "/eagle1.webp" }
];

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const incrementTime = duration / end;
      
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start >= end) clearInterval(timer);
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Research() {
  const [researchProjects, setResearchProjects] = useState<SupabaseResearchProject[]>([]);
  const [philosophyItems, setPhilosophyItems] = useState<ResearchPhilosophy[]>([]);
  const [researchAreas, setResearchAreas] = useState<ResearchArea[]>([]);
  const [methodologies, setMethodologies] = useState<ResearchMethodology[]>([]);
  const [collaborations, setCollaborations] = useState<ResearchCollaboration[]>([]);

  useEffect(() => {
    const fetchResearchData = async () => {
      const projects = await getResearchProjects();
      setResearchProjects(projects);
      
      const philosophy = await getResearchPhilosophy();
      setPhilosophyItems(philosophy);
      
      const areas = await getResearchAreas();
      setResearchAreas(areas);
      
      const methodology = await getResearchMethodology();
      setMethodologies(methodology);
      
      const collabs = await getResearchCollaborations();
      setCollaborations(collabs);
    };
    fetchResearchData();
  }, []);

  return (
    <>
    <Navbar />
    <div className="flex flex-col items-center min-h-screen">
      {/* Hero Section */}
      <section className="w-full relative py-32 px-6 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <img
            src="/researchpage.png"
            alt="Research Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 to-indigo-900/90" />
        </div>

        <div className="max-w-7xl mx-auto text-center space-y-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6">
              Research
            </h1>
            <p className="text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
              Advancing the frontiers of neuroscience through innovative, ethical, and collaborative research. Our laboratory is committed to understanding the complexities of the human brain and developing breakthrough treatments for neurological disorders.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Research Philosophy */}
      <section className="w-full max-w-7xl px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
            Our Research Philosophy
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Guided by excellence, innovation, and impact
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {philosophyItems.map((item, index) => (
            <motion.div
              key={item.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                {item.image_url ? (
                  <img src={item.image_url} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-900">
                    <Microscope className="w-10 h-10 text-slate-300 dark:text-slate-600" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 transition-transform duration-300 translate-y-12 group-hover:translate-y-0">
                  <h3 className="text-2xl font-black text-white tracking-tight mb-2">{item.title}</h3>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white/90 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Ongoing Research */}
      <section className="w-full bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-900 dark:to-indigo-900/20 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
              Ongoing Research
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Current projects pushing the boundaries of neuroscience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {researchProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                  <img
                    src={project.image_url || "/eagle2.png"}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6 transition-transform duration-300 translate-y-12 group-hover:translate-y-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${
                        project.status === 'ongoing'
                          ? 'bg-green-500/20 text-green-300'
                          : 'bg-blue-500/20 text-blue-300'
                      }`}>
                        {project.status}
                      </span>
                      <span className="text-xs text-white/70">
                        {project.lead_investigator}
                      </span>
                    </div>
                    <h3 className="text-2xl font-black text-white tracking-tight mb-2">{project.title}</h3>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-white/90 text-sm leading-relaxed">{project.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Areas */}
      <section className="w-full max-w-7xl px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
            Research Areas
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Exploring the frontiers of neuroscience through specialized research domains
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {researchAreas.map((area, index) => (
            <motion.div
              key={area.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                {area.image_url ? (
                  <img src={area.image_url} alt={area.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-900">
                    <FlaskConical className="w-10 h-10 text-slate-300 dark:text-slate-600" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 transition-transform duration-300 translate-y-12 group-hover:translate-y-0">
                  <h3 className="text-2xl font-black text-white tracking-tight mb-2">{area.title}</h3>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white/90 text-sm leading-relaxed">{area.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Research Methodology */}
      <section className="w-full bg-slate-50 dark:bg-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
              Research Methodology
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Our comprehensive approach to conducting cutting-edge neuroscience research
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {methodologies.map((method, index) => (
              <motion.div
                key={method.id || index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                  {method.image_url ? (
                    <img src={method.image_url} alt={method.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-900">
                      <FlaskConical className="w-10 h-10 text-slate-300 dark:text-slate-600" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6 transition-transform duration-300 translate-y-12 group-hover:translate-y-0">
                    <h3 className="text-2xl font-black text-white tracking-tight mb-2">{method.title}</h3>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-white/90 text-sm leading-relaxed">{method.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Impact */}
      <section className="w-full max-w-7xl px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
            Research Impact
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Our contributions to advancing neuroscience and training the next generation
          </p>
        </div>

        <div className="flex overflow-x-auto gap-8 md:grid md:grid-cols-5 md:overflow-visible pb-4 md:pb-0 scrollbar-hide">
          {[
            { icon: Award, value: 120, suffix: "+", label: "Publications" },
            { icon: Target, value: 45, suffix: "+", label: "Active Projects" },
            { icon: Users, value: 25, suffix: "", label: "Researchers" },
            { icon: Building2, value: 15, suffix: "+", label: "Collaborations" },
            { icon: GraduationCap, value: 500, suffix: "+", label: "Students Mentored" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center flex-shrink-0 min-w-[140px]"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Collaborations */}
      <section className="w-full bg-slate-50 dark:bg-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
              Collaborations
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Partnering with leading institutions worldwide to advance neuroscience research
            </p>
          </div>

          <div className="flex overflow-x-auto gap-8 pb-4 scrollbar-hide">
            {collaborations.map((partner, index) => (
              <motion.div
                key={partner.id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex-shrink-0 flex flex-col items-center gap-4"
              >
                <div className="w-24 h-24 rounded-full overflow-hidden bg-white dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700 shadow-lg">
                  {partner.image_url ? (
                    <img src={partner.image_url} alt={partner.name} className="w-full h-full object-cover" />
                  ) : (
                    <Building2 className="w-12 h-12 text-slate-400 dark:text-slate-500" />
                  )}
                </div>
                <a 
                  href={partner.website_url || "#"} 
                  target={partner.website_url && partner.website_url !== "#" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="text-lg font-bold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  {partner.name}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="w-full max-w-7xl px-6 py-20">
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
              Partner With Us
            </h2>
            <p className="text-xl text-indigo-100 max-w-2xl mx-auto mb-8">
              Join our mission to advance neuroscience through research collaboration, student opportunities, and industry partnerships.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-indigo-100">
                <Users className="w-5 h-5" />
                <span>Research Collaboration</span>
              </div>
              <div className="flex items-center gap-2 text-indigo-100">
                <GraduationCap className="w-5 h-5" />
                <span>Student Opportunities</span>
              </div>
              <div className="flex items-center gap-2 text-indigo-100">
                <Award className="w-5 h-5" />
                <span>Grant Partnerships</span>
              </div>
              <div className="flex items-center gap-2 text-indigo-100">
                <Building2 className="w-5 h-5" />
                <span>Industry Partnerships</span>
              </div>
            </div>

            <button className="inline-flex items-center gap-3 px-8 py-4 bg-white text-indigo-600 rounded-2xl font-bold text-lg hover:bg-indigo-50 transition-colors shadow-xl">
              <Mail className="w-5 h-5" />
              Contact Research Team
            </button>
          </div>
        </div>
      </section>
    </div>
    <Footer />
    </>
  );
}

