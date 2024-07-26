import { Alert, Button, Snackbar } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { currentUser, login } from "../../redux/auth/Action";

const Signin = () => {
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({ email: "", password: "" });

  const dispatch = useDispatch();

  const { auth } = useSelector((store) => store);
  const token = localStorage.getItem("token");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitting");
    setOpenSnackBar(true);
    dispatch(login(inputData))
      .then((resData) => {
        if (resData.jwt) {
          navigate("/");
        } else {
          // Handle login failure
          console.log("Login failed");
          setOpenSnackBar(false);
          // You might want to show an error message to the user here
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        setOpenSnackBar(false);
        // Handle error, maybe show an error message to the user
      });
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
  }, [token, dispatch]);

  useEffect(() => {
    if (auth.reqUser?.full_name) {
      navigate("/");
    }
  }, [auth.reqUser, navigate]);

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
                name="email"
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
                name="password"
              />
            </div>
            <Button
              type="submit"
              sx={{ bgcolor: "purple", padding: ".5rem 0rem" }}
              className="w-full"
              variant="contained"
            >
              {" "}
              Sign In
            </Button>
          </form>
          <div className="flex space-x-3 items-center mt-5">
            <p className="m-0">Create New Account</p>
            <Button variant="text" onClick={() => navigate("/signup")}>
              Sign Up
            </Button>
          </div>
        </div>
      </div>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleSnackBarClose}
        // message="Note archived"
        // action={action}
      >
        <Alert
          onClose={handleSnackBarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Login successfull!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Signin;
