import { LogOut, User } from "lucide-react";
import Navbar from "../components/Navbar";
import useUserStore from "../store/user.store";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";

export default function Profile() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();

  const fetchReservations = async () => {
    const { data } = await axios.get(
      `http://localhost:3000/api/reservations/user/${user?.id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    return data;
  };

  const { data: reservationsByUserId } = useQuery(
    ["reservations", { id: user?.id }],
    fetchReservations,
    {
      enabled: !!user?.id,
    },
  );

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex flex-col gap-10 lg:max-w-[1200px] lg:min-w-[1024px] w-full lg:mx-auto my-14">
        <div className="flex px-6 py-4 rounded-lg bg-primary/5 gap-4 items-center justify-between border border-primary/10">
          <div className="flex gap-4 items-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
              <User className="text-primary" />
            </div>
            <div className="flex flex-col">
              <p className="text-primary text-lg">
                Welcome back, {user?.first_name}
              </p>
              <p className="text-[#7D7C82]">Manage your Profile</p>
            </div>
          </div>
          <Link
            to="/reservation"
            className="flex items-center gap-2 bg-primary text-sm py-2 px-3 rounded-md hover:bg-primary/80 text-[#262528] transition-all duration-300"
          >
            Book new court
          </Link>
        </div>
        <div className="flex gap-10">
          <div className="flex flex-col w-[30%] p-6 rounded-lg bg-bgSecondary gap-8 border border-[#262528] items-center">
            <div className="flex flex-col gap-4 items-center">
              <div className="flex items-center justify-center size-36 rounded-full bg-primary/10">
                <User className="text-primary" size={80} />
              </div>
              <div className="flex flex-col items-center">
                <p className="text-xl font-semibold">
                  {user?.first_name + " " + user?.last_name}
                </p>
                <p className="text-[#7D7C82]">{user?.email}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <button className="flex hover:bg-bgPrimary/60 text-sm items-center gap-4 px-4 py-2 rounded-lg bg-bgPrimary border border-[#262528] transition-all">
                <User size={19} />
                Edit Profile
              </button>
              <button
                onClick={() => {
                  navigate("/login");
                  localStorage.removeItem("token");
                  setUser(null);
                }}
                className="flex hover:bg-bgPrimary/60 text-sm items-center gap-4 px-4 py-2 rounded-lg bg-bgPrimary border border-[#262528] text-red-500 transition-all"
              >
                <LogOut size={19} />
                Logout
              </button>
            </div>
          </div>
          <div className="flex flex-col w-[70%] gap-10">
            <p className="text-2xl font-semibold">My Reservations</p>
            {reservationsByUserId?.length > 0 ? (
              reservationsByUserId.map((reservation) => (
                <div
                  key={reservation.id}
                  className="flex flex-col gap-4 p-6 rounded-lg bg-bgSecondary border border-[#262528]"
                ></div>
              ))
            ) : (
              <div className="flex flex-col gap-4 p-6 rounded-lg bg-bgSecondary border border-[#262528]">
                No reservations found yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
