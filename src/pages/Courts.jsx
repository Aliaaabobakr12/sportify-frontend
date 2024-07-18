import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Courts() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const court_location = searchParams.get("location");
  const court_type = searchParams.get("type");
  const fetchCourts = async () => {
    const { data } = await axios.get(
      `http://localhost:3000/api/courts?location=${court_location}&court_type=${court_type}`,
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
  } = useQuery(["courts", { court_location, court_type }], fetchCourts);
  if (isLoading) return <div>Loading...</div>;

  const padel_image = "/padel_court.webp";
  const tennis_image = "/tennis_court.jpg";
  const basketball_image = "/bball_court.jpg";
  const football_image = "/football_court.jpg";

  return (
    <div>
      <Navbar color={"#171717"} />
      <div className="bg-gradient-to-r gradient-angle from-[#171717] to-[#2c2c2c] grid grid-cols-4 gap-4 bg-[#171717] min-h-screen">
        {courts.map((court) => (
          <Link
            to={`/reservation/${court.court_id}`}
            key={court.id}
            className="flex flex-col gap-2  rounded-sm bg-[#2c2c2c] h-fit mx-10 my-10"
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
              alt={court.court_type}
              className="h-52 w-full object-cover"
            />
            <div className="flex flex-col p-2 text-white">
              <p>{court.court_address}</p>
              <p>{court.court_type}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
