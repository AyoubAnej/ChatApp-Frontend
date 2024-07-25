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
import { Button, Menu, MenuItem } from "@mui/material";
import CreateGroup from "./group/CreateGroup";
import { useDispatch } from "react-redux";
import { logoutAction } from "../redux/auth/Action";

const HomePage = () => {
  const [queries, setQueries] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [content, setContent] = useState("");
  const [isProfile, setIsProfile] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);

  const dispatch = useDispatch();

  const open = Boolean(anchorEl);

  const navigate = useNavigate();

  const [isGroup, setIsGroup] = useState(false);

  const handleSearch = () => {};
  const handleClickOnChatCard = () => [setCurrentChat(true)];
  const handleCreateMessage = () => {};
  const handleNavigate = () => {
    setIsProfile(true);
  };
  const handleCloseOpenProfile = () => {
    setIsProfile(false);
  };

  const handleCloseOpenCreateGroup = () => {
    setIsGroup(!isGroup);
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCreateGroup = () => {
    setIsGroup(true);
    handleClose();
  };

  const handleLogout = () => {
    dispatch(logoutAction());
  };
  

  return (
    <div className="relative bg-[#9a79ed] ">
      <div className="py-14 bg-[#3446eb] w-full "></div>
      <div className="flex bg-[#f0f2f5] h-[90vh] absolute top-[5vh] left-[2vw] w-[96vw] rounded-7px">
        <div className="left w-[30%] bg-[#e8e9ec] h-full rounded-7px">
          {isGroup && (
            <CreateGroup
              handleCloseOpenCreateGroup={handleCloseOpenCreateGroup}
            />
          )}
          {isProfile && (
            <div className="w-full h-full rounded-7px">
              <Profile handleCloseOpenProfile={handleCloseOpenProfile} />
            </div>
          )}

          {!isProfile && !isGroup && (
            <div className="w-full rounded-7px">
              <div className="flex justify-between items-center p-3 rounded-7px">
                <div
                  onClick={handleNavigate}
                  className="flex items-center space-x-3"
                >
                  <img
                    className="rounded-full w-10 h-10 cursor-pointer rounded-7px"
                    src="https://cdn.pixabay.com/photo/2023/06/29/10/33/lion-8096155_1280.png"
                    alt=""
                  />
                  <p>username</p>
                </div>
                <div className="space-x-3 text-2xl flex">
                  <TbCircleDashed
                    className="cursor-pointer"
                    onClick={() => navigate("/status")}
                  />
                  <BiCommentDetail />
                  <BsThreeDotsVertical
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    className="cursor-pointer"
                  />

                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleCreateGroup}>
                      Create Group
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
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
              <div className="bg-white overflow-y-scroll h-[72vh] px-3 rounded-b-7px">
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
        {!currentChat && (
          <div className="w-[70%] flex flex-col items-center justify-center h-full rounded-7px">
            <div className="max-w-[70%] text-center rounded-7px">
              <img
                src="https://cdn.pixabay.com/photo/2024/06/29/22/34/friends-8862092_1280.png"
                alt=""
                className="rounded-7px"
              />
              <h1 className="text-4xl text-gray-600 rounded-7px">
                ChatterWave Web
              </h1>
              <p className="my-9 rounded-7px">
                send and recieve message without keeping your phone online. use
                ChatterWave
              </p>
            </div>
          </div>
        )}
        {currentChat && (
          <div className="w-[70%] relative bg-[#d3bce3] rounded-7px">
            <div className="header absolute top-0 w-full bg-[#f0f2f5] rounded-7px">
              <div className="flex justify-between">
                <div className="py-3 space-x-4 flex items-center px-3 rounded-7px">
                  <img
                    className="w-10 h-10 rounded-full rounded-7px"
                    src="https://cdn.pixabay.com/photo/2024/03/20/06/18/ai-generated-8644732_1280.jpg"
                    alt=""
                  />
                  <p>username</p>
                </div>
                <div className="py-3 flex space-x-4 items-center px-3 rounded-7px">
                  <AiOutlineSearch />
                </div>
              </div>
            </div>
            <div className="px-10 h-[85vh] overflow-y-scroll rounded-7px">
              <div className="space-y-1 flex flex-col justify-center mt-20 py-2 rounded-7px">
                {[1, 1, 1, 1, 1].map((item, i) => (
                  <MessageCard
                    isReqUserMessage={i % 2 === 0}
                    content="message"
                    key={i}
                    className="rounded-7px"
                  />
                ))}
              </div>
            </div>
            <div className="footer bg-[#f0f2f5] absolute bottom-0 w-full py-3 text-2xl rounded-7px">
              <div className="flex justify-between items-center px-5 relative rounded-7px">
                <BsEmojiSmile className="cursor-pointer" />
                <ImAttachment />

                <input
                  className="py-2 outline-none bg-white pl-4 rounded-md w-[85%] rounded-7px"
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
