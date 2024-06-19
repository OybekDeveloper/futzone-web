import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "./styles.css";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";

export default function Swapper() {
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<div class="' + className + '"></div>';
    },
  };
  return (
    <>
      <Swiper
        pagination={pagination}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {[1, 2, 3, 4].map((item, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative w-full h-full rounded-[12px] overflow-hidden m-3">
              <img
                className="w-full h-full object-cover"
                src="https://assets.goal.com/images/v3/blt5723a4dde5118eb4/Can%20England%20overcome%20Kane's%20curse_.jpg?auto=webp&format=pjpg&width=1200&quality=60"
                alt="Slide image"
              />
              <div className="absolute top-0 left-0 w-full h-full flex items-end pb-[100px] justify-end bg-black bg-opacity-30 text-white text-xl font-bold px-[16px]" >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint suscipit officiis tempore minus similique? Provident, atque? Maxime eaque aperiam odit in, ipsa vel ex! Eveniet ratione perferendis aperiam ipsam cum!
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
