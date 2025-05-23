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
          values,
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
            },
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
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-[500px] gap-5 items-center p-10 bg-bgSecondary border border-[#262528] rounded-lg"
      >
        <div className="flex flex-col gap-2 items-center">
          <p className="text-3xl font-semibold text-white">Sign in</p>
          <p className="text-[#7D7C82] text-sm">
            Enter your email and password to access your account
          </p>
        </div>
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
            className="rounded cursor-not-allowed flex items-center justify-center bg-primary w-full py-2 text-white transition h-10"
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
            className="rounded bg-primary w-full py-2 text-sm font-medium text-[#262528] transition hover:bg-primary/80 h-10"
          >
            Login
          </button>
        )}

        <div className="flex gap-1">
          <p className="text-sm text-[#7D7C82]">Don't have an account?</p>
          <Link className="text-sm underline text-[#27c6a9]" to={"/register"}>
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}
