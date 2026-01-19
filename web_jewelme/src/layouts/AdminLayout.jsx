// import { useState, useContext } from "react";
// import { Outlet, NavLink, useNavigate } from "react-router-dom";
// import { AuthContext, useAuth } from "../auth/AuthProvider";
// import { FaUser, FaBox, FaTags, FaSignOutAlt, FaExclamationTriangle } from "react-icons/fa";

// export default function AdminLayout() {
//   const { user } = useContext(AuthContext);
//   const { logout } = useAuth();
//   const navigate = useNavigate();

//   const [showLogoutModal, setShowLogoutModal] = useState(false);

//   const confirmLogout = async () => {
//     try {
//       await logout();            
//       setShowLogoutModal(false); 
//       navigate("/", { replace: true }); 
//     } catch (err) {
//       console.error("Logout failed", err);
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside className="w-64 bg-red-400 shadow-2xl border-r border-gray-200 p-6">
//         <h2 className="text-2xl font-bold text-white mb-8">Admin Panel</h2>

//         <nav className="flex flex-col gap-4">
//           {showLogoutModal && (
//             <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
//               <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl">
//                 <div className="flex flex-col items-center text-center">
//                   <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
//                     <FaExclamationTriangle size={32} />
//                   </div>

//                   <h3 className="text-xl font-bold text-gray-900">
//                     Are you sure?
//                   </h3>

//                   <p className="mt-2 text-gray-500">
//                     You will need to login again to access your account.
//                   </p>

//                   <div className="flex gap-3 mt-8 w-full">
//                     <button
//                       onClick={() => setShowLogoutModal(false)}
//                       className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-semibold rounded-2xl hover:bg-gray-200 transition-all"
//                     >
//                       Cancel
//                     </button>

//                     <button
//                       onClick={confirmLogout}
//                       className="flex-1 px-4 py-3 bg-red-600 text-white font-semibold rounded-2xl hover:bg-red-700 shadow-lg"
//                     >
//                       Yes, Logout
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           <NavLink
//             to="/admins/userss"
//             className={({ isActive }) =>
//               `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
//                 isActive
//                   ? "bg-red-100 text-red-700 font-semibold shadow"
//                   : "text-white hover:bg-red-50 hover:text-red-700"
//               }`
//             }
//           >
//             <FaUser /> Users
//           </NavLink>

//           <NavLink
//             to="/admins/productss"
//             className={({ isActive }) =>
//               `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
//                 isActive
//                   ? "bg-red-100 text-red-700 font-semibold shadow"
//                   : "text-white hover:bg-red-50 hover:text-red-700"
//               }`
//             }
//           >
//             <FaBox /> Products
//           </NavLink>

//           <NavLink
//             to="/admins/categoryy"
//             className={({ isActive }) =>
//               `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
//                 isActive
//                   ? "bg-red-100 text-red-700 font-semibold shadow"
//                   : "text-white hover:bg-red-50 hover:text-red-700"
//               }`
//             }
//           >
//             <FaTags /> Categories
//           </NavLink>
//         </nav>
//       </aside>

//       {/* Main content */}
//       <div className="flex-1 flex flex-col">
//         {/* Header */}
//         <header className="bg-red-400 shadow-md px-6 py-4 flex justify-between items-center">
//           <span className="text-lg font-medium text-white">
//             Welcome, {user?.name || "Admin"}
//           </span>

//           <button
//             onClick={() => setShowLogoutModal(true)}
//             className="flex items-center gap-2 px-6 py-3 bg-white text-red-500 font-bold rounded-2xl hover:bg-red-50 transition-all"
//           >
//             <FaSignOutAlt />
//             Logout
//           </button>
//         </header>

//         {/* Content */}
//         <main className="p-6 overflow-y-auto flex-1 bg-gray-50">
//           <div className="bg-white rounded-2xl shadow-lg p-6 min-h-[300px]">
//             <Outlet />
//           </div>
//         </main>

//         {/* Footer */}
//         <footer className="text-center py-4 text-sm text-gray-500 border-t bg-white">
//           © 2025 JewelMe. All rights reserved.
//         </footer>
//       </div>
//     </div>
//   );
// }

import { useState, useContext } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { AuthContext, useAuth } from "../auth/AuthProvider";
import { 
  FaUser, FaBox, FaTags, FaSignOutAlt, 
  FaExclamationTriangle, FaChevronRight, FaGem 
} from "react-icons/fa";

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

  const navLinkClass = ({ isActive }) =>
    `flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300 group ${
      isActive
        ? "bg-rose-500 text-white shadow-lg shadow-rose-300/50"
        : "text-rose-800/70 hover:bg-rose-200/50 hover:text-rose-900"
    }`;

  return (
    <div className="flex h-screen bg-rose-50/50 font-sans text-slate-900">
      {/* Sidebar - Width reduced to w-60 (15rem) */}
      <aside className="w-60 bg-rose-100/40 flex flex-col border-r border-rose-200/60 backdrop-blur-xl shrink-0">
        <div className="p-6">
          {/* Brand Logo Area - Slightly adjusted padding */}
          <div className="flex items-center gap-2.5 mb-10 px-1">
            <div className="bg-rose-500 p-2 rounded-xl shadow-lg shadow-rose-300/40 rotate-3">
              <FaGem className="text-white text-lg" />
            </div>
            <h2 className="text-xl font-black text-rose-900 tracking-tight">
              Jewel<span className="text-rose-500 underline decoration-rose-300 decoration-2 underline-offset-4">Me</span>
            </h2>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-1.5">
            <p className="text-[10px] font-bold text-rose-400 uppercase tracking-widest mb-2 ml-3">
              Control Center
            </p>
            
            <NavLink to="/admins/userss" className={navLinkClass}>
              <div className="flex items-center gap-3">
                <FaUser className="text-base" />
                <span className="font-bold text-sm">Customers</span>
              </div>
              <FaChevronRight className="text-[9px] opacity-40 group-hover:translate-x-1 transition-transform" />
            </NavLink>

            <NavLink to="/admins/productss" className={navLinkClass}>
              <div className="flex items-center gap-3">
                <FaBox className="text-base" />
                <span className="font-bold text-sm">Inventory</span>
              </div>
              <FaChevronRight className="text-[9px] opacity-40 group-hover:translate-x-1 transition-transform" />
            </NavLink>

            <NavLink to="/admins/categoryy" className={navLinkClass}>
              <div className="flex items-center gap-3">
                <FaTags className="text-base" />
                <span className="font-bold text-sm">Categories</span>
              </div>
              <FaChevronRight className="text-[9px] opacity-40 group-hover:translate-x-1 transition-transform" />
            </NavLink>
          </nav>
        </div>

        {/* User Card - Refined for narrower width */}
        <div className="mt-auto p-4">
          <div className="bg-rose-200/40 border border-rose-200/60 p-3 rounded-2xl flex items-center gap-3 backdrop-blur-md">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-400 to-rose-600 text-white flex items-center justify-center font-bold shadow-md shadow-rose-300 shrink-0 text-sm">
              {user?.name?.charAt(0) || "A"}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-black text-rose-900 truncate">{user?.name || "Admin"}</p>
              <p className="text-[9px] font-bold text-rose-500 uppercase tracking-tight">System Manager</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-gradient-to-br from-rose-50/20 to-rose-100/30">
        {/* Top Header - Kept identical */}
        <header className="h-20 bg-white/40 backdrop-blur-xl border-b border-rose-100/60 px-8 flex justify-between items-center z-10">
          <div className="flex items-center gap-4">
            <div className="h-10 w-1 bg-rose-500 rounded-full hidden md:block"></div>
            <div>
              <h1 className="text-xl font-black text-rose-950">Management Suite</h1>
              <p className="text-xs font-semibold text-rose-400">Welcome back to JewelMe HQ</p>
            </div>
          </div>

          <button
            onClick={() => setShowLogoutModal(true)}
            className="flex items-center gap-2 px-6 py-2.5 bg-rose-500 text-white font-bold rounded-2xl hover:bg-rose-600 transition-all duration-300 shadow-lg shadow-rose-200 active:scale-95"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto h-full">
            <div className="bg-white/80 backdrop-blur-md rounded-[3rem] shadow-[0_20px_50px_rgba(244,63,94,0.05)] border border-white p-8 min-h-[75vh]">
              <Outlet />
            </div>
          </div>
          
          <footer className="mt-8 text-center text-[10px] text-rose-300 font-black uppercase tracking-[0.2em] pb-6">
            JewelMe Digital Experience • v2.0
          </footer>
        </main>
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-rose-950/20 backdrop-blur-md">
          <div className="bg-white rounded-[3rem] p-10 max-w-sm w-full shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border border-rose-50">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-rose-500 text-white rounded-[2rem] flex items-center justify-center mb-6 shadow-xl shadow-rose-200 rotate-12">
                <FaExclamationTriangle size={36} />
              </div>

              <h3 className="text-2xl font-black text-rose-950 leading-tight">
                Wait, Are You Leaving?
              </h3>

              <p className="mt-3 text-rose-800/60 font-medium leading-relaxed">
                Any unsaved changes will be lost. Make sure your inventory updates are finalized.
              </p>

              <div className="grid grid-cols-1 gap-3 mt-10 w-full">
                <button
                  onClick={confirmLogout}
                  className="w-full px-6 py-4 bg-rose-500 text-white font-bold rounded-2xl hover:bg-rose-600 transition-all shadow-lg shadow-rose-200 active:scale-95"
                >
                  Yes, Log Out
                </button>
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="w-full px-6 py-4 bg-rose-50 text-rose-500 font-bold rounded-2xl hover:bg-rose-100 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}