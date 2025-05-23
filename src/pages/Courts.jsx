import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MapPin, Clock, CalendarDays, Info, Trophy, Check } from "lucide-react";
import Navbar from "../components/Navbar";
import useUserStore from "../store/user.store";
import { useSearchParams } from "react-router-dom";

function Sport({ type, setType }) {
  const sports = [
    {
      name: "Football",
      image: "/football_court.jpg",
      value: "football",
    },
    {
      name: "Basketball",
      image: "/bball-court.jpg",
      value: "basketball",
    },
    {
      name: "Tennis",
      image: "/tennis_court.jpg",
      value: "tennis",
    },
    {
      name: "Padel",
      image: "/padel_court.webp",
      value: "padel",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-8">
      {sports.map((sport, index) => (
        <button
          type="button"
          onClick={() => {
            setType(sport.value);
          }}
          key={index}
          className={`rounded-lg overflow-hidden ${
            type === sport.value
              ? "outline outline-2 outline-primary"
              : "hover:outline outline-1 hover:outline-[#262528]"
          }`}
        >
          <img
            src={sport.image}
            alt={`${sport.name} court`}
            className="w-full h-36 object-cover"
          />
          <div className="p-4 text-white">
            <p>{sport.name}</p>
          </div>
        </button>
      ))}
    </div>
  );
}

function Location({ type, location, setLocation, courts }) {
  return type === "" ? (
    <div className="flex flex-col gap-4">Please select a sport first..</div>
  ) : courts?.length === 0 ? (
    <div className="flex flex-col gap-4">
      <p>No courts available for this sport.</p>
    </div>
  ) : (
    <div className="flex flex-col gap-4">
      {courts?.map((court, index) => (
        <button
          onClick={() => {
            setLocation(court.name);
          }}
          key={index}
          className={`flex gap-4 p-4 border border-[#262528] rounded-lg items-start ${
            location === court.name
              ? "bg-primary/5 outline-1 outline outline-primary"
              : "hover:outline-1 hover:outline hover:outline-primary"
          }`}
        >
          <MapPin className="text-primary mt-1" />
          <div className="flex flex-col items-start">
            <p className="text-lg">{court.name}</p>
            <p className="text-[#7D7C82]">
              {court.address + ", " + court.government}
            </p>
            <p className="text-primary underline text-sm mt-4">
              {parseFloat(court.price).toFixed(0)} EGP/hour
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}

function ChooseDate({ date, setDate }) {
  console.log(date);
  return (
    <div className="flex flex-col w-full text-white gap-2 items-center">
      <DatePicker
        selected={date}
        onChange={(date) => {
          setDate(date);
        }}
        calendarClassName="custom-calendar"
        inline
      />
    </div>
  );
}

function ChooseTime({ time, setTime, courtById }) {
  const times = [
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
  ];

  const isTimeSlotReserved = (timeSlot) => {
    if (!courtById || !Array.isArray(courtById)) return false;

    const [start] = timeSlot.split(" - ");
    const formattedStart = `${start}:00`;

    return courtById.some(
      (reservation) => reservation.start === formattedStart,
    );
  };

  return (
    <div className="grid grid-cols-4 w-full text-white gap-4 text-lg">
      {times.map((t, index) => {
        const isReserved = isTimeSlotReserved(t);
        return (
          <button
            key={index}
            onClick={() => {
              if (!isReserved) setTime(t);
            }}
            disabled={isReserved}
            className={`flex items-center justify-center gap-3 outline-1 outline py-3 rounded-md ${
              isReserved
                ? "bg-[#262626] text-[#7D7C82] cursor-not-allowed"
                : time === t
                ? "bg-primary/5 outline-1 outline outline-primary"
                : "hover:outline-1 outline-[#262528] outline hover:outline hover:outline-primary"
            }`}
          >
            <Clock size={18} className="text-[#7D7C82]" /> {t}
          </button>
        );
      })}
    </div>
  );
}

function Confirmation({
  type,
  location,
  date,
  time,
  price,
  priceWithFees,
  setConfirm,
  handleSubmit,
  loading,
}) {
  const summary = [
    {
      name: "Sport",
      value: type.charAt(0).toUpperCase() + type.slice(1),
      icon: <Trophy size={18} />,
    },
    {
      name: "Location",
      value: location.charAt(0).toUpperCase() + location.slice(1),
      icon: <MapPin size={18} />,
    },
    {
      name: "Date",
      value: date?.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
      icon: <CalendarDays size={18} />,
    },
    {
      name: "Time",
      value: time,
      icon: <Clock size={18} />,
    },
  ];

  return (
    <div className="flex flex-col lg:max-w-[750px] lg:min-w-[600px] w-full lg:mx-auto my-14 gap-10">
      <p className="text-3xl font-semibold">Court Reservation</p>
      <div className="flex flex-col p-6 rounded-lg bg-bgSecondary gap-8 border border-[#262528]">
        <div>
          <p className="text-2xl font-semibold">Confirm Your Reservation</p>
          <p className="text-[#7D7C82]">
            Please review your reservation details before confirming
          </p>
        </div>
        <div className="flex flex-col gap-4">
          {summary.map((item, index) => (
            <div key={index} className="flex gap-4 items-center">
              <div className="w-10 h-10 bg-primary/5 text-primary rounded-full flex items-center justify-center">
                {item.icon}
              </div>

              <div key={index} className="flex flex-col">
                <p className="text-[#7D7C82]">{item.name}</p>
                <p className="text-lg font-semibold">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col">
          <div className="flex flex-col py-4 border-y border-[#262528]">
            <div className="flex items-center justify-between text-lg font-semibold">
              <p>Court fee</p>
              <p>{price} EGP</p>
            </div>
            <div className="flex items-center justify-between text-[#7D7C82]">
              <p>Service fee</p>
              <p>10 EGP</p>
            </div>
          </div>
          <div className="flex items-center justify-between text-lg font-semibold pt-2">
            <p>Total</p>
            <p>{priceWithFees} EGP</p>
          </div>
        </div>

        <div className="p-4 flex items-start gap-2 text-[#7D7C82] bg-[#262626] rounded-lg">
          <Info size={18} className="mt-1" />
          <p className="">
            Cancellations made at least 24 hours before the reservation time are
            eligible for a full refund.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <button
            onClick={handleSubmit}
            className="bg-primary hover:bg-primary/80 transition-all rounded-md py-3 text-[#262528] text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary"
          >
            {loading ? "loading.." : "Confirm Reservation"}
          </button>
          <button
            onClick={(prev) => setConfirm(!prev)}
            className="bg-black hover:bg-black/20 border border-[#262528] transition-all rounded-md py-3 text-white text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary"
          >
            Back to Reservation
          </button>
        </div>
      </div>
    </div>
  );
}

function Receipt({ type, location, date, time }) {
  const summary = [
    {
      name: "Sport",
      value: type.charAt(0).toUpperCase() + type.slice(1),
      icon: <Trophy size={18} />,
    },
    {
      name: "Location",
      value: location.charAt(0).toUpperCase() + location.slice(1),
      icon: <MapPin size={18} />,
    },
    {
      name: "Date",
      value: date?.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
      icon: <CalendarDays size={18} />,
    },
    {
      name: "Time",
      value: time,
      icon: <Clock size={18} />,
    },
  ];

  return (
    <div className="flex flex-col lg:max-w-[750px] lg:min-w-[600px] w-full lg:mx-auto my-14 gap-10">
      <p className="text-3xl font-semibold">Court Reservation</p>

      <div className="flex px-6 py-4 rounded-lg bg-primary/5 gap-2 border border-primary">
        <Check size={18} className="mt-1" />
        <div className="flex flex-col">
          <p className="text-primary text-lg font-semibold">
            Reservation Confirmed!
          </p>
          <p>Your reservation has been successfully confirmed.</p>
        </div>
      </div>

      <div className="flex flex-col p-6 rounded-lg bg-bgSecondary gap-8 border border-[#262528]">
        <div>
          <p className="text-2xl font-semibold">Booking Information</p>
          <p className="text-[#7D7C82]">
            Please review your reservation details before confirming
          </p>
        </div>
        <div className="flex flex-col gap-4">
          {summary.map((item, index) => (
            <div key={index} className="flex gap-4 items-center">
              <div className="w-10 h-10 bg-primary/5 text-primary rounded-full flex items-center justify-center">
                {item.icon}
              </div>

              <div key={index} className="flex flex-col">
                <p className="text-[#7D7C82]">{item.name}</p>
                <p className="font-semibold">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => {
              window.location.reload();
            }}
            className="bg-black hover:bg-black/20 border border-[#262528] transition-all rounded-md py-3 text-white text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary"
          >
            Make another Reservation
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Courts() {
  const [searchparams] = useSearchParams();
  const token = localStorage.getItem("token");
  const user = useUserStore((state) => state.user);
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [option, setOption] = useState("Sport");
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (searchparams.get("type")) {
      setType(searchparams.get("type"));
    }

    if (searchparams.get("date")) {
      const dateParam = searchparams.get("date");
      const parsedDate = new Date(dateParam);
      setDate(parsedDate);
    }
  }, [searchparams]);

  const options = ["Sport", "Location", "Date", "Time"];
  const summary = [
    {
      name: "Sport",
      value: type.charAt(0).toUpperCase() + type.slice(1),
    },
    {
      name: "Location",
      value: location.charAt(0).toUpperCase() + location.slice(1),
    },
    {
      name: "Date",
      value: date?.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    },
    {
      name: "Time",
      value: time,
    },
  ];

  const fetchCourts = async () => {
    const { data } = await axios.get(
      `http://localhost:3000/api/courts?government=${"Alexandria"}&type=${type}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    return data;
  };

  const { data: courts } = useQuery(["courts", { type }], fetchCourts, {
    enabled: !!type,
  });

  const fetchReservationByCourtId = async () => {
    // Create a date that preserves the local date regardless of timezone
    const localDate = new Date(date);
    // Set time to noon to avoid timezone issues
    localDate.setHours(12, 0, 0, 0);

    const { data } = await axios.get(
      `http://localhost:3000/api/reservations/court/${
        courts.find((court) => court.name === location).id
      }/date/${localDate.toISOString()}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    return data;
  };

  const { data: courtById } = useQuery(
    [
      "courtById",
      { id: courts?.find((court) => court.name === location)?.id, date },
    ],
    fetchReservationByCourtId,
    {
      enabled: !!location && !!date && !!courts,
    },
  );

  const componentRender = () => {
    switch (option) {
      case "Sport":
        return <Sport type={type} setType={setType} />;
      case "Location":
        return (
          <Location
            type={type}
            location={location}
            setLocation={setLocation}
            courts={courts}
          />
        );

      case "Date":
        return <ChooseDate date={date} setDate={setDate} />;

      case "Time":
        return (
          <ChooseTime time={time} setTime={setTime} courtById={courtById} />
        );
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();

    // Create a date that preserves the local date regardless of timezone
    const localDate = new Date(date);
    // Set time to noon to avoid timezone issues
    localDate.setHours(12, 0, 0, 0);

    axios
      .post(
        "http://localhost:3000/api/reservations",
        {
          user_id: user.id,
          court_id: courts.find((court) => court.name === location).id,
          price: courts.find((court) => court.name === location).price,
          timeslot_start: time.split(" - ")[0],
          timeslot_end: time.split(" - ")[1],
          date_of_reservation: localDate.toISOString(),
          with_coach: false,
          with_tools: false,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(() => {
        setLoading(false);
        setConfirm(false);
        setSuccess(true);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      {confirm ? (
        <Confirmation
          type={type}
          location={location}
          date={date}
          time={time}
          loading={loading}
          price={parseFloat(
            courts.find((court) => court.name === location)?.price,
          ).toFixed(0)}
          priceWithFees={
            parseFloat(
              courts.find((court) => court.name === location)?.price,
            ).toFixed(0) *
              1 +
            10
          }
          setConfirm={setConfirm}
          handleSubmit={handleSubmit}
        />
      ) : success ? (
        <Receipt
          type={type}
          location={location}
          date={date}
          time={time}
          setSuccess={setSuccess}
        />
      ) : (
        <div className="flex flex-col gap-10 lg:max-w-[1200px] lg:min-w-[1024px] w-full lg:mx-auto my-14">
          <p className="text-3xl font-semibold">Court Reservation</p>
          <div className="p-1 bg-[#262626] rounded-lg flex">
            {options.map((o, index) => (
              <button
                onClick={() => setOption(o)}
                key={index}
                className={`flex-1 text-center py-2 transition-all ${
                  o === option ? "bg-[#0c0a09] rounded-md" : ""
                }`}
              >
                {o}
              </button>
            ))}
          </div>
          <div className="flex flex-col p-10 rounded-lg bg-bgSecondary gap-8 border border-[#262528]">
            <p className="text-2xl font-semibold">Select a {option}</p>
            {componentRender()}
          </div>
          <div className="flex flex-col p-10 rounded-lg bg-bgSecondary gap-8 border border-[#262528]">
            <p className="text-2xl font-semibold">Reservation Summary</p>
            <div className="grid grid-cols-2 gap-4">
              {summary.map((item, index) => (
                <div key={index} className="flex flex-col">
                  <p className="text-[#7D7C82]">{item.name}</p>
                  <p className="text-lg font-semibold">
                    {item.value ? item.value : "Not Selected"}
                  </p>
                </div>
              ))}
            </div>
            {type && location && time && date && (
              <div className="flex flex-col">
                <div className="flex flex-col py-4 border-y border-[#262528]">
                  <div className="flex items-center justify-between text-lg font-semibold">
                    <p>Court fee</p>
                    <p>
                      {parseFloat(
                        courts.find((court) => court.name === location)?.price,
                      ).toFixed(0)}{" "}
                      EGP
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-[#7D7C82]">
                    <p>Service fee</p>
                    <p>10 EGP</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-lg font-semibold pt-2">
                  <p>Total</p>
                  <p>
                    {parseFloat(
                      courts.find((court) => court.name === location)?.price,
                    ).toFixed(0) *
                      1 +
                      10}{" "}
                    EGP
                  </p>
                </div>
              </div>
            )}
            <button
              onClick={() => setConfirm(true)}
              disabled={!type || !location || !time || !date}
              className="bg-primary hover:bg-primary/80 transition-all rounded-md py-3 text-[#262528] text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary"
            >
              {!type || !location || !time || !date
                ? "Complete All Steps to Proceed"
                : "Proceed to Confirmation"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
