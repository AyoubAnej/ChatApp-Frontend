import { BASE_API_URI } from "../../config/api";
import { CREATE_NEW_MESSAGE, GET_ALL_MESSAGE } from "./ActionType";

export const createMessage = (messageData) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URI}/api/messages/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${messageData.token}`,
      },
      body: JSON.stringify(messageData.data),
    });
    const data = await res.json();
    console.log("create new message", data);
    dispatch({ type: CREATE_NEW_MESSAGE, payload: data });
  } catch (error) {
    console.log("catch error", error);
  }
};

export const getAllMessages = (reqData) => async (dispatch) => {
  try {
    const res = await fetch(
      `${BASE_API_URI}/api/messages/chat/${reqData.chatId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${reqData.token}`,
        },
      }
    );

    if (!res.ok) {
      // Log detailed error message
      const errorData = await res.json();
      console.error("Error fetching messages:", errorData);
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    console.log("All messages response:", data);
    dispatch({ type: GET_ALL_MESSAGE, payload: data });
  } catch (error) {
    console.error("Catch error fetching messages:", error);
  }
};
