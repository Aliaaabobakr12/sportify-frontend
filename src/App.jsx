import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import Courts from "./pages/Courts";
import useUserStore from "./store/user.store";
import ReactLoading from "react-loading";
import axios from "axios";
import ProtectedRoute from "./utils/ProtectedRoute";
import Reservation from "./pages/Reservation";

export default function App() {
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const setUser = useUserStore((state) => state.setUser);

  const fetchUser = async () => {
    setLoading(true);
    axios
      .get("http://localhost:3000/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data);
        setLoading(false);
        console.log(res.data);
      });
  };

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, []);

  if (loading) {
    return (
      <div className="h-screen p-[40px] flex justify-center items-center gap-[40px]">
        <ReactLoading type="spinningBubbles" color="#11664F" />
      </div>
    );
  }
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/courts" element={<Courts />} />
      <Route path="/reservation/:id" element={<Reservation />} />
      <Route path="*" element={<p>404</p>} />
    </Routes>
  );
}
