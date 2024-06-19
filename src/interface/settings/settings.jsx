import React, { useEffect, useState } from "react";
import { userlogo } from "../../images";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios({
          method: "GET",
          url: `https://sws-news.uz/api/v1/user`,
          headers: {
            Authorization: `${token}`,
          },
        });
        console.log(res.data);
        if (res.data) {
          setProfile(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (token) {
      fetchData();
    } else {
      navigate("/");
    }
  }, [token]);
  return (
    <div className="max-sm:w-full w-11/12 max-w-[1440px] mx-auto min-h-[calc(100vh-88px)] mt-[100px] flex justify-center items-center">
      <div className="shadow-white/5 max-w-[400px] w-11/12 h-full">
        <div className="relative w-[50%] mx-auto h-full flex justify-center items-center border-[2px] border-solid border-white/10 rounded-full p-4">
          <img src={userlogo} alt="" />
        </div>
        <h1 className="text-thin clamp2 text-center font-bold">
          Shaxsiy ma'lumotlar
        </h1>
        <form action="" className="w-full flex flex-col gap-[12px]">
          <div className="flex flex-col gap-2">
            <label htmlFor="fullname" className="clamp4 text-thin font-bold">
              To'liq ismingiz
            </label>
            <input
              className="w-full bg-transparent border-[#646464] border-[1px] bg-[#3d3d3d] outline-none px-[8px] py-[8px] rounded-[6px] focus:border-primary text-white transition-all ease-linear duration-[0.4]"
              type="text"
              value={profile?.fullname}
              id="fullname"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="clamp4 text-thin font-bold">
              Username
            </label>
            <input
              className="w-full bg-transparent border-[#646464] border-[1px] bg-[#3d3d3d] outline-none px-[8px] py-[8px] rounded-[6px] focus:border-primary text-white transition-all ease-linear duration-[0.4]"
              type="text"
              name="username"
              value={profile?.username}
              id="username"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="clamp4 text-thin font-bold">
              Telefon raqam
            </label>
            <input
              className="w-full bg-transparent border-[#646464] border-[1px] bg-[#3d3d3d] outline-none px-[8px] py-[8px] rounded-[6px] focus:border-primary text-white transition-all ease-linear duration-[0.4]"
              type="phone"
              name="phone"
              value={profile?.phone_number}
              id="phone"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
