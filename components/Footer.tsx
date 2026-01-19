
import React from 'react';
import { Facebook, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center space-x-2 mb-8">
              <div className="bg-teal-600 p-2 rounded-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-white text-xl font-bold tracking-tight">Rajput Physiotherapy Group</span>
            </div>
            <p className="text-slate-400 mb-8 leading-relaxed">
              Agra's most trusted physiotherapy network with 15+ years of excellence in neuro, ortho, and sports rehabilitation.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-teal-600 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-teal-600 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>

            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><a href="#home" className="hover:text-teal-500 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-teal-500 transition-colors">About the Doctor</a></li>
              <li><a href="#services" className="hover:text-teal-500 transition-colors">Services</a></li>
              <li><a href="#centers" className="hover:text-teal-500 transition-colors">Our Centers</a></li>
              <li><a href="#contact" className="hover:text-teal-500 transition-colors">Book Appointment</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Our Services</h4>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-teal-500 transition-colors">Neurological Rehab</a></li>
              <li><a href="#" className="hover:text-teal-500 transition-colors">Orthopedic Care</a></li>
              <li><a href="#" className="hover:text-teal-500 transition-colors">Sports Medicine</a></li>
              <li><a href="#" className="hover:text-teal-500 transition-colors">Elderly Mobility</a></li>
              <li><a href="#" className="hover:text-teal-500 transition-colors">Paralysis Treatment</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Locations</h4>
            <ul className="space-y-4 text-sm">
              <li className="pb-2 border-b border-slate-800">
                <span className="block text-teal-500 font-bold mb-1">Branch 1: Rajput Center</span>
                Near Bhagwan Talkies, Agra
              </li>
              <li className="pb-2 border-b border-slate-800">
                <span className="block text-teal-500 font-bold mb-1">Branch 2: Bone & Brain Clinic</span>
                Sanjay Place, Civil Lines, Agra
              </li>
              <li>
                <span className="block text-teal-500 font-bold mb-1">Branch 3: Maa Pushpa Devi Hospital</span>
                Shastripuram Road, Agra
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm">
            © {currentYear} Rajput Physiotherapy Group. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Medical Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
