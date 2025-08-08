import { Outlet, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../lib/AuthContext";

export default function AdminLayout() {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-60 bg-gray-800 text-white p-6 space-y-4">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <nav className="flex flex-col gap-2">
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-300 font-semibold"
                : "hover:text-yellow-200"
            }
          >
            Users
          </NavLink>
           <NavLink
            to="/admin/payments"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-300 font-semibold"
                : "hover:text-yellow-200"
            }
          >
            Payments
          </NavLink>
          {/*
          <NavLink
            to="/admin/settings"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-300 font-semibold"
                : "hover:text-yellow-200"
            }
          >
            Settings
          </NavLink> */}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-6">
        <Outlet />
      </main>
    </div>
  );
}
