import React from 'react';

const Gallery: React.FC = () => {
  const images = [
    { src: '/images/gallery-1.jpg', alt: 'Our Physiotherapy Ward' },
    { src: '/images/gallery-2.jpg', alt: 'Team Workshop and Training' },
    { src: '/images/gallery-3.jpg', alt: 'Expert Leading Seminars' },
    { src: '/images/gallery-4.jpg', alt: 'Modern Clinic Interior' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-teal-600 font-bold tracking-widest uppercase text-sm mb-4">Our Gallery</h2>
        <h3 className="text-4xl font-extrabold text-slate-900 mb-4">Life at Rajput Physiotherapy Group</h3>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Glimpses of our advanced facilities, expert team, and dedication to patient care.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {images.map((image, idx) => (
          <div key={idx} className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer">
            <div className="absolute inset-0 bg-teal-900/0 group-hover:bg-teal-900/40 transition-colors duration-300 z-10"></div>
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
              <p className="text-white font-medium text-lg">{image.alt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
