"use client";
import { motion } from "framer-motion";
import { ArrowRight, Brain, HeartPulse, GraduationCap, Users, Microscope, Network, Globe, BookOpen, Activity } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const backgroundImages = [
    "/Eagles'image1.png",
    "/Eagles'image2.png",
    "/Eagles'image3.png",
    "/Eagles'image4.png"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 6000); // Change image every 6 seconds

    return () => clearInterval(interval);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6 pt-20">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 -z-20">
          {backgroundImages.map((image, index) => (
            <motion.img
              key={image}
              src={image}
              alt="Eagle's Lab Background"
              className="absolute inset-0 w-full h-full object-cover blur-[1.5px]"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: index === currentImageIndex ? 1 : 0,
                scale: index === currentImageIndex ? 1 : 1.1
              }}
              transition={{ duration: 1.5 }}
            />
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="max-w-6xl text-center space-y-12 relative z-10"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full glass border-indigo-500/30 text-indigo-500 text-xs font-black tracking-[0.3em] uppercase mb-4 shadow-lg shadow-indigo-500/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            LAUTECH Neuroscience Hub
          </div>
          
          <h1 className="text-4xl md:text-7xl font-black tracking-tight text-balance leading-[1.2] py-4 text-white">
            Advancing the <span className="text-yellow-400">Frontiers</span> of the Human Mind
          </h1>
          
          <p className="text-sm md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed font-medium">
            Bridging complex neuroscience research with real-world health impact through a culture of excellence, mentorship, and scientific innovation.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-0">
            <a 
              href="/research" 
              className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-black text-sm uppercase tracking-[0.2em] hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20 active:scale-95"
            >
              Explore Research
            </a>
            <a 
              href="/impact" 
              className="px-8 py-4 bg-white/10 text-white border border-white/20 backdrop-blur-md rounded-xl font-black text-sm uppercase tracking-[0.2em] hover:bg-white/20 transition-all active:scale-95"
            >
              Our Impact
            </a>
          </div>
        </motion.div>

        {/* Floating Neural Elements (Decorative) */}
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-indigo-500/10 blur-[120px] animate-pulse" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-teal-500/10 blur-[150px] animate-pulse delay-700" />
      </section>

      {/* Statistics Section (Advanced Counters) */}
      <section className="w-full max-w-7xl px-6 py-8 border-y border-slate-200 dark:border-white/5">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12">
          {[
            { label: "Research Projects", value: 45, suffix: "+" },
            { label: "Scientific Papers", value: 120, suffix: "" },
            { label: "Students Mentored", value: 500, suffix: "+" },
            { label: "Active Partners", value: 12, suffix: "+" },
          ].map((stat, i) => (
            <motion.div 
              key={i} 
              {...fadeInUp}
              className="text-center space-y-2"
            >
              <div className="text-2xl md:text-3xl font-black tracking-tighter text-indigo-500">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Core Mission Section (Interactive Cards) */}
      <section className="w-full max-w-7xl px-6 py-16 pb-8">
        <div className="flex flex-col items-center text-center mb-16 gap-10">
          <div className="space-y-6">
            <h2 className="text-slate-900 dark:text-white font-black uppercase tracking-tight text-5xl md:text-7xl">Our Ecosystem</h2>
            <h3 className="text-indigo-500 font-black tracking-[0.4em] text-2xl md:text-3xl">A Multi-Dimensional Approach to Neuroscience</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            { image: "/Research Hub.png", title: "Research Hub", desc: "Pushing the boundaries of neurological disorders and brain health studies.", color: "indigo" },
            { image: "/Student Training.png", title: "Student Training", desc: "Hands-on mentorship program for the next generation of biomedical innovators.", color: "teal" },
            { image: "/Public Outreach.png", title: "Public Outreach", desc: "Making neuroscience accessible to the community through health awareness.", color: "rose" },
          ].map((card, i) => (
            <motion.div
              key={i}
              {...fadeInUp}
              transition={{ delay: i * 0.2 }}
              whileHover={{ y: -10 }}
              className="group cursor-pointer overflow-hidden"
            >
              <div className="relative w-full aspect-[3/4] overflow-hidden">
                <img src={card.image} alt={card.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-8 transition-transform duration-300 translate-y-12 group-hover:translate-y-0">
                  <h4 className="text-3xl font-black mb-4 tracking-tight text-white">{card.title}</h4>
                  <p className="text-white/90 leading-relaxed text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">{card.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Founder & Editor-in-Chief Section */}
      <section className="w-full max-w-7xl px-6 py-16">
        <div className="flex flex-col items-center text-center mb-16 gap-10">
          <div className="space-y-6">
            <h2 className="text-slate-900 dark:text-white font-black uppercase tracking-tight text-3xl md:text-5xl">Founder & Editor-in-Chief</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[3/4] overflow-hidden">
            <img src="/founder.jpg" alt="Dr. Mrs. Olufunto Adeleye" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h3 className="text-3xl font-black text-white tracking-tight">Dr. Mrs. Olufunto Adeleye</h3>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Welcome to Eagles' Research Laboratory</h2>
            <div className="prose prose-lg text-slate-600 dark:text-slate-300">
              <p className="leading-relaxed">
                Welcome to <strong>Eagles' Research Laboratory</strong>, where curiosity drives discovery, innovation inspires progress, and research creates meaningful impact. We are a multidisciplinary research laboratory committed to advancing scientific knowledge through excellence in research, education, collaboration, and innovation.
              </p>
              <p className="leading-relaxed">
                Our mission is to empower researchers, students, and professionals with the knowledge, skills, and resources needed to address real-world challenges across the life sciences, health sciences, biotechnology, and related disciplines. By fostering a culture of critical thinking, scientific integrity, and continuous learning, we strive to transform ideas into solutions that improve lives and contribute to sustainable development.
              </p>
              <p className="leading-relaxed">
                At Eagles' Research Laboratory, we believe that groundbreaking discoveries emerge through collaboration. We bring together passionate minds from diverse backgrounds to conduct high-quality research, provide hands-on training, mentor future scientists, and build partnerships that extend the impact of our work beyond the laboratory.
              </p>
              <p className="leading-relaxed">
                Whether you are an aspiring researcher, an academic, an industry partner, or a curious learner, we invite you to join us on our journey of exploration, innovation, and scientific excellence as we work together to shape a healthier and more knowledge-driven future.
              </p>
            </div>
            <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
              <a href="http://localhost:3000/team" className="inline-flex items-center text-indigo-600 dark:text-indigo-400 font-semibold hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
                Explore More
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsors and Affiliations Section */}
      <section className="w-full max-w-7xl px-6 py-16">
        <div className="flex flex-col items-center text-center mb-16 gap-10">
          <div className="space-y-6">
            <h2 className="text-slate-900 dark:text-white font-black uppercase tracking-tight text-3xl md:text-5xl">Sponsors and Affiliations</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
              Proudly affiliated with leading institutions and organizations advancing neuroscience research and education
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: "Ladoke Akintola University of Technology, Ogbomoso", link: "https://lautech.edu.ng", logo: "https://lautech.edu.ng/sites/default/files/lautech-logo.png", color: "from-blue-500 to-blue-600" },
            { name: "International Brain Research Organization (IBRO)", link: "https://ibro.org", logo: "https://ibro.org/wp-content/uploads/2021/03/IBRO-logo.png", color: "from-purple-500 to-purple-600" },
            { name: "Neuroscience Society of Nigeria", link: "https://web.facebook.com/NeuroscienceSocietyNigeria/", logo: null, color: "from-teal-500 to-teal-600" },
            { name: "Women in Neuroscience, Nigeria", link: "https://winng.org.ng", logo: null, color: "from-rose-500 to-rose-600" },
            { name: "Humbolt Research Hub - Center for Emerging and Re-emerging Infectious Diseases", link: "https://cerid.lautech.edu.ng", logo: null, color: "from-orange-500 to-orange-600" },
            { name: "Laboratory for Experimental and Translational Neuroscience", link: "https://www.facebook.com/neuroMamus", logo: null, color: "from-indigo-500 to-indigo-600" },
          ].map((org, i) => (
            <motion.a
              key={i}
              href={org.link}
              target="_blank"
              rel="noopener noreferrer"
              {...fadeInUp}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-8 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-400 transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br opacity-10 group-hover:opacity-20 transition-opacity" style={{ background: `linear-gradient(to bottom left, var(--tw-gradient-from), var(--tw-gradient-to))` }} />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 overflow-hidden">
                  {org.logo ? (
                    <img src={org.logo} alt={org.name} className="w-full h-full object-contain p-2" />
                  ) : (
                    <Globe className="w-8 h-8 text-indigo-500" />
                  )}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {org.name}
                </h3>
                <div className="flex items-center text-indigo-600 dark:text-indigo-400 font-semibold text-sm group-hover:gap-3 transition-all">
                  <span>Visit Website</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Interactive Join Section */}
      <section className="w-full max-w-7xl px-6 py-16 pt-8 text-center">
        <motion.div 
          {...fadeInUp}
          className="p-20 space-y-10 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-indigo-500/5 -z-10" />
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter">Ready to Advance Neuroscience?</h2>
          <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Join a community of visionaries, researchers, and students dedicated to neurological innovation.
          </p>
          <div className="flex justify-center gap-6 pt-6">
            <a href="/join" className="px-12 py-6 bg-indigo-600 text-white rounded-[2rem] font-black text-lg shadow-xl shadow-indigo-500/20 hover:scale-105 transition-all">
              Apply to Join the Lab
            </a>
          </div>
        </motion.div>
      </section>
    </div>
    <Footer />
    </>
  );
}
