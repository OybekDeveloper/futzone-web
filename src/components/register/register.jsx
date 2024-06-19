import React, { useEffect, useState } from "react";
import { backgroundlogin } from "../../images";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    photo: "",
    phone: "",
    password: "",
    club_badge: "",
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
        if (res.data) {
          toast.success("Tizimga muvoffaqiyatli kirdingiz!", { id: toastId });
          navigate("/");
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

  console.log(formData);
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 h-full">
      <div className="relative w-10/12 flex flex-col mx-auto justify-center items-center md:max-w-[350px] gap-[12px]">
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
              className="w-full bg-transparent border-[#646464] border-[1px] bg-[#3d3d3d] outline-none px-[8px] py-[8px] rounded-[6px] focus:border-primary text-white transition-all ease-linear duration-[0.4]"
              type="text"
              id="fullname"
              name="fullname"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="clamp4 text-thin font-bold">
              Username
            </label>
            <input
              onChange={handleChange}
              className="w-full bg-transparent border-[#646464] border-[1px] bg-[#3d3d3d] outline-none px-[8px] py-[8px] rounded-[6px] focus:border-primary text-white transition-all ease-linear duration-[0.4]"
              type="text"
              id="username"
              name="username"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="clamp4 text-thin font-bold">
              Telefon raqam
            </label>
            <input
              onFocus={handleInputFocus}
              onChange={handleInputChange}
              value={phoneNumber}
              className="w-full bg-transparent border-[#646464] border-[1px] bg-[#3d3d3d] outline-none px-[8px] py-[8px] rounded-[6px] focus:border-primary text-white transition-all ease-linear duration-[0.4]"
              type="text"
              id="phone"
              name="phone"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="clamp4 text-thin font-bold">
              Parol
            </label>
            <input
              onChange={handleChange}
              className="w-full bg-transparent border-[#646464] border-[1px] bg-[#3d3d3d] outline-none px-[8px] py-[8px] rounded-[6px] focus:border-primary text-white transition-all ease-linear duration-[0.4]"
              type="password"
              id="password"
              name="password"
            />
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
