import React, { useEffect, useState } from "react";
import Matches from "./matches";
import News from "./news";
import axios from "axios";
import { SoccerLeagues } from "../../components/data";
import { ApiServer } from "../../components/api.services";
import Loader from "../../components/loader/loader";

const Home = () => {
  const [matchesData, setMatchesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);

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
        setMatchesData(data);
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
        matchesData={matchesData}
        addHoursToTime={addHoursToTime}
        getInitials={getInitials}
      />
      <News news={news} extractTime={extractTime} />
    </div>
  );
};

export default Home;
