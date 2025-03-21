import { useEffect, useState, createContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "./utils/axiosConfig";
import "./App.css";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";

export const AppState = createContext();
function App() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  async function checkUser() {
    try {
      const { data } = await axios.get("/users/check", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      setUser(data);
    } catch (error) {
      console.log(error.response);
      navigate("/login");
    }
  }
  
  useEffect(() => {
    checkUser();
  }, [navigate]);



  
  return (
    <AppState.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </AppState.Provider>
  );
}

export default App;
