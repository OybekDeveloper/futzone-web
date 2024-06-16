import React from "react";
import { logo } from "../../images";
import { navLinkData } from "../data";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="fixed backdrop-blur-[10px] top-0 left-0 w-full h-[88px] z-[999]">
      <div className="w-11/12 lg:max-w-[70%] mx-auto h-full  flex justify-between items-center sm:border-b-[0.5px] border-gray-700">
        <NavLink to={'/'} className="cursor-pointer h-full w-full flex justify-start  items-center gap-1">
          <img className="w-[40px] h-[40px] rounded-[12px]" src={logo} alt="" />
          <h1 className="font-[600] text-[24px] text-primary logo-futzone">
            Futzone
          </h1>
        </NavLink>
        <div className="max-md:hidden flex text-white gap-1 clamp4">
          {navLinkData.map((item, idx) => (
            <NavLink to={item.link}
              className="whitespace-nowrap cursor-pointer px-2 py-1 rounded-[12px] hover:text-primary transition-all ease-linear duration-300"
              key={idx}
            >
              <h1>{item.title}</h1>
            </NavLink>
          ))}
        </div>
        <div className="text-white">
          <div className="flex gap-3">
            <div className="lg:whitespace-nowrap border-gray-700 cursor-pointer px-2 py-1 border-[1px] rounded-[6px]">
              <h1>leng</h1>
            </div>
            <div className="max-sm:hidden lg:whitespace-nowrap border-gray-700 cursor-pointer px-2 py-1 border-[1px] rounded-[6px]">
              <h1>Kirish</h1>
            </div>
            <div className="max-sm:hidden whitespace-nowrap border-primary cursor-pointer px-2 py-1 border-[1px] rounded-[6px] bg-primary">
              <h1>Ro'yxatdan o'tish </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
