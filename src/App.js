import React, { Suspense, lazy, useEffect } from "react";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import { Route, Routes, useLocation } from "react-router-dom";
import Loginn from "./components/login/login";
import Register from "./components/register/register";
import Loader from "./components/loader/loader";
import KeyEvents from "./interface/matches/key-events";
import Settings from "./interface/settings/settings";

// Lazy load components
const Home = lazy(() => import("./interface/home/home"));
//match
const Match = lazy(() => import("./interface/matches/match"));
const Matches = lazy(() => import("./interface/matches/scores"));
//leagues
const League = lazy(() => import("./interface/leagues/league"));
const LastMatch = lazy(() => import("./interface/home/last-match"));
const ComingMatch = lazy(() => import("./interface/home/coming-match"));
//live
const LiveMatch = lazy(() => import("./interface/home/live-match"));
//scores
const Leagues = lazy(() => import("./interface/leagues/leagues"));
const FutzoneTV = lazy(() => import("./interface/futzone-tv/futzone-tv"));
//liked news
const LikedPostes = lazy(() => import("./interface/liked-postes/liked-postes"));
//about news
const AboutUs = lazy(() => import("./interface/about-us/about-us"));
//privacy policy
const PrivacyPolicy = lazy(() =>
  import("./interface/privacy-policy/privacy-policy")
);
//news
const News = lazy(() => import("./interface/news/news"));
const NewsItem = lazy(() => import("./interface/news/news-item"));
//not-found
const NotFound = lazy(() => import("./interface/not-found/not-found"));

const App = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    const body = document.body;
    if (pathname === "/futzone-tv") {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "visible";
    }
  }, [pathname]);
  return (
    <div className="app bg-scaffoldBg-dark">
      <Navbar />
      <div
        id="app"
        className={`${
          pathname === "/login" || pathname === "/register"
            ? "w-screen h-screen"
            : "max-sm:w-full w-11/12 md:w-11/12 lg:max-w-[80%] mx-auto"
        } `}
      >
        <Routes>
          {/* Home pages */}
          <Route
            path="/"
            element={
              <Suspense
                fallback={
                  <div className="w-ful flex justify-center items-center h-screen">
                    <Loader />
                  </div>
                }
              >
                <Home />
              </Suspense>
            }
          />
          {/* Scores pages */}
          <Route
            path="/matches"
            element={
              <Suspense
                fallback={
                  <div className="w-full flex justify-center items-center h-screen">
                    <Loader />
                  </div>
                }
              >
                <Matches />
              </Suspense>
            }
          />
          {/* Match pages */}
          <Route
            path="/match/:match_id/:league_id"
            element={
              <Suspense
                fallback={
                  <div className="w-full flex justify-center items-center h-screen">
                    <Loader />
                  </div>
                }
              >
                <Match />
              </Suspense>
            }
          />
          {/* League pages */}
          <Route
            path="/leagues/:league_id"
            element={
              <Suspense
                fallback={
                  <div className="w-full flex justify-center items-center h-screen">
                    <Loader />
                  </div>
                }
              >
                <League />
              </Suspense>
            }
          />
          {/* Leagues pages */}
          <Route
            path="/leagues"
            element={
              <Suspense
                fallback={
                  <div className="w-full flex justify-center items-center h-screen">
                    <Loader />
                  </div>
                }
              >
                <Leagues />
              </Suspense>
            }
          />
          {/* Videos pages */}
          <Route
            path="/futzone-tv"
            element={
              <Suspense
                fallback={
                  <div className="w-full flex justify-center items-center h-screen">
                    <Loader />
                  </div>
                }
              >
                <FutzoneTV />
              </Suspense>
            }
          />
          {/* Liked Postes pages */}
          <Route
            path="/liked"
            element={
              <Suspense
                fallback={
                  <div className="w-full flex justify-center items-center h-screen">
                    <Loader />
                  </div>
                }
              >
                <LikedPostes />
              </Suspense>
            }
          />
          {/* About Us pages */}
          <Route
            path="/about-us"
            element={
              <Suspense
                fallback={
                  <div className="w-full flex justify-center items-center h-screen">
                    <Loader />
                  </div>
                }
              >
                <AboutUs />
              </Suspense>
            }
          />
          {/* privacy-policy */}
          <Route
            path="/privacy-policy"
            element={
              <Suspense
                fallback={
                  <div className="w-full flex justify-center items-center h-screen">
                    <Loader />
                  </div>
                }
              >
                <PrivacyPolicy />
              </Suspense>
            }
          />
          {/* News */}
          <Route
            path="/news"
            element={
              <Suspense
                fallback={
                  <div className="w-full flex justify-center items-center h-screen">
                    <Loader />
                  </div>
                }
              >
                <News />
              </Suspense>
            }
          />
          <Route
            path="/news/:id"
            element={
              <Suspense
                fallback={
                  <div className="w-full flex justify-center items-center h-screen">
                    <Loader />
                  </div>
                }
              >
                <NewsItem />
              </Suspense>
            }
          />
          {/* Not found page */}
          <Route
            path="*"
            element={
              <Suspense
                fallback={
                  <div className="w-full flex justify-center items-center h-screen">
                    <Loader />
                  </div>
                }
              >
                <NotFound />
              </Suspense>
            }
          />
          {/* Settings */}
          <Route path="/settings" element={<Settings />} />
          {/* Authentication pages */}
          <Route path="/login" element={<Loginn />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
