import React, { useEffect, useState } from "react";
import {
  aboutus,
  edit,
  exit,
  global,
  like,
  mobiletest,
  userlogosecondary,
} from "../../images";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import EditModal from "./edit-modal";
import ExitModal from "./exit-modal";
import Loader from "../../components/loader/loader";
import { GoShield } from "react-icons/go";
import "./index.css";
const Settings = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [profile, setProfile] = useState({});
  const [photo, setPhoto] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [isExit, setIsExit] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleEditModal = () => {
    setIsEdit(!isEdit);
  };
  const handleExitModal = () => {
    setIsExit(!isExit);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios({
          method: "GET",
          url: `https://sws-news.uz/api/v1/user`,
          headers: {
            Authorization: `${token}`,
          },
        });
        console.log(res.data);
        if (res.data) {
          setProfile(res.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (token) {
      fetchData();
    } else {
      navigate("/");
    }
  }, [token]);

  return (
    <div className="max-sm:w-full w-11/12 max-w-[1440px] mx-auto min-h-[calc(100vh-88px)] mt-[120px] flex justify-center items-start ">
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-secondaryBg-dark rounded-[12px] max-w-[400px] w-11/12 h-full p-4">
          <div className="photo-container relative w-[100px] h-[100px] mx-auto flex justify-center items-center border-[2px] border-solid border-primary rounded-full overflow-hidden">
            <img
              src={
                profile.photo_url?.includes("https")
                  ? `https://sws-news.uz/api/v1/files/${profile.photo_url}`
                  : userlogosecondary
              }
              alt=""
            />
          </div>
          <h1 className="text-thin clamp2 text-center font-bold my-3">
            {profile?.fullname}
          </h1>
          <section className="flex flex-col justify-start items-start gap-4 w-full">
            {/* Edit */}
            <div className="bg-border w-full h-[1px]"></div>
            <div
              onClick={handleEditModal}
              className="flex justify-between items-center cursor-pointer w-full"
            >
              <div className="flex justify-start items-center gap-4">
                <div className="w-[20px]">
                  <img className="w-full h-full" src={edit} alt="" />
                </div>

                <h1 className="text-thin clamp4 text-center font-bold">
                  Tahrirlash
                </h1>
              </div>
              <MdKeyboardArrowRight className="text-thin text-[24px]" />
            </div>
            {/* Like news */}
            <div className="bg-border w-full h-[1px]"></div>
            <NavLink
              to={"/liked"}
              className="flex justify-between items-center cursor-pointer w-full"
            >
              <div className="flex justify-start items-center gap-4">
                <div className="w-[20px]">
                  <img className="w-full h-full" src={like} alt="" />
                </div>

                <h1 className="text-thin clamp4 text-center font-bold">
                  Men yoqtirgan postlar
                </h1>
              </div>
              <MdKeyboardArrowRight className="text-thin text-[24px]" />
            </NavLink>
            {/* about us */}
            <div className="bg-border w-full h-[1px]"></div>
            <NavLink
              to={"/about-us"}
              className="flex justify-between items-center cursor-pointer w-full"
            >
              <div className="flex justify-start items-center gap-4">
                <div className="w-[20px]">
                  <img className="w-full h-full" src={aboutus} alt="" />
                </div>

                <h1 className="text-thin clamp4 text-center font-bold">
                  Biz haqimizda
                </h1>
              </div>
              <MdKeyboardArrowRight className="text-thin text-[24px]" />
            </NavLink>
            {/* lenguage */}
            <div className="bg-border w-full h-[1px]"></div>
            <div className="flex justify-between items-center cursor-pointer w-full">
              <div className="flex justify-start items-center gap-4">
                <div className="w-[20px]">
                  <img className="w-full h-full" src={global} alt="" />
                </div>

                <h1 className="text-thin clamp4 text-center font-bold">
                  Tillar
                </h1>
              </div>
              <MdKeyboardArrowRight className="text-thin text-[24px]" />
            </div>
            {/* Privacy Policy */}
            <div className="bg-border w-full h-[1px]"></div>
            <NavLink
              to={"/privacy-policy"}
              className="flex justify-between items-center cursor-pointer w-full"
            >
              <div className="flex justify-start items-center gap-4">
                <div className="w-[20px]">
                  <GoShield className="text-thin text-[20px]" />
                </div>

                <h1 className="text-thin clamp4 text-center font-bold">
                  Maxfiylik & xavfsizlik
                </h1>
              </div>
              <MdKeyboardArrowRight className="text-thin text-[24px]" />
            </NavLink>
            {/* exit */}
            <div className="bg-border w-full h-[1px]"></div>
            <div
              onClick={handleExitModal}
              className="flex justify-between items-center cursor-pointer w-full"
            >
              <div className="flex justify-start items-center gap-4">
                <div className="w-[20px]">
                  <img className="w-full h-full" src={exit} alt="" />
                </div>

                <h1 className="text-thin clamp4 text-center font-bold">
                  Chiqish
                </h1>
              </div>
              <MdKeyboardArrowRight className="text-thin text-[24px]" />
            </div>
          </section>
        </div>
      )}
      <EditModal
        profile={profile}
        isOpen={isEdit}
        handleClose={handleEditModal}
      />
      <ExitModal isOpen={isExit} handleClose={handleExitModal} />
    </div>
  );
};

export default Settings;
