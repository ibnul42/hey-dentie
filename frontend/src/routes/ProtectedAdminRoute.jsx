import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../lib/AuthContext";

export default function ProtectedAdminRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div className="p-6">Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "admin") return <Navigate to="/" replace />;

  return children;
}
