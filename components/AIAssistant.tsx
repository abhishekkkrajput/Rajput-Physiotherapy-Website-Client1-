
import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Loader2, Sparkles } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // Create a new GoogleGenAI instance right before making an API call to ensure it uses the most up-to-date API key
      // and use process.env.API_KEY directly as per guidelines.
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are an AI medical assistant for the "Agra Physio Group", a premier physiotherapy clinic in Agra, India. 
        Your goal is to briefly answer health-related questions and suggest suitable physiotherapy services we offer. 
        ALWAYS state that you are an AI and not a doctor.
        The clinics are located at:
        1. Rajput Physiotherapy & Pain Relief Center (Near Bhagwan Talkies)
        2. Bone and Brain Physiotherapy Clinic (Sanjay Place)
        3. Maa Pushpa Devi Physiotherapy Hospital (Shastripuram Road)
        
        Keep answers empathetic, clinical, and helpful. Suggest booking an appointment for a physical assessment.
        User question: ${userMessage}`,
        config: {
          systemInstruction: "You are a friendly medical concierge for Agra Physio Group. Be professional and concise."
        }
      });

      // Access the .text property directly as it returns string | undefined
      const aiResponse = response.text || "I apologize, I'm having trouble connecting. Please call us directly for assistance.";
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      console.error('AI Error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm sorry, I encountered an error. Please contact our front desk at +91 98765 43210." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-teal-600 text-white p-4 rounded-full shadow-lg hover:shadow-teal-200/50 transition-all hover:scale-110 flex items-center justify-center group"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
        {!isOpen && (
          <span className="absolute right-14 bg-white text-slate-900 px-3 py-1 rounded-lg text-xs font-bold shadow-sm whitespace-nowrap border border-slate-100 hidden group-hover:block animate-in fade-in slide-in-from-right-2 duration-300">
            Ask AI Assistant
          </span>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 sm:w-96 h-[500px] bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden z-50 animate-in slide-in-from-bottom-4 duration-300">
          <div className="bg-teal-600 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              <div>
                <h4 className="font-bold text-sm">Physio Assistant</h4>
                <p className="text-[10px] opacity-80 uppercase tracking-widest font-bold">Powered by Gemini AI</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)}>
              <X className="w-5 h-5 opacity-70 hover:opacity-100" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.length === 0 && (
              <div className="text-center py-10 px-4">
                <div className="bg-teal-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bot className="text-teal-600 w-6 h-6" />
                </div>
                <p className="text-slate-900 font-bold mb-1">How can I help you today?</p>
                <p className="text-slate-500 text-xs">Ask about symptoms, branch locations, or specific physiotherapy treatments.</p>
              </div>
            )}
            
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-teal-600 text-white rounded-tr-none' 
                    : 'bg-white text-slate-700 shadow-sm border border-slate-100 rounded-tl-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 rounded-tl-none flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-teal-600" />
                  <span className="text-xs text-slate-400">Thinking...</span>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t border-slate-100">
            <div className="relative">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                type="text" 
                placeholder="Type your question..."
                className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 text-sm"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="absolute right-2 top-2 p-1.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-slate-400 mt-3 text-center">
              *AI advice is not a substitute for professional medical diagnosis.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
