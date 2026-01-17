import React, { useState } from 'react';
import { FiHome, FiBox, FiGrid, FiUsers } from 'react-icons/fi';
import Users from './Users';
import Categories from './Categories';
import Products from './Products';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardOverview />;
      case 'products': return <Products/>;
      case 'categories': return <Categories />;
      case 'users': return <Users />;
      default: return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800 overflow-hidden">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-red-400 border-r border-gray-200 shadow-sm transition-all duration-300`}>
        <div className="p-4 flex items-center justify-between">
          {sidebarOpen && <h1 className="text-xl font-bold text-white">JEWLME Admin</h1>}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            {sidebarOpen ? '\u25C0' : '\u25B6'}
          </button>
        </div>
        <nav className="mt-4 px-2 space-y-1 text-sm font-medium">
          <p className="text-white uppercase px-2 text-xs">Main Menu</p>
          <NavItem icon={<FiHome size={18} />} text="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} sidebarOpen={sidebarOpen} />
          <NavItem icon={<FiBox size={18} />} text="Products" active={activeTab === 'products'} onClick={() => setActiveTab('products')} sidebarOpen={sidebarOpen} />
          <NavItem icon={<FiGrid size={18} />} text="Categories" active={activeTab === 'categories'} onClick={() => setActiveTab('categories')} sidebarOpen={sidebarOpen} />
          <NavItem icon={<FiUsers size={18} />} text="Users" active={activeTab === 'users'} onClick={() => setActiveTab('users')} sidebarOpen={sidebarOpen} />
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8 bg-gray-50">
        {renderContent()}
      </div>
    </div>
  );
};

const NavItem = ({ icon, text, active, onClick, sidebarOpen }) => (
  <div 
    className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 ${active ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'hover:bg-gray-100'}`}
    onClick={onClick}
  >
    <div>{icon}</div>
    {sidebarOpen && <span>{text}</span>}
  </div>
);

const DashboardOverview = () => (
  <div>
    <div className="flex justify-between items-start mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500">Welcome back! Here's what's happening with your jewelry store.</p>
      </div>
      <div className="text-sm text-gray-400">
        Last updated <br />
        <span className="font-medium text-gray-600">2 minutes ago</span>
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {[
        { title: 'Total Revenue', value: '$45,231.89', change: '+20.1%', color: 'green', icon: '💲' },
        { title: 'Orders', value: '2,350', change: '+180.1%', color: 'blue', icon: '🛒' },
        { title: 'Products', value: '1,234', change: '+19%', color: 'purple', icon: '📦' },
        { title: 'Active Users', value: '573', change: '+201', color: 'orange', icon: '👤' }
      ].map((stat, idx) => (
        <div key={idx} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{stat.title}</p>
              <h2 className="text-2xl font-bold text-gray-800">{stat.value}</h2>
              <p className={`text-sm text-${stat.color}-500 mt-1`}>↑ {stat.change} from last month</p>
            </div>
            <div className={`bg-${stat.color}-100 p-2 rounded-full text-${stat.color}-600`}>
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>

    <div className="bg-white rounded-xl shadow-md">
      <div className="flex justify-between items-center px-6 py-4 border-b">
        <div>
          <h2 className="text-lg font-semibold">Recent Orders</h2>
          <p className="text-sm text-gray-500">Latest orders from your jewelry store</p>
        </div>
        <button className="text-sm px-4 py-1 border rounded-lg hover:bg-gray-100">View All</button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-gray-500 bg-gray-50">
            <tr>
              <th className="py-3 px-6 text-left">Order ID</th>
              <th className="py-3 px-6 text-left">Customer</th>
              <th className="py-3 px-6 text-left">Product</th>
              <th className="py-3 px-6 text-left">Amount</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Date</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            <tr className="border-t hover:bg-gray-50">
              <td className="px-6 py-3 font-medium">ORD-001</td>
              <td className="px-6 py-3">Sarah Johnson</td>
              <td className="px-6 py-3">Gold Jhumka Earrings</td>
              <td className="px-6 py-3 font-semibold">$299</td>
              <td className="px-6 py-3"><span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">completed</span></td>
              <td className="px-6 py-3">2024-01-15</td>
            </tr>
            <tr className="border-t hover:bg-gray-50">
              <td className="px-6 py-3 font-medium">ORD-002</td>
              <td className="px-6 py-3">Emily Chen</td>
              <td className="px-6 py-3">Diamond Necklace</td>
              <td className="px-6 py-3 font-semibold">$1,299</td>
              <td className="px-6 py-3"><span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs">processing</span></td>
              <td className="px-6 py-3">2024-01-14</td>
            </tr>
            <tr className="border-t hover:bg-gray-50">
              <td className="px-6 py-3 font-medium">ORD-003</td>
              <td className="px-6 py-3">Maria Garcia</td>
              <td className="px-6 py-3">Silver Ring Set</td>
              <td className="px-6 py-3 font-semibold">$199</td>
              <td className="px-6 py-3"><span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full text-xs">shipped</span></td>
              <td className="px-6 py-3">2024-01-13</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const ProductsPage = () => <div className="p-6 text-xl font-bold">Products</div>;
const CategoriesPage = () => <div className="p-6 text-xl font-bold">Categories</div>;
const UsersPage = () => <div className="p-6 text-xl font-bold">Users</div>;

export default AdminDashboard;
