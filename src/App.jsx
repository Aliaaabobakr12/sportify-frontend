import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminRoute from "./utils/AdminRoute";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Courts from "./pages/Courts";
import Reservation from "./pages/Reservation";
import NewCourt from "./pages/NewCourt";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <>
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

        <Route
          path="*"
          element={
            <div className="h-screen w-full flex flex-col justify-center items-center ">
              <p className="text-7xl font-bold"> 404</p>
              <div className="text-gray-500 flex items-center gap-5">
                Sorry, the page was not found! redirecting to home page...
              </div>
            </div>
          }
        />
      </Routes>
      <ToastContainer position="bottom-center" limit={1} autoClose={2000} />
    </>
  );
}
