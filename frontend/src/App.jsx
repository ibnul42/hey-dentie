import Header from "./components/Header";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import SuccessPage from "./pages/SuccessPage";
import CancelPage from "./pages/CancelPage";
import ProtectedAdminRoute from "./routes/ProtectedAdminRoute";
import AdminLayout from "./admin/AdminLayout";
import UsersPage from "./admin/UsersPage";
import BlogsPage from "./admin/BlogsPage";
import SettingsPage from "./admin/SettingsPage";
import PaymentsPage from "./admin/PaymentsPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden overflow-y-auto flex flex-col justify-between bg-[#f6fffc] font-family">
      <Header />
      {/* Define your routes here bg-[#f6fffc] */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/cancel" element={<CancelPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminLayout />
            </ProtectedAdminRoute>
          }
        >
          <Route path="users" element={<UsersPage />} />
          <Route path="blogs" element={<BlogsPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="payments" element={<PaymentsPage />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
