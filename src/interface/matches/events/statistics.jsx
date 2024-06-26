import React from "react";
import { emptyclub } from "../../../images";
import ProgressBar from "@ramonak/react-progress-bar";

const Statistics = ({ match }) => {
  return (
    <div>
      <section className="bg-secondaryBg-dark p-4 rounded-[12px] w-full h-full">
        <div className="flex flex-col gap-5 w-full">
          {match?.statistics?.map((item, idx) => {
            const homeValue = parseFloat(item.home.replace("%", ""));
            const awayValue = parseFloat(item.away.replace("%", ""));
            const total = homeValue + awayValue;

            return (
              <div key={idx} className="flex flex-col gap-2">
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
    </div>
  );
};

export default Statistics;
