
import React, { useState } from 'react';
import { MapPin, Phone, Sparkles, Loader2, Image as ImageIcon } from 'lucide-react';
import { Branch } from '../types';
import { GoogleGenAI } from '@google/genai';

const Branches: React.FC = () => {
  const [generatedImages, setGeneratedImages] = useState<Record<string, string>>({});
  const [loadingIds, setLoadingIds] = useState<Set<string>>(new Set());

  const branches: Branch[] = [
    {
      id: '1',
      name: 'Rajput Physiotherapy & Pain Relief Center',
      address: 'Near Bhagwan Talkies, Agra, Uttar Pradesh',
      phone: '+91 98765 43210',
      mapLink: '#',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop',
      specialization: 'Pain Management & Ortho',
      description: 'Modern pain relief center featuring high-tech therapy tables, resistance gear, and a warm clinical environment for orthopaedic recovery.'
    },
    {
      id: '2',
      name: 'Bone and Brain Physiotherapy Clinic',
      address: 'Sanjay Place, Civil Lines, Agra, UP',
      phone: '+91 98765 43211',
      mapLink: '#',
      image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2070&auto=format&fit=crop',
      specialization: 'Neurological Rehab',
      description: 'Advanced neurological clinic specializing in stroke and paralysis recovery with specialized neuro-rehab equipment and a bright, clean medical space.'
    },
    {
      id: '3',
      name: 'Maa Pushpa Devi Physiotherapy Hospital',
      address: 'Shastripuram Road, Agra, UP',
      phone: '+91 98765 43212',
      mapLink: '#',
      image: 'https://images.unsplash.com/photo-1538108197017-c1a986eb9330?q=80&w=2031&auto=format&fit=crop',
      specialization: 'Post-Surgical Hospital',
      description: 'Full-scale physiotherapy hospital ward with multiple treatment bays, exercise balls, and professional healthcare monitoring for post-surgical recovery.'
    }
  ];

  const generateClinicPreview = async (branch: Branch) => {
    if (loadingIds.has(branch.id)) return;

    setLoadingIds(prev => new Set(prev).add(branch.id));

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              text: `Generate a photorealistic, high-end, clean, and professional interior photo of a medical clinic named "${branch.name}". 
              The scene should showcase ${branch.description}. 
              Style: Clinical whites, soft teals, modern furniture, well-lit, premium healthcare aesthetic. 
              No people, just the pristine environment.`
            }
          ]
        },
        config: {
          imageConfig: {
            aspectRatio: "4:3"
          }
        }
      });

      // Find the image part in the response
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          const base64Data = part.inlineData.data;
          setGeneratedImages(prev => ({
            ...prev,
            [branch.id]: `data:image/png;base64,${base64Data}`
          }));
          break;
        }
      }
    } catch (error) {
      console.error('Failed to generate branch image:', error);
      alert('We are currently experiencing high traffic for AI previews. Using standard photos instead.');
    } finally {
      setLoadingIds(prev => {
        const next = new Set(prev);
        next.delete(branch.id);
        return next;
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div className="max-w-2xl">
          <h2 className="text-teal-600 font-bold tracking-widest uppercase text-sm mb-4">Our Presence</h2>
          <h3 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Three State-of-the-art Centers</h3>
          <p className="text-slate-500 text-lg">
            Every location is custom-designed for clinical excellence. Use our AI preview to see the specialized equipment available at each branch.
          </p>
        </div>
        <div className="bg-slate-100 p-2 rounded-2xl flex">
          <button className="px-6 py-2 bg-white text-slate-900 font-bold rounded-xl shadow-sm">Grid View</button>
          <button className="px-6 py-2 text-slate-500 font-medium hover:text-teal-600 transition-colors">Map View</button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        {branches.map((branch) => {
          const isGenerating = loadingIds.has(branch.id);
          const currentImage = generatedImages[branch.id] || branch.image;

          return (
            <div key={branch.id} className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col">
              <div className="relative h-72 overflow-hidden bg-slate-200">
                {isGenerating ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-100">
                    <div className="w-16 h-16 border-4 border-teal-100 border-t-teal-600 rounded-full animate-spin mb-4"></div>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest animate-pulse">Generating AI Preview...</p>
                  </div>
                ) : (
                  <img 
                    src={currentImage} 
                    alt={branch.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                )}
                
                <div className="absolute top-4 left-4 flex gap-2">
                  <div className="bg-white/95 backdrop-blur px-3 py-1.5 rounded-full text-[10px] font-extrabold text-teal-700 shadow-sm border border-teal-100 uppercase tracking-tighter">
                    Center {branch.id}
                  </div>
                  {generatedImages[branch.id] && (
                    <div className="bg-teal-600 text-white px-3 py-1.5 rounded-full text-[10px] font-extrabold shadow-sm flex items-center gap-1 uppercase tracking-tighter">
                      <Sparkles className="w-3 h-3" /> AI Visual
                    </div>
                  )}
                </div>
              </div>
              
              <div className="p-8 flex-grow flex flex-col">
                <div className="mb-4">
                  <span className="text-teal-600 font-bold text-[10px] uppercase tracking-widest">{branch.specialization}</span>
                  <h4 className="text-2xl font-bold text-slate-900 leading-tight mt-1">
                    {branch.name}
                  </h4>
                </div>
                
                <div className="space-y-4 mb-10 flex-grow">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                    <p className="text-slate-600 text-sm leading-relaxed">{branch.address}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-teal-600 shrink-0" />
                    <p className="text-slate-600 text-sm font-semibold">{branch.phone}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <button 
                    onClick={() => generateClinicPreview(branch)}
                    disabled={isGenerating}
                    className="flex items-center justify-center gap-2 py-4 px-4 bg-teal-50 hover:bg-teal-100 text-teal-700 rounded-2xl font-bold text-xs transition-all border border-teal-100 disabled:opacity-50"
                  >
                    {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    {generatedImages[branch.id] ? 'Regenerate Preview' : 'Generate AI Clinic Tour'}
                  </button>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <a 
                      href={branch.mapLink}
                      className="flex items-center justify-center gap-2 py-3.5 px-4 bg-slate-50 hover:bg-slate-100 text-slate-900 rounded-2xl font-bold text-xs transition-colors border border-slate-200"
                    >
                      <ImageIcon className="w-4 h-4" />
                      Gallery
                    </a>
                    <a 
                      href={`tel:${branch.phone.replace(/\s/g, '')}`}
                      className="flex items-center justify-center gap-2 py-3.5 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl font-bold text-xs transition-all shadow-lg shadow-teal-600/10"
                    >
                      <Phone className="w-4 h-4" />
                      Call Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-16 bg-teal-900 rounded-[2.5rem] p-8 md:p-12 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-800 rounded-full -mr-32 -mt-32 blur-3xl opacity-50"></div>
        <div className="relative z-10">
          <h4 className="text-2xl md:text-3xl font-bold mb-4">Can't decide which branch is right for you?</h4>
          <p className="text-teal-100/80 mb-8 max-w-xl mx-auto">Our medical coordinators can help you choose the best facility based on your specific clinical needs.</p>
          <button className="bg-white text-teal-900 px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-transform">
            Talk to a Coordinator
          </button>
        </div>
      </div>
    </div>
  );
};

export default Branches;
