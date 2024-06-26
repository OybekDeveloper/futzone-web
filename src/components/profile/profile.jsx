import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { ChevronDownIcon, PencilIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { exit, userlogo } from "../../images";
import ExitModal from "../../interface/settings/exit-modal";

export default function Profile({ handleClose }) {
  const [profile, setProfile] = useState({});
  const [isExit, setIsExit] = useState(false);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  console.log(token);

  const handleExitModal = () => {
    setIsExit(!isExit);
    handleClose();
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
      }
    };
    if (token) {
      fetchData();
    }
  }, [token]);
  console.log(profile, "test");
  return (
    <div className="relative z-[999] ">
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 rounded-md bg-transparent py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-secondaryBg-dark data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
          <div
            className={`${
              profile.photo_url?.includes("https")
                ? "border-[1px] border-primary"
                : ""
            } w-[24px] h-[24px] rounded-full overflow-hidden `}
          >
            <img
              className="w-full h-full"
              src={
                profile.photo_url?.includes("jpg")
                  ? `https://sws-news.uz/api/v1/files/${profile.photo_url}`
                  : userlogo
              }
              alt=""
            />
          </div>

          <h1 className="clamp4 text-thin">
            {profile?.username?.length > 7
              ? profile.username.slice(0, 7)+"..."
              : profile.username}
          </h1>
          <ChevronDownIcon className="size-4 fill-white/60" />
        </MenuButton>
        <Transition
          enter="transition ease-out duration-75"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <MenuItems
            anchor="bottom end"
            className="mt-2 w-56 border-white/5  origin-top-right rounded-xl border bg-white/5 backdrop-blur-[10px] p-1 text-sm/6 text-white focus:outline-none z-[999]"
          >
            <MenuItem>
              <button
                onClick={() => {
                  handleClose();
                  navigate("/settings");
                }}
                className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
              >
                <PencilIcon className="size-4 fill-white/30" />
                Profil sozlamalari
                <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">
                  ⌘Setting
                </kbd>
              </button>
            </MenuItem>
            <MenuItem>
              <button
                onClick={handleExitModal}
                className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
              >
                <img src={exit} alt="" />
                <h1 className="text-red-500">Chiqish</h1>
                <kbd className="ml-auto hidden font-sans text-xs text-red-400 group-data-[focus]:inline">
                  ⌘Exit
                </kbd>
              </button>
            </MenuItem>
          </MenuItems>
        </Transition>
      </Menu>
      <ExitModal isOpen={isExit} handleClose={handleExitModal} />
    </div>
  );
}
