import React, { useEffect, useState } from "react";
import { ApiServer } from "../../components/api.services";
import {
  APL,
  bundesliga,
  emptyclub,
  laliga,
  logo,
  rigtharrow,
} from "../../images";
import { useParams } from "react-router-dom";
import Loader from "../../components/loader/loader";
import { leaguesData } from "../../components/data";

const Standing = ({ league_id }) => {
  const [standingData, setStandingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [league, setLeague] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ApiServer.getStandingData(league_id);
        if (res) {
          setStandingData(res);
        }
      } catch (error) {
        console.error("Error fetching standing data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    window.scrollTo(0, 0);

    const filterLeague = leaguesData.find((item) => item.id === league_id);
  }, [league_id]);
  
  if (loading) {
    return (
      <div className="col-span-3 w-full h-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }
  return (
    <main>
      <section className="grid grid-cols-1 gap-2 w-full h-full ">
        <table className="flex flex-col w-full gap-2 text-white">
          <thead>
            <tr className="px-[12px] py-[12px] w-full grid grid-cols-7">
              <th className="w-full text-start col-span-3 clamp4">
                Jamoa nomi
              </th>
              <th className="w-full text-end clamp4">W</th>
              <th className="w-full text-end clamp4">D</th>
              <th className="w-full text-end clamp4">L</th>
              <th className="w-full text-end clamp4">Bali</th>
            </tr>
          </thead>
          <tbody className="flex flex-col gap-3">
            {standingData?.map((team, idx) => (
              <tr
                key={idx}
                className={`${
                  idx + 1 > 4 ? "bg-[#412e2e]" : "bg-[#312e41]"
                } px-[24px] rounded-[12px] grid grid-cols-7 py-[12px]`}
              >
                <td className=" col-span-3">
                  <div className="flex justify-start items-center gap-2">
                    <h1 className="clamp4">{idx + 1}</h1>
                    <div className="w-[50px] h-[50px]">
                      <img
                        className="w-full h-full object-contain"
                        style={{ width: "50px", height: "50px" }}
                        src={team?.team_badge ? team.team_badge : emptyclub}
                        alt="Home Team Badge"
                        onError={(e) => (e.target.src = emptyclub)}
                      />
                    </div>
                    <p className="clamp4">{team?.team_name}</p>
                  </div>
                </td>
                <td className="text-end clamp4">{team?.overall_league_W}</td>
                <td className="text-end clamp4">{team?.overall_league_D}</td>
                <td className="text-end clamp4">{team?.overall_league_L}</td>
                <td className="text-end clamp4">{team?.overall_league_PTS}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default Standing;
