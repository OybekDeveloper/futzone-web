import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { logo } from "../../images";
import { navLinkData } from "../data";

const Footer = () => {
  const { pathname } = useLocation();
  return (
    <div
      className={`bg-black w-full mt-[12px] ${
        pathname === "/login" || pathname === "/register" ? "hidden" : ""
      }`}
    >
      <div className="max-sm:w-full w-11/12 md:w-11/12 lg:max-w-[80%] mx-auto h-full flex justify-center items-center py-[24px] flex-col gap-5">
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
        <div className="text-gray-800 ">
          {navLinkData.map((item, idx) => (
            <NavLink
              to={item.link}
              className="inline-flex whitespace-nowrap text-white cursor-pointer px-4 py-2 rounded-lg hover:text-primary transition-all duration-300 justify-start gap-4"
              key={idx}
            >
              <h1>{item.title}</h1>
              <div>|</div>
            </NavLink>
          ))}
        </div>
        <div className="w-full h-[1px] bg-[#333333]"></div>
        <p className="w-full text-center text-white text-[12px]">
          Copyright © 2024 Futzone
        </p>
      </div>
    </div>
  );
};

export default Footer;
