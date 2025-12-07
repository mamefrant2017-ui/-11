import React, { useState } from 'react';
import { useStock } from '../context/StockContext';
import { Plus, CheckCircle, Truck } from 'lucide-react';

const Purchases: React.FC = () => {
  const { products, recordPurchase } = useStock();
  const [supplier, setSupplier] = useState('');
  const [invoice, setInvoice] = useState('');
  const [items, setItems] = useState<{ productId: string; quantity: number; cost: number }[]>([]);
  const [success, setSuccess] = useState(false);

  const addItem = () => {
    setItems([...items, { productId: '', quantity: 1, cost: 0 }]);
  };

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...items];
    // @ts-ignore
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.some(i => !i.productId || i.quantity <= 0)) {
      alert("Please fill in valid item details");
      return;
    }
    
    recordPurchase({ supplier, invoice, items });
    setSuccess(true);
    setSupplier('');
    setInvoice('');
    setItems([]);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-orange-100 p-2 rounded-lg">
           <Truck className="text-orange-600" size={24} />
        </div>
        <h1 className="text-2xl font-bold text-slate-800">Record New Purchase</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Supplier Name</label>
            <input 
              required type="text" 
              className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g. Global Tech Supplies"
              value={supplier} onChange={e => setSupplier(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Invoice Number</label>
            <input 
              required type="text" 
              className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g. INV-99201"
              value={invoice} onChange={e => setInvoice(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-700">Items Received</h3>
            <button type="button" onClick={addItem} className="text-sm font-bold text-blue-600 hover:underline flex items-center gap-1">
              <Plus size={16} /> Add Item
            </button>
          </div>
          
          <div className="space-y-4">
            {items.map((item, idx) => (
              <div key={idx} className="flex flex-col md:flex-row gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                <select 
                  required
                  className="flex-[2] p-2 border rounded"
                  value={item.productId}
                  onChange={e => updateItem(idx, 'productId', e.target.value)}
                >
                  <option value="">Select Product</option>
                  {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
                <div className="flex-1">
                   <input 
                    type="number" min="1" placeholder="Qty" required
                    className="w-full p-2 border rounded"
                    value={item.quantity} onChange={e => updateItem(idx, 'quantity', parseInt(e.target.value))}
                   />
                </div>
                <div className="flex-1">
                   <input 
                    type="number" min="0" placeholder="Cost per unit" required
                    className="w-full p-2 border rounded"
                    value={item.cost} onChange={e => updateItem(idx, 'cost', parseFloat(e.target.value))}
                   />
                </div>
                <button type="button" onClick={() => setItems(items.filter((_, i) => i !== idx))} className="text-red-500 font-bold px-2">X</button>
              </div>
            ))}
            {items.length === 0 && (
              <div className="text-center py-8 text-slate-400 border-2 border-dashed border-slate-200 rounded-lg">
                No items added yet. Click "Add Item" to start.
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-slate-100">
          <button 
            type="submit" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition disabled:opacity-50"
            disabled={items.length === 0}
          >
            Confirm Purchase
          </button>
        </div>
      </form>

      {success && (
        <div className="fixed top-6 right-6 bg-green-500 text-white px-6 py-4 rounded-lg shadow-xl animate-fade-in flex items-center gap-2">
          <CheckCircle /> Stock Updated Successfully!
        </div>
      )}
    </div>
  );
};

export default Purchases;
