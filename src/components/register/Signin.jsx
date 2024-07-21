import React from "react";
import { useState } from "react";

const Signin = () => {
  const [inputData, setInputData] = useState({ email: "", password: "" });

  const handleSubmit = () => {
    console.log("submitting");
  };

  const handleChange = () => {};
  return (
    <div>
      <div className="flex justify-center h-screen items-center">
        <div className="w-[30%] p-10 shadow-md bg-white">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <p className="mb-2">Email</p>
              <input
                type="text"
                placeholder="Enter your email"
                className="py-2 outline-green-600 w-full rounded-md border"
                onChange={handleChange}
                value={inputData.email}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
