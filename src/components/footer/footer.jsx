import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { logo } from "../../images";
import { AppData, SupportData, navLinkData, socialMedias } from "../data";

const Footer = () => {
  const { pathname } = useLocation();
  return (
    <div
      className={`bg-black w-full mt-[12px] ${
        pathname === "/login" ||
        pathname === "/register" ||
        pathname === "/futzone-tv"
          ? "hidden"
          : ""
      }`}
    >
      <div className="w-11/12 md:w-11/12 lg:max-w-[80%] mx-auto h-full flex justify-start items-start py-[24px] flex-col gap-5">
        <main className="grid md:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-7">
          <NavLink
            to="/"
            className="cursor-pointer w-full items-start flex gap-2"
          > 
          <div className="flex justify-center items-center gap-2">
          <img
              className="w-[40px] h-[40px] rounded-[12px]"
              src={logo}
              alt="Logo"
            />
            <h1 className="font-bold text-2xl text-primary logo-futzone">
              Futzone
            </h1>
          </div>
          </NavLink>
          <div className="text-gray-800 ">
            <h1 className="text-white font-bold clamp3">Havolalar</h1>
            {navLinkData.map((item, idx) => (
              <NavLink
                to={item.link}
                className="inline-flex whitespace-nowrap text-thin cursor-pointer px-2 py-2 rounded-lg hover:text-primary transition-all duration-300 justify-start gap-4"
                key={idx}
              >
                <h1>{item.title}</h1>
                <div>|</div>
              </NavLink>
            ))}
          </div>
          <div className="">
            <h1 className="text-white font-bold clamp3">Ijtimoiy tarmoqlar</h1>
            {socialMedias.map((item, idx) => (
              <NavLink
                to={item.url}
                key={idx}
                className={
                  "inline-flex whitespace-nowrap justify-center items-center  px-2 py-2 rounded-lg text-thin hover:text-primary transition-all duration-300 gap-2"
                }
              >
                <div className=" clamp3 gap-1 ">{item.icon}</div>
                <h1 className="">{item.name}</h1>
              </NavLink>
            ))}
          </div>
          <div className="">
            <h1 className="text-white font-bold clamp3">Qo'llab-quvvatlash</h1>
            {SupportData.map((item, idx) => (
              <NavLink
                to={item.url}
                key={idx}
                className={
                  "inline-flex whitespace-nowrap justify-center items-center  px-2 py-2 rounded-lg text-thin hover:text-primary transition-all duration-300 gap-2"
                }
              >
                <div className=" clamp3 gap-1 ">{item.icon}</div>
                <h1 className="">{item.name}</h1>
              </NavLink>
            ))}
          </div>
          <div className="">
            <h1 className="text-white font-bold clamp3">Ilovamiz</h1>
            {AppData.map((item, idx) => (
              <NavLink
                to={item.url}
                key={idx}
                className={
                  "flex whitespace-nowrap justify-start items-start py-2 rounded-lg text-thin hover:text-primary transition-all duration-300 gap-2"
                }
              >
                <div className=" clamp3 gap-1 ">{item.icon}</div>
                <h1 className="">{item.name}</h1>
              </NavLink>
            ))}
          </div>
        </main>
        <div className="w-full h-[1px] bg-[#333333]"></div>
        <p className="w-full text-center text-white text-[12px]">
          Copyright © 2024 Futzone
        </p>
      </div>
    </div>
  );
};

export default Footer;
