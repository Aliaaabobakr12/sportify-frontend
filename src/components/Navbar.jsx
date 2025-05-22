import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useUserStore from "../store/user.store";
import { FaUserEdit } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";

export default function Navbar() {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const token = localStorage.getItem("token");
  const userLogout = useUserStore((state) => state.logout);
  const user = useUserStore((state) => state.user);

  const links = [
    { name: "Home", path: "/" },
    { name: "Reservation", path: "/reservation" },
    { name: "Contact Us", path: "/contact" },
  ];

  const handleLogout = () => {
    userLogout();
    localStorage.removeItem("token");
    navigate("/login");
    toast.success("Logout successful");
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
    <div className="bg-[#1A1A1A] flex w-full h-16 items-center justify-between px-4 py-2 text-white border-b-[1px] border-[#323232] sticky top-0 z-50">
      {/* Logo and Title */}
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="logo" className="h-8 w-8" />
        <p className="text-xl font-semibold">Sportify</p>
      </div>

      {/* Navigation Links */}
      <div className="flex gap-20 text-sm font-semibold">
        {links.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            className={`hover:text-primary transition-all duration-300 ${link.path === pathname && "text-primary"} `}
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* New Court Button and User Profile */}
      <div className="flex items-center gap-6">
        {/* New Court Button */}

        {/* User Profile / Logout */}
        {token ? (
          <div
            className="relative text-xs cursor-pointer items-center flex gap-5"
            ref={dropdownRef}
            onClick={() => {
              setOpen(!open);
            }}
          >
            <div className="flex rounded-full bg-[#27c6a9] size-10 items-center justify-center text-xl font-semibold">
              {user?.first_name.split("")[0]}
            </div>
            {user?.is_admin && (
              <button
                onClick={() => navigate("/new_court")}
                className="bg-[#27c6a9] px-2 py-1.5 rounded-md text-sm items-center justify-center flex gap-1 "
              >
                {<FaPlus size={12} />} New Court
              </button>
            )}

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
                  <IoLogOutOutline size={16} /> Logout
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="text-sm hover:text-[#27c6a9] transition-all duration-300"
            >
              Login
            </Link>
            <Link
              to="/register"
              type="button"
              className="flex items-center gap-2 bg-[#27c6a9] px-2 py-1 rounded-md hover:bg-[#55dcbe] transition-all duration-300"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
