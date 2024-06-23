import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useState, useEffect, useRef } from "react";
import { MdOutlinePhotoCamera } from "react-icons/md";
import { userlogosecondary } from "../../images";
import axios from "axios";

export default function EditModal({ profile, isOpen, handleClose }) {
  const fileInputRef = useRef(null);
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    phone: "",
    password: "",
  });
  const [uploadPhoto, setUploadPhoto] = useState();

  useEffect(() => {
    if (profile) {
      setFormData({
        fullname: profile.fullname,
        username: profile.username,
        phone: profile.phone_number,
        photo: profile.photo_url,
        password: profile.password,
        club_badge: profile.club_badge,
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    handleClose();
    if (profile) {
      setTimeout(() => {
        setFormData({
          fullname: profile.fullname,
          username: profile.username,
          phone: profile.phone_number,
          password: profile.password,
        });
      }, 200);
    }
  };

  const handleSubmit = () => {
    const fetchData = async () => {
      try {
        await axios({
          method: "POST",
          url: "https://sws-news.uz/api/v1/user/update",
          data: JSON.stringify(formData),
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  };

  const handleUploadPhoto = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      const newFile = new FormData();
      newFile.append("file", file);
      const fetchData = async () => {
        try {
          await axios({
            method: "POST",
            url: "https://sws-news.uz/api/v1/files/upload",
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
            data: newFile,
          });
          // Optionally, you can update the profile photo URL here by calling a function or updating the state.
        } catch (error) {
          console.error("Error uploading photo:", error);
        }
      };
      fetchData();
    }
  };

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Transition appear show={isOpen}>
      <div className="fixed top-0 left-0 w-screen h-screen backdrop-blur-[10px] z-[99]"></div>
      <Dialog
        as="div"
        className="relative z-[100] focus:outline-none"
        onClose={handleClose}
      >
        <div className="fixed inset-0 z-[100] w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 transform-[scale(95%)]"
              enterTo="opacity-100 transform-[scale(100%)]"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 transform-[scale(100%)]"
              leaveTo="opacity-0 transform-[scale(95%)]"
            >
              <DialogPanel className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl">
                <form className="w-full flex flex-col gap-[12px]">
                  <div className="photo-container relative w-[100px] h-[100px] mx-auto flex justify-center items-center border-[2px] border-solid border-primary rounded-full overflow-hidden">
                    <img
                      src={
                        uploadPhoto
                          ? `https://sws-news.uz/api/v1/files/${uploadPhoto}`
                          : profile?.photo_url?.includes("https")
                          ? `https://sws-news.uz/api/v1/files/${profile.photo_url}`
                          : userlogosecondary
                      }
                      alt="Profile"
                      className="w-full h-full object-cover opacity-[0.7]"
                    />
                    <div
                      onClick={handleFileInputClick}
                      className="edit-photo absolute w-full h-full bg-black/5 flex justify-center items-center cursor-pointer"
                    >
                      <MdOutlinePhotoCamera className="text-thin text-[24px]" />
                    </div>
                    <input
                      type="file"
                      name="file"
                      hidden
                      ref={fileInputRef}
                      onChange={handleUploadPhoto}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="fullname"
                      className="clamp4 text-thin font-bold"
                    >
                      Isim , Familya
                    </label>
                    <input
                      className="w-full bg-transparent border-[#646464] border-[1px] bg-[#3d3d3d] outline-none px-[8px] py-[8px] rounded-[6px] focus:border-primary text-white transition-all ease-linear duration-[0.4]"
                      type="text"
                      id="fullname"
                      name="fullname"
                      value={formData.fullname}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="username"
                      className="clamp4 text-thin font-bold"
                    >
                      Username
                    </label>
                    <input
                      className="w-full bg-transparent border-[#646464] border-[1px] bg-[#3d3d3d] outline-none px-[8px] py-[8px] rounded-[6px] focus:border-primary text-white transition-all ease-linear duration-[0.4]"
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="phone"
                      className="clamp4 text-thin font-bold"
                    >
                      Telefon raqam
                    </label>
                    <input
                      className="w-full bg-transparent border-[#646464] border-[1px] bg-[#3d3d3d] outline-none px-[8px] py-[8px] rounded-[6px] focus:border-primary text-white transition-all ease-linear duration-[0.4]"
                      type="text"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="password"
                      className="clamp4 text-thin font-bold"
                    >
                      Parol
                    </label>
                    <input
                      className="w-full bg-transparent border-[#646464] border-[1px] bg-[#3d3d3d] outline-none px-[8px] py-[8px] rounded-[6px] focus:border-primary text-white transition-all ease-linear duration-[0.4]"
                      type="text"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                </form>
                <div className="mt-4 flex justify-end gap-4">
                  <Button
                    className="inline-flex items-center gap-2 rounded-md bg-red-600 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-red-500 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                    onClick={handleCancel}
                  >
                    Bekor qilish
                  </Button>
                  <Button
                    className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                    onClick={handleSubmit}
                  >
                    Saqlash
                  </Button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
