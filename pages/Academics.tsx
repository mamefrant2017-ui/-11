import React, { useState } from 'react';
import { Book, CheckCircle, Download, FileText, Layers, Clock, Calendar } from 'lucide-react';
import { CLASSES } from '../constants';

const Academics: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'programs' | 'admissions' | 'calendar'>('programs');

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="bg-school-900 text-white py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Academics & Admissions</h1>
        <p className="text-school-100 max-w-2xl mx-auto text-lg">Excellence in teaching, learning, and research.</p>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-slate-200 sticky top-20 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex overflow-x-auto no-scrollbar">
          <button 
            onClick={() => setActiveTab('programs')}
            className={`py-4 px-6 font-bold text-sm uppercase tracking-wide whitespace-nowrap border-b-2 transition ${
              activeTab === 'programs' ? 'border-school-accent text-school-900' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Academic Programs
          </button>
          <button 
            onClick={() => setActiveTab('admissions')}
            className={`py-4 px-6 font-bold text-sm uppercase tracking-wide whitespace-nowrap border-b-2 transition ${
              activeTab === 'admissions' ? 'border-school-accent text-school-900' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Admissions Process
          </button>
          <button 
            onClick={() => setActiveTab('calendar')}
            className={`py-4 px-6 font-bold text-sm uppercase tracking-wide whitespace-nowrap border-b-2 transition ${
              activeTab === 'calendar' ? 'border-school-accent text-school-900' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Curriculum & Calendar
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        
        {/* Tab 1: Programs (Classes) */}
        {activeTab === 'programs' && (
          <div className="space-y-12 animate-slide-up">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4">Our Classes</h2>
              <p className="text-slate-600">We offer a comprehensive learning path from kindergarten through to senior high school, designed to cater to every stage of a child's development.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {CLASSES.map((cls, idx) => (
                <div key={idx} className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-school-accent hover:shadow-xl transition">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-slate-900">{cls.grade}</h3>
                    <div className="bg-blue-50 text-blue-700 p-2 rounded-lg">
                      <Layers size={24} />
                    </div>
                  </div>
                  <p className="text-slate-600 mb-6">{cls.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-bold text-sm text-slate-800 uppercase mb-2">Key Subjects</h4>
                    <div className="flex flex-wrap gap-2">
                      {cls.subjects.map((sub, i) => (
                        <span key={i} className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded border border-slate-200">{sub}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-slate-500 border-t border-slate-100 pt-4">
                    <span className="font-bold mr-2">Lead Faculty:</span> {cls.teacher}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Admissions */}
        {activeTab === 'admissions' && (
          <div className="animate-slide-up">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-8">
                <section>
                  <h2 className="text-2xl font-serif font-bold text-slate-900 mb-4">Admission Process</h2>
                  <div className="space-y-6">
                    {[
                      { step: 1, title: "Online Application", desc: "Fill out the form below or visit our office to collect the prospectus." },
                      { step: 2, title: "Entrance Assessment", desc: "Students from Grade 1 onwards must sit for a basic aptitude test." },
                      { step: 3, title: "Parent Interview", desc: "An interaction session with the principal or admission counselor." },
                      { step: 4, title: "Document Submission", desc: "Submit previous academic records, birth certificate, and ID proofs." },
                    ].map((s) => (
                      <div key={s.step} className="flex gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-school-900 text-white rounded-full flex items-center justify-center font-bold">
                          {s.step}
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-800 text-lg">{s.title}</h3>
                          <p className="text-slate-600">{s.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <h2 className="text-xl font-bold text-slate-900 mb-4">Fee Structure (2024-2025)</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-slate-200 text-slate-700 font-bold">
                        <tr>
                          <th className="p-3">Grade Level</th>
                          <th className="p-3">Admission Fee</th>
                          <th className="p-3">Tuition (Per Term)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-slate-200">
                          <td className="p-3">Kindergarten</td>
                          <td className="p-3">$200</td>
                          <td className="p-3">$800</td>
                        </tr>
                        <tr className="border-b border-slate-200">
                          <td className="p-3">Primary (1-5)</td>
                          <td className="p-3">$300</td>
                          <td className="p-3">$1,200</td>
                        </tr>
                        <tr className="border-b border-slate-200">
                          <td className="p-3">Secondary (6-10)</td>
                          <td className="p-3">$400</td>
                          <td className="p-3">$1,500</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>
              </div>

              {/* Online Form (HTML only as requested) */}
              <div className="bg-white p-6 rounded-xl shadow-xl border-t-4 border-school-accent h-fit sticky top-40">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Apply Online</h3>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Student Name</label>
                    <input type="text" className="w-full p-2 border border-slate-300 rounded focus:border-school-900 focus:outline-none" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Grade Applying For</label>
                    <select className="w-full p-2 border border-slate-300 rounded focus:border-school-900 focus:outline-none">
                      <option>Select Grade</option>
                      <option>Kindergarten</option>
                      <option>Grade 1</option>
                      <option>Grade 6</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Parent Email</label>
                    <input type="email" className="w-full p-2 border border-slate-300 rounded focus:border-school-900 focus:outline-none" placeholder="parent@example.com" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Phone</label>
                    <input type="tel" className="w-full p-2 border border-slate-300 rounded focus:border-school-900 focus:outline-none" placeholder="+1 (555) 000-0000" />
                  </div>
                  <button className="w-full bg-school-900 text-white font-bold py-3 rounded hover:bg-school-800 transition">
                    Submit Application
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Calendar & Syllabus */}
        {activeTab === 'calendar' && (
          <div className="animate-slide-up">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6">Teaching Methodology</h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <CheckCircle className="text-green-600 shrink-0" />
                    <div>
                      <h4 className="font-bold text-slate-800">Student-Centric Learning</h4>
                      <p className="text-sm text-slate-600">Focusing on individual needs and learning styles.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <CheckCircle className="text-green-600 shrink-0" />
                    <div>
                      <h4 className="font-bold text-slate-800">Project-Based Approach</h4>
                      <p className="text-sm text-slate-600">Encouraging practical application of theoretical knowledge.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <CheckCircle className="text-green-600 shrink-0" />
                    <div>
                      <h4 className="font-bold text-slate-800">Digital Integration</h4>
                      <p className="text-sm text-slate-600">Smart classrooms and online resources for modern education.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12">
                   <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6">Download Syllabus</h2>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {['Primary School Syllabus', 'Middle School Syllabus', 'High School Science', 'High School Commerce'].map((item, i) => (
                        <button key={i} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded hover:bg-school-100 hover:border-school-200 transition group">
                           <span className="text-sm font-semibold text-slate-700 group-hover:text-school-900">{item}</span>
                           <Download size={18} className="text-slate-400 group-hover:text-school-900" />
                        </button>
                      ))}
                   </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                <div className="bg-school-900 text-white p-4">
                   <h3 className="font-bold flex items-center gap-2"><Calendar size={20}/> Academic Calendar 2024</h3>
                </div>
                <div className="p-6 space-y-4">
                  {[
                    { date: "Aug 15", event: "Fall Term Begins" },
                    { date: "Oct 12-15", event: "Mid-Term Break" },
                    { date: "Nov 05", event: "Science Fair" },
                    { date: "Dec 10-18", event: "Term End Examinations" },
                    { date: "Dec 20", event: "Winter Break Begins" },
                  ].map((e, idx) => (
                    <div key={idx} className="flex items-center gap-4 border-b border-slate-100 last:border-0 pb-3 last:pb-0">
                      <div className="w-20 text-xs font-bold text-slate-500 uppercase">{e.date}</div>
                      <div className="text-slate-800 font-medium">{e.event}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Academics;