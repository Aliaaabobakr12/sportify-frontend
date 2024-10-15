import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import useUserStore from "../store/user.store";

export default function AdminRoute({ children }) {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.is_admin) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user.is_admin, navigate]);

  return user.is_admin ? (
    children
  ) : (
    <div className="h-screen w-full flex flex-col gap-5 justify-center items-center ">
      <p className="text-5xl font-bold"> Unathorized</p>
      <div className="text-gray-500 flex flex-col items-center gap-5">
        You now are being redirected to home page
        <ReactLoading
          type="spinningBubbles"
          color="#000000"
          height={25}
          width={25}
        />
      </div>
    </div>
  );
}
