import React from "react";
import { backgroundlogin } from "../../images";

const Loginn = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-full">
      <div className="w-full flex flex-col mx-auto justify-center items-center max-w-[300px] gap-[12px]">
        <h1 className="clamp2 font-bold text-white">Tizimga kirish</h1>
        <p className="text-thin text-center">
          Tizimga kirish uchun quyidagi ma'lumotlarni to'ldiring
        </p>
        <form action="" className="w-full flex flex-col gap-[12px]">
          <div className="flex flex-col gap-2">
            <label htmlFor="text" className="clamp4 text-thin font-bold">
              Login
            </label>
            <input
              className="w-full bg-transparent border-[#646464] border-[1px] bg-[#3d3d3d] outline-none px-[8px] py-[8px] rounded-[6px] focus:border-primary text-white transition-all ease-linear duration-[0.4]"
              type="text"
              id="text"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="text" className="clamp4 text-thin font-bold">
              Parol
            </label>
            <input
              className="w-full bg-transparent border-[#646464] border-[1px] bg-[#3d3d3d] outline-none px-[8px] py-[8px] rounded-[6px] focus:border-primary text-white transition-all ease-linear duration-[0.4]"
              type="password"
              id="text"
            />
          </div>
          <button className="w-full p-[8px] bg-primary rounded-[6px] clamp3 font-bold text-white">Kirish</button>
        </form>
      </div>
      <div className="w-full h-full max-md:hidden">
        <img
          className="w-full h-screen object-cover"
          src={backgroundlogin}
          alt=""
        />
      </div>
    </div>
  );
};

export default Loginn;
