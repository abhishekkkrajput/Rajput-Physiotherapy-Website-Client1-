import React from 'react';
import { X } from 'lucide-react';
import BookingWizard from './BookingWizard';

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div
                className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl animate-in zoom-in-95 duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full z-10"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* We reuse the BookingWizard but might need to ensure it fits well */}
                <div className="p-1">
                    <BookingWizard onComplete={onClose} />
                </div>
            </div>
        </div>
    );
};

export default BookingModal;
