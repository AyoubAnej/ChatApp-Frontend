import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import {
  BsEmojiSmile,
  BsFilter,
  BsMicFill,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { TbCircleDashed } from "react-icons/tb";
import ChatCard from "./chatCard/ChatCard";
import MessageCard from "./messageCard/MessageCard";
import { ImAttachment } from "react-icons/im";

import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import Profile from "./profile/Profile";

const HomePage = () => {
  const [queries, setQueries] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [content, setContent] = useState("");
  const [isProfile, setIsProfile] = useState(false);

  const navigate = useNavigate();

  const handleSearch = () => {};
  const handleClickOnChatCard = () => [setCurrentChat(true)];
  const handleCreateMessage = () => {};
  const handleNavigate = () => {
    // navigate("/profile")
    setIsProfile(true);
  };
  const handleCloseOpenProfile = () => {
    setIsProfile(false);
  };

  return (
    <div className="relative bg-[#9a79ed]">
      <div className="py-14 bg-[#3446eb] w-full"></div>
      <div className="flex bg-[#f0f2f5] h-[90vh] absolute top-[5vh] left-[2vw] w-[96vw]">
        <div className="left w-[30%] bg-[#e8e9ec] h-full">
          {/* profile */}
          {isProfile && (
            <div className="w-full h-full">
              <Profile handleCloseOpenProfile={handleCloseOpenProfile} />
            </div>
          )}

          {!isProfile && (
            <div className="w-full">
              {/* home */}
              <div className="flex justify-between items-center p-3">
                <div
                  onClick={handleNavigate}
                  className="flex items-center space-x-3"
                >
                  <img
                    className="rounded-full w-10 h-10 cursor-pointer"
                    src="https://cdn.pixabay.com/photo/2023/06/29/10/33/lion-8096155_1280.png"
                    alt=""
                  />
                  <p>username</p>
                </div>
                <div className="space-x-3 text-2xl flex">
                  <TbCircleDashed className="cursor-pointer" onClick={() => navigate('/status')}/>
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
              <div className="bg-white overflow-y-scroll h-[72vh] px-3">
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
          )}
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
          <div className="w-[70%] relative bg-[#d3bce3]">
            {" "}
            {/*background for chat*/}
            <div className="header absolute top-0 w-full bg-[#f0f2f5]">
              <div className="flex justify-between">
                <div className="py-3 space-x-4 flex items-center px-3">
                  <img
                    className="w-10 h-10 rounded-full"
                    src="https://cdn.pixabay.com/photo/2024/03/20/06/18/ai-generated-8644732_1280.jpg"
                    alt=""
                  />
                  <p>username</p>
                </div>
                <div className="py-3 flex space-x-4 items-center px-3">
                  <AiOutlineSearch />
                  <BsThreeDotsVertical />
                </div>
              </div>
            </div>
            {/* message section */}
            <div className="px-10 h-[85vh] overflow-y-scroll">
              {" "}
              <div className="space-y-1 flex flex-col justify-center mt-20 py-2">
                {[1, 1, 1, 1, 1].map((item, i) => (
                  <MessageCard
                    isReqUserMessage={i % 2 === 0}
                    content="message"
                  />
                ))}
              </div>
            </div>
            {/* footer part */}
            <div className="footer bg-[#f0f2f5] absolute bottom-0 w-full py-3 text-2xl">
              <div className="flex justify-between items-center px-5 relative">
                <BsEmojiSmile className="cursor-pointer" />
                <ImAttachment />

                <input
                  className="py-2 outline-none bg-white pl-4 rounded-md w-[85%]"
                  type="text"
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Type your message"
                  value={content}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleCreateMessage();
                      setContent("");
                    }
                  }}
                />
                <BsMicFill />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
