import React from "react";

const Comments = ({ match }) => {
  return (
    <main className="flex flex-col gap-[16px]">
      <section className="bg-secondaryBg-dark p-4 rounded-[12px] w-full h-full">
        <h1 className="text-white clamp2 font-bold">Commentlar</h1>
        <div className="w-full h-[2px] bg-navbar my-[10px]"></div>
        <form action="">
          <div className="flex flex-col">
            <textarea
              className="w-full border-[2px] border-navbar bg-secondaryBg-dark text-white p-[10px] rounded-[12px] outline-none"
              name=""
              id=""
              placeholder="Bu yerga yozing..."
            ></textarea>
          </div>
          <div className="w-full flex justify-end mt-[12px]">
            <button className="flex-end px-[14px] py-[8px] rounded-[12px] bg-navbar text-white clamp4">
              Comment qo'shish
            </button>
          </div>
        </form>
        <div>
          <h1 className="text-white font-bold clamp3">0 comment</h1>
          <div className="w-full h-[1px] bg-navbar my-[12px]"></div>
        </div>
      </section>
    </main>
  );
};

export default Comments;
