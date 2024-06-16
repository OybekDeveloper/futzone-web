import React, { useEffect, useState } from "react";

const Contents = () => {
  const [match, setMatch] = useState();
  useEffect(() => {
    const matchs = JSON.parse(localStorage.getItem("match"));
    setMatch(matchs);
  }, []);
  return (
    <main className="flex flex-col gap-[16px]">
      <section className="bg-[#333333] p-4 sm:rounded-[12px] w-full h-full">
        <h1 className="text-white clamp2 font-bold">Asosiy O'yinchilar</h1>
        <div className="w-full h-[1px] bg-thin my-[20px]"></div>
        <section className="w-full flex justify-between">
          <div className="w-[100px] h-[100px]">
            <img src={match?.team_home_badge} alt="" />
          </div>
          <div className="w-[100px] h-[100px]">
            <img src={match?.team_away_badge} alt="" />
          </div>
        </section>
        <div className="grid grid-cols-2 mt-[20px]">
          <div className="">
            {match?.lineup?.home?.starting_lineups?.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-start items-start w-full gap-3"
              >
                <h1 className="text-start font-[600] text-primary clamp3">
                  {item?.lineup_number}
                </h1>
                <h1 className="text-start font-[500] text-white clamp3">
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
                <h1 className="text-end font-[500] text-white clamp3">
                  {item?.lineup_player}
                </h1>
                <h1 className="text-end font-[600] text-primary clamp3">
                  {item?.lineup_number}
                </h1>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-[#333333] p-4 sm:rounded-[12px] w-full h-full">
        <h1 className="text-white clamp2 font-bold">Zaxira O'yinchilar</h1>
        <div className="w-full h-[1px] bg-thin my-[20px]"></div>
        <section className="w-full flex justify-between">
          <div className="w-[100px] h-[100px]">
            <img src={match?.team_home_badge} alt="" />
          </div>
          <div className="w-[100px] h-[100px]">
            <img src={match?.team_away_badge} alt="" />
          </div>
        </section>
        <div className="grid grid-cols-2 mt-[20px]">
          <div className="">
            {match?.lineup?.home?.substitutes?.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-start items-start w-full gap-3"
              >
                <h1 className="text-start font-[600] text-primary clamp3">
                  {item?.lineup_number}
                </h1>
                <h1 className="text-start font-[500] text-white clamp3">
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
                <h1 className="text-end font-[500] text-white clamp3">
                  {item?.lineup_player}
                </h1>
                <h1 className="text-end font-[600] text-primary clamp3">
                  {item?.lineup_number}
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
