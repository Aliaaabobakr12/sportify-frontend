import axios from "axios";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";

export default function NewCourt() {
  const [loading, setLoading] = useState(false);
  const { values, errors, handleSubmit, handleChange, touched, setFieldValue } =
    useFormik({
      initialValues: {
        court_name: "",
        court_address: "",
        court_type: "",
        court_price: "",
        // court_image: null,
      },
      onSubmit: async (values) => {
        setLoading(true);
        const formData = new FormData();
        for (let key in values) {
          formData.append(key, values[key]);
        }
        await axios
          .post("http://localhost:3000/api/courts", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            alert("Court created successfully");
            console.log("Success:", response.data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      },
    });

  const courts_type = [
    {
      name: "Basketball",
      value: "basketball",
    },
    {
      name: "Football",
      value: "football",
    },
    {
      name: "Tennis",
      value: "tennis",
    },
    {
      name: "Padel",
      value: "padel",
    },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
      <div className="bg-[#2c2c2c] p-6 rounded-lg w-11/12 sm:w-1/2 md:w-1/3 lg:w-1/4">
        <h2 className="text-white text-lg mb-4">Create New Court</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-3">
            <div className="mb-4">
              <label className="block text-white mb-2">Name</label>
              <input
                type="text"
                name="court_name"
                onChange={handleChange}
                className="w-full p-2 rounded bg-[#333] text-white border border-[#333] focus:border-[#27c6a9] focus:outline-none placeholder-transparent"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2">Type</label>
              <select
                name="court_type"
                onChange={handleChange}
                className="w-full p-2 rounded bg-[#333] text-white border border-[#333] focus:border-[#27c6a9] focus:outline-none"
                required
              >
                <option value="">Select Type</option>
                {courts_type.map((court) => (
                  <option key={court.value} value={court.value}>
                    {court.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">Address</label>
            <input
              type="text"
              name="court_address"
              onChange={handleChange}
              className="w-full p-2 rounded bg-[#333] text-white border border-[#333] focus:border-[#27c6a9] focus:outline-none placeholder-transparent"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">Price</label>
            <input
              type="number"
              name="court_price"
              onChange={handleChange}
              className="w-full p-2 rounded bg-[#333] text-white border border-[#333] focus:border-[#27c6a9] focus:outline-none placeholder-transparent"
              required
            />
          </div>
          {/* <div className="mb-4">
            <label className="block text-white mb-2">Court Image</label>
            <input
              type="file"
              name="court_image"
              accept="image/*"
              onChange={handleChange}
              className="w-full p-2 rounded bg-[#333] text-white"
            />
            {values.court_image && (
              <img
                src={values.court_image}
                alt="Preview"
                className="mt-2 w-full h-32 object-cover rounded"
              />
            )}
          </div> */}
          <button
            type="submit"
            className="bg-[#27c6a9] text-white px-4 py-2 rounded"
          >
            Create
          </button>
          <button
            type="button"
            onClick={() => setIsFormVisible(false)}
            className="ml-4 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
