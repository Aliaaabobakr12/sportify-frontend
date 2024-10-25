import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MapPin, CalendarDays } from "lucide-react";
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
  const [tempLocation, setTempLocation] = useState(courtLocation);
  const navigate = useNavigate();

  const locationRef = useRef(null);
  const dateRef = useRef(null);

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
    setTempLocation(governorate);
    setShowLocationDropdown(false);
  };

  const handleSearch = () => {
    setCourtLocation(tempLocation.toLowerCase());
    navigate(
      `/courts?location=${tempLocation.toLowerCase()}&type=${court_type}`
    );
  };

  const clickOutside = (e) => {
    if (
      locationRef.current &&
      !locationRef.current.contains(e.target) &&
      dateRef.current &&
      !dateRef.current.contains(e.target)
    ) {
      setShowLocationDropdown(false);
      setShowTimeDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", clickOutside);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, []);

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
    "Mansoura",
    "Tanta",
    "Ismailia",
    "Zagazig",
    "Borg Elarab", // دولة
  ];

  return (
    <div className="bg-[#1E1E1E] min-h-screen">
      <Navbar />
      <div className="lg:max-w-[1200px] lg:min-w-[1024px] w-full lg:mx-auto py-14 flex flex-col gap-10">
        <div className="flex relative rounded-lg bg-[#1A1A1A] lg:w-[800px] lg:mx-auto px-14 h-52 items-center gap-10">
          <div className="absolute bg-[#2c2c2c] rounded-full flex items-center justify-center text-white text-lg -top-5 left-1/2 transform -translate-x-1/2 px-4 py-2">
            Book {court_type} Court
          </div>
          <div className="flex flex-col w-full text-white gap-2">
            <div className="flex items-center gap-2">
              <CalendarDays size={18} />
              <div className="flex">
                Select Date <span className="text-primary">*</span>
              </div>
            </div>
            <div ref={dateRef} className="relative w-full">
              <input
                type="text"
                value={
                  selectedTime
                    ? selectedTime.toLocaleDateString()
                    : new Date().toLocaleDateString()
                }
                onFocus={() => setShowTimeDropdown(true)}
                className="bg-[#2c2c2c] rounded-md px-4 py-2 cursor-pointer w-full"
                readOnly
              />
              {showTimeDropdown && (
                <div className="absolute shadow-lg top-12 z-50">
                  <DatePicker
                    selected={selectedTime}
                    onChange={(date) => {
                      setSelectedTime(date);
                    }}
                    className="cursor-pointer custom-date-picker text-sm text-white w-fit"
                    calendarClassName="custom-calendar"
                    inline
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col w-full text-white gap-2">
            <div className="flex items-center gap-2">
              <MapPin size={21} />
              <div className="flex">
                Select Location <span className="text-primary">*</span>
              </div>
            </div>
            <div ref={locationRef} className="relative w-full">
              <input
                type="text"
                value={tempLocation}
                onChange={(e) => setTempLocation(e.target.value)}
                className="bg-[#2c2c2c] rounded-md px-4 py-2 cursor-pointer w-full"
                onFocus={() => setShowLocationDropdown(true)}
              />
              {showLocationDropdown && (
                <div className="absolute rounded-md bg-[#2C2C2C] top-12 z-50">
                  <div
                    className="py-1 max-h-56 w-[230px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#777777] scrollbar-track-[#2c2c2c]"
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
          </div>
          <button
            className="absolute bg-primary hover:bg-primary/80 transition-all rounded-full flex items-center justify-center text-white -bottom-5 left-1/2 transform -translate-x-1/2 px-4 py-2 z-0"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
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
    </div>
  );
}
