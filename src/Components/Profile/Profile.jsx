import { useState } from "react";
import {
  Camera,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit2,
  X,
  Check,
} from "lucide-react";

import NavBar from "../NavBar/NavBar";
import {useAuthContext} from "../../hooks/useAuthContext"
const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    role: "Premium Member",
    email: "john@example.com",
    phone: "+1 234-567-8900",
    location: "San Francisco, CA",
    joinDate: "Member since 2024",
    profilePic: null,
    bio: "Fashion enthusiast and regular shopper. Love exploring new styles and trends.",
  });

  const [isEditing, setIsEditing] = useState(false);
const {state} = useAuthContext();
const {isLoggedIn} = state;
console.log("kanishka",state);
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData((prev) => ({ ...prev, profilePic: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <div className="mb-4 sm:mb-6 md:mb-10">
        <NavBar />
      </div>
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 md:py-12">
        {/* Glass Effect Header Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-lg sm:rounded-2xl shadow-lg overflow-hidden mb-4 sm:mb-6 md:mb-8">
          <div className="relative h-48 sm:h-56 md:h-64 bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300">
            {/* Profile Picture Overlay */}
            <div className="absolute -bottom-12 sm:-bottom-14 md:-bottom-16 left-4 sm:left-8 md:left-12">
              <div className="relative">
                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full border-4 border-white bg-white shadow-xl overflow-hidden">
                  {profileData.profilePic ? (
                    <img
                      src={profileData.profilePic}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#F5F5F7]">
                      <Camera size={24} className="text-gray-400 sm:hidden" />
                      <Camera
                        size={28}
                        className="text-gray-400 hidden sm:block md:hidden"
                      />
                      <Camera
                        size={32}
                        className="text-gray-400 hidden md:block"
                      />
                    </div>
                  )}
                  <label className="absolute bottom-1 right-1 bg-indigo-600 p-1.5 sm:p-2 rounded-full cursor-pointer hover:bg-indigo-700 transition-all duration-300 shadow-lg">
                    <Camera size={12} className="text-white sm:hidden" />
                    <Camera size={14} className="text-white hidden sm:block" />
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-16 sm:pt-18 md:pt-20 px-4 sm:px-8 md:px-12 pb-6 sm:pb-8">
            {!isEditing ? (
              <div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 sm:gap-0">
                  <div>
                    <h1 className="text-2xl sm:text-2xl md:text-3xl font-semibold text-gray-900">
                      {profileData.name}
                    </h1>
                    <p className="text-indigo-600 font-medium mt-1">
                      {profileData.role}
                    </p>
                  </div>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center justify-center sm:justify-start px-4 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all duration-300 w-full sm:w-auto"
                  >
                    <Edit2 size={16} className="mr-2" />
                    Edit Profile
                  </button>
                </div>
                <p className="mt-4 text-gray-600 max-w-2xl text-sm sm:text-base">
                  {profileData.bio}
                </p>
              </div>
            ) : (
              <div className="animate-fadeIn">
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className="text-2xl sm:text-2xl md:text-3xl font-semibold text-gray-900 bg-transparent border-b border-gray-300 focus:border-indigo-600 outline-none w-full mb-2"
                />
                <textarea
                  value={profileData.bio}
                  onChange={(e) =>
                    setProfileData((prev) => ({ ...prev, bio: e.target.value }))
                  }
                  className="w-full mt-4 p-2 bg-transparent border rounded-lg focus:border-indigo-600 outline-none text-gray-600 text-sm sm:text-base"
                  rows={3}
                />
              </div>
            )}
          </div>
        </div>

        {/* Details Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-lg sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
            Contact Information
          </h2>

          {!isEditing ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-indigo-50 flex items-center justify-center">
                    <Mail size={16} className="text-indigo-600 sm:hidden" />
                    <Mail
                      size={20}
                      className="text-indigo-600 hidden sm:block"
                    />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Email</p>
                    <p className="text-sm sm:text-base text-gray-900">
                      {profileData.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-indigo-50 flex items-center justify-center">
                    <Phone size={16} className="text-indigo-600 sm:hidden" />
                    <Phone
                      size={20}
                      className="text-indigo-600 hidden sm:block"
                    />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Phone</p>
                    <p className="text-sm sm:text-base text-gray-900">
                      {profileData.phone}
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-indigo-50 flex items-center justify-center">
                    <MapPin size={16} className="text-indigo-600 sm:hidden" />
                    <MapPin
                      size={20}
                      className="text-indigo-600 hidden sm:block"
                    />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Location</p>
                    <p className="text-sm sm:text-base text-gray-900">
                      {profileData.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-indigo-50 flex items-center justify-center">
                    <Calendar size={16} className="text-indigo-600 sm:hidden" />
                    <Calendar
                      size={20}
                      className="text-indigo-600 hidden sm:block"
                    />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Member Since
                    </p>
                    <p className="text-sm sm:text-base text-gray-900">
                      {profileData.joinDate}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSave}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-white border border-gray-200 rounded-lg focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 outline-none transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-white border border-gray-200 rounded-lg focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 outline-none transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={profileData.location}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        location: e.target.value,
                      }))
                    }
                    className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-white border border-gray-200 rounded-lg focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 outline-none transition-all duration-300"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-end gap-3 sm:gap-4 mt-6 sm:mt-8">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex items-center justify-center px-6 py-2 border border-gray-200 rounded-full hover:bg-gray-50 transition-all duration-300 w-full sm:w-auto"
                >
                  <X size={16} className="mr-2" />
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center justify-center px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all duration-300 w-full sm:w-auto"
                >
                  <Check size={16} className="mr-2" />
                  Save Changes
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
