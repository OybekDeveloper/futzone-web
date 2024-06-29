import React, { useEffect, useState } from "react";
import { backgroundlogin } from "../../images";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { authErrorSlice } from "../../reducer/redux";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authError } = useSelector((state) => state.event);
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    phone: "",
    password: "",
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

    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = `${key} bo'sh bo'lishi shart`;
      }
    });
    if (Object.keys(newErrors).length > 0) {
      dispatch(authErrorSlice(newErrors));
      return;
    }

    const fetchData = async () => {
      const toastId = toast.loading("Tizimga kirilmoqda...");
      try {
        const res = await axios({
          method: "POST",
          url: "https://sws-news.uz/api/v1/user/create",
          data: {
            fullname: formData.fullname,
            username: formData.username,
            photo: "photo",
            phone: formData.phone,
            password: formData.password,
            club_badge: "photo",
          },
        });
        console.log(res);
        if (res.status !== 299) {
          toast.success("Muvofaqiyatli ro'yxatdan o'tdingiz!", { id: toastId });
          localStorage.setItem("token", res.data.token);
          navigate("/");
        } else {
          toast.error("Tizimga kirishda xatolik, qaytadan urinib ko'ring.", {
            id: toastId,
          });
          newErrors["error"] = res?.data?.message;
          dispatch(authErrorSlice(newErrors));
        }
      } catch (error) {
        console.log(error);
        toast.error("Tizimga kirishda xatolik, qaytadan urinib ko'ring.", {
          id: toastId,
        });
      }
    };
    fetchData();
  };

  const handleInputChange = (e) => {
    let inputValue = e.target.value.replace(/[^0-9]/g, "");
    // Ensure the input doesn't exceed 12 digits
    inputValue = inputValue.slice(0, 12);
    const formattedValue = [];
    for (let i = 0; i < inputValue.length; i++) {
      if (i === 0) {
        formattedValue.push("+");
      }
      if (i === 3) {
        formattedValue.push(" (");
      }
      if (i === 5) {
        formattedValue.push(") ");
      }
      if (i === 8 || i === 10) {
        formattedValue.push(" ");
      }
      formattedValue.push(inputValue[i]);
    }
    const finalValue = formattedValue.join("");
    setPhoneNumber(finalValue);
  };

  const handleInputFocus = () => {
    if (!phoneNumber) {
      setPhoneNumber("+998");
    }
  };

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      phone: phoneNumber.replace(/[^0-9+]/g, ""),
    }));
  }, [phoneNumber]);

  return (
    <div className="grid md:grid-cols-2 grid-cols-1 h-full">
      <div className="relative w-10/12 flex flex-col mx-auto justify-center items-center max-w-[350px] gap-[12px]">
        <h1 className="clamp2 font-bold text-white">Ro'yxatdan o'tish</h1>
        <p className="text-thin text-center">
          Ro'yxatdan o'tish uchun quyidagi ma'lumotlarni to'ldiring
        </p>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-[12px]"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="fullname" className="clamp4 text-thin font-bold">
              Isim , Familya
            </label>
            <input
              onChange={handleChange}
              className={`${
                authError?.fullname
                  ? "border-red-600"
                  : "border-[#646464] focus:border-primary"
              } w-full bg-transparent border-[1px] bg-[#3d3d3d] outline-none px-[8px] py-[8px] rounded-[6px] text-white transition-all ease-linear duration-[0.4]`}
              type="text"
              id="fullname"
              name="fullname"
            />
            {authError?.fullname && (
              <div>
                <h1 className="clamp4 text-red-600">{authError?.fullname}</h1>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="clamp4 text-thin font-bold">
              Username
            </label>
            <input
              onChange={handleChange}
              className={`${
                authError?.username ||
                authError?.error === "usernameAlreadyRegistered"
                  ? "border-red-600"
                  : "border-[#646464] focus:border-primary"
              } w-full bg-transparent border-[1px] bg-[#3d3d3d] outline-none px-[8px] py-[8px] rounded-[6px] text-white transition-all ease-linear duration-[0.4]`}
              type="text"
              id="username"
              name="username"
            />
            {authError?.username && (
              <div>
                <h1 className="clamp4 text-red-600">{authError?.username}</h1>
              </div>
            )}
            {authError?.error === "usernameAlreadyRegistered" && (
              <div>
                <h1 className="clamp4 text-red-600">
                  Bunday username allaqachon mavjud
                </h1>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="clamp4 text-thin font-bold">
              Telefon raqam
            </label>
            <input
              onFocus={handleInputFocus}
              onChange={handleInputChange}
              value={phoneNumber}
              className={`${
                authError?.phone ||
                authError?.error === "phoneAlreadyRegistered"
                  ? "border-red-600"
                  : "border-[#646464] focus:border-primary"
              }  w-full bg-transparent  border-[1px] bg-[#3d3d3d] outline-none px-[8px] py-[8px] rounded-[6px]  text-white transition-all ease-linear duration-[0.4]`}
              type="text"
              id="phone"
              name="phone"
            />
            {authError?.phone && (
              <div>
                <h1 className="clamp4 text-red-600">{authError?.phone}</h1>
              </div>
            )}
            {authError?.error === "phoneAlreadyRegistered" && (
              <div>
                <h1 className="clamp4 text-red-600">
                  Bunday username allaqachon mavjud
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
              className={`${
                authError?.password
                  ? "border-red-600"
                  : "border-[#646464] focus:border-primary"
              } w-full bg-transparent  border-[1px] bg-[#3d3d3d] outline-none px-[8px] py-[8px] rounded-[6px]  text-white transition-all ease-linear duration-[0.4]`}
              type="password"
              id="password"
              name="password"
            />
            {authError?.password && (
              <div>
                <h1 className="clamp4 text-red-600">{authError?.password}</h1>
              </div>
            )}
          </div>
          <button
            type="submit"
            className="w-full p-[8px] bg-primary rounded-[6px] clamp3 font-bold text-white"
          >
            Ro'yxatdan o'tish
          </button>
        </form>
        <div className="w-full flex justify-center items-center">
          <h1 className="clamp4 text-thin">
            Sizda akkount allaqachon mavjudmi?{" "}
            <strong
              onClick={() => navigate("/login")}
              className="text-primary cursor-pointer"
            >
              Tizimga kirish
            </strong>
          </h1>
        </div>
      </div>
      <div className="w-full h-full max-md:hidden brightness-50">
        <img
          className="w-full h-screen object-cover"
          src={backgroundlogin}
          alt=""
        />
      </div>
    </div>
  );
};

export default Register;
