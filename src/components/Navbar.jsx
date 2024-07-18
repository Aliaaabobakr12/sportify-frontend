import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MoveRight, CircleUserRound } from "lucide-react";
import useUserStore from "../store/user.store";
import { FaUserEdit } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";

export default function Navbar({ color }) {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [open, setOpen] = useState(false);

  const token = localStorage.getItem("token");
  const userLogout = useUserStore((state) => state.logout);
  const user = useUserStore((state) => state.user);

  const handleLogout = () => {
    userLogout();
    navigate("/login");
    localStorage.removeItem("token");
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      style={{ background: color }}
      className="flex w-full h-16 items-center justify-between px-4 py-2 text-white border-b-[1px] border-[#323232] sticky top-0 z-50"
    >
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="logo" className="h-8 w-8" />
        <p className="text-xl font-semibold">Hagz</p>
      </div>
      <div className="flex text-white  gap-20 text-sm font-semibold">
        <Link to={"/"} className="hover:text-[#55dcbe]">
          Home
        </Link>
        <Link to={"/reservation/:id"} className="hover:text-[#55dcbe]">
          Reservation
        </Link>
        <Link to={"/reservation/:id"} className="hover:text-[#55dcbe]">
          Contact Us
        </Link>
      </div>
      {token ? (
        <div
          className="relative text-xs cursor-pointer items-center flex flex-col gap-1"
          ref={dropdownRef}
          onClick={() => {
            setOpen(!open);
          }}
        >
          <div>
            <CircleUserRound size={28} strokeWidth={"2px"} />
          </div>
          Hi {user?.first_name}
          {open && (
            <div className="absolute top-14 right-2 z-10 flex flex-col w-[150px] bg-[#2c2c2c] border-[#323232] border rounded text-white">
              <Link
                to={"/profile"}
                className="p-2 flex items-center gap-2 hover:bg-[#323232]"
              >
                <FaUserEdit /> User profile
              </Link>
              <span
                className="p-2 flex items-center gap-2 hover:bg-[#323232]"
                onClick={handleLogout}
              >
                <IoLogOutOutline size={16}/> Logout
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Link to="/login" className=" text-sm">
            Login
          </Link>
          <Link
            to="/"
            type="button"
            className="flex items-center gap-2 bg-[#27c6a9] px-2 py-1 rounded-md"
          >
            Register Now {<MoveRight size={22} strokeWidth={"2px"} />}
          </Link>
        </div>
      )}
    </div>
  );
}
