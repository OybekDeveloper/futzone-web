import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import {
  ArchiveBoxXMarkIcon,
  ChevronDownIcon,
  PencilIcon,
  Square2StackIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { exit, userlogo } from "../../images";

export default function Profile() {
  const [profile, setProfile] = useState({});
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  console.log(token);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
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
  return (
    <div className="relative z-[999] ">
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 rounded-md bg-transparent py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
          <img className="w-[20px] " src={userlogo} alt="" />
          <h1 className="clamp4 text-thin">{profile?.username}</h1>
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
            className="mt-2 w-56 border-white/5 bg-black origin-top-right rounded-xl border bg-white/5 backdrop-blur-[10px] p-1 text-sm/6 text-white focus:outline-none z-[999]"
          >
            <MenuItem>
              <button
                onClick={() => navigate("/settings")}
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
                onClick={handleLogout}
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
    </div>
  );
}
