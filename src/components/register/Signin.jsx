import { Button } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({ email: "", password: "" });

  const handleSubmit = () => {
    console.log("submitting");
  };

  const handleChange = () => {};
  return (
    <div>
      <div className="flex justify-center h-screen items-center">
        <div className="w-[30%] p-10 shadow-md bg-white rounded-[10px]">
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
            <div>
              <p className="mb-2">Password</p>
              <input
                type="password"
                placeholder="Enter your password"
                className="py-2 outline-green-600 w-full rounded-md border"
                onChange={handleChange}
                value={inputData.password}
              />
            </div>
            <Button type="submit" sx={{bgcolor:"purple"}} className="w-full" variant="contained"> Sign In</Button>
          </form>
          <div className="flex space-x-3 items-center mt-5">
            <p className="m-0">Create New Account</p>
            <Button variant="text" onClick={() => Navigate("/signup")}>Sign Up</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
