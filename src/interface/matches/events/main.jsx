import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { GiWhistle } from "react-icons/gi";
import { FaWindowClose } from "react-icons/fa";
import { IoTimerOutline } from "react-icons/io5";
import { MdOutlineTimer } from "react-icons/md";
import { MdAccessTime } from "react-icons/md";
import { GiTrophyCup } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { emptyclub } from "../../../images";

const Main = ({ match }) => {
  const navigate = useNavigate();
  return (
    <main className="flex flex-col gap-4">
      {/* last meeting in clubs */}
      <section className="flex flex-col gap-3">
        <h1 className="clamp3 text-white font-[500]">
          Jamoalarning so'nggi uchrashuvlari
        </h1>
        <div className="flex flex-col gap-4">
          {[1, 2, 3, 4].map((item, idx) => (
            <div key={idx}>
              <li
                onClick={() => {
                  navigate(`/match/${match.match_id}`);
                }}
                key={match.match_id}
                className="bg-secondaryBg-dark text-white relative w-full grid grid-cols-3 py-2 rounded-[12px] px-3 cursor-pointer gap-3 "
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
                  <div className="flex justify-start items-center gap-1">
                    <div>
                      <FaCalendarAlt className="text-primary" />
                    </div>
                    <h1 className="text-thin font-bold clamp4">
                      {match?.match_date}
                    </h1>
                  </div>
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
                        <img src={emptyclub} alt="" />
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

                    <div className="flex justify-center items-center gap-1">
                      <GiWhistle className="text-thin" />
                      <h1 className="text-[10px] text-thin">Yakunlangan</h1>
                    </div>
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
                        <img src={emptyclub} alt="" />
                      </span>
                    </div>
                  )}
                </div>
              </li>
            </div>
          ))}
        </div>
      </section>
      {/* last meet home clubs */}
      <section className="flex flex-col gap-3">
        <h1 className="clamp3 text-white font-[500]">
          Home so'nggi uchrashuvlari
        </h1>
        <div className="flex flex-col gap-4">
          {[1, 2, 3, 4].map((item, idx) => (
            <div key={idx}>
              <li
                onClick={() => {
                  navigate(`/match/${match.match_id}`);
                }}
                key={match.match_id}
                className="bg-secondaryBg-dark text-white relative w-full grid grid-cols-3 py-2 rounded-[12px] px-3 cursor-pointer gap-3 "
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
                  <div className="flex justify-start items-center gap-1">
                    <div>
                      <FaCalendarAlt className="text-primary" />
                    </div>
                    <h1 className="text-thin font-bold clamp4">
                      {match?.match_date}
                    </h1>
                  </div>
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
                        <img src={emptyclub} alt="" />
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

                    <div className="flex justify-center items-center gap-1">
                      <GiWhistle className="text-thin" />
                      <h1 className="text-[10px] text-thin">Yakunlangan</h1>
                    </div>
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
                        <img src={emptyclub} alt="" />
                      </span>
                    </div>
                  )}
                </div>
              </li>
            </div>
          ))}
        </div>
      </section>
      {/* last meet away clubs */}
      <section className="flex flex-col gap-3">
        <h1 className="clamp3 text-white font-[500]">
          Away so'nggi uchrashuvlari
        </h1>
        <div className="flex flex-col gap-4">
          {[1, 2, 3, 4].map((item, idx) => (
            <div key={idx}>
              <li
                onClick={() => {
                  navigate(`/match/${match.match_id}`);
                }}
                key={match.match_id}
                className="bg-secondaryBg-dark text-white relative w-full grid grid-cols-3 py-2 rounded-[12px] px-3 cursor-pointer gap-3 "
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
                  <div className="flex justify-start items-center gap-1">
                    <div>
                      <FaCalendarAlt className="text-primary" />
                    </div>
                    <h1 className="text-thin font-bold clamp4">
                      {match?.match_date}
                    </h1>
                  </div>
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
                        <img src={emptyclub} alt="" />
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

                    <div className="flex justify-center items-center gap-1">
                      <GiWhistle className="text-thin" />
                      <h1 className="text-[10px] text-thin">Yakunlangan</h1>
                    </div>
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
                        <img src={emptyclub} alt="" />
                      </span>
                    </div>
                  )}
                </div>
              </li>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Main;
