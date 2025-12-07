import React from 'react';
import { Target, Heart, Award, Users } from 'lucide-react';
import { FACULTY, SCHOOL_NAME } from '../constants';

const About: React.FC = () => {
  return (
    <div className="bg-white animate-fade-in">
      {/* Header */}
      <div className="bg-school-900 text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">About Us</h1>
        <p className="text-school-100 max-w-2xl mx-auto text-lg">A legacy of excellence, a future of endless possibilities.</p>
      </div>

      {/* Vision & Mission */}
      <section className="py-20 max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-serif font-bold text-slate-900 mb-6">Our History & Heritage</h2>
            <p className="text-slate-600 mb-4 leading-relaxed">
              Founded in 1985, {SCHOOL_NAME} began with a humble mission: to provide accessible, high-quality education to the local community. Over nearly four decades, we have grown from a small building with 50 students to a premier institution serving over 1,200 scholars.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Our campus has expanded to include state-of-the-art science labs, a digital library, and sports complexes, yet our core values remain unchanged.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://picsum.photos/400/500?random=6" alt="School History" className="rounded-lg shadow-lg mt-8" />
            <img src="https://picsum.photos/400/500?random=7" alt="Old Building" className="rounded-lg shadow-lg -mb-8" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
          <div className="bg-slate-50 p-8 rounded-xl border border-slate-100 hover:shadow-lg transition text-center">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Target size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Our Mission</h3>
            <p className="text-slate-600 text-sm">To cultivate a community of lifelong learners who demonstrate critical thinking, creativity, and integrity.</p>
          </div>
          <div className="bg-slate-50 p-8 rounded-xl border border-slate-100 hover:shadow-lg transition text-center">
             <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Our Values</h3>
            <p className="text-slate-600 text-sm">Respect, Responsibility, Resilience, and Reflection form the pillars of our character education.</p>
          </div>
          <div className="bg-slate-50 p-8 rounded-xl border border-slate-100 hover:shadow-lg transition text-center">
             <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Award size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Our Vision</h3>
            <p className="text-slate-600 text-sm">To be a beacon of educational innovation, preparing students to lead in a global society.</p>
          </div>
        </div>
      </section>

      {/* Leadership & Faculty */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4">Meet Our Faculty</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Our educators are mentors, guides, and experts in their fields, dedicated to student success.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {FACULTY.map((member) => (
              <div key={member.id} className="bg-white rounded-xl shadow overflow-hidden group">
                <div className="h-64 overflow-hidden relative">
                   <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-4">
                      <p className="text-white text-sm">{member.qualification}</p>
                   </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-lg font-bold text-slate-900">{member.name}</h3>
                  <p className="text-school-accent font-medium text-sm mb-2">{member.role}</p>
                  <p className="text-slate-400 text-xs uppercase tracking-wider">{member.department}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
