import React, { useEffect, useState } from "react";
import { emptyclub } from "../../images";
import { ApiServer } from "../../components/api.services";
import Loader from "../../components/loader/loader";

const TopScore = ({ league_id }) => {
  const [topScore, setTopScore] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ApiServer.getTopScoreData(league_id);
        console.log(res, "top score");
        if (res) {
          setTopScore(res);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
            <tr className="px-[12px] py-[12px] w-full grid grid-cols-5">
              <th className="w-full text-start col-span-2 clamp4">
                Ismi
              </th>
              <th className="w-full text-end clamp4">Gollari</th>
              <th className="w-full text-end clamp4">Assistlar</th>
              <th className="w-full text-end clamp4">Penalty Gollari</th>
            </tr>
          </thead>
          <tbody className="flex flex-col gap-3">
            {topScore?.map((team, idx) => (
              <tr
                key={idx}
                className={`${
                  idx + 1 > 4 ? "bg-[#412e2e]" : "bg-[#312e41]"
                } px-[24px] rounded-[12px] grid grid-cols-5 py-[12px]`}
              >
                <td className="col-span-2">
                  <div className="flex justify-start items-center gap-4">
                    <h1 className="clamp4">{idx + 1}</h1>
                    <div className="">
                      <h1 className="clamp4">{team?.player_name}</h1>
                      <h1 className="text-thin clamp4">{team?.team_name}</h1>
                    </div>
                  </div>
                </td>
                <td className="text-end clamp4">{team?.goals}</td>
                <td className="text-end clamp4">{team?.assists?team.assists:0}</td>
                <td className="text-end clamp4">{team?.penalty_goals}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default TopScore;
