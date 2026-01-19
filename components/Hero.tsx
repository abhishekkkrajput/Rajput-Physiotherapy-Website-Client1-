
import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background with Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-48">
        <div className="max-w-2xl">
          <div className="inline-flex items-center space-x-2 bg-teal-50 border border-teal-100 px-3 py-1 rounded-full mb-6">
            <span className="flex h-2 w-2 rounded-full bg-teal-500 animate-pulse"></span>
            <span className="text-teal-700 text-sm font-medium">Trusted by 5,000+ Patients in Agra</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-tight mb-6 tracking-tight">
            Advanced <span className="text-teal-600">Physiotherapy</span> & Pain Relief.
          </h1>

          <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-xl">
            Reclaim your movement and live life without limits. Personalized treatment across 3 premium locations in Agra.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#centers"
              className="px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-teal-200/50 transition-all flex items-center justify-center gap-2 group"
            >
              Find a Branch
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#services"
              className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-200 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2"
            >
              Our Services
            </a>
          </div>

          <div className="mt-12 flex items-center gap-6">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <img
                  key={i}
                  src={`https://picsum.photos/seed/${i}/40/40`}
                  alt="Patient"
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
              ))}
              <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-xs font-bold text-slate-600">
                +1K
              </div>
            </div>
            <p className="text-sm text-slate-500 font-medium">
              4.9/5 Rating from 200+ Google Reviews
            </p>
          </div>
        </div>
      </div>

      {/* Quick location cards - bottom bar desktop only */}
      <div className="hidden lg:flex absolute bottom-0 right-0 p-8 z-20 space-x-4">
        <div className="bg-white/80 backdrop-blur p-4 rounded-t-xl border-t border-x border-slate-100 shadow-lg min-w-[200px]">
          <h4 className="font-bold text-teal-700 text-sm mb-1 uppercase tracking-wider">Now Open</h4>
          <p className="text-slate-900 font-semibold">Rajput Center</p>
        </div>
        <div className="bg-white/80 backdrop-blur p-4 rounded-t-xl border-t border-x border-slate-100 shadow-lg min-w-[200px]">
          <h4 className="font-bold text-teal-700 text-sm mb-1 uppercase tracking-wider">Expertise</h4>
          <p className="text-slate-900 font-semibold">Neuro & Ortho</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
