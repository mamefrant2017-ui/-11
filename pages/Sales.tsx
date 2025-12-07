import React, { useState } from 'react';
import { useStock } from '../context/StockContext';
import { ShoppingCart, Plus, Trash, CheckCircle } from 'lucide-react';
import { Product } from '../types';

const Sales: React.FC = () => {
  const { products, recordSale } = useStock();
  const [cart, setCart] = useState<{ product: Product; qty: number }[]>([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const addToCart = () => {
    if (!selectedProductId) return;
    const product = products.find(p => p.id === selectedProductId);
    if (!product) return;

    if (product.quantity === 0) {
      alert("Product out of stock!");
      return;
    }

    const existing = cart.find(item => item.product.id === selectedProductId);
    if (existing) {
      if (existing.qty + 1 > product.quantity) {
        alert("Cannot exceed available stock!");
        return;
      }
      setCart(cart.map(item => item.product.id === selectedProductId ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCart([...cart, { product, qty: 1 }]);
    }
    setSelectedProductId('');
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.product.id !== id));
  };

  const handleCheckout = () => {
    if (cart.length === 0 || !customerName) return;
    try {
      recordSale({
        customer: customerName,
        items: cart.map(i => ({ productId: i.product.id, quantity: i.qty }))
      });
      setCart([]);
      setCustomerName('');
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (e: any) {
      alert(e.message);
    }
  };

  const total = cart.reduce((acc, item) => acc + (item.product.price * item.qty), 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-140px)]">
      
      {/* Product Selection */}
      <div className="lg:col-span-2 flex flex-col gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h2 className="font-bold text-lg mb-4 text-slate-800">Add Items to Sale</h2>
          <div className="flex gap-4">
            <select 
              className="flex-1 p-3 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
            >
              <option value="">Select Product...</option>
              {products.map(p => (
                <option key={p.id} value={p.id} disabled={p.quantity === 0}>
                  {p.name} - ${p.price} ({p.quantity} in stock)
                </option>
              ))}
            </select>
            <button 
              onClick={addToCart}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold transition"
            >
              Add
            </button>
          </div>
        </div>

        {/* Available Products Grid (Visual Aid) */}
        <div className="flex-1 bg-white p-6 rounded-xl shadow-sm border border-slate-100 overflow-y-auto">
          <h3 className="font-bold text-slate-700 mb-4">Quick Pick</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {products.map(p => (
              <div 
                key={p.id} 
                onClick={() => { setSelectedProductId(p.id); }}
                className={`p-4 rounded-lg border cursor-pointer transition hover:shadow-md ${
                  p.quantity === 0 ? 'bg-slate-100 border-slate-200 opacity-60' : 'bg-white border-slate-200 hover:border-blue-400'
                }`}
              >
                <div className="font-bold text-slate-800 truncate">{p.name}</div>
                <div className="text-blue-600 font-bold">${p.price}</div>
                <div className="text-xs text-slate-500">{p.quantity} available</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cart / Checkout */}
      <div className="bg-white rounded-xl shadow-xl border border-slate-200 flex flex-col h-full">
        <div className="p-6 border-b border-slate-100 bg-slate-50 rounded-t-xl">
          <h2 className="font-bold text-xl text-slate-800 flex items-center gap-2">
            <ShoppingCart /> Current Sale
          </h2>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="text-center text-slate-400 mt-10">Cart is empty</div>
          ) : (
            cart.map(item => (
              <div key={item.product.id} className="flex justify-between items-center bg-slate-50 p-3 rounded">
                <div>
                  <div className="font-bold text-slate-800">{item.product.name}</div>
                  <div className="text-xs text-slate-500">${item.product.price} x {item.qty}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-slate-800">${item.product.price * item.qty}</span>
                  <button onClick={() => removeFromCart(item.product.id)} className="text-red-400 hover:text-red-600">
                    <Trash size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-6 border-t border-slate-100 bg-slate-50 rounded-b-xl space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Customer Name</label>
            <input 
              type="text" 
              className="w-full p-2 border border-slate-200 rounded focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              placeholder="Walk-in Client"
              value={customerName}
              onChange={e => setCustomerName(e.target.value)}
            />
          </div>
          
          <div className="flex justify-between items-center text-lg font-bold text-slate-800">
            <span>Total:</span>
            <span>${total.toLocaleString()}</span>
          </div>

          <button 
            onClick={handleCheckout}
            disabled={cart.length === 0}
            className={`w-full py-3 rounded-lg font-bold text-white transition ${
              cart.length === 0 ? 'bg-slate-300 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            Complete Sale
          </button>
        </div>
      </div>

      {isSuccess && (
        <div className="fixed top-6 right-6 bg-green-500 text-white px-6 py-4 rounded-lg shadow-xl animate-fade-in flex items-center gap-2">
          <CheckCircle /> Sale Recorded Successfully!
        </div>
      )}
    </div>
  );
};

export default Sales;
