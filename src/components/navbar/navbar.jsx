import React, { useEffect, useState } from "react";
import { logo, menusvg } from "../../images";
import { navLinkData } from "../data";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const body = document.body;
    const app = document.querySelector("#app");
    if (isOpen) {
      body.style.overflow = "hidden";
      app.classList.add("blur-effect");
    } else {
      body.style.overflow = "visible";
      app.classList.remove("blur-effect");
    }
  }, [isOpen]);

  return (
    <div
      className={`${
        pathname === "/login" || pathname === "/register" ? "hidden" : ""
      } fixed bg-gray-700 top-0 left-0 w-full h-[88px] z-[999] border-gray-700 shadow-md`}
    >
      <div className="w-11/12 md:w-11/12 lg:max-w-[80%] mx-auto h-full flex justify-between items-center">
        <NavLink
          to="/"
          className="cursor-pointer h-full flex items-center gap-2"
        >
          <img
            className="w-[40px] h-[40px] rounded-[12px]"
            src={logo}
            alt="Logo"
          />
          <h1 className="font-bold text-2xl text-primary logo-futzone">
            Futzone
          </h1>
        </NavLink>
        <div className="hidden md:flex text-gray-800 gap-4">
          {navLinkData.map((item, idx) => (
            <NavLink
              to={item.link}
              className="whitespace-nowrap text-white cursor-pointer px-4 py-2 rounded-lg hover:text-primary transition-all duration-300"
              key={idx}
            >
              <h1>{item.title}</h1>
            </NavLink>
          ))}
        </div>
        <div className="text-gray-800 flex gap-3 items-center">
          <div className="hidden whitespace-nowrap border-border cursor-pointer px-4 py-2 border rounded-lg">
            <h1 className="text-white">Leng</h1>
          </div>
          <button
            onClick={() => navigate("/login")}
            className="whitespace-nowrap border-border cursor-pointer px-4 py-2 border rounded-lg hidden md:block"
          >
            <h1 className="text-white">Kirish</h1>
          </button>
          <button
            onClick={() => navigate("/register")}
            className="whitespace-nowrap border-primary cursor-pointer px-4 py-2 border rounded-lg bg-primary text-white hidden md:block"
          >
            <h1 className="text-white">Ro'yxatdan o'tish</h1>
          </button>
          <div className="md:hidden">
            <div
              className="w-[40px] h-[40px] cursor-pointer"
              onClick={toggleMenu}
            >
              <img className="w-full h-full" src={menusvg} alt="Menu" />
            </div>
            <motion.div
              initial={{ opacity: 0, x: "150%" }}
              animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : "100%" }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.5 }}
              className="bg-gray-700 max-sm:w-full max-md:w-[70%] md:hidden absolute top-[88px] right-0 h-[calc(100vh-88px)] p-4 flex flex-col gap-4 "
            >
              {navLinkData.map((item, idx) => (
                <motion.div
                  key={idx}
                  onClick={() => {
                    navigate(item.link);
                    setIsOpen(false);
                  }}
                  whileHover={{ scale: 1.03 }}
                  className="flex text-white flex-col w-full rounded-lg cursor-pointer hover:bg-white hover:text-primary transition-all duration-300"
                >
                  <h1 className="w-full p-3 text-lg font-semibold">
                    {item.title}
                  </h1>
                </motion.div>
              ))}
              <button
                onClick={() => navigate("/login")}
                className="whitespace-nowrap border-[#fff] border-[1px] cursor-pointer px-4 py-2 rounded-lg  md:block text-white"
              >
                <h1>Kirish</h1>
              </button>
              <button
                onClick={() => navigate("/register")}
                className="whitespace-nowrap border-primary cursor-pointer px-4 py-2 border rounded-lg bg-primary text-white  md:block"
              >
                <h1>Ro'yxatdan o'tish</h1>
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
