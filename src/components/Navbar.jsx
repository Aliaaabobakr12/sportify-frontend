import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useUserStore from "../store/user.store";
import { FaUserEdit } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { toast } from "react-toastify";

export default function Navbar() {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const { pathname } = useLocation();

  const token = localStorage.getItem("token");
  const userLogout = useUserStore((state) => state.logout);
  const user = useUserStore((state) => state.user);

  const links = [
    { name: "Home", path: "/" },
    { name: "Reservation", path: "/reservation" },
    // { name: "Contact Us", path: "/contact" },
    { name: "Profile", path: "/profile" },
  ];

  const handleLogout = () => {
    userLogout();
    localStorage.removeItem("token");
    navigate("/login");
    toast.success("Logout successful");
  };

  return (
    <div className="bg-[#0c0a09]/80 backdrop-blur w-full border-b-[1px] border-[#262528] sticky top-0 z-50">
      <div className=" lg:max-w-[1600px] lg:min-w-[1024px]  lg:mx-auto flex h-16 items-center justify-between">
        {/* Logo and Title */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="logo" className="h-8 w-8" />
          <p className="text-xl font-semibold">Sportify</p>
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-20 text-sm">
          {links.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className={`hover:text-primary transition-all duration-300 ${
                link.path === pathname && "text-primary"
              } `}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-6">
          {token ? (
            <div className="relative text-xs cursor-pointer items-center flex gap-5">
              <Link
                to="/profile"
                className="flex items-center gap-2 hover:bg-[#7D7C82]/30 rounded-md p-2 transition-all"
              >
                <div className="flex rounded-full bg-[#27c6a9] size-6 items-center justify-center">
                  {user?.first_name.split("")[0]}
                </div>
                <p className="text-sm ">{user?.first_name}</p>
              </Link>
            </div>
          ) : (
            <div className="flex text-sm  items-center gap-4">
              <Link
                to="/login"
                className="hover:text-primary transition-all duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                type="button"
                className="flex items-center gap-2 bg-primary py-2 px-4 rounded-md hover:bg-primary/80 text-[#262528] transition-all duration-300"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
