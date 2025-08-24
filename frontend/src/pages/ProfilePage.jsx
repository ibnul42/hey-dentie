import React, { useContext } from "react";
import { FaUserCircle, FaEdit, FaLock, FaSignOutAlt } from "react-icons/fa";
import { AuthContext } from "../lib/AuthContext";

const ProfilePage = () => {
  const { user, logout, setActiveComponent } = useContext(AuthContext);
  console.log(user);
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row items-center gap-6">
        {/* Profile Picture */}
        <div className="relative w-32 h-32 overflow-hidden rounded-full border-4 border-teal-200 bg-teal-100">
          <img
            src={user?.photo || "/assets/default-avatar.png"}
            alt=""
            className={`w-32 h-32 rounded-full object-cover ${
              !user?.photo && "opacity-0"
            }`}
          />
          <button className="absolute bottom-2 right-2 p-2 rounded-full hover:bg-teal-700">
            <FaEdit size={16} />
          </button>
        </div>

        {/* User Info */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl font-bold text-teal-700">
            {user?.name || "Guest User"}
          </h1>
          <p className="text-gray-500">{user?.email || "example@mail.com"}</p>

          {/* Plan Tag */}

          {/* Premium Badge */}
          {user?.isPremium ? (
            <span className="inline-block ml-2 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-semibold">
              ⭐ Premium User
            </span>
          ) : (
            <span className="inline-block bg-teal-100 text-teal-700 px-3 py-1 rounded-full mt-2 text-sm">
              Free Plan
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
        <button className="flex flex-col items-center p-4 bg-white rounded-xl shadow hover:bg-teal-50 transition">
          <FaEdit className="text-teal-600 text-2xl mb-2" />
          <span>Edit Profile</span>
        </button>
        <button className="flex flex-col items-center p-4 bg-white rounded-xl shadow hover:bg-teal-50 transition">
          <FaLock className="text-teal-600 text-2xl mb-2" />
          <span>Change Password</span>
        </button>
        <button className="flex flex-col items-center p-4 bg-white rounded-xl shadow hover:bg-red-50 transition">
          <FaSignOutAlt className="text-red-600 text-2xl mb-2" />
          <span>Logout</span>
        </button>
      </div>

      {/* Dental Progress Section */}
      <div className="mt-8 bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-teal-700 mb-4">
          Your Dental Progress
        </h2>
        <p className="text-gray-600 mb-4">
          Track your brushing and flossing habits, and see personalized tips.
        </p>
        <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-teal-600"
            style={{ width: user?.progress || "50%" }}
          ></div>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          {user?.progress || "50%"} completed
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;
