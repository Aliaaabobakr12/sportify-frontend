import {React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import FloatingInput from "../components/FloatingInput";

export default function Register() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    address: "",
    phone: "",
  });

  const handleChange = (e) => {
    // مش فاهمة
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
      alert("Passwords do not match");
      return;
    }
    axios
      .post("http://localhost:3000/api/auth/register", formData)
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
    <div className="bg-[#171717] flex gap-28 justify-center items-center">
      <div className="h-screen flex flex-col items-center justify-center gap-8 ml-9">
        <p className="text-5xl font-bold text-white self-start">
          Create new account
        </p>
        <p className="text-white text-sm self-start">
          Reserve your spot on the best sports courts in town.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col w-[500px] gap-5">
          <div className="flex gap-2">
            <FloatingInput
              onChange={handleChange}
              name={"first_name"}
              placeholder={"First name"}
              label={"First name"}
            />
            <FloatingInput
              onChange={handleChange}
              name={"last_name"}
              placeholder={"Last name"}
              label={"Last name"}
            />
          </div>
          <FloatingInput
            onChange={handleChange}
            name={"email"}
            placeholder={"Email"}
            label={"Email"}
          />
          <FloatingInput
            onChange={handleChange}
            name={"password"}
            placeholder={"Password"}
            label={"Password"}
          />
          <FloatingInput
            onChange={handleChange}
            name={"confirm_password"}
            placeholder={"Confirm password"}
            label={"Confirm password"}
          />
          <FloatingInput
            onChange={handleChange}
            name={"phone"}
            placeholder={"Phone number"}
            label={"Phone number"}
          />
          <FloatingInput
            onChange={handleChange}
            name={"address"}
            placeholder={"Address"}
            label={"Address"}
          />
          <button
            type="submit"
            className="bg-[#27c6a9] text-white p-2 rounded-md hover:bg-[#55dcbe] transition-all duration-300"
          >
            Register
          </button>
        </form>
        <div className="flex self-center gap-1">
          <p className="text-sm text-white">Already a member?</p>
          <Link className="text-sm underline text-[#27c6a9]" to={"/login"}>
            Login
          </Link>
        </div>
      </div>
      <img
        src="/bg.jpg"
        alt="register"
        className="w-[825px] h-[675px] rounded-md"
      />
    </div>
  );
}
