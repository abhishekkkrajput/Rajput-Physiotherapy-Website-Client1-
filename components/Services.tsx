
import React from 'react';
import { Activity, Brain, Dumbbell, HeartPulse, UserRound, Zap } from 'lucide-react';
import { Service } from '../types';

const Services: React.FC = () => {
  const services: Service[] = [
    {
      id: '1',
      title: 'Orthopedic Rehab',
      description: 'Expert treatment for joint pain, fractures, and post-surgical bone recovery.',
      icon: <Activity className="w-6 h-6" />,
    },
    {
      id: '2',
      title: 'Neurological Physio',
      description: 'Specialized care for Stroke, Paralysis, Parkinsons, and spinal injuries.',
      icon: <Brain className="w-6 h-6" />,
    },
    {
      id: '3',
      title: 'Sports Injury',
      description: 'Advanced sports-specific rehabilitation for athletes to return to peak form.',
      icon: <Dumbbell className="w-6 h-6" />,
    },
    {
      id: '4',
      title: 'Post-Surgical Care',
      description: 'Tailored exercise programs to ensure smooth recovery after major surgeries.',
      icon: <HeartPulse className="w-6 h-6" />,
    },
    {
      id: '5',
      title: 'Geriatric Care',
      description: 'Gentle and effective physiotherapy for elderly patients to improve mobility.',
      icon: <UserRound className="w-6 h-6" />,
    },
    {
      id: '6',
      title: 'Pain Management',
      description: 'Modern equipment and manual therapy techniques to manage chronic pain.',
      icon: <Zap className="w-6 h-6" />,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-teal-600 font-bold tracking-widest uppercase text-sm mb-4">Our Expertise</h2>
        <h3 className="text-4xl font-extrabold text-slate-900 mb-4">Specialized Medical Care</h3>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg">
          We combine clinical expertise with state-of-the-art equipment to deliver the highest standard of physiotherapy care.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div 
            key={service.id} 
            className="group bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
          >
            <div className="bg-teal-50 text-teal-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300">
              {service.icon}
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h4>
            <p className="text-slate-500 leading-relaxed mb-6">
              {service.description}
            </p>
            <a href="#contact" className="text-teal-600 font-bold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
              Learn More <span>→</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
