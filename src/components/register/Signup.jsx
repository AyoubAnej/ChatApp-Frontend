// src/components/Auth/Signup.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Snackbar } from "@mui/material";
import { currentUser, register } from "../../redux/auth/Action";
import { store } from "../../redux/store";

const Signup = () => {
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    full_name: "",
    email: "",
    password: "",
  });

  const { auth } = useSelector((store) => store);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(register(inputData));
      setOpenSnackBar(true);
      navigate("/signin");
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((values) => ({ ...values, [name]: value }));
  };

  const handleSnackBarClose = () => {
    setOpenSnackBar(false);
  };

  useEffect(() => {
    if (token) dispatch(currentUser(token));
  }, [token]);

  useEffect(() => {
    if (auth.reqUser?.full_name) {
      navigate("/");
    }
  }, [auth.reqUser]);

  return (
    <div>
      <div className="flex flex-col justify-center min-h-screen items-center">
        <div className="w-[30%] p-10 shadow-md bg-white rounded-[10px]">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <p className="mb-2">Username</p>
              <input
                type="text"
                className="py-2 px-3 outline-green-600 w-full rounded-md border-1"
                placeholder="Enter username"
                name="full_name"
                onChange={handleChange}
                value={inputData.full_name}
              />
            </div>
            <div>
              <p className="mb-2">Email</p>
              <input
                type="text"
                className="py-2 px-3 outline-green-600 w-full rounded-md border-1"
                placeholder="Enter your email"
                name="email"
                onChange={handleChange}
                value={inputData.email}
              />
            </div>
            <div>
              <p className="mb-2">Password</p>
              <input
                type="password"
                className="py-2 px-3 outline-green-600 w-full rounded-md border-1"
                placeholder="Enter your password"
                name="password"
                onChange={handleChange}
                value={inputData.password}
              />
            </div>
            <div>
              <Button
                type="submit"
                sx={{ bgcolor: "purple", padding: ".5rem 0rem" }}
                className="w-full"
                variant="contained"
              >
                Sign Up
              </Button>
            </div>
          </form>
          <div className="flex space-x-3 items-center mt-5">
            <p className="">Already have an account?</p>
            <Button variant="text" onClick={() => navigate("/signin")}>
              Signin
            </Button>
          </div>
        </div>
      </div>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleSnackBarClose}
      >
        <Alert
          onClose={handleSnackBarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Your account is successfully created!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Signup;
