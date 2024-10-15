import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import ReactLoading from "react-loading";
import Home from "./pages/Home";
import axios from "axios";
import AdminRoute from "./utils/AdminRoute";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Courts from "./pages/Courts";
import useUserStore from "./store/user.store";
import Reservation from "./pages/Reservation";
import NewCourt from "./pages/NewCourt";

export default function App() {
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const setUser = useUserStore((state) => state.setUser);

  const fetchUser = async () => {
    if (token) {
      try {
        const res = await axios.get("http://localhost:3000/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
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
      <Route
        path="/new_court"
        element={
          <AdminRoute>
            <NewCourt />
          </AdminRoute>
        }
      />
      <Route path="/reservation/:id" element={<Reservation />} />
      <Route path="*" element={<p>404</p>} />
    </Routes>
  );
}
