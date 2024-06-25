import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../../components/loader/loader";
import { NavLink } from "react-router-dom";
import { MdAccessTime } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { BiLike } from "react-icons/bi";
import { rigtharrow } from "../../images";
import Swapper from "../home/swapper-news";

const News = () => {
  const [loading, setLoading] = useState(true);
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

  return (
    <main className="w-11/12 max-w-[1440px] mx-auto min-h-[calc(100vh-88px)] mt-[100px]">
      <section className="w-full md:screen-minus-120 max-md:h-[300px]">
        <Swapper extractTime={extractTime} />
      </section>
      <div className="col-span-2 mb-[20px] w-11/12 mx-auto">
        <h1 className="clamp3 text-thin font-bold">Barcha yangiliklar</h1>
        <div className="w-full h-[2px] bg-border mt-2"></div>
        <div className="flex flex-col gap-5  my-[20px]">
          {news?.map((item, idx) => (
            <div
              key={idx}
              className="w-full md:grid flex flex-col gap-2 grid-cols-3"
            >
              <div className="w-full max-md:h-[200px] min-h-[200px] max-h-[250px] col-span-1">
                <img
                  className="object-cover w-full h-full rounded-[12px]"
                  src={`https://sws-news.uz/api/v1/files/${item?.images[0]}`}
                  alt=""
                />
              </div>
              <div className="col-span-2 flex flex-col justify-between gap-3">
                {/* desktop */}
                <h1 className="max-md:hidden clamp3 text-white font-bold">
                  {item?.title_uz?.length > 100
                    ? item?.title_uz.slice(0, 100) + "..."
                    : item?.title_uz}
                </h1>
                <p className="max-md:hidden clamp4 font-[500] text-thin text-justify">
                  {item?.text_uz?.length > 200
                    ? item?.text_uz.slice(0, 200) + "..."
                    : item?.text_uz}
                </p>
                {/* mobile */}
                <h1 className="md:hidden clamp3 text-white font-bold">
                  {item?.title_uz?.length > 40
                    ? item?.title_uz.slice(0, 40) + "..."
                    : item?.title_uz}
                </h1>
                <p className="md:hidden clamp4 font-[500] text-thin text-justify">
                  {item?.text_uz?.length > 120
                    ? item?.text_uz.slice(0, 120) + "..."
                    : item?.text_uz}
                </p>
                <div className="flex justify-start items-center w-full">
                  <div className="w-auto flex justify-between items-center gap-2">
                    <div className="flex justify-around items-center gap-1 text-start">
                      <MdAccessTime className="clamp3 text-thin" />
                      <h1 className="clamp4 font-bold text-thin">
                        {extractTime(item?.created_date)}
                      </h1>
                    </div>
                    <div className="flex justify-around items-center gap-1 text-start">
                      <IoEyeOutline className="clamp3 text-thin" />
                      <h1 className="clamp4 font-bold text-thin">
                        {item?.views}
                      </h1>
                    </div>
                    <div className="flex justify-around items-center gap-1 text-start">
                      <AiOutlineMessage className="clamp3 text-thin" />
                      <h1 className="clamp4 font-bold text-thin">
                        {item?.comments}
                      </h1>
                    </div>
                    <div className="flex justify-around items-center gap-1 text-start">
                      <BiLike className="clamp3 text-thin" />
                      <h1 className="clamp4 font-bold text-thin">
                        {item?.likes}
                      </h1>
                    </div>
                  </div>
                  <NavLink
                    to={`/news/${item.id}`}
                    className="w-full flex justify-end items-center"
                  >
                    <h1 className="clamp4 text-primary font-bold">
                      Batafsil o'qish
                    </h1>
                    <img src={rigtharrow} alt="" />
                  </NavLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default News;
