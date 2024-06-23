import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { rigtharrow, timelogo } from "../../images";
import Standing from "./standing";
import TopScore from "./top-score";
import { leagueEventsData } from "../../components/data";
import { motion } from "framer-motion";
import axios from "axios";
import { MdAccessTime } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { BiLike } from "react-icons/bi";

const League = () => {
  const { league_id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(1);
  const [news, setNews] = useState([]);

  const extractTime = (datetimeStr) => {
    const date = new Date(datetimeStr);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios({
          method: "GET",
          url: `https://sws-news.uz/api/v1/news-all`,
        });
        if (res) {
          setNews(res.data);
        }
      } catch (error) {
        console.error("Error fetching news data:", error);
      }
    };
    fetchData();
    window.scrollTo(0, 0);
  }, []);

  const handleActiveTab = (active) => {
    setActiveTab(active.id);
  };

  const contentMatchPage = (page) => {
    switch (page) {
      case 1:
        return <Standing league_id={league_id} />;
      case 2:
        return <TopScore league_id={league_id} />;

      default:
        return navigate(`/leagues/${league_id}`);
    }
  };

  return (
    <main className="w-11/12 max-w-[1440px] mx-auto min-h-[calc(100vh-88px)] mt-[100px] grid grid-cols-1 md:grid-cols-3 gap-3">
      <section className="col-span-2">
        <div className="flex flex-col justify-start items-start gap-[14px]">
          <div className="w-full flex items-center gap-[20px] ">
            {leagueEventsData.map((item, idx) => (
              <button
                onClick={() => handleActiveTab(item)}
                key={idx}
                className={`text-white rounded-[6px] cursor-pointer relative py-[8px] flex justify-end items-end gap-[px]`}
              >
                <h1 className="font-bold clamp3 relative z-10">{item.title}</h1>
                {activeTab === item.id && (
                  <motion.div
                    layoutId="active-pill"
                    className="h-[5px] absolute inset-0 bg-[#7F00FF] mt-[40px] mx-auto"
                  />
                )}
              </button>
            ))}
          </div>
          <div className="w-full h-full">{contentMatchPage(activeTab)}</div>
        </div>
      </section>
      <section className="col-span-1 mb-[20px]">
        <h1 className="clamp3 text-thin font-bold">So'ngi yangiliklar</h1>
        <div className="w-full h-[2px] bg-border mt-2"></div>
        <div className="flex flex-col gap-5  my-[20px]">
          {news?.slice(0, 6)?.map((item, idx) => (
            <div key={idx} className="w-full flex flex-col gap-2">
              <div className="w-full h-[200px]">
                <img
                  className="object-cover w-full h-full rounded-[12px]"
                  src={`https://sws-news.uz/api/v1/files/${item?.images[0]}`}
                  alt=""
                />
              </div>
              <div className="flex flex-col justify-between gap-3">
                <h1 className="clamp3 text-white font-bold">
                  {item?.title_uz?.length > 40
                    ? item?.title_uz.slice(0, 40) + "..."
                    : item?.title_uz}
                </h1>
                <p className="clamp4 font-[500] text-thin text-justify">
                  {item?.text_uz?.length > 120
                    ? item?.text_uz.slice(0, 120) + "..."
                    : item?.text_uz}
                </p>
                <div className="flex justify-start items-center w-full">
                  <div className="w-auto flex justify-between items-center gap-3">
                    <div className="flex justify-around items-center gap-2 text-start">
                      <MdAccessTime className="text-[20px] text-thin" />
                      <h1 className="text-[14px] font-bold text-thin">
                        {extractTime(item?.created_date)}
                      </h1>
                    </div>
                    <div className="flex justify-around items-center gap-2 text-start">
                      <IoEyeOutline className="text-[20px] text-thin" />
                      <h1 className="text-[14px] font-bold text-thin">
                        {item?.views}
                      </h1>
                    </div>
                    <div className="flex justify-around items-center gap-2 text-start">
                      <AiOutlineMessage className="text-[20px] text-thin" />
                      <h1 className="text-[14px] font-bold text-thin">
                        {item?.comments}
                      </h1>
                    </div>
                    <div className="flex justify-around items-center gap-2 text-start">
                      <BiLike className="text-[20px] text-thin" />
                      <h1 className="text-[14px] font-bold text-thin">
                        {item?.likes}
                      </h1>
                    </div>
                  </div>
                  <NavLink
                    to={`/news/${item.id}`}
                    className="w-full flex justify-end items-center"
                  >
                    <h1 className="text-[12px]  text-primary font-bold">
                      Batafsil o'qish
                    </h1>
                    <img src={rigtharrow} alt="" />
                  </NavLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default League;
