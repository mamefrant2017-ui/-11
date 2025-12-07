import React from 'react';
import { useStock } from '../context/StockContext';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line
} from 'recharts';
import { DollarSign, Package, AlertTriangle, TrendingUp } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { stats, transactions, products } = useStock();

  // Prepare data for charts
  const salesData = transactions
    .filter(t => t.type === 'SALE')
    .slice(0, 7)
    .map(t => ({
      date: new Date(t.date).toLocaleDateString(),
      amount: t.totalAmount
    }))
    .reverse();

  const stockByCategory = products.reduce((acc: any, curr) => {
    const cat = curr.categoryId; // Simplified, typically would lookup category name
    acc[cat] = (acc[cat] || 0) + curr.quantity;
    return acc;
  }, {});

  const categoryData = Object.keys(stockByCategory).map(key => ({
    name: key === '1' ? 'Electronics' : key === '2' ? 'Furniture' : 'Office', // Simple mapping
    count: stockByCategory[key]
  }));

  const StatCard = ({ title, value, icon: Icon, color, subtext }: any) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-slate-500 text-xs uppercase font-bold tracking-wider">{title}</p>
          <h3 className="text-2xl font-bold text-slate-800 mt-2">{value}</h3>
          {subtext && <p className="text-xs text-slate-400 mt-1">{subtext}</p>}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Inventory Value" 
          value={`$${stats.totalValue.toLocaleString()}`} 
          icon={DollarSign} 
          color="bg-blue-500" 
        />
        <StatCard 
          title="Total Products" 
          value={stats.totalProducts} 
          icon={Package} 
          color="bg-purple-500" 
        />
        <StatCard 
          title="Low Stock Alerts" 
          value={stats.lowStockCount} 
          icon={AlertTriangle} 
          color="bg-red-500" 
          subtext="Items below minimum level"
        />
        <StatCard 
          title="Monthly Sales" 
          value={`$${stats.monthlySales.toLocaleString()}`} 
          icon={TrendingUp} 
          color="bg-green-500" 
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-96">
          <h3 className="font-bold text-slate-800 mb-6">Recent Sales Trend</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip />
              <Line type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-96">
          <h3 className="font-bold text-slate-800 mb-6">Inventory Distribution</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip cursor={{fill: '#f8fafc'}} />
              <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="font-bold text-slate-800">Recent Transactions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-xs">
              <tr>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">Reference</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Party</th>
                <th className="px-6 py-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transactions.slice(0, 5).map((t) => (
                <tr key={t.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${t.type === 'SALE' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                      {t.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-slate-600">{t.invoiceNumber}</td>
                  <td className="px-6 py-4 text-slate-500">{new Date(t.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 font-medium text-slate-800">{t.customerOrSupplier}</td>
                  <td className="px-6 py-4 text-right font-bold text-slate-800">${t.totalAmount.toLocaleString()}</td>
                </tr>
              ))}
              {transactions.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-400 italic">No transactions recorded yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
