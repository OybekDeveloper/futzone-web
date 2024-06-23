import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { MdAccessTime } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { BiLike } from "react-icons/bi";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "./styles.css";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Swapper({extractTime}) {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<div class="' + className + '"></div>';
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios({
          method: "GET",
          url: `https://sws-news.uz/api/v1/news-pinned`,
        });
        if (res) {
          setNews(res.data);
          console.log(res);
        }
      } catch (error) {
        console.error("Error fetching news data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Swiper
        pagination={pagination}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {news?.map((item, idx) => (
          <SwiperSlide key={idx}>
            <div
              className="cursor-pointer relative w-full h-full rounded-[12px] overflow-hidden m-3"
              onClick={() => navigate(`/news/${item?.id}`)}
            >
              <img
                className="w-full h-full object-cover"
                src={`https://sws-news.uz/api/v1/files/${item?.images[0]}`}
                alt="Slide image"
              />
              <div className="absolute bottom-0 left-0 w-full h-full flex flex-col items-start pb-[30px] justify-end bg-gradient-to-t from-black via-transparent to-transparent px-[16px] gap-4">
                <h1 className="text-white font-bold clamp4 text-start">
                  {item?.title_uz}
                </h1>
                <div className="flex justify-start items-center w-full gap-4">
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
              </div>
              <div></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
