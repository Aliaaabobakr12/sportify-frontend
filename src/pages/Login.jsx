import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import FormInput from "../components/FormInput";
import { loginSchema } from "../schemas/schemas";
import ReactLoading from "react-loading";
import { toast } from "react-toastify";
import useUserStore from "../store/user.store";
import { Link } from "react-router-dom";

export default function Login() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  const [loading, setLoading] = useState(false);

  const { values, errors, handleSubmit, handleChange, touched } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await axios.post(
          "http://localhost:3000/api/auth/login",
          values
        );
        const authToken = response.data.token;
        localStorage.setItem("token", authToken);

        if (authToken) {
          const userResponse = await axios.get(
            "http://localhost:3000/api/users/me",
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          );
          setUser(userResponse.data);
        }
        navigate("/");
        toast.success("Login successful");
      } catch (error) {
        setLoading(false);
        toast.error(error.response?.data?.message);
      }
    },
  });

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  if (token) {
    return null;
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-4 bg-secondary">
      <img src="/logo.png" alt="logo" className="w-32" />
      <div className="flex flex-col gap-2 items-center">
        <p className="text-5xl font-bold text-white">Welcome Back!</p>
        <p className="text-white text-sm">
          Enter your credentials to access your account
        </p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col w-[35%] gap-5">
        <FormInput
          name="email"
          type="text"
          placeHolder="Email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          touched={touched.email}
        />
        <FormInput
          name="password"
          type="password"
          placeHolder="Password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
          touched={touched.password}
        />
        {loading ? (
          <button
            disabled
            className="rounded cursor-not-allowed flex items-center justify-center bg-primary px-8 py-2 text-white transition h-10"
          >
            <ReactLoading
              type="bubbles"
              color="#ffffff"
              height={25}
              width={25}
            />
          </button>
        ) : (
          <button
            type="submit"
            className="rounded bg-primary px-8 py-2 text-white transition hover:bg-primary/80 h-10"
          >
            Login
          </button>
        )}
        <div className="flex gap-1">
          <p className="text-sm text-white">{"Don't have an account?"}</p>
          <Link to="/register" className="text-sm underline text-primary">
            Register here
          </Link>
        </div>
      </form>
    </div>
  );
}
