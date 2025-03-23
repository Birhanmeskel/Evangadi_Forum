import { useEffect, useState, createContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "./utils/axiosConfig";
import "./App.css";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer.jsx";
import About from "./components/about/About.jsx";
import Header from "./components/Header/Header.jsx";
import Register from "./pages/Register/Register.jsx";
import AnswerPage from "./pages/Answer/AnswerPage.jsx";
import AskQuestion from "./pages/Question/AskQuestion.jsx";
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
  }, []);

  return (
    <AppState.Provider value={{ user, setUser }}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/answer/get-answer/:question_id"
          element={<AnswerPage />}
        />
        <Route path="/ask-question" element={<AskQuestion />} />
      </Routes>
      <About/>
      <Footer />
    </AppState.Provider>
  );
}

export default App;
