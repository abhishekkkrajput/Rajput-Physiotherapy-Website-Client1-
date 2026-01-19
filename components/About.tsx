
import React from 'react';
import { Award, Clock, Users, ShieldCheck } from 'lucide-react';

const About: React.FC = () => {
  const stats = [
    { label: 'Years Experience', value: '15+', icon: <Clock className="w-5 h-5" /> },
    { label: 'Successful Recoveries', value: '12k+', icon: <Users className="w-5 h-5" /> },
    { label: 'Awards Won', value: '08', icon: <Award className="w-5 h-5" /> },
    { label: 'Clinics in Agra', value: '03', icon: <ShieldCheck className="w-5 h-5" /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="absolute -top-4 -left-4 w-64 h-64 bg-teal-50 rounded-full z-0 opacity-50 blur-3xl"></div>
          <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
            <img 
              src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop" 
              alt="Head Physiotherapist" 
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl z-20 border border-slate-100">
            <div className="flex items-center gap-4">
              <div className="bg-teal-600 p-3 rounded-full">
                <Award className="text-white w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Board Certified</p>
                <p className="text-slate-900 font-bold">Gold Medalist PT</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-teal-600 font-bold tracking-widest uppercase text-sm mb-4">Meet the Expert</h2>
          <h3 className="text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
            Leading the Way in Modern <br /> Rehabilitation Excellence.
          </h3>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Our head physiotherapist brings over 15 years of specialized experience in neuro and orthopedic recovery. Having served thousands of patients across Agra, the focus remains on holistic healing through advanced clinical methods and empathetic care.
          </p>

          <div className="grid grid-cols-2 gap-8 mb-10">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col">
                <div className="text-teal-600 mb-2">{stat.icon}</div>
                <span className="text-3xl font-bold text-slate-900">{stat.value}</span>
                <span className="text-slate-500 font-medium text-sm">{stat.label}</span>
              </div>
            ))}
          </div>

          <button className="text-slate-900 font-bold flex items-center gap-2 group hover:text-teal-600 transition-colors">
            Read Full Professional Profile
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

const ArrowRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

export default About;
