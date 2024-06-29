import {
  assissvg,
  changesplayer,
  emptyclub,
  goalSection,
  goalsvg,
  redcard,
  yellowcard,
  yellowredcard,
} from "../../../images";
import ProgressBar from "@ramonak/react-progress-bar";
import Loader from "../../../components/loader/loader";
import { MdAccessTime } from "react-icons/md";
import { IoArrowDownOutline } from "react-icons/io5";
import { IoArrowUp } from "react-icons/io5";

const Summary = ({ match }) => {
  if (!match) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }
  return (
    <main className="flex flex-col justify-start items-start gap-[12px]">
      {/* Gollar */}
      <section className="bg-secondaryBg-dark p-4 rounded-[12px] w-full h-full">
        <div className="flex justify-start items-center gap-3">
          <div className="w-[24px] h-[24px] rounded-full bg-white">
            <img className="w-full h-full" src={goalSection} alt="" />
          </div>
          <h1 className="text-white clamp3 font-bold">Gollar</h1>
        </div>
        <div className="w-full h-[2px] bg-navbar my-[10px]"></div>
        <div className="flex justify-between sm:justify-around items-center w-full gap-4">
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
      {/* Ogohlantirishlar */}
      <section className="bg-secondaryBg-dark p-4 rounded-[12px] w-full h-full">
        <div className="flex justify-start items-center gap-3">
          <img src={yellowredcard} alt="" />
          <h1 className="text-white clamp3 font-bold">Ogohlantirishlar</h1>
        </div>
        <div className="w-full h-[2px] bg-navbar my-[10px]"></div>
        <section className="mt-[20px]">
          <div className="flex justify-between sm:justify-around items-center w-full gap-4">
            <div className="flex flex-col justify-start gap-2 items-start w-full">
              {match?.cards?.map((item, idx) => (
                <div className="flex justify-between items-center gap-3 w-full">
                  {/* Home Scorers */}
                  <div className="flex justify-start items-center gap-2">
                    {item?.home_fault && (
                      <div className="flex flex-col gap-1">
                        <div className="flex justify-center items-center gap-1">
                          <MdAccessTime className="text-primary text-[16px]" />
                          <p className="text-white font-[500] clamp4">
                            {item?.time}'
                          </p>
                        </div>
                        <div className="flex justify-center items-center gap-1">
                          {item?.card === "yellow card" && (
                            <img
                              className="w-[24px] h-[24px]"
                              src={yellowcard}
                              alt="goal"
                            />
                          )}
                          {item?.card === "red card" && (
                            <img
                              className="w-[24px] h-[24px]"
                              src={redcard}
                              alt="goal"
                            />
                          )}
                          <p className="text-white clamp4 font-bold">
                            {item?.home_fault}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Away Scorers */}
                  <div className="flex justify-end items-center">
                    {item?.away_fault && (
                      <div className="flex flex-col gap-1 mt-1">
                        <div className="flex justify-center items-center gap-1">
                          <MdAccessTime className="text-primary text-[16px]" />
                          <p className="text-white font-[500] clamp4">
                            {item?.time}'
                          </p>
                        </div>
                        <div className="flex justify-center items-center gap-1">
                          {item?.card === "yellow card" && (
                            <img
                              className="w-[24px] h-[24px]"
                              src={yellowcard}
                              alt="goal"
                            />
                          )}
                          {item?.card === "red card" && (
                            <img
                              className="w-[24px] h-[24px]"
                              src={redcard}
                              alt="goal"
                            />
                          )}
                          <p className="clamp4 text-white font-bold">
                            {item?.away_fault}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>

      {/* o'zgarishlar */}
      <section className="bg-secondaryBg-dark p-4 rounded-[12px] w-full h-full">
        <div className="flex justify-start items-center gap-3">
          <img className="w-[24px] h-[24px]" src={changesplayer} alt="" />
          <h1 className="text-white clamp3 font-bold">O'zgarishlar</h1>
        </div>
        <div className="w-full h-[2px] bg-navbar my-[10px]"></div>
        <section className="mt-[20px]">
          <div className="flex justify-between sm:justify-around items-center w-full gap-4">
            <div className="flex flex-col justify-start gap-2 items-start w-full">
              <div className="flex justify-between items-start gap-4 w-full">
                {/* Home Scorers */}
                <section className="flex flex-col justify-center items-center gap-4">
                  {match?.substitutions?.home?.map((item, idx) => (
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-center items-center gap-1">
                        <MdAccessTime className="text-primary text-[16px]" />
                        <p className="text-white font-[500] clamp4">
                          {item?.time}'
                        </p>
                      </div>
                      <div className="flex flex-col justify-center items-center gap-1">
                        <div className="flex justify-center items-center gap-2">
                          <IoArrowUp className="text-[14px] text-green-600" />
                          <h1 className="text-white font-[400] clamp4">
                            {" "}
                            {item?.substitution.split("|")[1]}
                          </h1>
                        </div>
                        <div className="flex justify-center items-center gap-1">
                          <IoArrowDownOutline className="text-[14px] text-red-600" />
                          <h1 className="text-white font-[400] clamp4">
                            {" "}
                            {item?.substitution.split("|")[0]}
                          </h1>
                        </div>
                      </div>
                    </div>
                  ))}
                </section>
                {/* Away Scorers */}
                <section className="flex flex-col justify-center items-center gap-4">
                  {match?.substitutions?.away?.map((item, idx) => (
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-center items-center gap-1">
                        <MdAccessTime className="text-primary text-[16px]" />
                        <p className="text-white font-[500] clamp4">
                          {item?.time}'
                        </p>
                      </div>
                      <div className="flex flex-col justify-center items-center gap-1">
                        <div className="flex justify-center items-center gap-2">
                          <IoArrowUp className="text-[14px] text-green-600" />
                          <h1 className="text-white font-[400] clamp4">
                            {" "}
                            {item?.substitution.split("|")[1]}
                          </h1>
                        </div>
                        <div className="flex justify-center items-center gap-1">
                          <IoArrowDownOutline className="text-[14px] text-red-600" />
                          <h1 className="text-white font-[400] clamp4">
                            {" "}
                            {item?.substitution.split("|")[0]}
                          </h1>
                        </div>
                      </div>
                    </div>
                  ))}
                </section>
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
};

export default Summary;
