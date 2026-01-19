
import React, { useState } from 'react';
import { Send, Mail, Phone, Calendar, CheckCircle2 } from 'lucide-react';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-5 gap-16">
        <div className="lg:col-span-2">
          <h2 className="text-teal-600 font-bold tracking-widest uppercase text-sm mb-4">Contact Us</h2>
          <h3 className="text-4xl font-extrabold text-slate-900 mb-6 leading-tight">Get in Touch <br /> for an Appointment.</h3>
          <p className="text-lg text-slate-600 mb-10 leading-relaxed">
            Fill out the form and our representative will call you back within 2 hours to confirm your time slot across any of our 3 branches.
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
                <p className="text-slate-900 font-bold">care@agraphysio.com</p>
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
          <div className="bg-white p-10 rounded-3xl shadow-2xl border border-slate-100 relative overflow-hidden">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 animate-in fade-in zoom-in duration-500">
                <div className="bg-teal-100 p-5 rounded-full text-teal-600 mb-4">
                  <CheckCircle2 className="w-16 h-16" />
                </div>
                <h4 className="text-2xl font-bold text-slate-900">Message Received!</h4>
                <p className="text-slate-500 max-w-sm">
                  Thank you for reaching out. Our medical coordinator will contact you shortly.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-teal-600 font-bold hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="John Doe"
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                    <input 
                      required
                      type="tel" 
                      placeholder="+91 00000 00000"
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Select Branch</label>
                  <select className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all">
                    <option>Rajput Physiotherapy Center</option>
                    <option>Bone and Brain Clinic</option>
                    <option>Maa Pushpa Devi Hospital</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Primary Symptom / Message</label>
                  <textarea 
                    rows={4}
                    placeholder="Briefly describe your condition..."
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-5 rounded-xl shadow-lg hover:shadow-teal-200 flex items-center justify-center gap-3 transition-all"
                >
                  Send Inquiry
                  <Send className="w-5 h-5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
