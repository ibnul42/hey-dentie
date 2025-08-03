import Header from "./components/Header";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import SuccessPage from "./pages/SuccessPage";
import CancelPage from "./pages/CancelPage";

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden overflow-y-auto flex flex-col justify-between bg-gray-900 font-family">
      <Header />
      {/* Define your routes here bg-[#f6fffc] */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/cancel" element={<CancelPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
