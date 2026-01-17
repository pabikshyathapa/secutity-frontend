import { Outlet, NavLink } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";
import { useContext } from "react";
import { FaUser, FaBox, FaTags } from "react-icons/fa"; 
import { useNavigate } from 'react-router-dom';

export default function AdminLayout() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  navigate("/login"); 
};



   return (
  <div className="flex h-screen bg-gray-100">
    {/* Sidebar */}
    <aside className="w-64 bg-red-400 shadow-2xl border-r border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-white mb-8">Admin Panel</h2>
      <nav className="flex flex-col gap-4">
        <NavLink
          to="/admins/userss"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              isActive
                ? "bg-red-100 text-red-700 font-semibold shadow"
                : "text-white hover:bg-red-50 hover:text-red-700"
            }`
          }
        >
          <FaUser /> Users
        </NavLink>

        <NavLink
          to="/admins/productss"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              isActive
                ? "bg-red-100 text-red-700 font-semibold shadow"
                : "text-white hover:bg-red-50 hover:text-red-700"
            }`
          }
        >
          <FaBox /> Products
        </NavLink>

        <NavLink
          to="/admins/categoryy"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              isActive
                ? "bg-red-100 text-red-700 font-semibold shadow"
                : "text-white hover:bg-red-50 hover:text-red-700"
            }`
          }
        >
          <FaTags /> Categories
        </NavLink>

      </nav>
    </aside>

    {/* Main content */}
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <header className="bg-red-400 shadow-md px-6 py-4 flex justify-between items-center border-b border-gray-200">
        <span className="text-lg font-medium text-white">
          Welcome, {user?.username || "Admin"}
        </span>
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-600 transition shadow"
        >
          Logout
        </button>
      </header>

      {/* Main Content */}
      <main className="p-6 overflow-y-auto flex-1 bg-gray-50">
        <div className="bg-white rounded-2xl shadow-lg p-6 min-h-[300px]">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-sm text-gray-500 border-t bg-white">
        © 2025 JewelMe. All rights reserved.
      </footer>
    </div>
  </div>
);
}