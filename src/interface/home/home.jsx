import React, { useEffect } from "react";
import Matches from "./matches";
import News from "./news";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="w-full max-w-[1440px] mx-auto min-h-[calc(100vh-88px)] mt-[100px] grid grid-cols-1 space-x-reverse md:grid-cols-5 gap-3">
      <Matches />
      <News />
    </div>
  );
};

export default Home;
