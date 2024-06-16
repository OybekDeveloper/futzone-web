import React from "react";
import { rigtharrow, timelogo } from "../../images";
import { NavLink } from "react-router-dom";

const   News = () => {
  return (
    <div className="col-span-2 mb-[20px]">
      <h1 className="clamp3 text-thin font-bold">So'ngi yangiliklar</h1>
      <div className="w-full h-[2px] bg-border mt-2"></div>
      <div className="flex flex-col gap-5  my-[20px]">
        {[1, 2, 3, 4, 5, 6, 7].map((item, idx) => (
          <div key={idx} className="w-full flex flex-col gap-2">
            <div className="w-full h-[200px]">
              <img
                className="object-cover w-full h-full rounded-[12px]"
                src="https://e0.365dm.com/24/06/768x432/skysports-stones-england_6580305.jpg?20240613091641"
                alt=""
              />
            </div>
            <div className="flex justify-start items-center gap-3">
              <img src={timelogo} alt="" />
              <h1 className="text-secondary clamp4 font-bold">
                August 7, 2017
              </h1>
            </div>
            <p className="clamp4 font-[500] text-thin text-justify">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Voluptatibus modi aliquam quibusdam voluptate atque ...
            </p>
            <div className="flex justify-between items-center w-full">
              <div className="cursor-pointer flex justify-start items-center gap-1">
                {LikeSVG("red")}
                <h1 className="text-[12px] text-thin font-bold">Yoqdi • 100 </h1>
              </div>
              <NavLink to={"/news"} className="flex justify-start items-center">
                <h1 className="text-[12px] text-primary font-bold">
                  Batafsil o'qish
                </h1>
                <img src={rigtharrow} alt="" />
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;

const LikeSVG = (color) => {
  if (color === "red") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M6.95511 6.69699C7.7151 7.58915 8.82811 8.10313 10.0001 8.10313C11.1721 8.10312 12.2851 7.58915 13.0451 6.69699C13.1211 6.60776 13.1868 6.55862 13.228 6.53628C13.2456 6.52674 13.2622 6.51996 13.2827 6.51461C13.302 6.50955 13.3464 6.5 13.426 6.5C13.5268 6.5 13.6896 6.52392 13.917 6.79474C14.1819 7.11021 14.3334 7.55298 14.3334 7.9C14.3334 8.17152 14.2249 8.66117 13.7303 9.39843C13.2389 10.1309 12.5072 10.8936 11.6445 11.6207C11.0843 12.0928 10.5146 12.5118 10.0001 12.8608C9.48555 12.5118 8.91583 12.0928 8.35565 11.6207C7.49292 10.8936 6.76123 10.1309 6.26986 9.39843C5.77531 8.66117 5.66675 8.17152 5.66675 7.9C5.66675 7.55298 5.81828 7.11021 6.08315 6.79474C6.31054 6.52392 6.47334 6.5 6.57416 6.5C6.6538 6.5 6.69817 6.50955 6.71748 6.51461C6.73794 6.51996 6.75454 6.52674 6.77212 6.53628C6.81332 6.55862 6.8791 6.60776 6.95511 6.69699Z"
          stroke="#FD6F8E"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  } else {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M13.426 2.5C16.3612 2.5 18.3334 5.29375 18.3334 7.9C18.3334 13.1781 10.1482 17.5 10.0001 17.5C9.85193 17.5 1.66675 13.1781 1.66675 7.9C1.66675 5.29375 3.63897 2.5 6.57416 2.5C8.25934 2.5 9.36119 3.35312 10.0001 4.10312C10.639 3.35312 11.7408 2.5 13.426 2.5Z"
          stroke="#4D5761"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
};
