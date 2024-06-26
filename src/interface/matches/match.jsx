import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ApiServer } from "../../components/api.services";
import { assissvg, emptyclub, goalsvg } from "../../images";
import Loader from "../../components/loader/loader";
import { motion } from "framer-motion";
import Summary from "./events/summary";
import Contents from "./events/contents";
import Comments from "./events/comments";
import { GiWhistle } from "react-icons/gi";
import { FaWindowClose } from "react-icons/fa";
import { IoTimerOutline } from "react-icons/io5";
import { MdOutlineTimer } from "react-icons/md";
import { matchEventsData } from "../../components/data";
import { GiTrophyCup } from "react-icons/gi";
import { MdOutlineStadium } from "react-icons/md";
import { FaCalendarDays } from "react-icons/fa6";
import { IoFootball } from "react-icons/io5";
import Main from "./events/main";
import Statistics from "./events/statistics";

const Match = () => {
  const { match_id } = useParams();
  const navigate = useNavigate();

  const [match, setMatch] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(1);

  const handleActiveTab = (active) => {
    setActiveTab(active.id);
  };

  const contentMatchPage = (page) => {
    switch (page) {
      case 1:
        return <Main match={match} />;
      case 2:
        return <Summary match={match} />;
      case 3:
        return <Contents match={match} />;
      case 4:
        return <Statistics match={match} />;
      case 5:
        return <Comments match={match} />;
      default:
        return navigate(`/match/${match_id}`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ApiServer.getMatchData(match_id);
        setMatch(response[0]);
        console.log(response[0]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    window.scrollTo(0, 0);
  }, [match_id]);

  if (loading) {
    return (
      <div className="h-screen col-span-3 w-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }
  if (match.length < 0) {
    return (
      <div className="h-screen col-span-3 w-full flex justify-center items-center">
        Bunday o'yin mavjud emas
      </div>
    );
  }
  return (
    <main className="w-11/12 max-w-[1440px] mx-auto min-h-[calc(100vh-88px)] mt-[88px]  gap-3">
      <section className="w-full flex justify-center items-start flex-col py-4">
        <div className="w-full grid grid-cols-3 gap-4">
          <div className="flex max-md:flex-col-reverse max-md:justify-between justify-end items-center gap-3">
            <h1 className="text-white font-[700] clamp3">
              {match?.match_hometeam_name}
            </h1>
            <div className="w-[60px] md:w-[100px] h-[60px] md:h-[100px]">
              <img
                className="w-full h-full object-contain"
                src={match?.team_home_badge ? match.team_home_badge : emptyclub}
                alt="Home Team Badge"
                onError={(e) => (e.target.src = emptyclub)}
              />
            </div>
          </div>
          <div className="flex justify-center items-center text-center">
            <div>
              {match?.match_hometeam_score && match?.match_awayteam_score && (
                <h1 className="px-2 py-1 rounded-md clamp1 text-primary  font-bold">
                  {match?.match_hometeam_score} : {match?.match_awayteam_score}
                </h1>
              )}
              {match?.match_status === "" ? (
                <h1 className="px-2 py-1 rounded-md clamp1 font-bold text-primary">
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
          <div className="flex max-md:flex-col max-md:justify-between justify-start items-center gap-3">
            <div className="w-[60px] md:w-[100px] h-[60px] md:h-[70px]">
              <img
                className="w-full h-full object-contain"
                src={match?.team_away_badge ? match.team_away_badge : emptyclub}
                alt=""
              />
            </div>
            <h1 className="text-white font-[700] clamp3">
              {match?.match_awayteam_name}
            </h1>
          </div>
        </div>
        {/* info   */}
        <div className="p-2 bg-secondaryBg-dark rounded-md w-full flex flex-col gap-2 mb-2 mt-4">
          <div className="flex justify-start items-center gap-2">
            <MdOutlineStadium className="text-primary clamp3" />
            <h1 className="clamp4 text-white">{match?.match_stadium}</h1>
          </div>
          <div className="flex justify-start items-center gap-2">
            <GiWhistle className="text-primary clamp3" />
            <h1 className="clamp4 text-white">{match?.match_referee}</h1>
          </div>
          <div className="flex justify-start items-center gap-2">
            <GiTrophyCup className="text-primary clamp3" />
            <h1 className="clamp4 text-white">{match?.league_name}</h1>
          </div>
          <div className="flex justify-start items-center gap-2">
            <FaCalendarDays className="text-primary clamp3" />
            <h1 className="clamp4 text-white">{match?.league_year}</h1>
          </div>
          <div className="flex justify-start items-center gap-2">
            <IoFootball className="text-primary clamp3" />
            <h1 className="clamp4 text-white">{match?.match_round} - tur</h1>
          </div>
        </div>
        {/* Goals list */}
       
        {/* desktop */}
        <div className="flex justify-between sm:justify-around items-center w-full gap-4 max-sm:hidden">
          <div className="flex flex-col justify-start gap-2 items-start">
            {match?.goalscorer?.map((item, idx) => {
              if (!item.home_scorer) {
                return null;
              }
              return (
                <div key={idx} className="w-full h-full">
                  <div className="flex justify-start items-center gap-3">
                    <p className="text-white font-bold flex gap-2 justify-start items-center ">
                      {item?.home_scorer}
                    </p>
                    {item?.home_scorer && (
                      <img className="w-[20px] h-[20px]" src={goalsvg} alt="" />
                    )}
                    {item?.home_scorer && (
                      <p className="text-white font-[500] text">
                        {item?.time}'
                      </p>
                    )}
                    <h1 className="text-thin flex justify-start items-center gap-3">
                      {item?.home_assist}
                      {item?.home_assist && (
                        <img
                          className="w-[20px] h-[20px]"
                          src={assissvg}
                          alt="assist"
                        />
                      )}
                    </h1>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col justify-end gap-2">
            {match?.goalscorer?.map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-start items-center gap-3">
                  <p className="text-white font-bold flex gap-2 justify-start items-center ">
                    {item?.away_scorer}
                  </p>
                  {item?.away_scorer && (
                    <img className="w-[20px] h-[20px]" src={goalsvg} alt="" />
                  )}
                  {item?.away_scorer && (
                    <p className="text-white font-[500] text">{item?.time}'</p>
                  )}
                  <h1 className="text-thin flex justify-start items-center gap-3">
                    {item?.away_assist}
                    {item?.away_assist && (
                      <img
                        className="w-[20px] h-[20px]"
                        src={assissvg}
                        alt="assist"
                      />
                    )}
                  </h1>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* mobile */}
        <div className="sm:hidden flex justify-between sm:justify-around items-center w-full gap-4">
          <div className="flex flex-col justify-start gap-2 items-start w-full">
            {match?.goalscorer?.map((item, idx) => (
              <div key={idx} className="w-full h-full">
                <div className="flex justify-between items-center gap-3 w-full">
                  {/* Home Scorers */}
                  <div className="clamp4 flex justify-start items-center gap-2">
                    {item?.home_scorer && (
                      <>
                        <p className="text-white font-bold">
                          {item?.home_scorer}
                        </p>
                        <img
                          className="w-[16px] h-[16px]"
                          src={goalsvg}
                          alt="goal"
                        />
                        <p className="text-white font-[500]">{item?.time}'</p>
                        {item?.home_assist && (
                          <div className="flex items-center gap-2">
                            <p className="text-thin">{item?.home_assist}</p>
                            <img
                              className="w-[16px] h-[16px]"
                              src={assissvg}
                              alt="assist"
                            />
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Away Scorers */}
                  <div className="clamp4 flex justify-end items-center gap-2">
                    {item?.away_assist && (
                      <div className="flex items-center gap-2">
                        <img
                          className="w-[16px] h-[16px]"
                          src={assissvg}
                          alt="assist"
                        />
                        <p className="text-thin">{item?.away_assist}</p>
                      </div>
                    )}
                    {item?.away_scorer && (
                      <>
                        <p className="text-white font-[500]">{item?.time}'</p>
                        <img
                          className="w-[16px] h-[16px]"
                          src={goalsvg}
                          alt="goal"
                        />
                        <p className="text-white font-bold">
                          {item?.away_scorer}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="flex flex-col justify-start items-start gap-[14px]">
        <div className="no-scroll w-full overflow-x-scroll whitespace-nowrap gap-[20px] ">
          {matchEventsData.map((item, idx) => (
            <button
              onClick={() => handleActiveTab(item)}
              key={idx}
              className={`text-white rounded-[12px] cursor-pointer relative inline-flex justify-end items-end px-2 border-[1px] border-primary mr-[6px]`}
            >
              <h1 className="font-bold text-[14px] relative z-10">
                {item?.title}
              </h1>
              {activeTab === item.id && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-[#7F00FF] w-full mx-auto rounded-[12px]"
                />
              )}
            </button>
          ))}
        </div>
        <div className="w-full h-full">{contentMatchPage(activeTab)}</div>
      </section>
    </main>
  );
};

export default Match;
