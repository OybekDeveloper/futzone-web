import React, { useEffect, useState } from "react";
import { backgroundlogin } from "../../images";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { authErrorSlice } from "../../reducer/redux";

const Login = () => {
  const dispatch = useDispatch();
  const { authError } = useSelector((state) => state.event);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    phone: "",
  });
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fetchData = async () => {
      const toastId = toast.loading("Tizimga kirilmoqda...");
      try {
        const res = await axios({
          method: "POST",
          url: "https://sws-news.uz/api/v1/user/login",
          data: formData,
        });
        console.log(res);
        if (res.status !== 299) {
          toast.success("Tizimga muvoffaqiyatli kirdingiz!", { id: toastId });
          localStorage.setItem("token", res.data.token);
          navigate("/");
        } else {
          const newErrors = {};
          toast.error("Tizimga kirishda xatolik, qaytadan urinib ko'ring.", {
            id: toastId,
          });
          newErrors["error"] = res?.data?.message;
          dispatch(authErrorSlice(newErrors));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  };

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      phone: phoneNumber.replace(/[^0-9+]/g, ""),
    }));
  }, [phoneNumber]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-full mx-[12px]">
      <div className="relative w-full flex flex-col mx-auto justify-center items-center max-w-[350px] gap-[12px]">
        <h1 className="clamp2 font-bold text-white">Tizimga kirish</h1>
        <p className="text-thin text-center">
          Tizimga kirish uchun quyidagi ma'lumotlarni to'ldiring
        </p>
        <form action="" className="w-full flex flex-col gap-[12px]">
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="clamp4 text-thin font-bold">
              Login
            </label>
            <input
              onChange={(e) =>
                setFormData({
                  ...formData,
                  username: e.target.value,
                  phone: e.target.value,
                })
              }
              value={formData.username}
              placeholder="Username , Telefon raqam"
              className={`${
                authError?.error === "userNotFoundUsingPhoneOrUsername"
                  ? "border-red-600"
                  : "border-[#646464] focus:border-primary"
              } w-full bg-transparent border-[1px] bg-[#3d3d3d] outline-none px-[8px] py-[8px] rounded-[6px] text-white transition-all ease-linear duration-[0.4]`}
              type="text"
              id="username"
            />
            {authError?.error === "userNotFoundUsingPhoneOrUsername" && (
              <div>
                <h1 className="clamp4 text-red-600">
                  Username yoki telefon raqam noto'g'ri
                </h1>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="clamp4 text-thin font-bold">
              Parol
            </label>
            <input
              onChange={handleChange}
              value={formData.password}
              className={`${ 
                authError?.error === "incorrectPassword"?"border-red-600":"border-[#646464] focus:border-primary"
              } w-full bg-transparent border-[1px] bg-[#3d3d3d] outline-none px-[8px] py-[8px] rounded-[6px] text-white transition-all ease-linear duration-[0.4]`}
              type="password"
              name="password"
              placeholder="Parol"
              id="password"
            />
            {authError?.error === "incorrectPassword" && (
              <div>
                <h1 className="clamp4 text-red-600">Parol noto'g'ri</h1>
              </div>
            )}
          </div>
          <button
            onClick={handleSubmit}
            className="w-full p-[8px] bg-primary rounded-[6px] clamp3 font-bold text-white"
          >
            Kirish
          </button>
        </form>
        <div className="w-full flex justify-center items-center">
          <h1 className="clamp4 text-thin">
            Sizda akkount mavjud emasmi ?{" "}
            <strong
              onClick={() => navigate("/register")}
              className="text-primary cursor-pointer"
            >
              Ro'yxatdan o'tish
            </strong>
          </h1>
        </div>
      </div>
      <div className=" w-full h-full max-md:hidden">
        <img
          className="w-full h-screen object-cover brightness-50"
          src={backgroundlogin}
          alt=""
        />
      </div>
    </div>
  );
};

export default Login;
