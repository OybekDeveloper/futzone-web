import React, { useEffect } from "react";

const LikedPostes = () => {
  useEffect(()=>{
    window.scrollTo(0, 0);

  },[])
  return (
    <main className="w-11/12 max-w-[1440px] mx-auto min-h-[calc(100vh-88px)] mt-[88px] grid grid-cols-1 space-x-reverse md:grid-cols-5 gap-3">
        Yoqtirgan postlar newslar
    </main>
  );
};

export default LikedPostes;
