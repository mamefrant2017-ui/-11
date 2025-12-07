import React, { useState } from 'react';
import { useStock } from '../context/StockContext';
import { Plus, Edit2, Trash2, Search, X } from 'lucide-react';
import { Product } from '../types';

const Inventory: React.FC = () => {
  const { products, categories, addProduct, updateProduct, deleteProduct } = useStock();
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const initialFormState = {
    sku: '', name: '', categoryId: '', price: 0, cost: 0, quantity: 0, minLevel: 0, supplier: ''
  };
  const [formData, setFormData] = useState(initialFormState);

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingId(product.id);
      setFormData(product);
    } else {
      setEditingId(null);
      setFormData(initialFormState);
    }
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateProduct(editingId, formData);
    } else {
      addProduct(formData);
    }
    setModalOpen(false);
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-slate-800">Inventory Management</h1>
        <button 
          onClick={() => handleOpenModal()} 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
        >
          <Plus size={18} /> Add Product
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by Product Name or SKU..." 
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-xs border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">SKU</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4 text-right">Price</th>
                <th className="px-6 py-4 text-center">Stock</th>
                <th className="px-6 py-4">Supplier</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map((p) => {
                const category = categories.find(c => c.id === p.categoryId)?.name || 'Unknown';
                return (
                  <tr key={p.id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4 font-medium text-slate-800">{p.name}</td>
                    <td className="px-6 py-4 text-slate-500 font-mono text-xs">{p.sku}</td>
                    <td className="px-6 py-4 text-slate-600">{category}</td>
                    <td className="px-6 py-4 text-right font-semibold text-slate-800">${p.price}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${p.quantity <= p.minLevel ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                        {p.quantity}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500">{p.supplier}</td>
                    <td className="px-6 py-4 flex justify-center gap-3">
                      <button onClick={() => handleOpenModal(p)} className="text-blue-600 hover:text-blue-800"><Edit2 size={18} /></button>
                      <button onClick={() => deleteProduct(p.id)} className="text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
                    </td>
                  </tr>
                );
              })}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-400">No products found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden animate-fade-in">
            <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50">
              <h3 className="font-bold text-xl text-slate-800">{editingId ? 'Edit Product' : 'Add New Product'}</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-2 md:col-span-1">
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Product Name</label>
                <input required type="text" className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none" 
                  value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">SKU</label>
                <input required type="text" className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none" 
                  value={formData.sku} onChange={e => setFormData({...formData, sku: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Category</label>
                <select required className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.categoryId} onChange={e => setFormData({...formData, categoryId: e.target.value})}>
                  <option value="">Select Category</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Supplier</label>
                <input required type="text" className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none" 
                  value={formData.supplier} onChange={e => setFormData({...formData, supplier: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Selling Price</label>
                <input required type="number" min="0" className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none" 
                  value={formData.price} onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})} />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Cost Price</label>
                <input required type="number" min="0" className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none" 
                  value={formData.cost} onChange={e => setFormData({...formData, cost: parseFloat(e.target.value)})} />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Initial Quantity</label>
                <input required type="number" min="0" className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none" 
                  value={formData.quantity} onChange={e => setFormData({...formData, quantity: parseInt(e.target.value)})} />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Low Stock Alert Level</label>
                <input required type="number" min="0" className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none" 
                  value={formData.minLevel} onChange={e => setFormData({...formData, minLevel: parseInt(e.target.value)})} />
              </div>
              
              <div className="col-span-2 pt-4 flex gap-4">
                <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition">Save Product</button>
                <button type="button" onClick={() => setModalOpen(false)} className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold py-2 rounded transition">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
