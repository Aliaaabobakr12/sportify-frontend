import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, ChevronDown, CalendarDays, ChevronUp } from "lucide-react";
import { PiCourtBasketball } from "react-icons/pi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useDateStore from "../store/date.store";
import Navbar from "../components/Navbar";
import Section_1 from "../components/Section_1";

export default function Home() {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCourt, setSelectedCourt] = useState("");
  const [selectedTime, setSelectedTime] = useState(null);

  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showCourtDropdown, setShowCourtDropdown] = useState(false);
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);

  const locationRef = useRef(null);
  const courtRef = useRef(null);
  const timeRef = useRef(null);

  const setDate = useDateStore((state) => state.setDate);
  useEffect(() => {
    if (selectedTime !== null) {
      setDate(selectedTime);
    }
  }, [selectedTime, setDate]);

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

  const courts = ["Football", "Basketball", "Tennis", "Padel"];

  const getCourtsByQueries = () => {
    // if (!selectedLocation || !selectedCourt || !selectedTime) {
    //   alert("Please fill all fields");
    //   return;
    // }
    navigate(
      `/courts?location=${selectedLocation.toLowerCase()}&type=${selectedCourt.toLowerCase()}`
    );
  };

  const isAuthenticated = () => {
    return !!localStorage.getItem("token");
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setShowLocationDropdown(false);
  };

  const handleCourtSelect = (court) => {
    setSelectedCourt(court);
    setShowCourtDropdown(false);
  };

  const handleDateSelect = (date) => {
    setSelectedTime(date);
    setShowTimeDropdown(false);
  };

  const handleSearchClick = () => {
    if (!isAuthenticated()) {
      alert("You must be logged in to perform this action.");
      setTimeout(() => {
        navigate("/login");
      }, 500);
    }
  };

  const handleClickOutside = (event) => {
    if (
      locationRef.current &&
      !locationRef.current.contains(event.target) &&
      courtRef.current &&
      !courtRef.current.contains(event.target) &&
      timeRef.current &&
      !timeRef.current.contains(event.target)
    ) {
      setShowLocationDropdown(false);
      setShowCourtDropdown(false);
      setShowTimeDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-gradient-to-r gradient-angle from-[#171717] to-[#2c2c2c] min-h-screen items-center flex flex-col z-0">
      <Navbar />
      <div className="flex flex-nowrap relative">
        <img
          src="/football_court.jpg"
          alt="football court"
          className="w-1/3 h-auto object-cover"
        />
        <img
          src="/tennis_court.jpg"
          alt="tennis court"
          className="w-1/3 h-auto object-cover"
        />
        <img
          src="/bball-court.jpg"
          alt="basketball court"
          className="w-1/3 h-[400px] object-cover"
        />
      </div>
      <div className="bg-[#2c2c2c] w-[1000px] h-16 rounded-lg absolute bottom-60">
        <div className="flex justify-between items-center h-full px-4">
          <div className="relative" ref={locationRef}>
            {/* Location dropdown */}
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setShowLocationDropdown(!showLocationDropdown)}
            >
              <MapPin color="#ffff" size={27} />
              <div className="flex flex-col">
                <p className="text-sm text-white font-semibold">
                  Choose Location
                </p>
                <p className="text-xs text-[#777777] font-semibold">
                  {selectedLocation || "Select location"}
                </p>
              </div>
              {showLocationDropdown ? (
                <ChevronUp
                  color={"#27c6a9"}
                  strokeWidth={"1.75px"}
                  size={20}
                  className="cursor-pointer"
                />
              ) : (
                <ChevronDown
                  color={"#27c6a9"}
                  strokeWidth={"1.75px"}
                  size={20}
                  className="cursor-pointer"
                />
              )}
            </div>
            {showLocationDropdown && (
              <div className="absolute mt-1 w-56 rounded-md shadow-lg bg-[#2C2C2C] ring-1 ring-black ring-opacity-5 z-50">
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

          <div className="relative" ref={courtRef}>
            {/* Court Type dropdown */}
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setShowCourtDropdown(!showCourtDropdown)}
            >
              <PiCourtBasketball color="#ffff" size={28} />
              <div className="flex flex-col">
                <p className="text-sm text-white font-semibold">
                  Choose Court Type
                </p>
                <p className="text-xs text-[#777777] font-semibold">
                  {selectedCourt || "Select court type"}
                </p>
              </div>
              {showCourtDropdown ? (
                <ChevronUp
                  color={"#27c6a9"}
                  strokeWidth={"1.75px"}
                  size={20}
                  className="cursor-pointer"
                />
              ) : (
                <ChevronDown
                  color={"#27c6a9"}
                  strokeWidth={"1.75px"}
                  size={20}
                  className="cursor-pointer"
                />
              )}
            </div>
            {showCourtDropdown && (
              <div className="absolute mt-1 w-56 rounded-md shadow-lg bg-[#2C2C2C] ring-1 ring-black ring-opacity-5 z-50">
                <div
                  className="py-1 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-[#777777] scrollbar-track-[#2c2c2c]"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  {courts.map((court, index) => (
                    <div
                      key={index}
                      className="block px-4 py-2 text-sm text-white hover:bg-[#212121] cursor-pointer z-30"
                      onClick={() => handleCourtSelect(court)}
                      role="menuitem"
                    >
                      {court}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="relative" ref={timeRef}>
            {/* Pickup Time date picker */}
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setShowTimeDropdown(!showTimeDropdown)}
            >
              <CalendarDays color="white" />
              <div className="flex flex-col">
                <span className="text-sm text-white font-semibold">
                  Pickup Time
                </span>
                <p className="text-xs text-[#777777] font-semibold">
                  {selectedTime
                    ? selectedTime.toLocaleDateString()
                    : "Select date and time"}
                </p>
              </div>
              {showTimeDropdown ? (
                <ChevronUp
                  color={"#27c6a9"}
                  strokeWidth={"1.75px"}
                  size={20}
                  className="cursor-pointer"
                />
              ) : (
                <ChevronDown
                  color={"#27c6a9"}
                  strokeWidth={"1.75px"}
                  size={20}
                  className="cursor-pointer"
                />
              )}
            </div>
            {showTimeDropdown && (
              <div className="absolute mt-1 shadow-lg">
                <DatePicker
                  selected={selectedTime}
                  onChange={(date) => handleDateSelect(date)}
                  className="block cursor-pointer z-30 custom-date-picker text-sm text-white w-fit"
                  calendarClassName="custom-calendar"
                  popperClassName="custom-popper"
                  dateFormat="dd/MM/yyyy"
                  placeholderText="dd / mm / yyyy"
                />
              </div>
            )}
          </div>

          {/* Search button */}
          <button
            className="flex items-center justify-center gap-3 bg-[#27c6a9] text-white px-3.5 py-1.5 rounded-md hover:bg-[#55dcbe] transition-all duration-300"
            onClick={getCourtsByQueries}
          >
            Search
          </button>
        </div>
      </div>
      <div className="absolute rounded-full size-28 left-16 bottom-24 bg-gradient-to-r gradient-angle from-[#171717] to-[#2c2c2c]"></div>
      <Section_1 />
    </div>
  );
}
