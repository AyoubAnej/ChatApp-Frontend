import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { BsFilter } from "react-icons/bs";
import { TbCircleDashed } from "react-icons/tb";
import ChatCard from "./chatCard/ChatCard";

const HomePage = () => {
  const [queries, setQueries] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);

  const handleSearch = () => [];
  const handleClickOnChatCard = () => [setCurrentChat(true)];
  return (
    <div className="relative">
      <div className="py-14 bg-[#3446eb] w-full"></div>
      <div className="flex bg-[#f0f2f5] h-[94vh] absolute top-6 left-6 w-full">
        <div className="left w-[30%] bg-[#e8e9ec] h-full">
          <div className="w-full">
            <div className="flex justify-between items-center p-3">
              <div className="flex items-center space-x-3">
                <img
                  className="rounded-full w-10 h-10 cursor-pointer"
                  src="https://cdn.pixabay.com/photo/2023/06/29/10/33/lion-8096155_1280.png"
                  alt=""
                />
                <p>username</p>
              </div>
              <div className="space-x-3 text-2xl flex">
                <TbCircleDashed />
                <BiCommentDetail />
              </div>
            </div>
            <div className="relative flex justify-center items-center bg-white py-4 px-3">
              <input
                className="border-none outline-none bg-slate-200 rounded-md w-[93%] pl-9 py-2"
                type="text"
                placeholder="Search or start new chat"
                onChange={(e) => {
                  setQueries(e.target.value);
                  handleSearch(e.target.value);
                }}
                value={queries}
              />
              <AiOutlineSearch className="left-5 top-7 absolute" />
              <div>
                <BsFilter className="ml-4 text-3xl" />
              </div>
            </div>
            {/* all users */}
            <div className="bg-white overflow-y-scroll h-[76.8vh] px-3">
              {queries &&
                [1, 1, 1, 1, 1].map((item) => (
                  <div onClick={handleClickOnChatCard}>
                    {" "}
                    <hr />
                    <ChatCard />
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/* default chatapp page */}
        {!currentChat && (
          <div className="w-[70%] flex flex-col items-center justify-center h-full">
            <div className="max-w-[70%] text-center">
              <img
                src="https://cdn.pixabay.com/photo/2024/06/29/22/34/friends-8862092_1280.png"
                alt=""
              />
              <h1 className="text-4xl text-gray-600">ChatterWave Web</h1>
              <p className="my-9">
                send and recieve message without keeping your phone online. use
                ChatterWave
              </p>
            </div>
          </div>
        )}
        {/* message part */}
        {currentChat && (
          <div>
            <div>
              <div>
                <div>
                  <img
                    className="w-10 h-10 rounded-full"
                    src="https://cdn.pixabay.com/photo/2024/03/20/06/18/ai-generated-8644732_1280.jpg"
                    alt=""
                  />
                  <p>username</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
