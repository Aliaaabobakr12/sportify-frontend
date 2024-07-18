import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import FloatingInput from "../components/FloatingInput";

export default function Login() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/auth/login", formData)
      .then((response) => {
        console.log("Success:", response.data);
        localStorage.setItem("token", response.data.token);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);
  
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-8 bg-[#171717]">
      <img src="/logo.png" alt="logo" className="h-24 w-24" />
      <p className="text-4xl font-bold text-white">Welcome Back</p>
      <p className="text-sm text-white">
        Enter your credentials to access your account
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col w-[500px] gap-5">
        <FloatingInput
          placeholder={"Email"}
          label={"Email"}
          name={"email"}
          onChange={handleChange}
          value={formData.email}
        />
        <FloatingInput
          placeholder={"Password"}
          label={"Password"}
          name={"password"}
          onChange={handleChange}
          value={formData.password}
        />
        <Link to="/" className="text-xs text-[#27c6a9] self-end">
          Forgot password?
        </Link>
        <button
          type="submit"
          className="bg-[#27c6a9] text-white p-2 rounded-md hover:bg-[#55dcbe] transition-all duration-300"
        >
          Login
        </button>
        <div className="flex self-center gap-1">
          <p className="text-sm text-white">Don't have an account?</p>
          <Link to="/" className="text-sm underline text-[#27c6a9]">
            Register here
          </Link>
        </div>
      </form>
    </div>
  );
}
