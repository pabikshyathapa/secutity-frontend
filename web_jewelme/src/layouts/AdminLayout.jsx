import { useState, useContext } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { AuthContext, useAuth } from "../auth/AuthProvider";
import { FaUser, FaBox, FaTags, FaSignOutAlt, FaExclamationTriangle } from "react-icons/fa";

export default function AdminLayout() {
  const { user } = useContext(AuthContext);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const confirmLogout = async () => {
    try {
      await logout();            
      setShowLogoutModal(false); 
      navigate("/", { replace: true }); 
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-red-400 shadow-2xl border-r border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-white mb-8">Admin Panel</h2>

        <nav className="flex flex-col gap-4">
          {showLogoutModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
              <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
                    <FaExclamationTriangle size={32} />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900">
                    Are you sure?
                  </h3>

                  <p className="mt-2 text-gray-500">
                    You will need to login again to access your account.
                  </p>

                  <div className="flex gap-3 mt-8 w-full">
                    <button
                      onClick={() => setShowLogoutModal(false)}
                      className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-semibold rounded-2xl hover:bg-gray-200 transition-all"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={confirmLogout}
                      className="flex-1 px-4 py-3 bg-red-600 text-white font-semibold rounded-2xl hover:bg-red-700 shadow-lg"
                    >
                      Yes, Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

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
        <header className="bg-red-400 shadow-md px-6 py-4 flex justify-between items-center">
          <span className="text-lg font-medium text-white">
            Welcome, {user?.name || "Admin"}
          </span>

          <button
            onClick={() => setShowLogoutModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-white text-red-500 font-bold rounded-2xl hover:bg-red-50 transition-all"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </header>

        {/* Content */}
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

