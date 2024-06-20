import {
  Button,
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { CiWarning } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

export default function ExitModal({ isOpen, handleClose }) {
  const navigate = useNavigate();
  const handleCancel = () => {
    handleClose();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Transition appear show={isOpen}>
      <div className="fixed top-0 left-0 w-screen h-screen backdrop-blur-[10px] z-[99]"></div>
      <Dialog
        as="div"
        className="relative z-[100] focus:outline-none"
        onClose={() => {}}
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
              <DialogPanel className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl flex flex-col justify-center items-center gap-3">
                <CiWarning className="text-[32px] text-yellow-500" />
                <h1 className="w-full text-center clamp3 text-white">
                  Bu profildan chiqishni
                  <br /> xoxlaysizmi?
                </h1>
                <div className="mt-4 flex w-full justify-around items-center gap-4">
                  <Button
                    className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                    onClick={handleCancel}
                  >
                    Yo'q
                  </Button>
                  <Button
                    className="inline-flex items-center gap-2 rounded-md bg-red-600 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-red-500 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                    onClick={handleLogout}
                  >
                    Ha
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
