import { Facebook, Instagram, Twitter, Linkedin, Youtube, Mail, Phone, MapPin, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-slate-950 text-slate-400 py-20 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
        
        {/* Brand Column */}
        <div className="space-y-6">
          <div className="text-2xl font-black tracking-tighter text-white">
            EAGLE'S<span className="text-indigo-500">LAB</span>
          </div>
          <p className="text-sm leading-relaxed">
            "Capacity development through research and community engagements."
          </p>
          <p className="text-xs italic">
            Advancing neuroscience and biomedical innovation at the heart of LAUTECH.
          </p>
          <div className="flex gap-4 pt-4">
            <a href="https://facebook.com" className="hover:text-indigo-500 transition-colors"><Facebook size={18} /></a>
            <a href="https://twitter.com" className="hover:text-indigo-500 transition-colors"><Twitter size={18} /></a>
            <a href="https://instagram.com" className="hover:text-indigo-500 transition-colors"><Instagram size={18} /></a>
            <a href="https://linkedin.com" className="hover:text-indigo-500 transition-colors"><Linkedin size={18} /></a>
            <a href="https://youtube.com" className="hover:text-indigo-500 transition-colors"><Youtube size={18} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-6">
          <h4 className="text-white font-bold uppercase tracking-widest text-xs">Explore</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><a href="/about" className="hover:text-indigo-400 transition-colors">About the Lab</a></li>
            <li><a href="/research" className="hover:text-indigo-400 transition-colors">Research Areas</a></li>
            <li><a href="/team" className="hover:text-indigo-400 transition-colors">Our Researchers</a></li>
            <li><a href="/publications" className="hover:text-indigo-400 transition-colors">Publications</a></li>
            <li><a href="/events" className="hover:text-indigo-400 transition-colors">Events & Outreach</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <h4 className="text-white font-bold uppercase tracking-widest text-xs">Contact Us</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin size={18} className="text-indigo-500 shrink-0" />
              <span>College of Health Sciences, LAUTECH, Ogbomoso, Oyo State, Nigeria.</span>
            </li>
            <li className="flex gap-3 items-center">
              <Phone size={18} className="text-indigo-500 shrink-0" />
              <span>+234 (913) 197 0317</span>
            </li>
            <li className="flex gap-3 items-center">
              <Mail size={18} className="text-indigo-500 shrink-0" />
              <span>contact@lautechneuro.org.ng</span>
            </li>
          </ul>
        </div>

        {/* Affiliations */}
        <div className="space-y-6">
          <h4 className="text-white font-bold uppercase tracking-widest text-xs">Affiliations</h4>
          <div className="grid grid-cols-2 gap-4 opacity-50 hover:opacity-100 transition-opacity">
            {["LAUTECH", "IBRO", "NSN", "WIN", "Humboldt Hub", "LETNeu"].map((partner) => (
              <div key={partner} className="text-[10px] font-black border border-white/10 p-2 rounded text-center tracking-tighter">
                {partner}
              </div>
            ))}
          </div>
          <div className="pt-4">
            <a href="/join" className="inline-flex items-center gap-2 text-xs font-bold text-indigo-500 hover:underline uppercase tracking-widest">
              Apply to join the lab <ExternalLink size={12} />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.2em] font-bold">
        <div className="text-slate-600">
          © {new Date().getFullYear()} Eagle's Lab Neuroscience Group.
        </div>
        <div className="flex gap-8 text-slate-600">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="https://lautechneuro.org.ng/" className="text-indigo-600 hover:text-indigo-400 transition-colors">LAUTECH Neuro Group</a>
        </div>
      </div>
    </footer>
  );
}
