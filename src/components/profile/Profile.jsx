import React, { useState } from "react";
import { BsArrowLeft, BsCheck, BsPencil } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Profile = ({ handleCloseOpenProfile }) => {
  const [flag, setFlag] = useState(false);
  const [username, setUsername] = useState(null);

  const navigate = useNavigate();

  const handleFlag = () => {
    setFlag(true);
  };
  const handleCheckClick = () => {
    setFlag(false);
  };
  const handleChange = (e) => {
    setUsername(e.target.value);
  };
  return (
    <div className="w-full h-full">
      <div className="flex items-center space-x-10 bg-[#1e247e] text-white pt-16 px-10 pb-5">
        <BsArrowLeft
          className="cursor-pointer text-2xl font-bold"
          onClick={handleCloseOpenProfile}
        />
        <p className="cursor-pointer font-semibold">Profile</p>
      </div>

      {/* update profile picture section */}
      <div className="flex flex-col justify-center items-center my-12">
        <label htmlFor="imgInput">
          <img
            src="https://cdn.pixabay.com/photo/2024/06/17/16/39/girl-8836068_1280.jpg"
            alt=""
            className="rounded-full w-[15vw] h-[vw] cursor-pointer"
          />
        </label>
        <input type="file" id="imgInput" className="hidden" />
      </div>

      {/* name section */}
      <div className="bg-white px-3">
        <p className="py-3">Your Name</p>

        {!flag && (
          <div className="w-full flex justify-between items-center ">
            <p className="py-3">{username || "username"}</p>
            <BsPencil onClick={handleFlag} className="cursor-pointer" />
          </div>
        )}

        {flag && (
          <div className="w-full flex justify-between items-center py-2">
            <input
              onChange={handleChange}
              className="w-[80%] outline-none border-b-2 border-blue-700 p-2 "
              type="text"
              placeholder="Enter  your name"
            />
            <BsCheck
              onClick={handleCheckClick}
              className="cursor-pointer text-2xl"
            />
          </div>
        )}
      </div>
      <div className="px-3 my-5">
        <p className="py-10">
          This is not your username, this name will be visible to your contacts.
        </p>
      </div>
    </div>
  );
};

export default Profile;
