import React, { useEffect, useState } from "react";
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
import { Menu, MenuItem } from "@mui/material";
import CreateGroup from "./group/CreateGroup";
import { useDispatch, useSelector } from "react-redux";
import { currentUser, logoutAction, searchUser } from "../redux/auth/Action";
import { getUsersChat, createChat } from "../redux/chat/Action";
import { createMessage } from "../redux/message/Action";

const HomePage = () => {
  const [queries, setQueries] = useState("");
  const [currentChat, setCurrentChat] = useState(null);
  const [content, setContent] = useState("");
  const [isProfile, setIsProfile] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isGroup, setIsGroup] = useState(false);

  const { auth, chat } = useSelector((store) => store);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const handleSearch = (keyword) => {
    if (keyword.trim()) {
      dispatch(searchUser({ keyword, token }));
    }
  };

  const handleClickOnChatCard = (userId) => {
    const userIdInt = parseInt(userId, 10);
    dispatch(createChat({ token, data: { userId: userIdInt } }));
    setQueries("");
  };

  const handleCurrentChat = (item) => {
    setCurrentChat(item);
  };
  console.log("current chat is : ", currentChat);

  const handleCreateMessage = () => {
    dispatch(
      createMessage({
        token,
        data: { chatId: currentChat.id, content: content },
      })
    );
  };

  useEffect(() => {
    if (token) {
      dispatch(getUsersChat({ token }));
      dispatch(currentUser(token));
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (!auth.reqUser) {
      navigate("/signup");
    }
  }, [auth.reqUser, navigate]);

  const handleClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <div className="relative bg-[#9a79ed]">
      <div className="py-14 bg-[#3446eb] w-full"></div>
      <div className="flex bg-[#f0f2f5] h-[90vh] absolute top-[5vh] left-[2vw] w-[96vw] rounded-7px">
        <div className="left w-[30%] bg-[#e8e9ec] h-full rounded-7px">
          {isGroup && (
            <CreateGroup handleCloseOpenCreateGroup={() => setIsGroup(false)} />
          )}
          {isProfile && (
            <Profile handleCloseOpenProfile={() => setIsProfile(false)} />
          )}
          {!isProfile && !isGroup && (
            <div className="w-full rounded-7px">
              <div className="flex justify-between items-center p-3 rounded-tl-lg">
                <div
                  onClick={() => setIsProfile(true)}
                  className="flex items-center space-x-3"
                >
                  <img
                    className="rounded-full w-10 h-10 cursor-pointer"
                    src="https://cdn.pixabay.com/photo/2023/06/29/10/33/lion-8096155_1280.png"
                    alt="Profile"
                  />
                  <p>{auth.reqUser?.fullName}</p>
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
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={() => setIsGroup(true)}>
                      Create Group
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        dispatch(logoutAction());
                        navigate("/signup");
                      }}
                    >
                      Logout
                    </MenuItem>
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
              <div className="bg-white overflow-y-scroll h-[71.8vh] px-3 rounded-bl-lg">
                {queries &&
                  auth.searchUser?.map((item) => {
                    if (item && item.fullName) {
                      return (
                        <div
                          key={item.id}
                          onClick={() => handleClickOnChatCard(item.id)}
                        >
                          <hr />
                          <ChatCard
                            name={item.fullName}
                            userImg={
                              item.profilePicture ||
                              "https://cdn.pixabay.com/photo/2017/07/31/17/12/water-2559064_640.jpg"
                            }
                          />
                        </div>
                      );
                    }
                    return null;
                  })}
                {chat.chats?.length > 0 &&
                  !queries &&
                  chat.chats.map((item) => {
                    if (item.group) {
                      return (
                        <div onClick={() => handleCurrentChat(item)}>
                          <hr />
                          <ChatCard
                            name={item.chatName || "Group Chat"} // Fallback for null chatName
                            userImg={
                              item.chatImage ||
                              "https://cdn.pixabay.com/photo/2017/07/31/17/12/water-2559064_640.jpg"
                            }
                          />
                        </div>
                      );
                    } else {
                      const otherUser =
                        item.users[0]?.id === auth.reqUser?.id
                          ? item.users[1]
                          : item.users[0];
                      return (
                        <div
                          key={item.id}
                          onClick={() => handleCurrentChat(item)}
                        >
                          <hr />
                          <ChatCard
                            isChat={true}
                            name={otherUser?.fullName || "Unknown"}
                            userImg={
                              otherUser?.profilePicture ||
                              "https://cdn.pixabay.com/photo/2017/07/31/17/12/water-2559064_640.jpg"
                            }
                          />
                        </div>
                      );
                    }
                  })}
              </div>
            </div>
          )}
        </div>

        {/* Chat Box */}

        {/* name={item.chatName || "Group Chat"} // Fallback for null chatName
                            userImg={
                              item.chatImage ||
                              "https://cdn.pixabay.com/photo/2017/07/31/17/12/water-2559064_640.jpg"
                            } */}

        {!currentChat && (
          <div className="w-[70%] flex flex-col items-center justify-center h-full rounded-7px">
            <div className="max-w-[70%] text-center rounded-7px">
              <img
                src="https://cdn.pixabay.com/photo/2024/06/29/22/34/friends-8862092_1280.png"
                alt="Welcome"
                className="rounded-7px"
              />
              <h1 className="text-4xl text-gray-600 rounded-7px">
                ChatterWave Web
              </h1>
              <p className="my-9 rounded-7px">
                Send and receive messages without keeping your phone online. Use
                ChatterWave.
              </p>
            </div>
          </div>
        )}
        {currentChat && (
          <div className="w-[70%] relative bg-[#d3bce3] rounded-7px">
            <div className="header absolute top-0 w-full bg-[#f0f2f5] rounded-tr-lg">
              <div className="flex justify-between">
                <div className="py-3 space-x-4 flex items-center px-3 rounded-7px">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={
                      currentChat.group
                        ? currentChat.chatImage
                        : auth.reqUser.id !== currentChat.users[0].id
                        ? currentChat.users[0].profilePicture ||
                          "https://cdn.pixabay.com/photo/2024/03/20/06/18/ai-generated-8644732_1280.jpg"
                        : currentChat.users[1].profilePicture ||
                          "https://cdn.pixabay.com/photo/2024/03/20/06/18/ai-generated-8644732_1280.jpg"
                    }
                    alt="Chat"
                  />
                  <p>
                    {currentChat.group
                      ? currentChat.chatName
                      : auth.reqUser?.id == currentChat.users[0].id
                      ? currentChat.users[1].fullName
                      : currentChat.users[0].fullName}
                  </p>
                </div>
                <div className="py-3 flex space-x-4 items-center px-3 rounded-7px">
                  <AiOutlineSearch />
                </div>
              </div>
            </div>
            <div className="px-10 h-[85vh] overflow-y-scroll rounded-7px">
              <div className="space-y-1 flex flex-col justify-center mt-20 py-2 rounded-7px">
                {[1, 1, 1, 1, 1].map((_, i) => (
                  <MessageCard
                    isReqUserMessage={i % 2 === 0}
                    content="message"
                    key={i}
                    className="rounded-7px"
                  />
                ))}
              </div>
            </div>
            <div className="footer bg-[#f0f2f5] absolute bottom-0 w-full py-3 text-2xl rounded-br-lg">
              <div className="flex justify-between items-center px-5 relative rounded-7px">
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
