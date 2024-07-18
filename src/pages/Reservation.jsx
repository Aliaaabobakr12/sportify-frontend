import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import useUserStore from "../store/user.store";
import useDateStore from "../store/date.store";
import { CircleCheckBig } from "lucide-react";
import { RiInformation2Fill } from "react-icons/ri";
import { FaUserPen } from "react-icons/fa6";

function Form({ court_id, price }) {
  const token = localStorage.getItem("token");

  const [timeSlot, setTimeSlot] = useState("00:00 - 01:00");

  const date = useDateStore((state) => state.date);

  const user = useUserStore((state) => state.user);
  const [formData, setFormData] = useState({
    user_id: user.user_id,
    court_id: court_id,
    price: price,
    timeslot_start: "",
    timeslot_end: "",
    date_of_reservation: date,
    with_coach: false,
    with_tools: false,
  });

  useEffect(() => {
    if (timeSlot) {
      const [start, end] = timeSlot.split(" - ");
      setFormData({
        ...formData,
        timeslot_start: start,
        timeslot_end: end,
      });
    }
  }, [timeSlot]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/reservations", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Success:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const time_slots = [
    "00:00 - 01:00",
    "01:00 - 02:00",
    "02:00 - 03:00",
    "03:00 - 04:00",
    "04:00 - 05:00",
    "05:00 - 06:00",
    "06:00 - 07:00",
    "07:00 - 08:00",
    "08:00 - 09:00",
    "09:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "12:00 - 13:00",
    "13:00 - 14:00",
    "14:00 - 15:00",
    "15:00 - 16:00",
    "16:00 - 17:00",
    "17:00 - 18:00",
    "18:00 - 19:00",
    "19:00 - 20:00",
    "20:00 - 21:00",
    "21:00 - 22:00",
    "22:00 - 23:00",
    "23:00 - 00:00",
  ];

  return (
    <div className="">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-[500px] gap-5 text-[#777777]"
      >
        <div className="flex gap-5 items-center">
          <label>Time slot:</label>
          <div className="mt-1 w-32 rounded-md shadow-lg bg-[#2C2C2C] ring-1 ring-black ring-opacity-5">
            <select
              className="bg-[#2C2C2C] text-white text-sm rounded-md focus:ring-1 ring-[#2C2C2C] ring-opacity-5 block w-full py-2 px-3 max-h-16 scrollbar-thin scrollbar-thumb-[#777777] scrollbar-track-[#2c2c2c]"
              onChange={(e) => setTimeSlot(e.target.value)}
              value={timeSlot}
            >
              {time_slots.map((time_slot) => (
                <option key={time_slot} value={time_slot}>
                  {time_slot}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-3">
          <label>With coach: </label>
          <input
            type="checkbox"
            name="with_coach"
            onChange={handleChange}
            value={formData.with_coach}
            className=""
          />
        </div>
        <div className="flex gap-5">
          <label>With tools: </label>
          <input
            type="checkbox"
            name="with_tools"
            onChange={handleChange}
            value={formData.with_tools}
          />
        </div>
        <button
          type="submit"
          className="bg-[#27c6a9] text-white p-2 rounded-md w-fit items-center hover:bg-[#55dcbe] transition-all duration-300 self-end text-sm font-semibold"
        >
          Confirm Reservation
        </button>
      </form>
    </div>
  );
}

export default function Reservation() {
  const { id } = useParams();
  const fetchCourt = async () => {
    const { data } = await axios.get(`http://localhost:3000/api/courts/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return data;
  };

  const {
    data: court,
    isLoading,
    error,
  } = useQuery(["court", { id }], fetchCourt);
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col min-h-screen bg-[#1A1A1A] text-white items-center">
      <Navbar color={"#1A1A1A"} />
      <div className="flex flex-col py-10">
        <p className="text-2xl p-4 flex items-center gap-2">
          {<CircleCheckBig color="white" size={30} />}Confirm Reservation
        </p>
        <div className="flex gap-52 h-[500px] w-[1000px] p-10 justify-center pt-20">
          <div className="flex flex-col w-[30%]">
            <p className="font-bold pb-4 flex gap-2 items-center">
              <RiInformation2Fill size={20} /> Reservation Details
            </p>
            <div className="">
              <div className="flex gap-5 border-2 border-[#1f1f1f] p-2 items-center">
                <p className="text-sm text-[#777777]">Address</p>
                <p className="text-sm">{court.court_address}</p>
              </div>
              <div className="flex gap-11 border-2 border-[#1f1f1f] p-2 items-center">
                <p className="text-sm text-[#777777]">Type</p>
                <p className="text-sm">{court.court_type}</p>
              </div>
            </div>
            <p>{court.date_of_reservation}</p>
            <p>{court.court_price}</p>
          </div>
          <div className="flex flex-col w-[70%]">
            <p className="font-bold pb-4 flex gap-2 items-center">
              <FaUserPen size={20}/> Client Information
            </p>
            <Form court_id={id} price={court.price} />
          </div>
        </div>
      </div>
    </div>
  );
}
