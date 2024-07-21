import { BASE_API_URI } from "../../config/api";
import { LOGIN, REGISTER, REQ_USER } from "./ActionType";

export const register = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URI}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resData = await res.json();
    console.log("register", resData);
    dispatch({ type: REGISTER, payload: resData });
  } catch (error) {}
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
    console.log("register", resData);
    dispatch({ type: LOGIN, payload: resData });
  } catch (error) {
    console.log("catch error ", error);
  }
};

export const currentUser = (token) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URI}/auth/signin`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const resData = await res.json();
    console.log("register", resData);
    dispatch({ type: REQ_USER, payload: resData });
  } catch (error) {
    console.log("catch error ", error);
  }
};
