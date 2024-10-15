import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MapPin, CalendarDays } from "lucide-react";
import { FaStarOfLife } from "react-icons/fa6";
import Navbar from "../components/Navbar";

export default function Courts() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const court_location = searchParams.get("location") || "";
  const court_type = searchParams.get("type") || "";

  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [courtLocation, setCourtLocation] = useState(court_location);
  const navigate = useNavigate();

  const fetchCourts = async () => {
    const { data } = await axios.get(
      `http://localhost:3000/api/courts?government=${courtLocation}&type=${court_type}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return data;
  };

  const {
    data: courts,
    isLoading,
    error,
  } = useQuery(
    ["courts", { court_location: courtLocation, court_type }],
    fetchCourts,
    {
      enabled: !!courtLocation && !!court_type,
    }
  );

  const handleLocationSelect = (governorate) => {
    setCourtLocation(governorate);
    setShowLocationDropdown(false);
  };

  const handleSearch = () => {
    navigate(`/courts?location=${courtLocation}&type=${court_type}`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading courts: {error.message}</div>;

  const padel_image = "/padel_court.webp";
  const tennis_image = "/tennis_court.jpg";
  const basketball_image = "/bball_court.jpg";
  const football_image = "/football_court.jpg";

  const governoratesOfEgypt = [
    "Cairo",
    "Alexandria",
    "Giza",
    "Shubra El Kheima",
    "Port Said",
    "Suez",
    "Luxor",
    "Mansoura",
    "El-Mahalla El-Kubra",
    "Tanta",
    "Asyut",
    "Ismailia",
    "Fayyum",
    "Zagazig",
    "Aswan",
    "Damietta",
    "Damanhur",
    "Minya",
    "Beni Suef",
    "Hurghada",
    "Qena",
    "Sohag",
    "Shibin El Kom",
    "Banha",
    "Kafr El Sheikh",
    "Arish",
    "Mallawi",
    "Dakhla Oasis",
    "Berenice",
    "Marsa Alam",
    "Siwa Oasis",
  ];

  return (
    <div className="relative bg-[#1E1E1E] min-h-screen">
      <Navbar />
      <div className="flex justify-center">
        <div className="relative w-[1000px] h-48 rounded-lg mt-16 bg-[#1A1A1A]">
          <div className="flex text-white gap-80 m-5 mt-10">
            <p className="flex items-center gap-3">
              {<CalendarDays size={18} />} Select Date
              {<FaStarOfLife color="#27c6a9" size={10} />}
            </p>
            <p className="flex items-center gap-3 ml-20">
              {<MapPin size={21} />} Select Location
              {<FaStarOfLife color="#27c6a9" size={10} />}
            </p>
          </div>

          <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex justify-center gap-3">
            {/* Input for Date/Time Selection */}
            <input
              type="text"
              value={
                selectedTime
                  ? selectedTime.toLocaleDateString()
                  : new Date().toLocaleDateString()
              }
              onFocus={() => setShowTimeDropdown(true)}
              className="bg-[#2c2c2c] rounded-full h-10 w-full flex items-center justify-center text-white mx-5 px-4"
              readOnly
            />

            {/* DatePicker Dropdown */}
            {showTimeDropdown && (
              <div className="absolute mt-1 shadow-lg">
                <DatePicker
                  selected={selectedTime}
                  onChange={(date) => {
                    setSelectedTime(date); // Update the selected date
                  }}
                  className="block cursor-pointer z-30 custom-date-picker text-sm text-white w-fit"
                  calendarClassName="custom-calendar"
                  inline // Display the calendar inline directly
                />
              </div>
            )}

            <input
              type="text"
              value={courtLocation}
              onChange={(e) => setCourtLocation(e.target.value)}
              className="bg-[#2c2c2c] rounded-full h-10 w-full flex items-center justify-center text-white mx-5 px-4"
              onFocus={() => setShowLocationDropdown(true)}
            />

            {showLocationDropdown && (
              <div className="absolute w-[430px] rounded-md shadow-lg bg-[#2C2C2C] ring-1 ring-black ring-opacity-5 z-50 top-10 right-9">
                <div
                  className="py-1 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-[#777777] scrollbar-track-[#2c2c2c]"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  {governoratesOfEgypt.map((governorate, index) => (
                    <div
                      key={index}
                      className="block px-4 py-2 text-sm text-white hover:bg-[#212121] cursor-pointer z-30"
                      onClick={() => handleLocationSelect(governorate)}
                      role="menuitem"
                    >
                      {governorate}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="absolute inset-x-0 bottom-28 flex justify-center">
            <div className="bg-[#2c2c2c] rounded-full h-10 w-36 flex items-center justify-center text-white -mt-24">
              Book {court_type} Court
            </div>
          </div>
          <div className="absolute inset-x-0 -bottom-4 flex justify-center">
            <button
              className="bg-[#27c6a9] rounded-full h-10 w-24 flex items-center justify-center text-white hover:bg-[#55dcbe] transition-all duration-200 z-0"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-4 px-10">
        {courts?.map((court) => (
          <Link
            to={`/reservation/${court.id}`}
            key={court.id}
            className="rounded-lg overflow-hidden shadow-lg bg-[#1A1A1A]"
          >
            <img
              src={
                court.court_type === "padel"
                  ? padel_image
                  : court.court_type === "tennis"
                  ? tennis_image
                  : court.court_type === "basketball"
                  ? basketball_image
                  : football_image
              }
              alt={`${court.court_type} court`}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-white">
              <h2 className="text-xl font-bold">{court.court_name}</h2>
              <p>{court.court_address}</p>
              <p>{court.court_price} EGP</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
