import { BASE_API_URI } from "../../config/api";
import { CREATE_CHAT, CREATE_GROUP, GET_USERS_CHAT } from "./ActionType";

const createChat = (chatData) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URI}/api/chats/single`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${chatData.token}`,
      },
      body: JSON.stringify(chatData.data),
    });
    const data = await res.json();
    console.log("create chat", data);
    dispatch({ type: CREATE_CHAT, payload: data });
  } catch (error) {
    console.log("catch error", error);
  }
};

const createGroupChat = (chatData) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URI}/api/chats/group`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${chatData.token}`,
      },
      body: JSON.stringify(chatData.data),
    });
    const data = await res.json();
    console.log("create group chat", data);
    dispatch({ type: CREATE_GROUP, payload: data });
  } catch (error) {
    console.log("catch error", error);
  }
};

const getUsersChat = (chatData) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URI}/api/chats/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${chatData.token}`,
      },
      body: JSON.stringify(chatData.data),
    });
    const data = await res.json();
    console.log("get users chat", data);
    dispatch({ type: GET_USERS_CHAT, payload: data });
  } catch (error) {
    console.log("catch error", error);
  }
};