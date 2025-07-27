import Header from "./components/Header";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden overflow-y-auto flex flex-col justify-between bg-[#f6fffc] font-family">
      <Header />
      {/* Define your routes here bg-[#f6fffc] */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* You'll add Login/Register routes next */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
