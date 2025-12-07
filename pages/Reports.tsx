import React from 'react';
import { useStock } from '../context/StockContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Download } from 'lucide-react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Reports: React.FC = () => {
  const { transactions, categories, products } = useStock();

  // Simple aggregation for Sales vs Purchases
  const transactionSummary = [
    { name: 'Sales', value: transactions.filter(t => t.type === 'SALE').reduce((acc, t) => acc + t.totalAmount, 0) },
    { name: 'Purchases', value: transactions.filter(t => t.type === 'PURCHASE').reduce((acc, t) => acc + t.totalAmount, 0) }
  ];

  // Stock Value by Category
  const stockValueData = categories.map(cat => {
    const catProducts = products.filter(p => p.categoryId === cat.id);
    const value = catProducts.reduce((acc, p) => acc + (p.price * p.quantity), 0);
    return { name: cat.name, value };
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Analytics & Reports</h1>
        <button className="flex items-center gap-2 bg-slate-200 hover:bg-slate-300 text-slate-800 px-4 py-2 rounded-lg font-bold transition">
          <Download size={18} /> Export CSV
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Financial Overview */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-96">
          <h3 className="font-bold text-slate-700 mb-4">Income vs Expenditure</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={transactionSummary}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Stock Value Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-96">
          <h3 className="font-bold text-slate-700 mb-4">Stock Value by Category</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={stockValueData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {stockValueData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Low Stock Report */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
         <div className="p-6 border-b border-slate-100">
           <h3 className="font-bold text-red-600">Critical Stock Report</h3>
         </div>
         <table className="w-full text-sm text-left">
           <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-xs">
             <tr>
               <th className="px-6 py-3">SKU</th>
               <th className="px-6 py-3">Product Name</th>
               <th className="px-6 py-3">Supplier</th>
               <th className="px-6 py-3 text-center">Current Qty</th>
               <th className="px-6 py-3 text-center">Min Level</th>
               <th className="px-6 py-3">Status</th>
             </tr>
           </thead>
           <tbody className="divide-y divide-slate-100">
             {products.filter(p => p.quantity <= p.minLevel).map(p => (
               <tr key={p.id}>
                 <td className="px-6 py-4 font-mono text-slate-600">{p.sku}</td>
                 <td className="px-6 py-4 font-medium">{p.name}</td>
                 <td className="px-6 py-4 text-slate-500">{p.supplier}</td>
                 <td className="px-6 py-4 text-center font-bold text-red-600">{p.quantity}</td>
                 <td className="px-6 py-4 text-center">{p.minLevel}</td>
                 <td className="px-6 py-4"><span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold uppercase">Restock Needed</span></td>
               </tr>
             ))}
             {products.filter(p => p.quantity <= p.minLevel).length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-green-600 font-medium">All inventory levels are healthy.</td>
                </tr>
             )}
           </tbody>
         </table>
      </div>
    </div>
  );
};

export default Reports;
