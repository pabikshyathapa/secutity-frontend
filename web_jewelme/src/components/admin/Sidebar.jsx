import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const linkClass = "block px-4 py-2 hover:bg-gray-200";
  return (
    <div className="w-64 bg-gray-100 h-screen shadow-md fixed">
      <h2 className="text-2xl font-bold text-center py-6">Admin Panel</h2>
      <nav>
        <NavLink to="/" className={linkClass}>Dashboard</NavLink>
        <NavLink to="/categories" className={linkClass}>Categories</NavLink>
        <NavLink to="/products" className={linkClass}>Products</NavLink>
        <NavLink to="/users" className={linkClass}>Users</NavLink>
      </nav>
    </div>
  );
}
