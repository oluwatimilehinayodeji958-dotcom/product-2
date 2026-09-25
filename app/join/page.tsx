import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Join() {
  return (
    <>
    <Navbar />
    <div className="max-w-7xl mx-auto px-6 py-8 pt-28">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <h1 className="text-5xl font-bold">Join the Lab</h1>
        <p className="text-xl text-slate-500">
          We are always looking for passionate researchers, students, and engineers to join our team. 
          Send us your CV and a brief statement of interest.
        </p>
        <div className="glass p-12 rounded-3xl text-left space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name</label>
            <input type="text" className="w-full p-4 rounded-xl border border-white/10 bg-transparent focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="John Doe" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email Address</label>
            <input type="email" className="w-full p-4 rounded-xl border border-white/10 bg-transparent focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="john@example.com" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Primary Interest</label>
            <select className="w-full p-4 rounded-xl border border-white/10 bg-transparent focus:ring-2 focus:ring-indigo-500 outline-none transition-all">
              <option>Neuroscience &amp; Brain Health</option>
              <option>Biomedical Sciences</option>
              <option>Neurological Disorders</option>
              <option>Public Health Neuroscience</option>
              <option>Experimental Research</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Statement of Interest</label>
            <textarea className="w-full p-4 rounded-xl border border-white/10 bg-transparent focus:ring-2 focus:ring-blue-500 outline-none transition-all h-32" placeholder="Why do you want to join Eagle's Lab?"></textarea>
          </div>
          <button className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/20 transition-all">
            Submit Application
          </button>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
