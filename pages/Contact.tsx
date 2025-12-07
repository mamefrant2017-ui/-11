import React from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

const Contact: React.FC = () => {
  return (
    <div className="animate-fade-in bg-slate-50 min-h-screen pb-12">
      <div className="bg-slate-900 text-white py-12 text-center">
        <h1 className="text-3xl font-serif font-bold">Contact Us</h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-8">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
          
          {/* Info Side */}
          <div className="bg-school-900 text-white p-12">
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            <p className="text-school-100 mb-8 leading-relaxed">Have questions about admissions, academics, or campus life? Reach out to us. We are here to help.</p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="text-school-accent shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg">Our Location</h3>
                  <p className="text-slate-300">{CONTACT_INFO.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="text-school-accent shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg">Phone Number</h3>
                  <p className="text-slate-300">{CONTACT_INFO.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="text-school-accent shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg">Email Address</h3>
                  <p className="text-slate-300">{CONTACT_INFO.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="text-school-accent shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg">Office Hours</h3>
                  <p className="text-slate-300">Mon - Fri: 8:00 AM - 4:00 PM</p>
                  <p className="text-slate-300">Sat: 9:00 AM - 1:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="p-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Send Message</h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-1">First Name</label>
                  <input type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-school-900 focus:border-transparent outline-none transition" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-1">Last Name</label>
                  <input type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-school-900 focus:border-transparent outline-none transition" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-1">Email</label>
                <input type="email" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-school-900 focus:border-transparent outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-1">Subject</label>
                <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-school-900 focus:border-transparent outline-none transition text-slate-600">
                  <option>General Inquiry</option>
                  <option>Admissions</option>
                  <option>Careers</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-1">Message</label>
                <textarea rows={4} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-school-900 focus:border-transparent outline-none transition"></textarea>
              </div>
              <button className="bg-school-accent hover:bg-yellow-500 text-school-900 font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2 w-full md:w-auto">
                <Send size={18} /> Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="mt-12 rounded-xl overflow-hidden shadow-lg h-80 bg-slate-200 relative flex items-center justify-center border border-slate-300">
           <img src="https://picsum.photos/1200/400?grayscale" className="absolute inset-0 w-full h-full object-cover opacity-50" />
           <div className="relative z-10 bg-white px-6 py-4 rounded shadow-lg text-center">
             <MapPin size={32} className="text-red-500 mx-auto mb-2" />
             <p className="font-bold text-slate-800">Map Embed Placeholder</p>
             <p className="text-xs text-slate-500">123 Education Lane, Knowledge City</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
