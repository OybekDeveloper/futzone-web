import React, { useEffect, useState } from "react";
import Matches from "./matches";
import News from "./news";
import axios from "axios";
import { SoccerLeagues } from "../../components/data";
import { ApiServer } from "../../components/api.services";
import Loader from "../../components/loader/loader";

const Home = () => {
  const [leagueData, setLeagueData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);

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

  const extractTime = (datetimeStr) => {
    const date = new Date(datetimeStr);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllLeagueData();
        const organizedData = organizeLeagueMatches(data);
        setLeagueData(organizedData);
        const res = await axios({
          method: "GET",
          url: `https://sws-news.uz/api/v1/news-all`,
        });
        if (res) {
          setNews(res.data);
        }
      } catch (error) {
        console.error("Error fetching news data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    window.scrollTo(0, 0);
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
    <div className="w-full max-w-[1440px] mx-auto min-h-[calc(100vh-88px)] mt-[100px] grid grid-cols-1 space-x-reverse md:grid-cols-5 gap-3">
      <Matches
        extractTime={extractTime}
        news={news}
        leagueData={leagueData}
        addHoursToTime={addHoursToTime}
        getInitials={getInitials}
      />
      <News news={news} extractTime={extractTime} />
    </div>
  );
};

export default Home;
