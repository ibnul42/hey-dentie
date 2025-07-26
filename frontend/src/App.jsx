import Header from "./components/Header";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <div className="h-screen overflow-x-hidden overflow-y-auto flex flex-col bg-[#f6fffc]">
      <Header />
      {/* Define your routes here */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* You'll add Login/Register routes next */}
      </Routes>
    </div>
  );
}

export default App;
