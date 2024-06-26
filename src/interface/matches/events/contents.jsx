import React, { useEffect, useState } from "react";
import Loader from "../../../components/loader/loader";
import { MdOutlineRunCircle } from "react-icons/md";
import { MdOutlineChangeCircle } from "react-icons/md";
import { BsFillPeopleFill } from "react-icons/bs";

const Contents = ({ match }) => {
  if (!match) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }
  return (
    <main className="flex flex-col gap-[16px]">
      <section className="bg-secondaryBg-dark p-4 rounded-[12px] w-full h-full">
        <div className="flex justify-start items-center gap-1">
          <MdOutlineRunCircle className="text-green-600 text-[24px]" />
          <h1 className="text-white clamp3 font-bold">Boshlangich tarkiblar</h1>
        </div>
        <div className="w-full h-[2px] bg-navbar my-[10px]"></div>
        <div className="grid grid-cols-2">
          <div className="">
            {match?.lineup?.home?.starting_lineups?.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-start items-start w-full gap-3"
              >
                <h1 className="text-start font-[600] text-primary clamp4">
                  {item?.lineup_number}
                </h1>
                <h1 className="text-start font-[500] text-white clamp4">
                  {item?.lineup_player}
                </h1>
              </div>
            ))}
          </div>
          <div className="">
            {match?.lineup?.away?.starting_lineups?.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-end items-start w-full gap-3"
              >
                <h1 className="text-end font-[500] text-white clamp4">
                  {item?.lineup_player}
                </h1>
                <h1 className="text-end font-[600] text-primary clamp4">
                  {item?.lineup_number}
                </h1>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-secondaryBg-dark p-4 sm:rounded-[12px] w-full h-full">
        <div className="flex justify-start items-center gap-1">
          <MdOutlineChangeCircle className="text-yellow-300 text-[24px]" />
          <h1 className="text-white clamp3 font-bold">Zaxira o'yinchilar</h1>
        </div>
        <div className="w-full h-[2px] bg-navbar my-[10px]"></div>
        <div className="grid grid-cols-2">
          <div className="">
            {match?.lineup?.home?.substitutes?.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-start items-start w-full gap-3"
              >
                <h1 className="text-start font-[600] text-primary clamp4">
                  {item?.lineup_number}
                </h1>
                <h1 className="text-start font-[500] text-white clamp4">
                  {item?.lineup_player}
                </h1>
              </div>
            ))}
          </div>
          <div className="">
            {match?.lineup?.away?.substitutes?.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-end items-start w-full gap-3"
              >
                <h1 className="text-end font-[500] text-white clamp4">
                  {item?.lineup_player}
                </h1>
                <h1 className="text-end font-[600] text-primary clamp4">
                  {item?.lineup_number}
                </h1>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-secondaryBg-dark p-4 sm:rounded-[12px] w-full h-full">
        <div className="flex justify-start items-center gap-1">
          <BsFillPeopleFill className="text-blue-500 text-[24px]" />
          <h1 className="text-white clamp3 font-bold">Murabbiylar</h1>
        </div>
        <div className="w-full h-[2px] bg-navbar my-[10px]"></div>
        <div className="grid grid-cols-2">
          <div className="">
            {match?.lineup?.home?.coach?.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-start items-start w-full gap-3"
              >
                <h1 className="text-start font-[500] text-white clamp4">
                  {item?.lineup_player}
                </h1>
              </div>
            ))}
          </div>
          <div className="">
            {match?.lineup?.away?.coach?.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-end items-start w-full gap-3"
              >
                <h1 className="text-end font-[500] text-white clamp4">
                  {item?.lineup_player}
                </h1>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contents;
