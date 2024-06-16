import React, { Suspense, lazy } from "react";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import { Route, Routes } from "react-router-dom";
import Loginn from "./components/login/login";
import Register from "./components/register/register";
import Loader from "./components/loader/loader";
import KeyEvents from "./interface/match/key-events";

// Lazy load components
const Home = lazy(() => import("./interface/home/home"));
//match
const Match = lazy(() => import("./interface/match/match"));
const Summary = lazy(() => import("./interface/match/summary"));
const Contents = lazy(() => import("./interface/match/contents"));
const Comments = lazy(() => import("./interface/match/comments"));
//leagues
const League = lazy(() => import("./interface/home/league"));
const LastMatch = lazy(() => import("./interface/home/last-match"));
const ComingMatch = lazy(() => import("./interface/home/coming-match"));
//live
const LiveMatch = lazy(() => import("./interface/home/live-match"));
//scores
const Scores = lazy(() => import("./interface/scores/scores"));
const Leagues = lazy(() => import("./interface/leagues/leagues"));
const FutzoneTV = lazy(() => import("./interface/futzone-tv/futzone-tv"));
const NotFound = lazy(() => import("./interface/not-found/not-found"));

const App = () => {
  return (
    <div className="app max-sm:w-full w-11/12 md:w-11/12 lg:max-w-[80%] mx-auto">
      <Navbar />
      <div id="app" className="h-full">
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
          >
            <Route
              path="last-match"
              element={
                <Suspense
                  fallback={
                    <div className="w-full flex justify-center items-center h-screen">
                      <Loader />
                    </div>
                  }
                >
                  <LastMatch />
                </Suspense>
              }
            />
            <Route
              path="coming-match"
              element={
                <Suspense
                  fallback={
                    <div className="w-full flex justify-center items-center h-screen">
                      <Loader />
                    </div>
                  }
                >
                  <ComingMatch />
                </Suspense>
              }
            />
            <Route
              path="live-match"
              element={
                <Suspense
                  fallback={
                    <div className="w-full flex justify-center items-center h-screen">
                      <Loader />
                    </div>
                  }
                >
                  <LiveMatch />
                </Suspense>
              }
            />
          </Route>
          {/* Scores pages */}
          <Route
            path="/scores"
            element={
              <Suspense
                fallback={
                  <div className="w-full flex justify-center items-center h-screen">
                    <Loader />
                  </div>
                }
              >
                <Scores />
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
          >
            <Route
              path="summary"
              element={
                <Suspense
                  fallback={
                    <div className="w-full flex justify-center items-center h-screen">
                      <Loader />
                    </div>
                  }
                >
                  <Summary />
                </Suspense>
              }
            />
            <Route
              path="key-events"
              element={
                <Suspense
                  fallback={
                    <div className="w-full flex justify-center items-center h-screen">
                      <Loader />
                    </div>
                  }
                >
                  <KeyEvents />
                </Suspense>
              }
            />
            <Route
              path="contents"
              element={
                <Suspense
                  fallback={
                    <div className="w-full flex justify-center items-center h-screen">
                      <Loader />
                    </div>
                  }
                >
                  <Contents />
                </Suspense>
              }
            />
            <Route
              path="comments"
              element={
                <Suspense
                  fallback={
                    <div className="w-full flex justify-center items-center h-screen">
                      <Loader />
                    </div>
                  }
                >
                  <Comments  />
                </Suspense>
              }
            />
          </Route>
          {/* League pages */}
          <Route
            path="/league/:league_id"
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
