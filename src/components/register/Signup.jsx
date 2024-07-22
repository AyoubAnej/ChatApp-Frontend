import { Alert, Button, Snackbar } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import  {register} from "../../redux/auth/Action"

const Signup = () => {
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    full_name: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitting", inputData);
    dispatch(register(inputData))
    setOpenSnackBar(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((values) => ({ ...values, [name]: value }));
  };

  const handleSnackBarClose = () => {
    setOpenSnackBar(false);
  };

  return (
    <div>
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
                  onChange={(e) => handleChange(e)}
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
                  onChange={(e) => handleChange(e)}
                  value={inputData.email}
                />
              </div>
              <div>
                <p className="mb-2">Password</p>
                <input
                  type="text"
                  className="py-2 px-3 outline-green-600 w-full rounded-md border-1"
                  placeholder="Enter your password"
                  name="password"
                  onChange={(e) => handleChange(e)}
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
                  {" "}
                  Sign Up
                </Button>
              </div>
              {/* <div>
                <input
                  type="submit"
                  className="py-[0.7rem] px-3 w-full rounded-md bg-green-600 text-white mt-3"
                  placeholder="Enter your password"
                  value={"Signup"}
                  readOnly
                />
              </div> */}
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
          // message="Note archived"
          // action={action}
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
    </div>
  );
};

export default Signup;
