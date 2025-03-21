import { useEffect } from "react";
import "./App.css";
import Login from "./pages/Login/Login";
import axios from "./utils/axiosConfig";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./components/about/About";

function App() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  async function checkUser() {
    try {
      await axios.get("/users/check", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    } catch (error) {
      console.log(error.response);
      navigate("/login");
    }
  }

  useEffect(() => {
    checkUser();
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About/>} />
      </Routes>
    </>
  );
}

export default App;
