import React, { useEffect, useState } from "react";
import { ApiServer } from "../../components/api.services";
import { SoccerLeagues } from "../../components/data";
import { emptyclub, rigtharrow, timelogo } from "../../images";
import Standing from "./standing";
import Swapper from "./swapper-news";
import { NavLink, useNavigate } from "react-router-dom";
import Loader from "../../components/loader/loader";
import { useDispatch } from "react-redux";
import { selectLeagueData } from "../../reducer/redux";
import { europe } from "../../images/leagues";
import { FaCalendarAlt } from "react-icons/fa";
import { GiWhistle } from "react-icons/gi";
import { FaWindowClose } from "react-icons/fa";
import { IoTimerOutline } from "react-icons/io5";
import { MdOutlineTimer } from "react-icons/md";
import { MdAccessTime } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { BiLike } from "react-icons/bi";
import { GiTrophyCup } from "react-icons/gi";

const Matches = (props) => {
  const { extractTime, news, matchesData, addHoursToTime, getInitials } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <main className="col-span-3 h-full">
      {/* pined news */}
      <section className="w-full md:screen-minus-120 max-md:h-[300px]">
        <Swapper extractTime={extractTime} />
      </section>

      {/* Matches */}
      <section className="w-11/12 mx-auto">
        <div className="w-full flex justify-between items-center mt-[24px]">
          <h1 className="clamp3 font-bold text-white">O'yinlar & natijalar</h1>
          <NavLink to={`/matches`} className="flex items-center justify-start">
            <h1 className="clamp4 text-primary font-bold">Barcha o'yinlar</h1>
            <img src={rigtharrow} alt="" />
          </NavLink>
        </div>
        <div className="w-full h-[2px] bg-navbar my-[12px]"></div>
        {/* match */}
        <ul className="py-2 flex flex-col justify-center items-start gap-3">
          {matchesData?.slice(0, 10)?.map((match) => (
            <li
              onClick={() => {
                navigate(`/match/${match.match_id}`);
              }}
              key={match.match_id}
              className="bg-secondaryBg-dark hover:bg-navbar transition-all duration-300 text-white relative w-full grid grid-cols-3 py-2 rounded-[12px] px-3 cursor-pointer gap-3 "
            >
              <div className="w-full flex justify-between items-center gap-2 col-span-3 text-[14px]">
                <div className="flex justify-start items-center gap-1">
                  <div>
                    <GiTrophyCup className="text-primary" />
                  </div>
                  <h1 className="text-thin font-bold clamp4">
                    {match?.league_name}
                  </h1>
                </div>
                {match.match_status === "Finished" ? (
                  <div className="flex justify-start items-center gap-1">
                    <div>
                      <FaCalendarAlt className="text-primary" />
                    </div>
                    <h1 className="text-thin font-bold clamp4">
                      {match?.match_date}
                    </h1>
                  </div>
                ) : (
                  <div className="flex justify-start items-center gap-1">
                    <div>
                      <MdAccessTime className="text-primary text-[16px]" />
                    </div>
                    <h1 className="text-thin font-bold clamp4">
                      {addHoursToTime(match?.match_time, 3)}
                    </h1>
                  </div>
                )}
              </div>
              <div className="flex justify-start items-center gap-2">
                {match?.team_home_badge ? (
                  <img
                    className="w-[30px] h-[30px] object-contain"
                    src={
                      match?.team_home_badge
                        ? match?.team_home_badge
                        : emptyclub
                    }
                    alt={`${match?.match_hometeam_name} logo`}
                    onError={(e) => (e.target.src = emptyclub)}
                  />
                ) : (
                  <div className="w-[30px] h-[30px] bg-gray-700 flex justify-center items-center rounded-md">
                    <span className="text-white font-bold">
                      {getInitials(match?.match_hometeam_name)}
                    </span>
                  </div>
                )}
                <span className="font-medium text-start clamp4">
                  {match?.match_hometeam_name}
                </span>
              </div>
              <div className="flex justify-center items-center text-center">
                <div>
                  {match?.match_hometeam_score &&
                    match?.match_awayteam_score && (
                      <h1 className="px-2 py-1 rounded-md clamp1 text-primary font-bold">
                        {match?.match_hometeam_score} :{" "}
                        {match?.match_awayteam_score}
                      </h1>
                    )}
                  {match?.match_status === "" ? (
                    <h1 className="px-2 py-1 rounded-md text-sm font-bold text-thin">
                      <span>VS</span>
                    </h1>
                  ) : match?.match_status === "Finished" ? (
                    <div className="flex justify-center items-center gap-1">
                      <GiWhistle className="text-thin" />
                      <h1 className="text-[10px] text-thin">Yakunlangan</h1>
                    </div>
                  ) : match?.match_status === "Cancelled" ? (
                    <div className="flex justify-center items-center gap-1">
                      <FaWindowClose className="text-thin" />
                      <h1 className="text-[12px] text-thin">Bekor qilingan</h1>
                    </div>
                  ) : match?.match_status === "Postponed" ? (
                    <div className="flex justify-center items-center gap-1">
                      <IoTimerOutline className="text-thin" />
                      <h1 className="text-[12px] text-thin">Kechiktirilgan</h1>
                    </div>
                  ) : (
                    <div className="flex justify-center items-center gap-1">
                      <MdOutlineTimer className="text-green-600 text-[12px]" />
                      <h1 className="text-[12px] text-thin">
                        {match?.match_status}'
                      </h1>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-end items-center gap-2">
                <span className="font-medium  text-end clamp4">
                  {match?.match_awayteam_name}
                </span>
                {match?.team_away_badge ? (
                  <img
                    className="w-[30px] h-[30px] object-contain"
                    alt={`${match?.match_awayteam_name} logo`}
                    src={
                      match?.team_away_badge
                        ? match?.team_away_badge
                        : emptyclub
                    }
                    onError={(e) => (e.target.src = emptyclub)}
                  />
                ) : (
                  <div className="w-[30px] h-[30px] bg-gray-700 flex justify-center items-center rounded-md">
                    <span className="text-white font-bold">
                      {getInitials(match?.match_awayteam_name)}
                    </span>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
        \
      </section>
      <section className="md:hidden col-span-2 mb-[20px] w-11/12 mx-auto mt-3">
        <h1 className="clamp3 text-thin font-bold">So'ngi yangiliklar</h1>
        <div className="w-full h-[2px] bg-border mt-2"></div>
        <div className="flex flex-col gap-5  my-[20px]">
          {news.slice(0, 6)?.map((item, idx) => (
            <div key={idx} className="w-full grid grid-cols-3 gap-2">
              <div className="max-sm:col-span-3 max-md:col-span-1 w-full h-[200px]">
                <img
                  className="object-cover w-full h-full rounded-[12px]"
                  src={`https://sws-news.uz/api/v1/files/${item?.images[0]}`}
                  alt=""
                />
              </div>
              <div className="max-sm:col-span-3 max-md:col-span-2 flex flex-col justify-between gap-3">
                <h1 className="clamp3 text-white font-bold">
                  {item?.title_uz?.length > 40
                    ? item?.title_uz.slice(0, 40) + "..."
                    : item?.title_uz}
                </h1>
                <p className="clamp4 font-[500] text-thin text-justify">
                  {item?.text_uz?.length > 120
                    ? item?.text_uz.slice(0, 120) + "..."
                    : item?.text_uz}
                </p>
                <div className="flex justify-start items-center w-full">
                  <div className="w-auto flex justify-between items-center gap-3">
                    <div className="flex justify-around items-center gap-2 text-start">
                      <MdAccessTime className="text-[20px] text-thin" />
                      <h1 className="text-[14px] font-bold text-thin">
                        {extractTime(item?.created_date)}
                      </h1>
                    </div>
                    <div className="flex justify-around items-center gap-2 text-start">
                      <IoEyeOutline className="text-[20px] text-thin" />
                      <h1 className="text-[14px] font-bold text-thin">
                        {item?.views}
                      </h1>
                    </div>
                    <div className="flex justify-around items-center gap-2 text-start">
                      <AiOutlineMessage className="text-[20px] text-thin" />
                      <h1 className="text-[14px] font-bold text-thin">
                        {item?.comments}
                      </h1>
                    </div>
                    <div className="flex justify-around items-center gap-2 text-start">
                      <BiLike className="text-[20px] text-thin" />
                      <h1 className="text-[14px] font-bold text-thin">
                        {item?.likes}
                      </h1>
                    </div>
                  </div>
                  <NavLink
                    to={`/news/${item.id}`}
                    className="w-full flex justify-end items-center"
                  >
                    <h1 className="clamp4 text-primary font-bold">
                      Batafsil o'qish
                    </h1>
                    <img src={rigtharrow} alt="" />
                  </NavLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Turnir jadvali */}
      <section className="w-11/12 mx-auto">
        <h1 className="clamp2 font-bold text-white">Turnir jadvali</h1>
        <div className="w-full h-[2px] bg-border my-[20px]"></div>
        <Standing />
      </section>
    </main>
  );
};

export default Matches;
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
