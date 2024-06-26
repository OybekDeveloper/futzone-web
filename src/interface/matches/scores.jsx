import React, { useEffect, useState } from "react";
import DatePicker from "./date-picker";
import Matches from "../home/matches";
import Loader from "../../components/loader/loader";
import { SoccerLeagues } from "../../components/data";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { ApiServer } from "../../components/api.services";
import { selectLeagueData } from "../../reducer/redux";
import { emptyclub, rigtharrow } from "../../images";
import { europe } from "../../images/leagues";
import { FaCalendarAlt } from "react-icons/fa";
import { GiWhistle } from "react-icons/gi";
import { FaWindowClose } from "react-icons/fa";
import { IoTimerOutline } from "react-icons/io5";
import { MdOutlineTimer } from "react-icons/md";
import { MdAccessTime } from "react-icons/md";
import { GiTrophyCup } from "react-icons/gi";

const Scores = () => {
  const [matchesData, setMatchesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

const getAdjustedDates = () => {
    const now = new Date();

    // Subtract 8 hours from the current time
    const earlierDate = new Date(now);
    earlierDate.setHours(earlierDate.getHours() - 8);
    const earlierYear = earlierDate.getFullYear();
    const earlierMonth = String(earlierDate.getMonth() + 1).padStart(2, "0");
    const earlierDay = String(earlierDate.getDate()).padStart(2, "0");
    const earlierDateString = `${earlierYear}-${earlierMonth}-${earlierDay}`;

    // Add 12 hours to the current time
    const laterDate = new Date(now);
    laterDate.setHours(laterDate.getHours() + 12);
    const laterYear = laterDate.getFullYear();
    const laterMonth = String(laterDate.getMonth() + 1).padStart(2, "0");
    const laterDay = String(laterDate.getDate()).padStart(2, "0");
    const laterDateString = `${laterYear}-${laterMonth}-${laterDay}`;

    return { earlierDateString, laterDateString };
  };

  const addHoursToTime = (timeString, hoursToAdd) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    let totalHours = hours + hoursToAdd;

    // Umumiy soatlarni 24 soatdan oshmasligini ta'minlaymiz
    totalHours = totalHours % 24;

    // Yangi vaqtni formatlash
    let newHours = totalHours.toString().padStart(2, "0");
    let newMinutes = minutes.toString().padStart(2, "0");

    return `${newHours}:${newMinutes}`;
  };

  const fetchLeagueData = async (liga_id) => {
    const { earlierDateString, laterDateString } = getAdjustedDates();
    try {
      const response = await ApiServer.getEventsData(
        earlierDateString,
        laterDateString,
        liga_id
      );
      if (response.length > 0) {
        return response;
      }
    } catch (error) {
      console.error("Error fetching league data:", error);
      setError("Failed to fetch data");
    }
  };

  const getAllLeagueData = async () => {
    const leaguePromises = SoccerLeagues.map((league) =>
      fetchLeagueData(league.liga_id)
    );

    try {
      const nestedLeagueData = await Promise.all(leaguePromises);
      const leagueData = nestedLeagueData.flat().filter((data) => data);
      return leagueData;
    } catch (error) {
      console.error("Error fetching all league data:", error);
      setError("Failed to fetch all league data");
    }
  };
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("");
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const data = await getAllLeagueData();
      setMatchesData(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="col-span-3 w-full h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <divc className="col-span-3">Error: {error}</divc>;
  }

  return (
    <div className="w-11/12 max-w-[1440px] mx-auto min-h-[calc(100vh-88px)] mt-[100px]">
      <section>
        <h1 className="clamp3 font-bold text-white mt-[24px]">Barcha o'yinlar & natijalar</h1>
        <div className="w-full h-[2px] bg-navbar my-[10px]"></div>
        <ul className="py-2 flex flex-col justify-center items-start gap-3">
          {matchesData?.map((match) => (
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
      </section>
    </div>
  );
};

export default Scores;
