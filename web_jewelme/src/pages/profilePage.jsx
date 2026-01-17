import { useEffect, useState } from "react";
import {
  getProfile,
  updateProfile,
  changePassword,
  uploadProfileImage,
} from "../services/profileService";
import { useAuth } from "../auth/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash, FaUserEdit, FaCamera, FaLock, FaSignOutAlt, FaExclamationTriangle } from "react-icons/fa";

const ProfilePage = () => {
  const { logout } = useAuth();

  // Profile State
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    profileImage: "",
  });
  
  const [originalProfile, setOriginalProfile] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const serverBaseUrl = "http://localhost:5050";

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getProfile();
        const fullProfileImage = data.profileImage
          ? `${serverBaseUrl}${data.profileImage}`
          : "";
        const profileData = {
          name: data.name,
          email: data.email,
          phone: data.phone,
          profileImage: fullProfileImage,
        };
        setProfile(profileData);
        setOriginalProfile(profileData);
      } catch (err) {
        toast.error("Failed to load profile");
      }
    };
    loadProfile();
  }, []);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProfile(profile);
      if (res.logout) {
        toast.info(res.message);
        logout();
        window.location.href = "/login";
        return;
      }
      toast.success(res.message);
      setOriginalProfile(profile);
      setIsEditMode(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Profile update failed");
    }
  };

  const cancelEdit = () => {
    setProfile(originalProfile);
    setIsEditMode(false);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await changePassword(passwords);
      toast.success(res.message);
      setPasswords({ oldPassword: "", newPassword: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Password change failed");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleImageUpload = async () => {
    if (!selectedFile) return;
    try {
      const res = await uploadProfileImage(selectedFile);
      const newImageUrl = `${serverBaseUrl}${res.profileImage}`;
      setProfile({ ...profile, profileImage: newImageUrl });
      setOriginalProfile({ ...originalProfile, profileImage: newImageUrl });
      toast.success(res.message);
      setSelectedFile(null);
      setPreviewImage(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Image upload failed");
    }
  };

  const confirmLogout = () => {
    logout();
    toast.success("Logged out successfully");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      
      {/* LOGOUT CONFIRMATION MODAL */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-gray-100 transform transition-all scale-100">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
                <FaExclamationTriangle size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Are you sure?</h3>
              <p className="mt-2 text-gray-500">You will need to login again to access your account.</p>
              
              <div className="flex gap-3 mt-8 w-full">
                <button 
                  onClick={() => setShowLogoutModal(false)}
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-semibold rounded-2xl hover:bg-gray-200 transition-all active:scale-95"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmLogout}
                  className="flex-1 px-4 py-3 bg-red-600 text-white font-semibold rounded-2xl hover:bg-red-700 shadow-lg shadow-red-200 transition-all active:scale-95"
                >
                  Yes, Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
          <div className="text-left">
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Account Settings</h1>
            <p className="mt-2 text-lg text-gray-500 font-medium">Manage your digital identity and security</p>
          </div>
          <button
            onClick={() => setShowLogoutModal(true)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-red-500 border border-red-100 font-bold rounded-2xl hover:bg-red-50 hover:border-red-200 transition-all shadow-sm hover:shadow-md active:scale-95"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Avatar Column */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 flex flex-col items-center">
              <div className="relative group">
                <div className="w-44 h-44 rounded-full overflow-hidden border-[6px] border-white shadow-xl ring-1 ring-gray-100">
                  <img
                    src={previewImage || profile.profileImage || "https://ui-avatars.com/api/?background=random&name=" + profile.name}
                    alt="Profile"
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                  />
                </div>
                <label className="absolute bottom-2 right-2 p-3 bg-blue-600 rounded-2xl text-white cursor-pointer hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-90 hover:-translate-y-1">
                  <FaCamera size={18} />
                  <input type="file" className="hidden" onChange={handleImageChange} />
                </label>
              </div>

              {selectedFile && (
                <div className="mt-6 w-full space-y-2">
                  <button
                    onClick={handleImageUpload}
                    className="w-full py-3 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all"
                  >
                    Upload Image
                  </button>
                  <button
                    onClick={() => {setSelectedFile(null); setPreviewImage(null);}}
                    className="w-full text-sm font-bold text-gray-400 hover:text-red-500 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}
              
              {!selectedFile && (
                <div className="mt-6 text-center">
                  <h3 className="text-2xl font-bold text-gray-900 leading-tight">{profile.name || "User"}</h3>
                  <p className="text-gray-400 font-medium mt-1">{profile.email}</p>
                </div>
              )}
            </div>
          </div>

          {/* Forms Column */}
          <div className="md:col-span-2 space-y-8">
            
            {/* PERSONAL INFORMATION */}
            <div className="bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] border border-gray-50/50">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <span className="p-2 bg-blue-50 text-blue-600 rounded-xl"><FaUserEdit size={20} /></span>
                  Personal Details
                </h3>
                {!isEditMode && (
                  <button
                    onClick={() => setIsEditMode(true)}
                    className="px-4 py-2 text-sm font-bold text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all"
                  >
                    Edit Profile
                  </button>
                )}
              </div>

              <form onSubmit={handleProfileSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-400 ml-1">Full Name</label>
                    <input
                      disabled={!isEditMode}
                      className={`w-full px-5 py-4 rounded-2xl border transition-all duration-300 outline-none ${
                        isEditMode 
                        ? "border-blue-200 bg-white shadow-[0_4px_12px_rgba(59,130,246,0.08)] focus:border-blue-500" 
                        : "border-transparent bg-gray-50 text-gray-600 shadow-inner"
                      }`}
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-400 ml-1">Phone Number</label>
                    <input
                      disabled={!isEditMode}
                      className={`w-full px-5 py-4 rounded-2xl border transition-all duration-300 outline-none ${
                        isEditMode 
                        ? "border-blue-200 bg-white shadow-[0_4px_12px_rgba(59,130,246,0.08)] focus:border-blue-500" 
                        : "border-transparent bg-gray-50 text-gray-600 shadow-inner"
                      }`}
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400 ml-1">Email Address</label>
                  <input
                    disabled={!isEditMode}
                    className={`w-full px-5 py-4 rounded-2xl border transition-all duration-300 outline-none ${
                      isEditMode 
                      ? "border-blue-200 bg-white shadow-[0_4px_12px_rgba(59,130,246,0.08)] focus:border-blue-500" 
                      : "border-transparent bg-gray-50 text-gray-600 shadow-inner"
                    }`}
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    required
                  />
                </div>

                {isEditMode && (
                  <div className="flex items-center gap-4 pt-4 animate-slide-up">
                    <button
                      type="submit"
                      className="flex-[2] py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all active:scale-95"
                    >
                      Update Profile
                    </button>
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="flex-1 py-4 bg-gray-100 text-gray-500 font-bold rounded-2xl hover:bg-gray-200 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </form>
            </div>

            {/* SECURITY / PASSWORD */}
            <div className="bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(168,_85,_247,_0.07)] border border-gray-50/50">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <span className="p-2 bg-purple-50 text-purple-600 rounded-xl"><FaLock size={20} /></span>
                Security
              </h3>
              
              <form onSubmit={handlePasswordSubmit} className="space-y-6">
                <div className="relative">
                  <input
                    type={showOldPassword ? "text" : "password"}
                    placeholder="Current Password"
                    value={passwords.oldPassword}
                    onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
                    required
                    className="w-full pl-6 pr-14 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-purple-300 focus:shadow-[0_4px_12px_rgba(168,85,247,0.08)] outline-none transition-all"
                  />
                  <button
                    type="button"
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-purple-500 transition-colors"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                  >
                    {showOldPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                  </button>
                </div>

                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="New Password"
                    value={passwords.newPassword}
                    onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                    required
                    className="w-full pl-6 pr-14 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-purple-300 focus:shadow-[0_4px_12px_rgba(168,85,247,0.08)] outline-none transition-all"
                  />
                  <button
                    type="button"
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-purple-500 transition-colors"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-purple-600 text-white font-bold rounded-2xl hover:bg-purple-700 shadow-xl shadow-purple-200 transition-all active:scale-95"
                >
                  Change Password
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;