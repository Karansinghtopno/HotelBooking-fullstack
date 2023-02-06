import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import Create from "./components/create/Create";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Type from "./components/type/Type";
import TypeDetails from "./components/typeDetails/TypeDetails"

import "./App.css";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/types/:type" element={<Type />} />
        <Route path="/typedetail/:id" element={<TypeDetails />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
