import React from 'react'

const TopScore = () => {
  return (
    <main>
    {/* <section className="grid grid-cols-1 gap-2 w-full h-full ">
      <table className="flex flex-col w-full gap-2 text-white">
        <thead>
          <tr className="py-[12px] w-full grid grid-cols-7">
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
    </section> */}
  </main>
  )
}

export default TopScore