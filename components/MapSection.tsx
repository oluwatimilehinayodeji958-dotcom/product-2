"use client";

export default function MapSection() {
  return (
    <section className="w-full h-[400px] rounded-3xl overflow-hidden glass relative">
      <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
        <div className="text-center space-y-2">
          <p className="text-slate-500 font-medium">Interactive Research Map</p>
          <div className="text-xs px-3 py-1 bg-blue-500 text-white rounded-full inline-block">Lab Location: LAUTECH, Ogbomoso</div>
        </div>
      </div>
      {/* In a real app, you would integrate Google Maps or Leaflet here */}
      <div className="absolute bottom-6 left-6 glass p-6 rounded-2xl max-w-xs">
        <h4 className="font-bold mb-1 text-sm">Eagle's Lab HQ</h4>
        <p className="text-xs text-slate-500">Innovation Center, Block B, University Campus</p>
      </div>
    </section>
  );
}
