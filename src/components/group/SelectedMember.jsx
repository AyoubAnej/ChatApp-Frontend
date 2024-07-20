import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const SelectedMember = ({ handRemoveMember, member }) => {
  return (
    <div className="flex items-center bg-slate-300 rounded-full">
      <img
        className="w-7 h-7 rounded-full"
        src="https://cdn.pixabay.com/photo/2024/06/23/12/06/sparrow-8848051_640.jpg"
        alt=""
      />
      <p className="px-2">username</p>
      <AiOutlineClose
        onClick={handRemoveMember}
        className="pr-1 cursor-pointer"
      />
    </div>
  );
};

export default SelectedMember;
