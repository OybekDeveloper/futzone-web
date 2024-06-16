import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { ApiServer } from "../../components/api.services";
import { useSelector } from "react-redux";
import { assissvg, goalsvg } from "../../images";
import Loader from "../../components/loader/loader";
import { motion } from "framer-motion";
const Match = () => {
  const [match, setMatch] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(false);
  const { leagueData } = useSelector((state) => state.event);
  const { match_id, league_id } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  console.log(leagueData);

  const matchEvents = [
    {
      id: 1,
      title: "Asosiy",
      link: `/match/${match_id}/${league_id}/summary`,
    },
    {
      id: 2,
      title: "Tarkiblar",
      link: `/match/${match_id}/${league_id}/contents`,
    },
    {
      id: 3,
      title: "Comment",
      link: `/match/${match_id}/${league_id}/comments`,
    },
  ];

  const handleActiveTab = (active) => {
    navigate(active.link);
    setActiveTab(active.id);
  };

  const getCurrentDateWith12HoursAdded = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    const currentDate = `${year}-${month}-${day}`;

    now.setHours(now.getHours() + 12);

    const newYear = now.getFullYear();
    const newMonth = String(now.getMonth() + 1).padStart(2, "0");
    const newDay = String(now.getDate()).padStart(2, "0");
    const newDate = `${newYear}-${newMonth}-${newDay}`;

    return { newDate, currentDate };
  };

  const formatDate = (dateStr) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", options);
  };

  useEffect(() => {
    const { newDate, currentDate } = getCurrentDateWith12HoursAdded();
    const fetchData = async () => {
      try {
        const response = await ApiServer.getEventsData(
          currentDate,
          newDate,
          league_id
        );
        if (response) {
          const filterMatch = response?.find(
            (item) => item.match_id === match_id
          );
          setMatch(filterMatch);
          console.log(filterMatch);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    navigate(`/match/${match_id}/${league_id}/summary`);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    localStorage.setItem("match", JSON.stringify(match));
  }, [match_id, league_id, match]);

  console.log(match);

  if (loading) {
    return (
      <div className="h-screen col-span-3 w-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }
  return (
    <main className="max-sm:w-full w-11/12 max-w-[1440px] mx-auto min-h-[calc(100vh-88px)] mt-[100px]  gap-3">
      <section className="w-full flex justify-center items-start flex-col bg-[#333333] p-4 sm:rounded-[12px]">
        <h1 className="w-full text-center text-white font-bold clamp3">
          {match?.league_name}
        </h1>
        <h1 className="w-full text-center text-white font-[500] clamp4">
          {formatDate(match?.match_date)}
        </h1>
        <div className="w-full grid grid-cols-3 gap-4">
          <div className="flex max-md:flex-col-reverse max-md:justify-between justify-end items-center gap-3">
            <h1 className="text-white font-[700] clamp2">
              {match?.match_hometeam_name}
            </h1>
            <div className="w-[60px] md:w-[100px] h-[60px] md:h-[100px]">
              <img
                className="w-full h-full object-contain"
                src={match?.team_home_badge}
                alt=""
              />
            </div>
          </div>
          <div className="text-white font-bold flex justify-center items-center clamp2 gap-2">
            {!match.match_hometeam_score && !match.match_awayteam_score ? (
              <h1 className="clamp2 text-white font-bold">
                {match.match_time}
              </h1>
            ) : (
              <>
                <h1>{match?.match_hometeam_score}</h1>
                <p>-</p>
                <h1>{match?.match_awayteam_score}</h1>
              </>
            )}
          </div>
          <div className="flex max-md:flex-col max-md:justify-between justify-start items-center gap-3">
            <div className="w-[60px] md:w-[100px] h-[60px] md:h-[70px]">
              <img
                className="w-full h-full object-contain"
                src={match?.team_away_badge}
                alt=""
              />
            </div>
            <h1 className="text-white font-[700] clamp2">
              {match?.match_awayteam_name}
            </h1>
          </div>
        </div>
        <div className="w-full h-[1px] bg-thin my-[20px]"></div>
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
                  <div className="flex justify-start items-center gap-2">
                    {item?.home_scorer && (
                      <>
                        <p className="text-white font-bold">
                          {item?.home_scorer}
                        </p>
                        <img
                          className="w-[20px] h-[20px]"
                          src={goalsvg}
                          alt="goal"
                        />
                        <p className="text-white font-[500]">{item?.time}'</p>
                        {item?.home_assist && (
                          <div className="flex items-center gap-2">
                            <p className="text-thin">{item?.home_assist}</p>
                            <img
                              className="w-[20px] h-[20px]"
                              src={assissvg}
                              alt="assist"
                            />
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Away Scorers */}
                  <div className="flex justify-end items-center gap-2">
                    {item?.away_assist && (
                      <div className="flex items-center gap-2">
                        <img
                          className="w-[20px] h-[20px]"
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
                          className="w-[20px] h-[20px]"
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
        <div className="px-[16px] w-full flex items-center gap-[20px] ">
          {matchEvents.map((item, idx) => (
            <button
              onClick={() => handleActiveTab(item)}
              key={idx}
              className={`text-white rounded-[6px] cursor-pointer relative py-[8px] flex justify-end items-end gap-[px]`}
            >
              <h1 className="font-bold clamp3 relative z-10">{item.title}</h1>
              {pathname === item.link && (
                <motion.div
                  layoutId="active-pill"
                  className="h-[5px] absolute inset-0 bg-[#7F00FF] mt-[40px] mx-auto"
                />
              )}
            </button>
          ))}
        </div>
        <div className="w-full h-full">
          <Outlet />
        </div>
      </section>
    </main>
  );
};

export default Match;
