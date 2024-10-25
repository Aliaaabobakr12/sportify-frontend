import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import FloatingInput from "../components/FloatingInput";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { registerSchema } from "../schemas/schemas";
import useUserStore from "../store/user.store";
import ReactLoading from "react-loading";
import FormInput from "../components/FormInput";

export default function Register() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const setUser = useUserStore((state) => state.setUser);

  const { values, errors, handleSubmit, handleChange, touched } = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
      phone: "",
      address: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await axios.post(
          "http://localhost:3000/api/auth/register",
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
        toast.success("Register successful");
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
    <div className="h-screen bg-[#171717] flex">
      <div className="flex flex-col w-[50%] justify-center items-center">
        <form onSubmit={handleSubmit} className="flex flex-col w-[70%] gap-5">
          <div className="flex flex-col gap-2">
            <p className="text-5xl font-bold text-white">Create new account</p>
            <p className="text-white text-sm">
              Reserve your spot on the best sports courts in town.
            </p>
          </div>
          <div className="flex gap-2">
            <FormInput
              name="first_name"
              type="text"
              placeHolder="First name"
              value={values.first_name}
              onChange={handleChange}
              error={errors.first_name}
              touched={touched.first_name}
            />
            <FormInput
              name="last_name"
              type="text"
              placeHolder="Last name"
              value={values.last_name}
              onChange={handleChange}
              error={errors.last_name}
              touched={touched.last_name}
            />
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
          <FormInput
            name="confirm_password"
            type="password"
            placeHolder="Confirm Password"
            value={values.confirm_password}
            onChange={handleChange}
            error={errors.confirm_password}
            touched={touched.confirm_password}
          />
          <FormInput
            name="phone"
            type="text"
            placeHolder="Phone Number"
            value={values.phone}
            onChange={handleChange}
            error={errors.phone}
            touched={touched.phone}
          />
          <FormInput
            name="address"
            type="text"
            placeHolder="Address"
            value={values.address}
            onChange={handleChange}
            error={errors.address}
            touched={touched.address}
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
              Register
            </button>
          )}

          <div className="flex gap-1">
            <p className="text-sm text-white">Already a member?</p>
            <Link className="text-sm underline text-[#27c6a9]" to={"/login"}>
              Login
            </Link>
          </div>
        </form>
      </div>
      <div className="w-[50%] pr-10 py-10">
        <img src="/bg.jpg" alt="register" className="rounded-md h-full" />
      </div>
    </div>
  );
}
