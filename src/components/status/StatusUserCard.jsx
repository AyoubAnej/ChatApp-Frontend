import React from "react";
import { useNavigate } from "react-router-dom";

const StatusUserCard = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/status/{userId}");
  };
  return (
    <div onClick={handleNavigate} className="flex items-center p-3 cursor-pointer">
      <div>
        <img
          src="https://cdn.pixabay.com/photo/2024/01/21/18/36/ai-generated-8523654_1280.png"
          alt=""
          className="h-7 w-7 lg:w-10 lg:h-10 rounded-full"
        />
      </div>
      <div className="ml-2 text-white">
        <p>Ayoub Anejdam</p>
      </div>
    </div>
  );
};

export default StatusUserCard;
