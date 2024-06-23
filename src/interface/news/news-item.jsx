import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MdAccessTime } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { BiLike } from "react-icons/bi";
import { FaUserSecret } from "react-icons/fa6";
import Loader from "../../components/loader/loader";
import Comments from "../home/comments";

const NewsItem = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
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
          url: `https://sws-news.uz/api/v1/news/${id}`,
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(res.data);
        setNews(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="col-span-3 w-full h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <main className="w-11/12 md:w-[70%] max-w-[1440px] mx-auto min-h-[calc(100vh-88px)] mt-[88px] flex flex-col gap-3">
      <div className="w-full h-[80%]">
        <img
          className="object-contain w-full h-[80%]"
          src={`https://sws-news.uz/api/v1/files/${news?.images[0]}`}
          alt=""
        />
      </div>
      <div className="flex flex-col justify-start items-start w-full gap-3">
        <div className="w-auto flex justify-between items-center gap-3">
          <div className="flex justify-around items-center gap-2 text-start">
            <MdAccessTime className="text-[20px] text-thin" />
            <h1 className="text-[14px] font-bold text-thin">
              {extractTime(news?.created_date)}
            </h1>
          </div>
          <div className="flex justify-around items-center gap-2 text-start">
            <IoEyeOutline className="text-[20px] text-thin" />
            <h1 className="text-[14px] font-bold text-thin">{news?.views}</h1>
          </div>
          <div className="cursor-pointer flex justify-around items-center gap-2 text-start">
            <AiOutlineMessage className="text-[20px] text-thin" />
            <h1 className="text-[14px] font-bold text-thin">
              {news?.comments}
            </h1>
          </div>
          <div className="cursor-pointer flex justify-around items-center gap-2 text-start">
            <BiLike className="text-[20px] text-thin" />
            <h1 className="text-[14px] font-bold text-thin">{news?.likes}</h1>
          </div>
        </div>
        <div>
          <div className="flex justify-around items-center gap-2 text-start">
            <FaUserSecret className="text-[14px] text-thin" />
            <h1 className="text-[14px] font-bold text-thin">Author : </h1>
            <h1 className="text-[14px] font-bold text-thin">{news?.author}</h1>
          </div>
        </div>
      </div>
      <div>
        <h1 className="clamp2 text-white font-bold">{news?.title_uz}</h1>
        <p className="text-thin clamp4 font-[400]">{news?.text_uz}</p>
      </div>
      <div>
        <Comments />
      </div>
    </main>
  );
};

export default NewsItem;
