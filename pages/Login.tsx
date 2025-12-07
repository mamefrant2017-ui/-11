import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Lock, User } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth
    if(email && password) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Box size={32} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold text-slate-800">StockMaster Pro</h2>
          <p className="text-slate-500 mt-2">Sign in to manage inventory</p>
        </div>

        <form onSubmit={handleLogin} className="p-8 pt-0 space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Username / Email</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-slate-400" size={20} />
              <input 
                type="text" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                placeholder="admin"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-slate-400" size={20} />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition shadow-lg"
          >
            Login to Dashboard
          </button>
        </form>
        
        <div className="bg-slate-50 p-4 text-center text-xs text-slate-400 border-t border-slate-100">
          Stock Management System v1.0
        </div>
      </div>
    </div>
  );
};

export default Login;
