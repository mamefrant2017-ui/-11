import React, { useState } from 'react';
import { useStock } from '../context/StockContext';
import { Plus, Trash2, Tag } from 'lucide-react';

const Categories: React.FC = () => {
  const { categories, addCategory, deleteCategory } = useStock();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(name) {
      addCategory({ name, description });
      setName('');
      setDescription('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Category Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Form */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-fit">
          <h2 className="font-bold text-lg mb-4 text-slate-700 flex items-center gap-2">
            <Plus size={20} className="text-blue-500" /> Add Category
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Name</label>
              <input 
                type="text" required 
                value={name} onChange={e => setName(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="e.g. Electronics"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Description</label>
              <textarea 
                value={description} onChange={e => setDescription(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Category details..."
                rows={3}
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition">
              Create Category
            </button>
          </form>
        </div>

        {/* List */}
        <div className="md:col-span-2 space-y-4">
          {categories.map((category) => (
            <div key={category.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex justify-between items-center group">
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-2 rounded-lg text-purple-600 mt-1">
                  <Tag size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">{category.name}</h3>
                  <p className="text-slate-500 text-sm">{category.description || "No description provided."}</p>
                </div>
              </div>
              <button 
                onClick={() => deleteCategory(category.id)}
                className="text-slate-300 hover:text-red-500 transition p-2"
                title="Delete Category"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
          {categories.length === 0 && (
            <div className="text-center py-12 text-slate-400">No categories found. Add one to get started.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;
