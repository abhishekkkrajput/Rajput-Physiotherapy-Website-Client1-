
import React from 'react';
import { Mail, Phone, Calendar } from 'lucide-react';
import BookingWizard from './BookingWizard';

const Contact: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-5 gap-16">
        <div className="lg:col-span-2">
          <h2 className="text-teal-600 font-bold tracking-widest uppercase text-sm mb-4">Contact Us</h2>
          <h3 className="text-4xl font-extrabold text-slate-900 mb-6 leading-tight">Get in Touch <br /> for an Appointment.</h3>
          <p className="text-lg text-slate-600 mb-10 leading-relaxed">
            Book your slot directly using our real-time calendar. Select a date and time that works best for you.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-5 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <div className="bg-teal-50 p-3 rounded-xl text-teal-600">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Available Days</p>
                <p className="text-slate-900 font-bold">Mon - Sat: 9 AM to 8 PM</p>
              </div>
            </div>

            <div className="flex items-center gap-5 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <div className="bg-teal-50 p-3 rounded-xl text-teal-600">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Email Support</p>
                <p className="text-slate-900 font-bold">care@rajputphysio.com</p>
              </div>
            </div>

            <div className="flex items-center gap-5 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <div className="bg-teal-50 p-3 rounded-xl text-teal-600">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Helpline</p>
                <p className="text-slate-900 font-bold">+91 98765 43210</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <BookingWizard />
        </div>
      </div>
    </div>
  );
};

export default Contact;
