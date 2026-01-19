import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, Calendar as CalendarIcon, User, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface BookingWizardProps {
    onComplete?: () => void;
}

type Step = 'date' | 'time' | 'details' | 'success';

const BookingWizard: React.FC<BookingWizardProps> = ({ onComplete }) => {
    const [step, setStep] = useState<Step>('date');
    const [currentDate, setCurrentDate] = useState(new Date()); // For calendar navigation
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        reason: ''
    });

    // Calendar Logic
    const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay(); // 0 = Sun

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const isSameDay = (d1: Date, d2: Date) => {
        return d1.getDate() === d2.getDate() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getFullYear() === d2.getFullYear();
    };

    const isToday = (date: Date) => {
        const today = new Date();
        return isSameDay(date, today);
    };

    const isPast = (date: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
    };

    const handleDateSelect = (day: number) => {
        const selected = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        // Don't allow same day or past dates
        if (isToday(selected) || isPast(selected)) return;

        setSelectedDate(selected);
        setStep('time');
    };

    const generateTimeSlots = () => {
        const slots = [];
        // 10 AM to 7 PM
        for (let i = 10; i <= 19; i++) {
            slots.push(`${i}:00`);
            slots.push(`${i}:30`);
        }
        return slots;
    };

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
        setStep('details');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, send data to backend here
        setStep('success');
        if (onComplete) {
            setTimeout(onComplete, 3000);
        }
    };

    // -- Render Helpers --

    const renderCalendar = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const totalDays = daysInMonth(year, month);
        const startDay = firstDayOfMonth(year, month); // 0 (Sun) - 6 (Sat)

        // Adjust startDay if you want Mon start. Let's stick to standard Sun start for now or Mon based on typical calendars.
        // Standard JS Date.getDay() returns 0 for Sunday.
        // Let's render Sun-Sat header.

        const days = [];
        for (let i = 0; i < startDay; i++) {
            days.push(<div key={`empty-${i}`} className="h-10"></div>);
        }

        for (let day = 1; day <= totalDays; day++) {
            const dateToCheck = new Date(year, month, day);
            const isDisabled = isToday(dateToCheck) || isPast(dateToCheck);
            const isSelected = selectedDate && isSameDay(dateToCheck, selectedDate);

            days.push(
                <button
                    key={day}
                    onClick={() => handleDateSelect(day)}
                    disabled={isDisabled}
                    className={`
                    h-10 w-10 rounded-full flex items-center justify-center text-sm font-medium transition-all
                    ${isSelected ? 'bg-teal-600 text-white shadow-md scale-110' : ''}
                    ${!isSelected && !isDisabled ? 'hover:bg-teal-50 text-slate-700 hover:text-teal-700' : ''}
                    ${isDisabled ? 'text-slate-300 cursor-not-allowed decoration-slate-300' : ''}
                `}
                    title={isDisabled ? "Bookings not available for today or past dates" : ""}
                >
                    {day}
                </button>
            );
        }

        return (
            <div className="animate-in fade-in slide-in-from-right duration-300">
                <div className="flex items-center justify-between mb-6">
                    <button onClick={handlePrevMonth} className="p-2 hover:bg-slate-100 rounded-full text-slate-600">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <h3 className="text-lg font-bold text-slate-800">
                        {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                    </h3>
                    <button onClick={handleNextMonth} className="p-2 hover:bg-slate-100 rounded-full text-slate-600">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-2 text-center">
                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                        <div key={d} className="text-xs font-bold text-slate-400 uppercase tracking-wider">{d}</div>
                    ))}
                </div>

                <div className="grid grid-cols-7 gap-1 place-items-center">
                    {days}
                </div>

                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
                    <div className="w-2 h-2 rounded-full bg-teal-600"></div> Selected
                    <div className="w-2 h-2 rounded-full bg-slate-200 ml-2"></div> Available
                    <div className="w-2 h-2 rounded-full bg-white border border-slate-200 ml-2"></div> Disabled
                </div>
            </div>
        );
    };

    const renderTimeSelection = () => (
        <div className="animate-in fade-in slide-in-from-right duration-300">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-teal-600" />
                Select Time Slot
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                {generateTimeSlots().map(time => (
                    <button
                        key={time}
                        onClick={() => handleTimeSelect(time)}
                        className="py-3 px-4 rounded-xl border border-slate-200 text-slate-700 hover:border-teal-600 hover:bg-teal-50 hover:text-teal-700 transition-all text-sm font-semibold"
                    >
                        {time}
                    </button>
                ))}
            </div>
        </div>
    );

    const renderDetailsForm = () => (
        <div className="animate-in fade-in slide-in-from-right duration-300">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-teal-600" />
                Patient Details
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Full Name</label>
                    <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all"
                        placeholder="Enter full name"
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Phone Number</label>
                    <input
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all"
                        placeholder="+91 99999 99999"
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Purpose of Visit</label>
                    <textarea
                        value={formData.reason}
                        onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all"
                        placeholder="Briefly describe the issue (optional)"
                        rows={2}
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="w-full py-4 mt-2 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-lg hover:shadow-teal-200 transition-all"
                >
                    Confirm Appointment
                </button>
            </form>
        </div>
    );

    const renderSuccess = () => (
        <div className="text-center py-10 animate-in zoom-in duration-300">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Booking Confirmed!</h3>
            <p className="text-slate-500 max-w-xs mx-auto mb-6">
                You are booked for <span className="font-bold text-slate-800">{selectedDate?.toLocaleDateString()}</span> at <span className="font-bold text-slate-800">{selectedTime}</span>.
            </p>
            <p className="text-sm text-slate-400">Our coordinator will call you shortly to confirm.</p>
        </div>
    );

    return (
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col md:flex-row min-h-[500px]">
            {/* Sidebar Info */}
            <div className="bg-slate-50 p-8 md:w-1/3 border-b md:border-b-0 md:border-r border-slate-100 flex flex-col">
                <div className="mb-8">
                    <h4 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Rajput Physiotherapy Group</h4>
                    <h2 className="text-2xl font-extrabold text-slate-900">Appointment Call Booking</h2>
                </div>

                <div className="space-y-6 flex-grow">
                    <div className="flex items-start gap-3 text-slate-600">
                        <Clock className="w-5 h-5 mt-0.5 text-teal-600" />
                        <div>
                            <span className="block font-semibold text-slate-900">30 min</span>
                            <span className="text-sm">Session Duration</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 text-slate-600">
                        <CalendarIcon className="w-5 h-5 mt-0.5 text-teal-600" />
                        <div>
                            <span className="block font-semibold text-slate-900">
                                {selectedDate ? selectedDate.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' }) : "Select Date"}
                            </span>
                            <span className="text-sm">
                                {selectedTime ? selectedTime : "Select Time"}
                            </span>
                        </div>
                    </div>
                </div>

                {step !== 'date' && step !== 'success' && (
                    <button
                        onClick={() => {
                            if (step === 'details') setStep('time');
                            if (step === 'time') {
                                setStep('date');
                                setSelectedDate(null);
                            }
                        }}
                        className="mt-8 flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-teal-600 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </button>
                )}
            </div>

            {/* Main Content Area */}
            <div className="p-8 md:w-2/3 flex flex-col relative">
                <div className="flex-grow">
                    {step === 'date' && renderCalendar()}
                    {step === 'time' && renderTimeSelection()}
                    {step === 'details' && renderDetailsForm()}
                    {step === 'success' && renderSuccess()}
                </div>

                {/* Powered by footer similar to Calendly */}
                <div className="mt-8 text-center md:text-right">
                    <span className="text-[10px] uppercase tracking-widest text-slate-300 font-bold">Powered by RajputPhysio</span>
                </div>
            </div>
        </div>
    );
};

export default BookingWizard;
