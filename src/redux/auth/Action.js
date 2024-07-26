import { BASE_API_URI } from "../../config/api";
import {
  LOGIN,
  LOGOUT,
  REGISTER,
  REQ_USER,
  SEARCH_USER,
  UPDATE_USER,
} from "./ActionType";

export const register = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URI}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });
    const resData = await res.json();
    if (resData.jwt) localStorage.setItem("token", resData.jwt);
    console.log("register", resData);
    dispatch({ type: REGISTER, payload: resData });
  } catch (error) {
    console.log("catch error", error);
  }
};

export const login = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URI}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resData = await res.json();
    console.log("login", resData); // Changed to "login"
    if (resData.jwt) localStorage.setItem("token", resData.jwt);
    dispatch({ type: LOGIN, payload: resData });
  } catch (error) {
    console.log("catch error", error);
  }
};

export const currentUser = (token) => async (dispatch) => {
  // console.log("current user action triggered ", token);
  try {
    const res = await fetch(`${BASE_API_URI}/api/users/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const resData = await res.json();
    console.log("current user response data ", resData);
    dispatch({ type: REQ_USER, payload: resData });
  } catch (error) {
    console.log("catch error", error);
  }
};

export const searchUser = (data) => async (dispatch) => {
  try {
    const res = await fetch(
      `${BASE_API_URI}/api/users/search?name=${data.keyword}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.token}`,
        },
      }
    );
    const resData = await res.json();
    console.log("search user", resData); // Changed to "search user"
    dispatch({ type: SEARCH_USER, payload: resData });
  } catch (error) {
    console.log("catch error", error);
  }
};

export const updateUser = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URI}/api/users/update/${data.id}`, {
      method: "PUT", // Changed to PUT
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.token}`,
      },
      body: JSON.stringify(data), // Add body if needed
    });
    const resData = await res.json();
    console.log("update user", resData); // Changed to "update user"
    dispatch({ type: UPDATE_USER, payload: resData });
  } catch (error) {
    console.log("catch error", error);
  }
};

export const logoutAction = () => async (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: LOGOUT, payload: null });
  dispatch({ type: REQ_USER, payload: null });
};
