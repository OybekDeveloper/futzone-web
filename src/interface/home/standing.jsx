import React, { useEffect, useState } from "react";
import { ApiServer } from "../../components/api.services";
import { APL, bundesliga, laliga, logo, rigtharrow } from "../../images";

const Standing = () => {
  const leagues = [
    {
      id: 1,
      league_id: 152,
      league_name: "APL",
      logo: APL,
    },
    {
      id: 2,
      league_id: 302,
      league_name: "LaLiga",
      logo: laliga,
    },
    {
      id: 3,
      league_id: 175,
      league_name: "Bundesliga",
      logo: bundesliga,
    },
  ];

  const [standingData, setStandingData] = useState([]);
  const [structuredData, setStructuredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const promises = leagues.map((league) =>
          ApiServer.getStandingData(league.league_id)
        );

        const results = await Promise.all(promises);
        setStandingData(results);
      } catch (error) {
        console.error("Error fetching standing data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const structured = standingData.map((data, idx) => {
      return {
        league_name: leagues[idx].league_name,
        league_logo: leagues[idx].logo, // Assuming league_logo is available in the first item
        standing: data.slice(0, 7), // Get the top 10 standings
      };
    });

    setStructuredData(structured);
  }, [standingData]);
  console.log(standingData);

  return (
    <main>
      <section className="grid grid-cols-1 gap-2 w-full h-full ">
        {structuredData.map((league, idx) => (
          <div key={idx} className="p-4 text-white rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex justify-start items-center">
                <img
                  src={league.league_logo}
                  alt={league.league_name}
                  className="w-[50px] h-[50px] object-contain mr-2"
                />
                <h2 className="clamp3 font-bold text-thin">
                  {league.league_name} turnir jadvali
                </h2>
              </div>
              <div className="flex justify-end text-center cursor-pointer">
                <h1>Barchasini o'qish</h1>
                <img src={rigtharrow} alt="" />
              </div>
            </div>
            <table className="flex flex-col w-full gap-2">
              <thead>
                <tr className="px-[24px] w-full grid grid-cols-7">
                  <th className="w-full text-start col-span-3">Jamoa nomi</th>
                  <th className="w-full text-end">W</th>
                  <th className="w-full text-end">D</th>
                  <th className="w-full text-end">L</th>
                  <th className="w-full text-end">Bali</th>
                </tr>
              </thead>
              <tbody className="flex flex-col gap-3">
                {league.standing.map((team, idx) => (
                  <tr
                    key={idx}
                    className={`${
                      idx + 1 > 4 ? "bg-[#412e2e]" : "bg-[#312e41]"
                    } px-[24px] rounded-[12px] grid grid-cols-7 py-[12px]`}
                  >
                    <td className=" col-span-3">
                      <div className=" flex justify-start items-center gap-2">
                        <h1>{idx + 1}</h1>
                        <div className="w-[50px] h-[50px]">
                          <img
                            className="w-[50px] h-[50px] object-contain"
                            src={team?.team_badge}
                            alt=""
                          />
                        </div>
                        <p>{team?.team_name}</p>
                      </div>
                    </td>
                    <td className="text-end">{team?.overall_league_W}</td>
                    <td className="text-end">{team?.overall_league_D}</td>
                    <td className="text-end">{team?.overall_league_L}</td>
                    <td className="text-end">{team?.overall_league_PTS}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Standing;
