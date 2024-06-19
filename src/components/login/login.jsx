import React, { useEffect, useState } from "react";
import { backgroundlogin } from "../../images";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const Login = () => {
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
          url: "https://sws-news.uz/api/v1/user/create",
          data: formData,
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
    <div className="grid grid-cols-1 md:grid-cols-2 h-full mx-[12px]">
      <div className="relative w-full flex flex-col mx-auto justify-center items-center max-w-[350px] gap-[12px]">
        <h1 className="clamp2 font-bold text-white">Tizimga kirish</h1>
        <p className="text-thin text-center">
          Tizimga kirish uchun quyidagi ma'lumotlarni to'ldiring
        </p>
        <form action="" className="w-full flex flex-col gap-[12px]">
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="clamp4 text-thin font-bold">
              Username
            </label>
            <input
              onChange={handleChange}
              value={formData.username}
              className="w-full bg-transparent border-[#646464] border-[1px] bg-[#3d3d3d] outline-none px-[8px] py-[8px] rounded-[6px] focus:border-primary text-white transition-all ease-linear duration-[0.4]"
              type="text"
              name="username"
              id="username"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="clamp4 text-thin font-bold">
              Parol
            </label>
            <input
              onChange={handleChange}
              value={formData.password}
              className="w-full bg-transparent border-[#646464] border-[1px] bg-[#3d3d3d] outline-none px-[8px] py-[8px] rounded-[6px] focus:border-primary text-white transition-all ease-linear duration-[0.4]"
              type="password"
              name="password"
              id="password"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="clamp4 text-thin font-bold">
              Telefon raqam
            </label>
            <input
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              className="w-full bg-transparent border-[#646464] border-[1px] bg-[#3d3d3d] outline-none px-[8px] py-[8px] rounded-[6px] focus:border-primary text-white transition-all ease-linear duration-[0.4]"
              type="text"
              value={phoneNumber}
              name="phone"
              id="phone"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="w-full p-[8px] bg-primary rounded-[6px] clamp3 font-bold text-white"
          >
            Kirish
          </button>
        </form>
        <div className="w-full">
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
