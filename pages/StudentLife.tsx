import React, { useState } from 'react';
import { X, Search } from 'lucide-react';
import { GALLERY_IMAGES, EVENTS, NOTICES } from '../constants';

const StudentLife: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [filter, setFilter] = useState('All');

  const filteredImages = filter === 'All' 
    ? GALLERY_IMAGES 
    : GALLERY_IMAGES.filter(img => img.category === filter);

  const uniqueCategories = ['All', ...Array.from(new Set(GALLERY_IMAGES.map(img => img.category)))];

  return (
    <div className="animate-fade-in bg-slate-50 min-h-screen">
       {/* Hero */}
       <div className="bg-school-800 text-white py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Student Life</h1>
        <p className="text-school-100 max-w-2xl mx-auto text-lg">Beyond the classroom: Sports, Arts, and Community.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 space-y-20">
        
        {/* Gallery Section */}
        <section>
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="text-3xl font-serif font-bold text-slate-900">Campus Gallery</h2>
            <div className="flex space-x-2 mt-4 md:mt-0 overflow-x-auto max-w-full pb-2 md:pb-0">
              {uniqueCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold transition whitespace-nowrap ${
                    filter === cat ? 'bg-school-900 text-white' : 'bg-white text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredImages.map((img, index) => (
              <div 
                key={index} 
                className="group relative h-64 rounded-lg overflow-hidden cursor-pointer shadow-md"
                onClick={() => setSelectedImage(img.src)}
              >
                <img src={img.src} alt={img.category} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                  <span className="text-white font-bold tracking-widest uppercase text-sm border-2 border-white px-4 py-2">View</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Clubs & Activities Grid */}
        <section>
          <h2 className="text-3xl font-serif font-bold text-slate-900 mb-8 text-center">Clubs & Societies</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Robotics Club", desc: "Designing the future, one bot at a time.", img: "https://picsum.photos/400/250?random=30" },
              { title: "Debate Society", desc: "Fostering critical thinking and public speaking.", img: "https://picsum.photos/400/250?random=31" },
              { title: "Eco Warriors", desc: "Sustainability initiatives for a greener campus.", img: "https://picsum.photos/400/250?random=32" },
            ].map((club, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-100">
                <img src={club.img} alt={club.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{club.title}</h3>
                  <p className="text-slate-600 text-sm">{club.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Combined News & Notices Layout */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Latest News/Events */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-school-accent pl-4">Latest News & Events</h2>
            {EVENTS.map(event => (
              <div key={event.id} className="bg-white p-4 rounded-lg shadow flex flex-col sm:flex-row gap-6 border border-slate-100">
                <img src={event.image} alt={event.title} className="w-full sm:w-48 h-32 object-cover rounded" />
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-800 mb-1">{event.title}</h3>
                  <div className="text-xs text-school-900 font-bold uppercase mb-2">{event.date} • {event.location}</div>
                  <p className="text-slate-600 text-sm">{event.description}</p>
                  <button className="mt-3 text-sm font-semibold text-slate-500 hover:text-school-900 transition">Read Details &rarr;</button>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar Notices */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-4 text-lg">Important Notices</h3>
              <div className="space-y-4">
                {NOTICES.map(notice => (
                  <div key={notice.id} className="border-l-2 border-slate-300 pl-3 py-1">
                    <p className="text-xs text-slate-500 mb-1">{notice.date}</p>
                    <h4 className="text-sm font-semibold text-slate-800 hover:text-school-accent cursor-pointer transition">{notice.title}</h4>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 py-2 border border-slate-300 rounded text-sm font-bold text-slate-600 hover:bg-slate-50 transition">
                Download All Notices (PDF)
              </button>
            </div>
          </div>
        </section>

      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <button className="absolute top-4 right-4 text-white hover:text-school-accent">
            <X size={32} />
          </button>
          <img src={selectedImage} alt="Gallery Full" className="max-w-full max-h-[90vh] rounded shadow-2xl" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
};

export default StudentLife;
