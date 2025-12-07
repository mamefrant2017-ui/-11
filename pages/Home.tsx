import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Trophy, Calendar, Pin } from 'lucide-react';
import { NOTICES, EVENTS, SCHOOL_NAME } from '../constants';

const Home: React.FC = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/1920/1080?random=1" 
            alt="School Campus" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-school-900/90 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 text-white">
          <div className="max-w-2xl">
            <span className="bg-school-accent text-school-900 font-bold px-3 py-1 text-sm rounded mb-4 inline-block">Admissions Open 2024-25</span>
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 leading-tight">
              Inspiring Minds,<br/> Building Futures
            </h1>
            <p className="text-lg md:text-xl text-slate-200 mb-8 leading-relaxed">
              At {SCHOOL_NAME}, we provide a world-class education that nurtures creativity, critical thinking, and character in a supportive environment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/academics" className="bg-school-accent hover:bg-yellow-500 text-school-900 font-bold py-3 px-8 rounded-lg transition text-center shadow-lg">
                Explore Academics
              </Link>
              <Link to="/about" className="bg-white/10 hover:bg-white/20 backdrop-blur text-white border border-white/30 font-bold py-3 px-8 rounded-lg transition text-center">
                Virtual Tour
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-white -mt-16 relative z-20 max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { icon: Users, label: "Students", value: "1,200+" },
            { icon: BookOpen, label: "Courses", value: "85+" },
            { icon: Trophy, label: "Awards", value: "150+" },
            { icon: Calendar, label: "Years", value: "38" },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-xl flex items-center space-x-4 border-b-4 border-school-accent">
              <div className="bg-school-100 p-3 rounded-full text-school-900">
                <stat.icon size={28} />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-slate-800">{stat.value}</h4>
                <p className="text-sm text-slate-500 font-medium uppercase">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Principal's Message & Notices */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Principal Message */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-12 h-1 bg-school-accent"></span>
              <h2 className="text-sm font-bold uppercase tracking-widest text-school-900">Welcome Message</h2>
            </div>
            <h3 className="text-3xl font-serif font-bold text-slate-900">From the Principal's Desk</h3>
            <div className="flex flex-col md:flex-row gap-6 mt-6">
              <img src="https://picsum.photos/300/350?random=50" alt="Principal" className="w-full md:w-48 h-56 object-cover rounded-lg shadow-lg flex-shrink-0" />
              <div className="space-y-4">
                <p className="text-slate-600 leading-relaxed italic">
                  "Education is not merely the filling of a pail, but the lighting of a fire. At {SCHOOL_NAME}, we strive to ignite that spark in every student. We are committed to fostering an environment where academic excellence meets character development."
                </p>
                <div>
                  <h5 className="font-bold text-slate-900">Dr. Sarah Johnson</h5>
                  <p className="text-sm text-slate-500">Principal, {SCHOOL_NAME}</p>
                </div>
                <Link to="/about" className="inline-flex items-center text-school-900 font-semibold hover:text-school-accent transition mt-2">
                  Read Full Message <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </div>
          </div>

          {/* Notice Board */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <Pin size={20} className="text-school-accent" /> Notice Board
              </h3>
              <Link to="/student-life" className="text-xs font-bold text-school-900 hover:underline">VIEW ALL</Link>
            </div>
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin">
              {NOTICES.map((notice) => (
                <div key={notice.id} className="group cursor-pointer">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    notice.category === 'Academic' ? 'bg-blue-100 text-blue-800' :
                    notice.category === 'Event' ? 'bg-green-100 text-green-800' :
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {notice.category}
                  </span>
                  <h4 className="text-sm font-semibold text-slate-700 mt-1 group-hover:text-school-900 transition">{notice.title}</h4>
                  <p className="text-xs text-slate-400 mt-1">{notice.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Events Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">Upcoming Events</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Stay updated with the latest happenings, workshops, and celebrations at our campus.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {EVENTS.map((event) => (
              <div key={event.id} className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 border border-slate-100">
                <div className="relative h-48 overflow-hidden">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-slate-900 font-bold px-3 py-1 rounded text-xs shadow">
                    {event.date}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-school-900 transition">{event.title}</h3>
                  <div className="flex items-center text-slate-500 text-sm mb-4">
                    <Calendar size={14} className="mr-2" /> {event.time}
                  </div>
                  <p className="text-slate-600 text-sm line-clamp-2 mb-4">{event.description}</p>
                  <Link to="/student-life" className="text-school-900 font-bold text-sm hover:text-school-accent transition flex items-center">
                    Learn More <ArrowRight size={14} className="ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
