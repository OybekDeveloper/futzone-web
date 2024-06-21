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

const Scores = () => {
  const [leagueData, setLeagueData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const organizeLeagueMatches = (matches) => {
    const leagueMap = new Map();

    matches.forEach((match) => {
      if (!leagueMap.has(match.league_id)) {
        leagueMap.set(match.league_id, {
          country_id: match.country_id,
          country_logo: match.country_logo,
          country_name: match.country_name,
          league_id: match.league_id,
          league_name: match.league_name,
          league_logo: match.league_logo,
          matches: [],
        });
      }
      leagueMap.get(match.league_id).matches.push(match);
    });

    return Array.from(leagueMap.values());
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
    const { newDate, currentDate } = getCurrentDateWith12HoursAdded();
    try {
      const response = await ApiServer.getEventsData(
        currentDate,
        newDate,
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

  const formatDate = (dateStr) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", options);
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
      const organizedData = organizeLeagueMatches(data);
      setLeagueData(organizedData);
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
        <h1 className="clamp3 font-bold text-white mt-[24px]">O'yinlar</h1>
        <div className="w-full h-[2px] bg-border my-[20px]"></div>
        {leagueData?.map((league) => (
          <div key={league.league_id} className="mb-4">
            <NavLink
              to={`/league/${league.league_id}}`}
              className="w-full flex justify-start items-center gap-2 cursor-pointer px-4 py-3 rounded-xl text-white"
            >
              <div className="w-[50px] h-[50px] flex-shrink-0">
                {league?.country_logo ? (
                  <img
                    className="w-full h-full object-contain rounded-md"
                    src={league?.country_logo}
                    alt={`${league?.country_name} logo`}
                  />
                ) : +league.league_id === 1 ? (
                  <img
                    className="w-full h-full  rounded-md"
                    src={europe}
                    alt={`${league?.country_name} logo`}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-700 flex justify-center items-center rounded-md text-[24px]">
                    <span className="text-white font-bold">
                      {getInitials(league?.country_name)}
                    </span>
                  </div>
                )}
              </div>
              <div className="text-thin w-full">
                <h1 className="text-[16px] font-[600]">
                  {league?.league_name}
                </h1>
              </div>
              <div className="w-[50px] flex justify-end items-center">
                <img className="w-full" src={rigtharrow} alt="Right arrow" />
              </div>
            </NavLink>
            <ul className="px-4 py-2 flex flex-col justify-center items-start bg-[#1b1c21] text-white rounded-xl mt-2">
              {league.matches.map((match) => (
                 <li
                 onClick={() => {
                   dispatch(selectLeagueData(league));
                   navigate(`/match/${match.match_id}/${league.league_id}`);
                 }}
                 key={match.match_id}
                 className="relative w-full grid grid-cols-3 py-2 border-b border-gray-700 last:border-b-0 cursor-pointer gap-3"
               >
                 <div className="w-full flex justify-end items-center gap-2 col-span-3 text-[14px]">
                   <div className="flex justify-start items-center gap-1">
                     <div>
                       <MdAccessTime  className="text-primary text-[16px]" />
                     </div>
                     <h1 className="text-thin font-bold clamp4">
                       {addHoursToTime(match?.match_time, 3)}
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
                     match?.match_awayteam_score ? (
                       <h1 className="px-2 py-1 rounded-md text-sm text-white font-bold">
                         {match?.match_hometeam_score} -{" "}
                         {match?.match_awayteam_score}
                       </h1>
                     ) : match?.match_status === "" ? (
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
                         <h1 className="text-[12px] text-thin">
                           Bekor qilingan
                         </h1>
                       </div>
                     ) : match?.match_status === "Postponed" ? (
                       <div className="flex justify-center items-center gap-1">
                         <IoTimerOutline className="text-thin" />
                         <h1 className="text-[12px] text-thin">
                           Kechiktirilgan
                         </h1>
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
          </div>
        ))}
      </section>
    </div>
  );
};

export default Scores;
