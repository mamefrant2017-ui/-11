import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Box, Tags, ShoppingCart, Truck, BarChart3, 
  LogOut, Menu, X, Bell 
} from 'lucide-react';

const Layout: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, clear auth tokens here
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Inventory', path: '/inventory', icon: Box },
    { name: 'Categories', path: '/categories', icon: Tags },
    { name: 'Sales', path: '/sales', icon: ShoppingCart },
    { name: 'Purchases', path: '/purchases', icon: Truck },
    { name: 'Reports', path: '/reports', icon: BarChart3 },
  ];

  return (
    <div className="flex h-screen bg-slate-100 font-sans text-slate-900">
      
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 shadow-xl`}>
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          <div className="flex items-center gap-2 font-bold text-xl">
            <div className="bg-blue-500 p-1.5 rounded">
              <Box size={20} className="text-white" />
            </div>
            <span>StockMaster</span>
          </div>
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                location.pathname === item.path 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon size={20} />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-slate-800">
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 w-full text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6 z-10">
          <div className="flex items-center">
            <button 
              className="mr-4 text-slate-500 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h2 className="text-xl font-bold text-slate-800 capitalize">
              {location.pathname.replace('/', '') || 'Dashboard'}
            </h2>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-slate-400 hover:bg-slate-100 rounded-full transition">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-800">Admin User</p>
                <p className="text-xs text-slate-500">Manager</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold border-2 border-white shadow-sm">
                AD
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
