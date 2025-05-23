import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, CalendarDays, ChevronUp } from "lucide-react";
import { PiCourtBasketball } from "react-icons/pi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "../components/Navbar";
import Section_1 from "../components/Section_1";

export default function Home() {
  const navigate = useNavigate();
  const [selectedCourt, setSelectedCourt] = useState("");
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [loading, setLoading] = useState(true);

  const [showCourtDropdown, setShowCourtDropdown] = useState(false);
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);

  const courtRef = useRef(null);
  const timeRef = useRef(null);

  const courts = ["Football", "Basketball", "Tennis", "Padel"];

  useEffect(() => {
    const localDate = new Date(selectedTime);
    localDate.setHours(12, 0, 0, 0);
    setSelectedTime(localDate);
  }, [selectedTime, setSelectedTime]);

  const getCourtsByQueries = () => {
    navigate(
      `/reservation?date=${
        selectedTime.toISOString().split("T")[0]
      }&type=${selectedCourt.toLowerCase()}`,
    );
  };

  const handleCourtSelect = (court) => {
    setSelectedCourt(court);
    setShowCourtDropdown(false);
  };

  const handleDateSelect = (date) => {
    setSelectedTime(date);
    setShowTimeDropdown(false);
  };

  const handleClickOutside = (event) => {
    if (
      courtRef.current &&
      !courtRef.current.contains(event.target) &&
      timeRef.current &&
      !timeRef.current.contains(event.target)
    ) {
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

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        setLoading(false);
        document.body.style.overflow = "auto";
      }, 2000);
    }
  }, [loading]);

  return (
    <div className="min-h-screen items-center flex flex-col z-0">
      {loading && (
        <div className="flex items-center justify-center min-h-screen bg-bgPrimary fixed inset-0 z-[100]">
          <img src="/logo.png" alt="logo" className="h-16 w-16 animate-pulse" />
        </div>
      )}

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
          className="w-1/3 h-auto object-cover"
        />
        <div className="bg-bgPrimary/90 backdrop-blur border-[#262528] border w-[1000px] h-16 rounded-lg absolute left-1/2 -translate-x-1/2 -bottom-8 z-50">
          <div className="flex justify-between items-center h-full px-4">
            <div className="relative" ref={courtRef}>
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
                <div className="absolute mt-1 w-56 rounded-md shadow-lg bg-[#1C1917] ring-1 ring-[#1C1917] ring-opacity-5 z-50">
                  <div
                    className="py-1 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-[#777777] scrollbar-track-[#1C1917]"
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
                    dateFormat="dd/MM/yyyy"
                    inline
                  />
                </div>
              )}
            </div>
            <button
              className="flex items-center text-sm text-black justify-center gap-3 bg-primary px-3 py-2 rounded-md hover:bg-primary/80 transition-all duration-300"
              onClick={getCourtsByQueries}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="absolute rounded-full size-28 left-16 bottom-24 bg-[#1c1917]"></div>
      <Section_1 />
    </div>
  );
}
