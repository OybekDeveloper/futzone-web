import React, { useEffect, useState } from "react";
import { redcard, yellowcard, yellowredcard } from "../../images";
import ProgressBar from "@ramonak/react-progress-bar";

const Summary = () => {
  const [match, setMatch] = useState();
  useEffect(() => {
    const matchs = JSON.parse(localStorage.getItem("match"));
    setMatch(matchs);
  }, []);

  return (
    <main className="flex flex-col justify-start items-start gap-[12px]">
      <section className="bg-[#333333] p-4 sm:rounded-[12px] w-full h-full">
        <h1 className="text-white clamp2 font-bold">Asosiy voqealar</h1>
        <div className="w-full h-[1px] bg-thin my-[20px]"></div>
        <section className="w-full flex justify-between">
          <div className="w-[100px] h-[100px]">
            <img src={match?.team_home_badge} alt="" />
          </div>
          <div className="w-[100px] h-[100px]">
            <img src={match?.team_away_badge} alt="" />
          </div>
        </section>
        <section className="mt-[20px]">
          <div className="flex justify-between sm:justify-around items-center w-full gap-4">
            <div className="flex flex-col justify-start gap-2 items-start w-full">
              {match?.cards?.map((item, idx) => (
                <div className="flex justify-between items-center gap-3 w-full">
                  {/* Home Scorers */}
                  <div className="flex justify-start items-center gap-2">
                    {item?.home_fault && (
                      <>
                        <p className="text-white clamp3 font-bold">
                          {item?.home_fault}
                        </p>
                        {item?.card === "yellow card" && (
                          <img
                            className="w-[30px] h-[30px]"
                            src={yellowcard}
                            alt="goal"
                          />
                        )}
                        {item?.card === "red card" && (
                          <img
                            className="w-[30px] h-[30px]"
                            src={redcard}
                            alt="goal"
                          />
                        )}
                        <p className="text-white font-[500]">{item?.time}'</p>
                      </>
                    )}
                  </div>

                  {/* Away Scorers */}
                  <div className="flex justify-end items-center gap-2">
                    {item?.away_fault && (
                      <>
                        <p className=" text-white font-[500]">{item?.time}'</p>
                        {item?.card === "yellow card" && (
                          <img
                            className="w-[30px] h-[30px]"
                            src={yellowcard}
                            alt="goal"
                          />
                        )}
                        {item?.card === "red card" && (
                          <img
                            className="w-[30px] h-[30px]"
                            src={redcard}
                            alt="goal"
                          />
                        )}
                        <p className="clamp3 text-white font-bold">
                          {item?.away_fault}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>

      <section className="bg-[#333333] p-4 sm:rounded-[12px] w-full h-full">
        <h1 className="text-white clamp2 font-bold">Stats</h1>
        <div className="w-full h-[1px] bg-thin my-[20px]"></div>
        <div className="w-full flex justify-between">
          <div className="w-[100px] h-[100px]">
            <img src={match?.team_home_badge} alt="Home Team Badge" />
          </div>
          <div className="w-[100px] h-[100px]">
            <img src={match?.team_away_badge} alt="Away Team Badge" />
          </div>
        </div>
        <div className="flex flex-col gap-5 w-full">
          {match?.statistics?.map((item, idx) => {
            const homeValue = parseFloat(item.home.replace("%", ""));
            const awayValue = parseFloat(item.away.replace("%", ""));
            const total = homeValue + awayValue;

            return (
              <div key={idx}>
                <div className="w-full flex justify-between items-center">
                  <p className="text-bold clamp3 text-white">{item.home}</p>
                  <p className="text-bold clamp3 text-white">{item.type}</p>
                  <p className="text-bold clamp3 text-white">{item.away}</p>
                </div>
                <div className="flex justify-between w-full gap-[12px]">
                  <div className="relative w-full">
                    <div
                      className="absolute top-0 left-0 h-full w-full"
                      style={{
                        transform: "rotateY(180deg)",
                      }}
                    >
                      <ProgressBar
                        barContainerClassName="bg-[#1a1a1a] rounded-[4px]"
                        className="w-full"
                        completed={total > 0 ? (homeValue / total) * 100 : 0}
                        maxCompleted={100}
                        bgColor="#fff"
                        height="10px"
                        animateOnRender={true}
                        customLabel=" "
                      />
                    </div>
                  </div>
                  <ProgressBar
                    barContainerClassName="bg-[#1a1a1a] rounded-[4px]"
                    className="w-full"
                    completed={total > 0 ? (awayValue / total) * 100 : 0}
                    maxCompleted={100}
                    bgColor="#fff"
                    height="10px"
                    animateOnRender={true}
                    customLabel=" "
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Summary;
